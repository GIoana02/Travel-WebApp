from pydantic import BaseModel
from typing import Dict

class Reservation(BaseModel):
    reservation_details: Dict[str, str]
