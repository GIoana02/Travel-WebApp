import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logoImage from "./images/logo0.png";
import api from "./api";

const Hotels = () => {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await api.get('/hotels');
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
            <h1>Hotel List</h1>
            <div>
                {hotels.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Country</th>
                                <th>Address</th>
                                <th>Contact Phone</th>
                                <th>Contact Email</th>
                                <th>Description</th>
                                <th>Rating</th>
                                <th>Check-in Time</th>
                                <th>Check-out Time</th>
                                <th>Amenities</th>
                                <th>Room Types</th>
                                <th>Room Prices</th>
                                <th>Images</th>
                                <th>Availability</th>
                                <th>Booking Info</th>
                                <th>Reviews</th>
                                {/* Include other table headers accordingly */}
                            </tr>
                        </thead>
                        <tbody>
                            {hotels.map((hotelData, index) => (
                                <tr key={index}>
                                    {/* Map through each field in the hotelData array */}
                                    {hotelData.map((field, idx) => (
                                        <td key={idx}>{field}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                ) : (
                    <p>No hotels found.</p>
                )}
            </div>
        </div>
    );
};

export default Hotels;
