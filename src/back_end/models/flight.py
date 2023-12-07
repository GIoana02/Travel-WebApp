from pydantic import BaseModel
class Flight(BaseModel):
    flight_id: int
    airline: str
    flight_number: str
    departure_airport: str
    departure_city: str
    departure_time: str
    arrival_airport: str
    arrival_city: str
    arrival_time: str
    duration: str
    price: str
    available_seats: str
    aircraft_type: str
    flight_class: str
    stopovers: str
    booking_info: str
    images: str