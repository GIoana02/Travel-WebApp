from pydantic import BaseModel
class Hotel(BaseModel):
    hotel_id: int
    hotel_name: str
    location_city: str
    location_state: str
    location_country: str
    address: str
    contact_phone: str
    contact_email: str
    description: str
    rating: int
    checkin_time: str
    checkout_time: str
    amenities: str
    room_types: str
    room_prices: str
    images: str
    availability: str
    booking_info: str
    reviews: str