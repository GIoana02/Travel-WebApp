from pydantic import BaseModel
class Room(BaseModel):
    room_id: int
    hotel_id: int
    room_number: str
    room_type: str
    capacity: int
    price: float
    availability: bool
    amenities: str
    description: str
    images: str