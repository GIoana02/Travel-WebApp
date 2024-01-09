from typing import List
from src.database.user_database.user_database import (
    get_cart_items, add_hotel_to_cart, remove_from_cart, finalize_reservation, create_table, add_flight_to_cart
)
from src.back_end.routers.login import get_current_user
from src.back_end.models.cart import Cart
from fastapi import APIRouter, HTTPException, Depends, Cookie

router = APIRouter(prefix="/cart", tags=["Cart"])

@router.get("/items")
async def get_user_cart(current_user: dict = Depends(get_current_user)):
    user_email = current_user["email"]
    cart_items = get_cart_items(user_email)
    if cart_items is None:
        raise HTTPException(status_code=404, detail="Cart items not found")
    return cart_items

@router.post("/add/hotel")
async def add_hotel_item_to_cart(hotel_name: str, current_user: dict = Depends(get_current_user)):
    user_email = current_user["email"]
    result = add_hotel_to_cart(user_email, hotel_name)
    if not result:
        raise HTTPException(status_code=500, detail="Error adding item to cart")
    return {"message": "Item added to cart successfully"}

@router.post("/add/flight")
async def add_flight_item_to_cart(flight_no: str, current_user: dict = Depends(get_current_user)):
    user_email = current_user["email"]
    result = add_flight_to_cart(user_email, flight_no)
    if not result:
        raise HTTPException(status_code=500, detail="Error adding item to cart")
    return {"message": "Item added to cart successfully"}
@router.delete("/remove/{cart_id}")
async def remove_item_from_cart(cart_id: int, current_user: dict = Depends(get_current_user)):
    user_email = current_user["email"]
    result = remove_from_cart(cart_id, user_email)  # Modify remove_from_cart to check user_email
    if not result:
        raise HTTPException(status_code=404, detail="Error removing item from cart")
    return {"message": "Item removed from cart successfully"}

@router.post("/finalize/{cart_id}")
async def finalize_user_reservation(cart_id: int, current_user: dict = Depends(get_current_user)):
    user_email = current_user["email"]
    reservation_id = finalize_reservation(cart_id, user_email)  # Modify finalize_reservation to check user_email
    if reservation_id is None:
        raise HTTPException(status_code=500, detail="Error finalizing reservation")
    return {"message": f"Reservation with ID {reservation_id} finalized successfully"}
