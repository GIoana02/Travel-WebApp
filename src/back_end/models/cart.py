from pydantic import BaseModel
from typing import List, Optional
from src.back_end.models.hotel import Hotel
from src.back_end.models.trip import Trip
from src.back_end.models.flight import Flight
from src.back_end.models.reservation import Reservation
class Cart(BaseModel):
    cart_id: int
    hotels: List[Hotel] = []
    trips: List[Trip] = []
    flights: List[Flight] = []
#    reservations: List[Reservation] = []
