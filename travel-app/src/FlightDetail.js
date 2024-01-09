import React, { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom';
import api from './api';
import logoImage from "./images/logo0.png"
import {logoutUser} from "./logout_function";

const FlightDetail = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const [flightData, setFlightData] = useState(null);

  useEffect(() => {
    const fetchFlightData = async () => {
      try {
        const flightNumber = decodeURIComponent(location.pathname.split('/').pop());
        const response = await api.get(`/flights/flight_by_flight_number/${flightNumber}`);
        if (response.data) {
          setFlightData(response.data); // Assuming the response contains flight data
        } else {
          throw new Error('Flight data not found');
        }
      } catch (error) {
        console.error('Error fetching flight data:', error);
      }
    };

    fetchFlightData();
  }, [location.pathname]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token); // Set to true if token exists, otherwise false
      }, []);

      const handleLogout = async () => {
        await logoutUser();
        setIsLoggedIn(false); // Update state to reflect logged out status
      };

      return (
    <div>
        <div className="header1">
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
            <div className="flight-content">
  {flightData ? (
    <div>

      <div className="flight-main-details-test">
        <h1>{flightData[4]} -> {flightData[7]}</h1> {/* Flight name or number */}
      </div>

      <div className="flight-main-details">
        <div className="flight-description-group">
          <p><strong>Departure Airport: </strong> {flightData[3]}</p>
            <p><strong>Arrival Airport: </strong> {flightData[6]}</p>
        </div>

        <div className="flight-info-group">
          <p><strong>Airline: </strong> {flightData[1]}</p>
          <p><strong>Departure City: </strong> {flightData[4]}</p>
          <p><strong>Departure Time: </strong> {flightData[5]}</p>
        </div>

        <div className="flight-reviews-group">
          <p><strong>Arrival City: </strong> {flightData[7]}</p>
          <p><strong>Arrival Time: </strong> {flightData[8]}</p>
          {/* Add more details */}
        </div>

        <div className="flight-rooms-group">
          <p><strong>Duration: </strong> {flightData[9]}</p>
          <p><strong>Price: </strong> {flightData[10]}</p>
        </div>

        <div className="flight-time-group">
          <p><strong>Available Sits: </strong> {flightData[11]}</p>
          <p><strong>Aircraft Type: </strong> {flightData[12]}</p>
          {/* Adjust according to flight data */}
        </div>

        <div className="flight-booking-group">
          <p><strong>Flight Class:</strong> {flightData[13]}</p>
          <p><strong>Stopovers:</strong> {flightData[14]}</p>
          {/* Adjust as needed */}
        </div>

        {/* Add additional information as needed */}
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  )}
</div>

            <div className="container">
                <div className="footer">
                    <a href="https://facebook.com/"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="https://instagram.com/"><i className="fa-brands fa-instagram"></i></a>
                    <hr />
                    <p>Copyright © 2023, Trip Planner.</p>
                </div>
            </div>
        </div>
    </div>
);
};

export default FlightDetail;