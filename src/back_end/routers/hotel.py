from fastapi import APIRouter, HTTPException
from src.back_end.models.hotel import Hotel
from src.database.hotel_database.hotel_db import add_hotel, get_hotel_by_id, update_hotel, delete_hotel

router = APIRouter(prefix="/hotels", tags=["Hotels"])

@router.post("/")
async def create_hotel(hotel: Hotel):
    try:
        added_hotel_id = add_hotel(hotel)
        return {"message": f"Hotel {added_hotel_id} added successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{hotel_id}")
async def get_hotel(hotel_name: str):
    hotel = get_hotel_by_id(hotel_name)
    if hotel:
        return hotel
    else:
        raise HTTPException(status_code=404, detail="Hotel not found")

@router.put("/{hotel_id}")
async def update_hotel_info(hotel_name: str, hotel: Hotel):
    try:
        updated = update_hotel(hotel_name, hotel)
        if updated:
            return {"message": f"Hotel {hotel_name} updated successfully"}
        else:
            raise HTTPException(status_code=404, detail="Hotel not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{hotel_id}")
async def delete_hotel_entry(hotel_name: str):
    try:
        deleted = delete_hotel(hotel_name)
        if deleted:
            return {"message": f"Hotel {hotel_name} deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Hotel not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))