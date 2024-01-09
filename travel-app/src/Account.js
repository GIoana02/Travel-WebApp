import { Link } from 'react-router-dom';
import logoImage from "./images/logo0.png";
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import {
    deleteFavoriteFlight, deleteFavoriteHotel,
    fetchFavoriteFlights,
    fetchFavoriteHotels,
    fetchPreviousTrips,
    getUserInfo
} from "./UserInfoFetch";
import {useNavigate} from "react-router-dom";
import {logoutUser} from "./logout_function";

const Account = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [trips, setTrips] = useState([]);
    const [flights, setFlights] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [deleteFlightNumber, setDeleteFlightNumber] = useState('');
    const [deleteHotelName, setDeleteHotelName] = useState('');
    const [activeSection, setActiveSection] = useState(null);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    fetchPreviousTrips().then(setTrips).catch(console.error);
    fetchFavoriteFlights().then(setFlights).catch(console.error);
    fetchFavoriteHotels().then(setHotels).catch(console.error);
  }, []);

  useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            // fetch user info and other data
        } else {
            setIsLoggedIn(false);
            navigate('/Login'); // Redirect to login page if no token
        }
    }, [navigate]);

  const handleLogout = async () => {
    await logoutUser();
    setIsLoggedIn(false); // Update state to reflect logged out status
  };
  const handleFlightNumberChange = (e) => {
    setDeleteFlightNumber(e.target.value);
  };

  const handleHotelNameChange = (e) => {
    setDeleteHotelName(e.target.value);
  };
  const handleDeleteFlight = (flightNo) => {
    deleteFavoriteFlight(flightNo).then(() => {
      setFlights(flights.filter(flight => flight.flightNo !== flightNo));
    }).catch(console.error);
  };

  const handleDeleteHotel = (hotelName) => {
    deleteFavoriteHotel(hotelName).then(() => {
      setHotels(hotels.filter(hotel => hotel.name !== hotelName));
    }).catch(console.error);
  };

  useEffect(() => {
    getUserInfo().then(data => {
      setUserInfo(data);
    }).catch(error => {
      console.error('Failed to fetch user info:', error);
      if (error.response && error.response.status === 401) {
        navigate('/Login');
      }
    });
  }, [navigate]);

  useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        if (token) {
            getUserInfo().then(data => {
                setUserInfo(data);
            }).catch(error => {
                console.error('Failed to fetch user info:', error);
                if (error.response && error.response.status === 401) {
                    navigate('/Login');
                }
            });
        }
    }, [navigate]);

    const switchSection = async (section) => {
        setActiveSection(section);
        if (section === 'previous') {
            fetchPreviousTrips().then(setTrips).catch(console.error);
        } else if (section === 'favorites') {
            fetchFavoriteFlights().then(setFlights).catch(console.error);
            fetchFavoriteHotels().then(setHotels).catch(console.error);
        }
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
            <div className="account-box">
            <nav className="account-navbar">
              <ul className="account-buttons">
                <li>
                    <button className="AccountButton" onClick={() => switchSection('general')}>
                      <span className="buttonAccountText">General</span>
                    </button>
                  </li>
                  <li>
                    <button className="AccountButton" onClick={() => switchSection('previous') }>
                      <span className="buttonAccountText">Previous Trips</span>
                    </button>
                  </li>
                  <li>
                    <button className="AccountButton" onClick={() => switchSection('favorites') }>
                      <span className="buttonAccountText">Favourites</span>
                    </button>
                  </li>
              </ul>
            </nav>

                <div className="account-container">
                  {activeSection === 'general' && userInfo && (
                    <div className="general-info">
                          <h2>User Information</h2>
                    {userInfo ? (
                      <div>
                        <p>Name: {userInfo[1]}</p>
                        <p>Email: {userInfo[2]}</p>
                        <p>Role: {userInfo[4]}</p>
                      </div>
                    ) : (
                      <p>Loading user information...</p>
                    )}
                    </div>
                  )}

                  {activeSection === 'previous' && trips &&(
                    <div className="previous-trips">
                          <h2>Previous Trips</h2>
                    {trips.length > 0 ? (
                      trips.map(trip => (
                        <div key={trip.id}>
                          <p>Trip to: {trip.destination}</p>
                          <p>Date: {trip.date}</p>
                          {/* Add more details as necessary */}
                        </div>
                      ))
                    ) : (
                      <p>No previous trips found.</p>
                    )}
                    </div>
                  )}

                  {activeSection === 'favorites' && (
                    <div className="favorite-section">
                      <div className="favorite-flights">
                          <h3>Favorite Flights</h3>
                              {flights.length > 0 ? (
                                flights.map(flight => (
                                  <div key={flight[0]}>
                                    <p>Flight Number: {flight[2]}</p>
                                      <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeleteFlight(flight[2])} />
                                  </div>
                                ))
                              ) : (
                                <p>No favorite flights found.</p>
                              )}
                        </div>
                      <div className="favorite-hotels">
                        <h3>Favorite Hotels</h3>
                                {hotels.length > 0 ? (
                        hotels.map(hotel => (
                          <div key={hotel[0]}>
                            <p>Hotel Name: {hotel[2]}</p>
                              <FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeleteHotel(hotel[2])} />cd
                          </div>
                        ))
                      ) : (
                        <p>No favorite hotels found.</p>
                      )}
                      </div>
                    </div>
                  )}
                </div>
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

export default Account;