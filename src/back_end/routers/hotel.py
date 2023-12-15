from fastapi import APIRouter, HTTPException, UploadFile, Form, File
from src.database.hotel_database.hotel_db import get_all_hotels, get_hotel_by_id
from src.back_end.models.hotel import Hotel

router = APIRouter(prefix="/hotels", tags=["Hotels"])

@router.get("/hotel_by_hotel_id")
async def get_hotel_by_id(hotel_id: str):
    hotel = get_hotel_by_id(hotel_id)
    if hotel:
        return hotel
    else:
        raise HTTPException(status_code=404, detail="Hotel not found")

@router.get('/get_list_hotels')
async def get_all_hotels_endpoint():
    hotels = get_all_hotels()
    if hotels:
        return hotels
    else:
        return []

