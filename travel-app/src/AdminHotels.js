import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from "./api";
import logoImage from "./images/logo0.png";
import useAdminCheck from "./CheckAdmin";
import fetchHotelsData from './FetchHotels';
import DeleteHotel from './DeleteHotel';
import FetchHotels from './FetchHotels';

function AdminHotels() {
  const isAdmin = useAdminCheck();
  const [hotelsData, setHotelsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hotel, setHotel] = useState({
    hotel_id: '',
    hotel_name: '',
    location_city: '',
    location_state: '',
    location_country: '',
    address: '',
    contact_phone: '',
    contact_email: '',
    description: '',
    rating: '',
    checkin_time: '',
    checkout_time: '',
    amenities: '',
    room_types: '',
    room_prices: '',
    images: '',
    availability: '',
    booking_info: '',
    reviews: '',
  });
  const [showHotelsOverlay, setShowHotelsOverlay] = useState(false);
  const [showHotelForm, setShowHotelForm] = useState(false);
  const [showDeleteHotel, setShowDeleteHotel] = useState(false);
  const [showHotelsList, setShowHotelsList] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHotel({ ...hotel, [name]: value });
  };

  const handleAddHotels = () => {
    setShowHotelForm(true);
    setShowDeleteHotel(false);
    setShowHotelsList(false);
  };

  const handleToggleDeleteHotel = () => {
    const isShowing = !showDeleteHotel;
    setShowDeleteHotel(isShowing);
    if (isShowing) {
      setShowHotelForm(false);
      setShowHotelsList(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      return;
    }

    try {
      const response = await api.post('/admin/add_hotel/', hotel, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Hotel added successfully:', response.data);
      // Handle success response
    } catch (error) {
      console.error('Error adding hotel:', error);
      // Handle error
    }
  };

  const handleSeeHotels = async () => {
    if (!showHotelsList) {
      setLoading(true);
      try {
        const data = await fetchHotelsData();
        setHotelsData(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    setShowHotelsList(!showHotelsList);
    setShowDeleteHotel(false);
    setShowHotelForm(false);
  };

  return (
    <div>
      <nav id="navbar" className="nav-white-login">
        <Link to="/"><img src={logoImage} className="logo0" alt="Logo"/></Link>
          <ul className="nav-links">
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/Offers">OFFERS</Link></li>
            <li><Link to="/Orders">ORDERS</Link></li>
            <li><Link to="/Favorites">FAVORITES</Link></li>
            <li><Link to="/Account">ACCOUNT</Link></li>
          </ul>
          <Link to="/Login" className="register-btn">Log Out</Link>
      </nav>
        <div className="admin-box">
          <nav className="hotels-navbar">
            <ul className="hotels-buttons">
              <li>
                  <button className="adminHotelsButton" onClick={handleAddHotels}>
                    <span className="buttonHotelsText">Add Hotels</span>
                  </button>
                </li>
                <li>
                  <button className="adminHotelsButton" onClick={handleToggleDeleteHotel}>
                    <span className="buttonHotelsText">Delete Hotels</span>
                  </button>
                </li>
                <li>
                  <button className="adminHotelsButton" onClick={handleSeeHotels}>
                    <span className="buttonHotelsText">See Hotels</span>
                  </button>
                </li>
            </ul>
          </nav>
            {showDeleteHotel && <DeleteHotel />}
            {showHotelsOverlay}
    <div className="hotel-container">
      {showHotelForm && (
      <div className="form-wrapper">
      <div className="hotels-form">
            <form id="AddHotelForm" className="hotels_form" onSubmit={handleSubmit}>
          <div className="hotel-form-section">
          <label className="hotel-label">
            Hotel Name:
            <input
              type="text"
              name="hotel_name"
              className="hotel-text-box"
              value={hotel.hotel_name}
              onChange={handleInputChange}

            />
          </label>
          </div>
          <div className="hotel-form-section">
            <label className="hotel-label">
            Location City:
              <input
                type="text"
                name="location_city"
                className="hotel-text-box"
                value={hotel.location_city}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="hotel-form-section">
          <label className="hotel-label">
          Location State:
            <input
              type="text"
              name="location_state"
              value={hotel.location_state}
              onChange={handleInputChange}
              className="hotel-text-box"
            />
          </label>
          </div>
          <div className="hotel-form-section">
            <label className="hotel-label">
            Location Country:
              <input
                type="text"
                name="location_country"
                value={hotel.location_country}
                onChange={handleInputChange}
                className="hotel-text-box"
              />
            </label>
          </div>
          <div className="hotel-form-section">
            <label className="hotel-label">
            Hotel Address:
              <input
                type="text"
                name="address"
                value={hotel.address}
                onChange={handleInputChange}
                className="hotel-text-box"
              />
            </label>
          </div>
          <div className="hotel-form-section">
          <label className="hotel-label">
          Contact Phone:
            <input
              type="text"
              name="contact_phone"
              value={hotel.contact_phone}
              onChange={handleInputChange}
              className="hotel-text-box"
            />
          </label>
          </div>
          <div className="hotel-form-section">
          <label className="hotel-label">
          Contact Email:
            <input
              type="text"
              name="contact_email"
              value={hotel.contact_email}
              onChange={handleInputChange}
              className="hotel-text-box"
            />
          </label>
          </div>
          <div className="hotel-form-section">
          <label className="hotel-label">
          Description:
            <input
              type="text"
              name="description"
              value={hotel.description}
              onChange={handleInputChange}
              className="hotel-text-box"
            />
          </label>
          </div>
          <div className="hotel-form-section">
            <label className="hotel-label">
            Rating:
              <input
                type="text"
                name="rating"
                value={hotel.rating}
                onChange={handleInputChange}
                className="hotel-text-box"
              />
            </label>
          </div>
          <div className="hotel-form-section">
            <label className="hotel-label">
            CheckIn Time:
              <input
                type="text"
                name="checkin_time"
                value={hotel.checkin_time}
                onChange={handleInputChange}
                className="hotel-text-box"
              />
            </label>
          </div>
          <div className="hotel-form-section">
            <label className="hotel-label">
            CheckOut Time:
              <input
                type="text"
                name="checkout_time"
                value={hotel.checkout_time}
                onChange={handleInputChange}
                className="hotel-text-box"
              />
            </label>
          </div>
          
          <div className="hotel-form-section">
            <label className="hotel-label">
            Amenities:
              <input
                type="text"
                name="amenities"
                value={hotel.amenities}
                onChange={handleInputChange}
                className="hotel-text-box"
              />
            </label>
          </div>
          <div className="hotel-form-section">
            <label className="hotel-label">
            Room Types:
              <input
                type="text"
                name="room_types"
                value={hotel.room_types}
                onChange={handleInputChange}
                className="hotel-text-box"
              />
            </label>
          </div>
          <div className="hotel-form-section">
            <label className="hotel-label">
            Room Prices:
              <input
                type="text"
                name="room_prices"
                value={hotel.room_prices}
                onChange={handleInputChange}
                className="hotel-text-box"
              />
            </label>
          </div>
          <div className="hotel-form-section">
            <label className="hotel-label">
            Availability:
              <input
                type="text"
                name="availability"
                value={hotel.availability}
                onChange={handleInputChange}
                className="hotel-text-box"
              />
            </label>
          </div>
          <div className="hotel-form-section">
            <label className="hotel-label">
              Booking Info:
              <input
                type="text"
                name="booking_info"
                value={hotel.booking_info}
                onChange={handleInputChange}
                className="hotel-text-box"
              />
            </label>
          </div>
          <div className="hotel-form-section">
            <label className="hotel-label">
            Reviews:
              <input
                type="text"
                name="reviews"
                value={hotel.reviews}
                onChange={handleInputChange}
                className="hotel-text-box"
              />
            </label>
          </div>
          <div className="hotel-form-section">
            <label className="hotel-label">
              Images:
              <input
                type="text"
                name="images"
                value={hotel.images}
                onChange={handleInputChange}
                className="hotel-text-box"
              />
            </label>
          </div>
          <button className="hotels_submit_button" type="submit">Submit</button>
        </form>
      </div>
          </div>
      )}
      {showHotelsList && !showDeleteHotel && hotelsData.length > 0 && (
          <div className="hotels-table">
            <table className="hotels-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Hotel Name</th>
                  <th>Location City</th>
                  <th>Location State</th>
                  <th>Location Country</th>
                  <th>Hotel Address</th>
                  <th>Contact Phone</th>
                  <th>Contact Email</th>
                  <th>Description</th>
                  <th>Rating</th>
                  <th>CheckIn Time</th>
                  <th>CheckOut Time</th>
                  <th>Amenities</th>
                  <th>Room Types</th>
                  <th>Room Prices</th>
                  <th>Availability</th>
                  <th>Booking Info</th>
                  <th>Reviews</th>
                  <th>Images</th>
                </tr>
              </thead>
              <tbody>
              {hotelsData.map((hotel, index) => (
                  <tr key={index}>
                  {Object.values(hotel).map((value, i) => (
          <td key={i}>{value}</td>
        ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      {!loading && !error && showHotelsList && !showDeleteHotel && hotelsData.length === 0 && (
      <p>No hotels available</p>
    )}
      </div>
    </div>
  </div>
);
}

export default AdminHotels;
