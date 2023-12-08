from fastapi import APIRouter, HTTPException, Depends, Cookie
from src.back_end.models.flight import Flight
from src.database.flights_database.flight_db import update_flight, add_flight, get_all_flights, \
    get_flight_by_flight_number, delete_flight

router = APIRouter(prefix="/flights", tags=["Flights"])


@router.get('/flight_by_flight_number/{flight_number}')
async def get_flight_by_flight_number_endpoint(flight_number: str):
    flight = get_flight_by_flight_number(flight_number)
    print (f"Getting flight with flight number {flight_number}")
    return flight

@router.get('/get_list_flights/')
async def get_all_flights_endpoint():
    flights = get_all_flights()
    if flights:
        return flights
    else:
        return []
