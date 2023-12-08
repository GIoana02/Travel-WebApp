import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import logoImage from "./images/logo0.png";
import api from "./api";

const Hotels = () => {
    const [hotels, setHotels] = useState([]);
     const navigate = useNavigate();

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await api.get('/hotels/');  // Or use '/hotels' if the endpoint is different
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

    const handleHotelClick = (hotelName) => {
        // Redirect to a specific hotel page using hotel name
        navigate(`/hotels/${hotelName}`);
    };

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
                                 <tr key={index} onClick={() => handleHotelClick(hotel[0])}>
                                    <td>{hotel[0]}</td>
                                    <td>{hotel[1]}</td>
                                    <td>{hotel[2]}</td>
                                    <td>{hotel[3]}</td>
                                    <td>{hotel[4]}</td>
                                    <td>{hotel[5]}</td>
                                    <td>{hotel[6]}</td>
                                    {/* Access other properties in a similar way */}
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
