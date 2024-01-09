import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './api';
import logoImage from "./images/logo0.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as farHeart} from "@fortawesome/free-regular-svg-icons";
import {logoutUser} from "./logout_function";

const getAuthHeader = () => {

  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();
  const  [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await api.get('/flights/get_list_flights/');
        if (Array.isArray(response.data)) {
          setFlights(response.data);
        } else {
          throw new Error('Invalid data format received.');
        }
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, []);

    useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set to true if token exists, otherwise false
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setIsLoggedIn(false); // Update state to reflect logged out status
  };
  const handleFlightClick = (flightNumber) => {
    navigate(`/flight/${flightNumber}`);
  };

    const addFlightsToFavorites = async (flightNumber) => {
        try {
            const response = await api.post(`/user/add_favorite_flight?flight_no=${encodeURIComponent(flightNumber)}`,
                {}, // Empty body
                {
                    headers: getAuthHeader(),
                }
            );
            console.log(response.data.message); // or handle this message in the UI
        } catch (error) {
            console.error('Error adding hotel to favorites:', error);
        }
    };
  return (
  <div>
    <div className="header-pages">
      <nav id="navbar" className="nav-white-login">
        <Link to="/"><img src={logoImage} className="logo0" alt="Logo"/></Link>
            <ul className="nav-links">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/Flights">Flights</Link></li>
                  <li><Link to="/Hotels">Hotels</Link></li>
                  <li><Link to="/Cart">Cart</Link></li>
                  <li><Link to="/Account">Account</Link></li>
              </ul>
                {isLoggedIn ? (
                <button className="logout-btn" onClick={handleLogout}>Log Out</button>
              ) : (
                <Link to="/Login" className="register-btn">Log In</Link>
              )}
      </nav>
    </div>
    <div className="flights-view">
      <h1>Available flights: </h1>
      <div className="flights-list">
        {flights.length > 0 ? (
          flights.map((flight, index) => (
            <div key={index} className="flights-card" onClick={() => handleFlightClick(flight[2])}>
              <div className="flights_info">
                <div className="flights_title">
                  <h2>{flight[1]}</h2>
                  <h4>{flight[4]}</h4>
                  <p>{flight[7]}</p>
                </div>
                  <div className="hotel_details">
                    <p>{flight[3] } </p> -> <p> {flight[6]}</p>
                    <p> {flight[5]}</p>
                  </div>
                <div className="test">
                  <div className="icon-container">
                    <button className="favorite-button" onClick={(e) => { e.stopPropagation(); addFlightsToFavorites(flight[2]); }}>
                      <FontAwesomeIcon icon={farHeart} /> {/* Font Awesome Heart Icon */}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No flights found.</p>
        )}
      </div>
    </div>
  </div>
);

};

export default Flights;
