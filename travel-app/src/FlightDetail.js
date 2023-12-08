import React, { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom';
import api from './api';
import logoImage from "./images/logo0.png"

const FlightDetail = () => {
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

return (
    <div>
        <div className="header1">
            <nav id="navbar" className="nav-white">
                <Link to="/"><img src={logoImage} className="logo0" alt="Logo"/></Link>
                <ul className="nav-links">
                    <li><Link to="/Home">HOME</Link></li>
                    <li><Link to="/Offers">OFFERS</Link></li>
                    <li><Link to="/Orders">ORDERS</Link></li>
                    <li><Link to="/Flights">FLIGHTS</Link></li>
                    <li><Link to="/Account">ACCOUNT</Link></li>
                </ul>
                <Link to="/Login" className="register-btn">Log In</Link>
            </nav>
            <div>
      {flightData ? (
        <div>
          <h1>{flightData[0]}</h1>
          <p>City: {flightData[1]}</p>
          <p>Country: {flightData[3]}</p>
          <p>Address: {flightData[4]}</p>
          <p>Contact Phone: {flightData[5]}</p>
          <p>Contact Email: {flightData[6]}</p>
          <p>Description: {flightData[7]}</p>
          <p>Rating: {flightData[8]}</p>
          <p>Check-In Time: {flightData[9]}</p>
          <p>Check-Out Time: {flightData[10]}</p>
          <p>Amenities: {flightData[11]}</p>
          <p>Room Types: {flightData[12]}</p>
          <p>Room Prices: {flightData[13]}</p>
          <p>Images: {flightData[14]}</p>
          <p>Availability: {flightData[15]}</p>
          <p>Booking Info: {flightData[16]}</p>
          <p>Reviews: {flightData[17]}</p>
          {/* Add additional information as needed */}
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