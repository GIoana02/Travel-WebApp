from typing import List, Optional
from pydantic import BaseModel
from src.back_end.models.trip import Trip
from src.back_end.models.hotel import Hotel
from src.back_end.models.flight import Flight
class UserPhoto(BaseModel):
    # Define attributes related to user photo (e.g., image URL, path, etc.)
    photo_url: str

class UserAccount(BaseModel):
    # Personal information
    name: str
    email: str
    phone_number: str
    password: str  # You might want to consider using a more secure way to handle passwords

    # Additional user details
    user_photo: Optional[UserPhoto] = None  # User photo can be optional
    previous_trips: List[Trip] = []  # List of previous trips taken by the user
    favorite_hotels: List[Hotel] = []  # List of favorite hotel IDs
    favorite_flights: List[Flight] = []  # List of favorite flight IDs