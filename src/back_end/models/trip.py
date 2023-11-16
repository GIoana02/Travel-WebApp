from pydantic import BaseModel


class Trip(BaseModel):
    # Define attributes related to a trip (e.g., trip ID, destination, dates, etc.)
    trip_id: int
    destination: str
    dates: str
