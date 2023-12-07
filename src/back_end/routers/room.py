from fastapi import APIRouter, HTTPException
from src.back_end.models.room import Room
from src.database.hotel_database.room_db import add_room, update_room, delete_room, get_room_by_id

router = APIRouter(prefix="/hotels/rooms", tags=["Rooms"])


@router.post("/rooms")
async def create_room(room: Room):
    try:
        add_room(room)
        return {"message": "Room added successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/rooms/{room_id}")
async def get_room(room_id: int):
    room = get_room_by_id(room_id)
    if room:
        return room
    else:
        raise HTTPException(status_code=404, detail="Room not found")


@router.put("/rooms/{room_id}")
async def update_room_info(room_id: int, room: Room):
    try:
        updated = update_room(room_id, room)
        if updated:
            return {"message": f"Room {room_id} updated successfully"}
        else:
            raise HTTPException(status_code=404, detail="Room not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.delete("/rooms/{room_id}")
async def delete_room_entry(room_id: int):
    try:
        deleted = delete_room(room_id)
        if deleted:
            return {"message": f"Room {room_id} deleted successfully"}
        else:
            raise HTTPException(status_code=404, detail="Room not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

