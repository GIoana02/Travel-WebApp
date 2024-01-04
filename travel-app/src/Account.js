import { Link } from 'react-router-dom';
import logoImage from "./images/logo0.png";
import React, { useState, useEffect } from 'react';
import {
    deleteFavoriteFlight, deleteFavoriteHotel,
    fetchFavoriteFlights,
    fetchFavoriteHotels,
    fetchPreviousTrips,
    getUserInfo
} from "./UserInfoFetch";

const Account = () => {
    const [userInfo, setUserInfo] = useState(null);

    const [trips, setTrips] = useState([]);
  const [flights, setFlights] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [deleteFlightNumber, setDeleteFlightNumber] = useState('');
  const [deleteHotelName, setDeleteHotelName] = useState('');
    const [activeSection, setActiveSection] = useState('general');

    const switchSection = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    fetchPreviousTrips().then(setTrips).catch(console.error);
    fetchFavoriteFlights().then(setFlights).catch(console.error);
    fetchFavoriteHotels().then(setHotels).catch(console.error);
  }, []);
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
      // Handle error, e.g., redirect to login page
    });
  }, []);
return (
    <div>
        <div className="header1">
            <nav id="navbar" className="nav-white">
                <Link to="/"><img src={logoImage} className="logo0" alt="Logo"/></Link>
                <ul className="nav-links">
                    <li><Link to="/">HOME</Link></li>
                    <li><Link to="/Offers">OFFERS</Link></li>
                    <li><Link to="/Orders">ORDERS</Link></li>
                    <li><Link to="/Favorites">FAVORITES</Link></li>
                    <li><Link to="/Account">ACCOUNT</Link></li>  
                </ul>
                <Link to="/Login" className="register-btn">Log In</Link>
            </nav>
                <div className="account-container">
      <div className="account-nav">
        <button onClick={() => switchSection('general')}>General</button>
        <button onClick={() => switchSection('previous')}>Previous Trips</button>
        <button onClick={() => switchSection('favorites')}>Favorites</button>
      </div>

      {activeSection === 'general' && (
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

      {activeSection === 'previous' && (
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
                          <input
                            type="text"
                            placeholder="Enter flight number"
                            value={deleteFlightNumber}
                            onChange={handleFlightNumberChange}
                          />
                        <button onClick={() => handleDeleteFlight(deleteFlightNumber)}>Delete Flight</button>
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
                  <input
                    type="text"
                    placeholder="Enter hotel name"
                    value={deleteHotelName}
                    onChange={handleHotelNameChange}
                  />
                <button onClick={() => handleDeleteHotel(deleteHotelName)}>Delete Hotel</button>
              </div>
            ))
          ) : (
            <p>No favorite hotels found.</p>
          )}
          </div>
        </div>
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

export default Account;