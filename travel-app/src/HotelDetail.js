import React, { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom';
import api from './api';
import logoImage from "./images/logo0.png";

const HotelDetail = () => {
  const location = useLocation();
  const [hotelData, setHotelData] = useState(null);

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        const hotelName = decodeURIComponent(location.pathname.split('/').pop());
        const response = await api.get(`/hotels/${hotelName}`);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setHotelData(response.data); // Assuming the response is an array with hotel data
        } else {
          throw new Error('Hotel data not found');
        }
      } catch (error) {
        console.error('Error fetching hotel data:', error);
      }
    };

    fetchHotelData();
  }, [location.pathname]);

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
    <div>
      {hotelData ? (
        <div>
          <h1>{hotelData[0]}</h1>
          <p>City: {hotelData[1]}</p>
          <p>Country: {hotelData[3]}</p>
          <p>Address: {hotelData[4]}</p>
          <p>Contact Phone: {hotelData[5]}</p>
          <p>Contact Email: {hotelData[6]}</p>
          <p>Description: {hotelData[7]}</p>
          <p>Rating: {hotelData[8]}</p>
          <p>Check-In Time: {hotelData[9]}</p>
          <p>Check-Out Time: {hotelData[10]}</p>
          <p>Amenities: {hotelData[11]}</p>
          <p>Room Types: {hotelData[12]}</p>
          <p>Room Prices: {hotelData[13]}</p>
          <p>Images: {hotelData[14]}</p>
          <p>Availability: {hotelData[15]}</p>
          <p>Booking Info: {hotelData[16]}</p>
          <p>Reviews: {hotelData[17]}</p>
          {/* Add additional information as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
         </div>
  );
};

export default HotelDetail;
