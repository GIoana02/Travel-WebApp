import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import logoImage from "./images/logo0.png";
import api from "./api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import {logoutUser} from "./logout_function";


const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

const Hotels = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hotels, setHotels] = useState([]);
    const [hotelImages, setHotelImages] = useState({});
     const navigate = useNavigate();

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await api.get('/hotels/');  // Or use '/hotels' if the endpoint is different
                if (Array.isArray(response.data)) {
                    setHotels(response.data);
                    fetchHotelImages(response.data)
                } else {
                    console.error('Invalid data format received.');
                }
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };

        fetchHotels();
    }, []);

    useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set to true if token exists, otherwise false
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setIsLoggedIn(false); // Update state to reflect logged out status
  };


    const fetchHotelImages = async (hotels) => {
        const images = {};
        for (let hotel of hotels) {
            try {
                const response = await api.get(`/hotels/display-image/${encodeURIComponent(hotel[0])}`, { responseType: 'blob' });
                images[hotel[0]] = URL.createObjectURL(response.data);
            } catch (error) {
                console.error(`Error fetching image for hotel ${hotel[0]}:`, error);
                images[hotel[0]] = ''; // or a default image URL
            }
        }
        setHotelImages(images);
    };

    const handleHotelClick = (hotelName) => {
        // Redirect to a specific hotel page using hotel name
        navigate(`/hotels/${hotelName}`);
    };

    const addHotelToFavorites = async (hotelName) => {
    try {
        const response = await api.post(`/user/add_favorite_hotel?hotel_name=${encodeURIComponent(hotelName)}`,
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
    const addHotelToCart = async (hotelName) => {
    try {
        const response = await api.post(`/cart/add/hotel?hotel_name=${encodeURIComponent(hotelName)}`,
            {}, // Empty body
            {
                headers: getAuthHeader(),
            }
        );
        console.log(response.data.message); // Handle this message in the UI
    } catch (error) {
        console.error('Error adding hotel to cart:', error);
        // Handle error in the UI
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
            <div className="hotels-view">
            <h1>Recommended places: </h1>
                <div className="hotel-list">
                    {hotels.length > 0 ? (
                        hotels.map((hotel, index) => (
                            <div key={index} className="hotel-card" onClick={() => handleHotelClick(hotel[0])}>
                                <div className="hotels_info">
                                <img src={hotelImages[hotel[0]]} alt={`Image of ${hotel[0]}`} className="hotel-image" />
                                <div className="hotel_separator">
                                    <div className="hotel_title">
                                        <h2>{hotel[0]}</h2>
                                        <h4>{hotel[1]}, {hotel[2]}</h4>
                                        <p>{hotel[3]}</p>
                                    </div>
                                    <button className="reservation-button" onClick={(e) => {
                                            e.stopPropagation();
                                            addHotelToCart(hotel[0]);
                                        }}>
                                        Reserve
                                    </button>
                                    <div className="test">
                                    <div className="hotel_details">
                                        <p>{hotel[4]}</p>
                                        <p>Rating: {hotel[5]}</p>
                                        <p>Room Prices: {hotel[6]}</p>

                                    </div>

                                    <div className="icon-container">
                                            <button className="favorite-button" onClick={(e) => { e.stopPropagation(); addHotelToFavorites(hotel[0]); }}>
                                            <FontAwesomeIcon icon={farHeart} /> {/* Font Awesome Heart Icon */}
                                            </button>
                                        </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hotels found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Hotels;
