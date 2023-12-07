from typing import List
from fastapi import APIRouter, HTTPException, UploadFile, Form, File
from src.database.hotel_database.hotel_db import get_all_hotels_admin, get_hotel_by_id

hrouter = APIRouter(prefix="/hotels", tags=["Hotels"])

@hrouter.get("/{hotel_id}")
async def get_hotel(hotel_name: str):
    hotel = get_hotel_by_id(hotel_name)
    if hotel:
        return hotel
    else:
        raise HTTPException(status_code=404, detail="Hotel not found")

@hrouter.get("/")
def admin_fetch_all_hotels() -> List[tuple]:
    hotels = get_all_hotels_admin()
    return hotels if hotels else []

