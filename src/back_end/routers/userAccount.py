from fastapi import APIRouter, HTTPException
from src.back_end.models.userAccount import UserAccount
from src.database.user_database.user_database import delete_favorite_hotel, delete_favorite_flight, get_favorite_flights, get_user_info, get_favorite_hotels, get_previous_trips

router = APIRouter(prefix="/user", tags=["UserAccount"])

# Endpoint to get user information by email
@router.get("/info/{email}")
async def get_user_info_by_email(email: str):
    user_info = get_user_info(email)
    if user_info:
        return user_info
    else:
        raise HTTPException(status_code=404, detail="User information not found")

# Endpoint to get previous trips of a user
@router.get("/previous_trips/{email}")
async def get_user_previous_trips(email: str):
    trips = get_previous_trips(email)
    if trips:
        return trips
    else:
        raise HTTPException(status_code=404, detail="Previous trips not found for the user")

# Endpoint to get favorite flights of a user
@router.get("/favorite_flights/{email}")
async def get_user_favorite_flights(email: str):
    favorite_flights = get_favorite_flights(email)
    if favorite_flights:
        return favorite_flights
    else:
        raise HTTPException(status_code=404, detail="Favorite flights not found for the user")

# Endpoint to get favorite hotels of a user
@router.get("/favorite_hotels/{email}")
async def get_user_favorite_hotels(email: str):
    favorite_hotels = get_favorite_hotels(email)
    if favorite_hotels:
        return favorite_hotels
    else:
        raise HTTPException(status_code=404, detail="Favorite hotels not found for the user")

@router.delete("/delete_favorite_flight")
async def delete_user_favorite_flight(email: str, favorite_flight_id: int):
    success = delete_favorite_flight(email, favorite_flight_id)
    if success:
        return {"message": f"Favorite flight {favorite_flight_id} deleted successfully for user {email}"}
    else:
        raise HTTPException(status_code=404,
                            detail=f"Failed to delete favorite flight {favorite_flight_id} for user {email}")


@router.delete("/delete_favorite_hotel")
async def delete_user_favorite_hotel(email: str, favorite_hotel_id: int):
    success = delete_favorite_hotel(email, favorite_hotel_id)
    if success:
        return {"message": f"Favorite hotel {favorite_hotel_id} deleted successfully for user {email}"}
    else:
        raise HTTPException(status_code=404,
                            detail=f"Failed to delete favorite hotel {favorite_hotel_id} for user {email}")