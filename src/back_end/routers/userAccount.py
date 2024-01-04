from fastapi import APIRouter, HTTPException, Depends
from src.back_end.models.userAccount import UserAccount
from src.database.user_database.user_database import add_favorite_flight, add_favorite_hotel, delete_favorite_hotel, delete_favorite_flight, get_favorite_flights, get_user_info, get_favorite_hotels, get_previous_trips
from src.back_end.routers.login import get_current_user
from src.database.hotel_database.hotel_db import get_hotel_by_name
from src.database.flights_database.flight_db import get_flight_by_flight_number
router = APIRouter(prefix="/user", tags=["UserAccount"])

# Endpoint to get user information by email
@router.get("/info")
async def get_user_info_by_email(current_user: dict = Depends(get_current_user)):
    user_info = get_user_info(current_user["email"])
    print(user_info)
    if user_info:
        return user_info
    else:
        raise HTTPException(status_code=404, detail="User information not found")

# Endpoint to get previous trips of a user
@router.get("/previous_trips")
async def get_user_previous_trips(current_user: UserAccount = Depends(get_current_user)):
    trips = get_previous_trips(current_user["email"])
    if trips:
        return trips
    else:
        raise HTTPException(status_code=404, detail="Previous trips not found for the user")

# Endpoint to get favorite flights of a user
@router.get("/favorite_flights")
async def get_user_favorite_flights(current_user: dict = Depends(get_current_user)):
    favorite_flights = get_favorite_flights(current_user["email"])
    if favorite_flights:
        return favorite_flights
    else:
        raise HTTPException(status_code=404, detail="Favorite flights not found for the user")

# Endpoint to get favorite hotels of a user
@router.get("/favorite_hotels")
async def get_user_favorite_hotels(current_user: dict = Depends(get_current_user)):
    favorite_hotels = get_favorite_hotels(current_user["email"])
    if favorite_hotels:
        return favorite_hotels
    else:
        raise HTTPException(status_code=404, detail="Favorite hotels not found for the user")

@router.delete("/delete_favorite_flight/{favorite_flight_no}")
async def delete_user_favorite_flight(favorite_flight_no: str, current_user: dict = Depends(get_current_user)):
    success = delete_favorite_flight(current_user["email"], favorite_flight_no)
    current_user_email= current_user["email"]
    if success:
        return {"message": f"Favorite flight {favorite_flight_no} deleted successfully for user {current_user_email}"}
    else:
        raise HTTPException(status_code=404,
                            detail=f"Failed to delete favorite flight {favorite_flight_no} for user {current_user_email}")


@router.delete("/delete_favorite_hotel/{favorite_hotel_name}")
async def delete_user_favorite_hotel(favorite_hotel_name: str, current_user: dict = Depends(get_current_user)):
    success = delete_favorite_hotel(current_user["email"], favorite_hotel_name)
    current_user_email = current_user["email"]
    if success:
        return {"message": f"Favorite hotel {favorite_hotel_name} deleted successfully for user {current_user_email}"}
    else:
        raise HTTPException(status_code=404,
                            detail=f"Failed to delete favorite hotel {favorite_hotel_name} for user {current_user_email}")

@router.post("/add_favorite_flight")
async def add_flight_to_favorites(flight_no: str, current_user: dict = Depends(get_current_user)):
    # Validate the flight exists
    flight_info = get_flight_by_flight_number(flight_no)
    if not flight_info:
        raise HTTPException(status_code=404, detail="Flight not found")

    # Add to favorites
    result = add_favorite_flight(current_user["email"], flight_no)
    if not result:
        raise HTTPException(status_code=500, detail="Error adding favorite flight")
    return {"message": f"Favorite flight {flight_no} added successfully for user {current_user['email']}"}


@router.post("/add_favorite_hotel")
async def add_hotel_to_favorites(hotel_name: str, current_user: dict = Depends(get_current_user)):
    # Validate the hotel exists
    hotel_info = get_hotel_by_name(hotel_name)
    if not hotel_info:
        raise HTTPException(status_code=404, detail="Hotel not found")

    # Add to favorites
    result = add_favorite_hotel(current_user["email"], hotel_name)
    if not result:
        raise HTTPException(status_code=500, detail="Error adding favorite hotel")
    return {"message": f"Favorite hotel {hotel_name} added successfully for user {current_user['email']}"}

