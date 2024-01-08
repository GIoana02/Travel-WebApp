from typing import List
from src.back_end.routers.login import get_current_user
from src.database.user_database.user_database import (
    get_all_reservations_admin, get_user_reservations,
    add_reservation_user, update_reservation_user, delete_reservation_user
)
from src.back_end.models.reservation import Reservation
from fastapi import APIRouter, HTTPException, Depends, Cookie

router = APIRouter(prefix="/reservation", tags=["Reservations"])


@router.get("/", response_model=List[Reservation])
async def get_reservations(current_user: dict = Depends(get_current_user)):
    user_email = current_user["email"]
    reservations = get_user_reservations(user_email)
    if reservations is None:
        raise HTTPException(status_code=404, detail="Reservations not found for the user")
    return reservations

@router.post("/add", response_model=Reservation)
async def add_reservation(reservation: Reservation, current_user: dict = Depends(get_current_user)):
    user_email = current_user["email"]
    new_reservation = add_reservation_user(reservation.reservation_details, user_email)
    if new_reservation is None:
        raise HTTPException(status_code=500, detail="Error adding reservation")
    return new_reservation

@router.put("/{reservation_id}")
async def update_reservation(reservation_id: int, reservation: Reservation, current_user: dict = Depends(get_current_user)):
    user_email = current_user["email"]
    updated_reservation = update_reservation_user(reservation_id, user_email, reservation.reservation_details)
    if updated_reservation is None:
        raise HTTPException(status_code=404, detail="Reservation not found or does not belong to the user")
    return {"message": "Reservation updated successfully"}

@router.delete("/{reservation_id}")
async def delete_reservation(reservation_id: int, current_user: dict = Depends(get_current_user)):
    user_email = current_user["email"]
    result = delete_reservation_user(reservation_id, user_email)
    if result is None:
        raise HTTPException(status_code=404, detail="Reservation not found or does not belong to the user")
    return {"message": "Reservation deleted successfully"}


