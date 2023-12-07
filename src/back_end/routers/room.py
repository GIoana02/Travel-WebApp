import os

from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from src.back_end.models.room import Room
from src.database.hotel_database.room_db import add_room,update_room_image_in_database,update_room_availability, update_room, delete_room, get_room_by_id

router = APIRouter(prefix="/hotels/rooms", tags=["Rooms"])
IMAGES_DIRECTORY = "src/images/rooms_img"


@router.get("/{room_id}")
async def get_room(room_id: int):
    room = get_room_by_id(room_id)
    if room:
        return room
    else:
        raise HTTPException(status_code=404, detail="Room not found")



@router.put("/make-reservation/{room_id}")
async def make_reservation(room_id: int, user_info: str, reservation_duration: str):
    # Assuming you receive some input for reservation handling,
    # like user information, reservation duration, etc.
    # Here, I'm assuming it's a simple flag to reserve the room
    # Adjust this logic according to your reservation process
    # For now, I'll set it as 'is_reserved'
    is_reserved = True

    # Update room availability based on reservation status
    update_room_availability(room_id, availability=not is_reserved)

    return {
        "message": f"Room {room_id} reservation status updated.",
        "user_info": user_info,
        "reservation_duration": reservation_duration
    }

image_counter = 1


