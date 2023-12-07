import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logoImage from "./images/logo0.png"; // Update the path to your logo image
import api from "./api";

const Account = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get('/user'); // Adjust the endpoint to fetch user data
                setUserData(response.data); // Assuming response.data contains user information
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        // Perform logout action, e.g., clear user session, token, or perform API logout
        
        // For demonstration purposes, you can simulate logout by clearing user data
        setUserData(null);
    };

    return (
        <div>
            <nav id="navbar" className="nav-white">
            <Link to="/"><img src={logoImage} className="logo0" alt="Logo"/></Link>
                    <ul className="nav-links">
                        <li><Link to="/">HOME</Link></li>
                        <li><Link to="/Offers">OFFERS</Link></li>
                        <li><Link to="/Orders">ORDERS</Link></li>
                        <li><Link to="/Flights">FLIGHTS</Link></li>
                        <li><Link to="/Account">ACCOUNT</Link></li>
                    </ul>
                    <button onClick={handleLogout}>Logout</button>
            </nav>
            <div className="account-container">
                <h1>Account Information</h1>
                {userData ? (
                    <div className="user-details">
                        <p><strong>Name:</strong> {userData.name}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        {/* Add other user-related information */}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
};

export default Account;
