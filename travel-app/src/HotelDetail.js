import React, { useState, useEffect } from 'react';
import {Link, useLocation} from 'react-router-dom';
import api from './api';
import logoImage from "./images/logo0.png";
import {logoutUser} from "./logout_function";

const HotelDetail = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const [hotelData, setHotelData] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

    const fetchHotelImage = async (hotelName) => {
  try {
    // Make sure this URL is constructed correctly.
    // It should NOT be the full image URL, but the hotel name
    const response = await api.get(`/hotels/display-image/${encodeURIComponent(hotelName)}`, { responseType: 'blob' });
    setImageUrl(URL.createObjectURL(response.data));
  } catch (error) {
    console.error(`Error fetching image for hotel ${hotelName}:`, error);
    setImageUrl(''); // You can set a default image URL here if necessary
  }
};

   useEffect(() => {
  const fetchHotelData = async () => {
  try {
    const hotelName = decodeURIComponent(location.pathname.split('/').pop());
    const response = await api.get(`/hotels/${hotelName}`);
    if (response.data) {
      setHotelData(response.data);
      // Pass only the hotel name to fetch the image
      fetchHotelImage(hotelName); // Use hotelName instead of response.data[14]
    } else {
      throw new Error('Hotel data not found');
    }
  } catch (error) {
    console.error('Error fetching hotel data:', error);
  }
};


  fetchHotelData();
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
    <div className="hotel-content">
      {hotelData ? (
        <div>
            {imageUrl && <img src={imageUrl} className="hotel-main-image" alt={`Image of ${hotelData.hote_name}`} />}

                <div className="hotel-main-details-test">
                    <h1>{hotelData[0]}</h1>
                </div>
                <div className="hotel-main-details">
                <div className="hotel-description-group">
                    <p><strong>Description:</strong> {hotelData[7]}</p>
                    <p><strong>Amenities:</strong> {hotelData[11]}</p>

                </div>

                <div className="hotel-info-group">
                <p><strong>Location: </strong> {hotelData[1]}, {hotelData[3]}</p>
                <p><strong>Address: </strong> {hotelData[4]}</p>
                <p><strong>Contact: </strong> {hotelData[5]}, {hotelData[6]}</p>

                </div>
                <div className="hotel-reviews-group">
                  <p><strong>Rating: </strong> {hotelData[8]}</p>
                  <p><strong>Reviews: </strong> {hotelData[17]}</p>
                </div>

                <div className="hotel-rooms-group">
                  <p><strong>Room Types: </strong> {hotelData[12]}</p>
                  <p><strong>Room Prices: </strong> {hotelData[13]}</p>
                </div>

                <div className="hotel-time-group">
                    <p><strong>Check-In: </strong> {hotelData[9]}</p>
                    <p><strong>Check-Out: </strong> {hotelData[10]}</p>
                </div>

                <div className="hotel-booking-group">
                  <p><strong>Availability: </strong> {hotelData[15]}</p>
                  <p><strong>Booking Info: </strong> {hotelData[16]}</p>
                </div>

            </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
  );
};

export default HotelDetail;
