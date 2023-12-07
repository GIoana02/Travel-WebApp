import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logoImage from "./images/logo0.png";

const Hotels = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get('http://localhost:8000/docs#/Hotels');
                if (Array.isArray(response.data)) {
                    setHotels(response.data);
                } else {
                    console.error('Invalid data format received.');
                }
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };

        fetchHotels();
    }, []);

    return (
        <div>
            {/* ... (Your existing code) */}
            <div className="container">
                <div className="list-container">
                    <div className="left-col">
                        <h1>Recommended places:</h1>
                        {/* Check if hotels is an array before mapping */}
                        {Array.isArray(hotels) && hotels.length > 0 ? (
                            hotels.map((hotel, index) => (
                                <div className="hotels" key={index}>
                                    {/* Display hotel information */}
                                    {/* Modify this section to display hotel details */}
                                    <div className="hotels-img">
                                        <img src={`/src/images/hotels_img/${hotel.images}`} className="hotel-img" alt={hotel.hotel_name} />
                                    </div>
                                    <div className="hotels-info">
                                        <p>{hotel.hotel_name}</p>
                                        {/* Display other hotel details */}
                                        {/* Modify this section to display other hotel details */}
                                        <h2>{hotel.room_types}</h2>
                                        <p>{/* Other hotel details */}</p>
                                        <div className="hotels-price">
                                            {/*<p>{hotel.guests} Guests</p>*/}
                                            <h3>{hotel.room_prices} / night</h3>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No hotels found.</p>
                        )}
                    </div>
                </div>
                {/* ... (Your existing code) */}
            </div>
        </div>
    );
};

export default Hotels;
