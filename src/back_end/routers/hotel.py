import os
from typing import List
from fastapi import APIRouter, HTTPException, UploadFile, Form, File
from starlette.responses import FileResponse

from src.database.hotel_database.hotel_db import get_all_hotels, get_hotel_by_name, get_hotel_image_url

hrouter = APIRouter(prefix="/hotels", tags=["Hotels"])
HOTEL_IMAGES_DIRECTORY = "src/images/hotels_img"

@hrouter.get("/{hotel_name}")
async def get_hotel(hotel_name: str):
    hotel = get_hotel_by_name(hotel_name)
    if hotel:
        return hotel
    else:
        raise HTTPException(status_code=404, detail="Hotel not found")

@hrouter.get("/")
def admin_fetch_all_hotels() -> List[tuple]:
    hotels = get_all_hotels()
    return hotels if hotels else []

@hrouter.get("/display-image/{hotel_name}")
async def display_image(hotel_name: str):
    image_url = get_hotel_image_url(hotel_name)
    print(f"Image url recieved: {image_url}")
    if image_url:
        image_path = os.path.join(HOTEL_IMAGES_DIRECTORY, image_url.split('/')[-1])  # Extract filename from URL
        if os.path.exists(image_path):
            return FileResponse(image_path)
        else:
            raise HTTPException(status_code=404, detail="Image not found")
    else:
        raise HTTPException(status_code=404, detail="Image not found")

