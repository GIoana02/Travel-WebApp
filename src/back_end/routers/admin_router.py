import os
from typing import List

from fastapi import APIRouter, HTTPException, UploadFile, File, Form

from src.back_end.models.flight import Flight, FlightData
from src.back_end.models.hotel import Hotel, HotelData
from src.back_end.models.room import Room
from src.database.flights_database.flight_db import add_flight, delete_flight, update_flight, \
    get_flight_by_flight_number, get_all_flights, create_table
from src.database.hotel_database.hotel_db import add_hotel, update_hotel_image_in_database, delete_hotel, update_hotel, \
    get_all_hotels_admin, get_all_hotels, create_table
from src.database.hotel_database.room_db import add_room,update_room_image_in_database,update_room_availability, update_room, delete_room, get_room_by_id

router = APIRouter(prefix="/admin", tags=["Admin"])
ROOM_IMAGES_DIRECTORY = "src/images/rooms_img"
HOTEL_IMAGES_DIRECTORY = "src/images/hotels_img"

@router.post("/create-room")
async def create_room(room: Room):
    try:
        add_room(room)
        return {"message": "Room added successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
@router.post("/upload-room-image/")
async def upload_image(image: UploadFile = File(...), room_number: str = Form(...)):
    image_url = save_uploaded_image(room_number, image)

    # Save image information to the database
    update_room_image_in_database(room_number, image_url)

    return {"message": "Image uploaded successfully", "url": image_url}
def save_uploaded_image(room_number: str,room_image: UploadFile):
    global image_counter

    if not os.path.exists(ROOM_IMAGES_DIRECTORY):
        os.makedirs(ROOM_IMAGES_DIRECTORY)

    filename = f"{room_number}_photo_{image_counter}.{room_image.filename.split('.')[-1]}"
    image_path = os.path.join(ROOM_IMAGES_DIRECTORY, filename)
    with open(image_path, "wb") as image_file:
        content = room_image.file.read()
        image_file.write(content)

    image_url = f"/{ROOM_IMAGES_DIRECTORY}/{filename}"
    image_counter += 1
    return image_url

@router.put("/update-room-info/{room_id}")
async def update_room_info(room_id: int, room: Room):
    try:
        updated = update_room(room_id, room)
        if updated:
            return {"message": f"Room {room_id} updated successfully"}
        else:
            raise HTTPException(status_code=404, detail="Room not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post('/add_hotel/')
async def add_hotel_endpoint(hotel: HotelData):
    create_table()
    add_hotel_endpoint(hotel)
    return {"message": "hotel added successfully"}

@router.delete("/delete-hotel/{room_id}")
async def delete_room_entry(room_id: int):
    try:
        deleted = delete_room(room_id)
        if deleted:
            return {"message": f"Room {room_id} deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Room not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/create-hotel")
async def create_hotel(hotel: Hotel):
    try:
        added_hotel_id = add_hotel(hotel)
        return {"message": f"Hotel {added_hotel_id} added successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload-hotel-image/")
async def upload_image(image: UploadFile = File(...), hotel_name: str = Form(...)):
    image_url = save_uploaded_image(hotel_name, image)

    # Save image information to the database
    update_hotel_image_in_database(hotel_name, image_url)

    return {"message": "Image uploaded successfully", "url": image_url}

@router.put("/update-hotel-info/{hotel_id}")
async def update_hotel_info(hotel_name: str, hotel: Hotel):
    try:
        updated = update_hotel(hotel_name, hotel)
        if updated:
            return {"message": f"Hotel {hotel_name} updated successfully"}
        else:
            raise HTTPException(status_code=404, detail="Hotel not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/delete-hotel/{hotel_id}")
async def delete_hotel_entry(hotel_name: str):
    try:
        deleted = delete_hotel(hotel_name)
        if deleted:
            return {"message": f"Hotel {hotel_name} deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Hotel not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get('/get_all_hotels/')
async def get_all_hotels_endpoint():
    all_hotels = get_all_hotels()
    print(f"Getting all hotels ")
    return all_hotels

@router.get('/get_hotel_by_hotel_id/{hotel_id}')
async def get_hotel_by_hotel_id_endpoint(hotel_id: str):
    get_hotel_by_hotel_id(hotel_id)
    return {"message": f"Getting hotel with hotel id {hotel_id}"}

image_counter = 1

def save_uploaded_image(hotel_name: str,hotel_image: UploadFile):
    global image_counter

    if not os.path.exists(HOTEL_IMAGES_DIRECTORY):
        os.makedirs(HOTEL_IMAGES_DIRECTORY)

    filename = f"{hotel_name}_photo_{image_counter}.{hotel_image.filename.split('.')[-1]}"
    image_path = os.path.join(HOTEL_IMAGES_DIRECTORY, filename)
    with open(image_path, "wb") as image_file:
        content = hotel_image.file.read()
        image_file.write(content)

    image_url = f"/{HOTEL_IMAGES_DIRECTORY}/{filename}"
    image_counter += 1
    return image_url

@router.post('/add_flight/')
async def add_flight_endpoint(flight: FlightData):
    create_table()
    add_flight(flight)
    return {"message": "Flight added successfully"}

@router.delete('/delete_flight/{flight_number}')
async def delete_flight_endpoint(flight_number: str):
    try:
        delete_flight(flight_number)
        return {"message": "Flight deleted successfully"}
    except Exception as e:
        return {"error": str(e)}, 400

@router.put('/update_flight/{flight_id}')
async def update_flight_endpoint(flight_id: int, flight: FlightData):
    update_flight(flight_id, flight)
    return {"message": "Flight updated successfully"}

@router.get('/get_flight_by_flight_number/{flight_number}')
async def get_flight_by_flight_number_endpoint(flight_number: str):
    get_flight_by_flight_number(flight_number)
    return {"message": f"Getting flight with flight number {flight_number}"}

@router.get('/get_all_flights/')
async def get_all_flights_endpoint():
    all_flights = get_all_flights()
    print(f"Getting all flights ")
    return all_flights
