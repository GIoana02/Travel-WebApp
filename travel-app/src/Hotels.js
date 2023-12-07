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
        <nav id="navbar" className="nav-white-login">
            <Link to="/"><img src={logoImage} className="logo0" alt="Logo"/></Link>
            <ul className="nav-links">
                <li><Link to="/">HOME</Link></li>
                <li><Link to="/Offers">OFFERS</Link></li>
                <li><Link to="/Orders">ORDERS</Link></li>
                <li><Link to="/Flights">FLIGHTS</Link></li>
                <li><Link to="/Account">ACCOUNT</Link></li>
            </ul>
            <Link to="/Login" className="register-btn">Log In</Link>
        </nav>
            <h1>Recommended places: </h1>
            <div>
                {hotels.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>City</th>
                                <th>Country</th>
                                <th>Address</th>
                                <th>Description</th>
                                <th>Rating</th>
                                <th>Room Prices</th>
                                {/* Include other table headers accordingly */}
                            </tr>
                        </thead>
                        <tbody>
                            {hotels.map((hotel, index) => (
                                <tr key={index}>
                                    <td>{hotel.hotel_name}</td>
                                    <td>{hotel.location_city}</td>
                                    <td>{hotel.location_country}</td>
                                    <td>{hotel.address}</td>
                                    <td>{hotel.description}</td>
                                    <td>{hotel.rating}</td>
                                    <td>{hotel.room_prices}</td>
                                    {/* Add column for image */}
                                   
                                    {/* Include other table cells for specific fields */}
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
