import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import api from "./api";
import logoImage from "./images/logo0.png"; // Assuming React Router is being used
import useAdminCheck from "./CheckAdmin";
import fetchFlightsData from './FetchFlights';
function AdminFlights() {
  const isAdmin = useAdminCheck();
  const [flightsData, setFlightsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [flight, setFlight] = useState({
    airline: '',
    flight_number: '',
    departure_airport: '',
    departure_city: '',
    departure_time: '',
    arrival_airport: '',
    arrival_city: '',
    arrival_time: '',
    duration: '',
    price: '',
    available_seats: '',
    aircraft_type: '',
    flight_class: '',
    stopovers: '',
    booking_info: '',
    images: ''
  });
  const [showFlightsOverlay, setShowFlightsOverlay] = useState(false);
  const [showFlightForm, setShowFlightForm] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFlight({ ...flight, [name]: value });
  };

  const handleAddFlights = async () => {
    setShowFlightForm(true);
    setShowFlightsOverlay(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      return;
    }

    try {
      const response = await api.post('/admin/add_flight/', flight, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Flight added successfully:', response.data); // Handle success response
    } catch (error) {
      console.error('Error adding flight:', error);
      // Handle error
    }
  };

  const handleSeeFlights = async () => {
    setLoading(true);
    try {
      const data = await fetchFlightsData(); // Call the fetchFlightsData function from the separate file
      setFlightsData(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSeeFlights(); // Invoke the function to fetch data when component mounts
  }, []);


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
            <Link to="/Login" className="register-btn">Log In</Link>
        </nav>
          <div className="admin-box">
            <nav className="flights-navbar">
              <ul className="flights-buttons">
                <li>
                    <button className="adminFlightsButton" onClick={handleAddFlights}>
                      <span className="buttonFlightsText">Add Flights</span>
                    </button>
                  </li>
                  <li>
                    <button className="adminFlightsButton" >
                      <span className="buttonFlightsText">Delete Flights</span>
                    </button>
                  </li>
                  <li>
                    <button className="adminFlightsButton" onClick={handleSeeFlights}>
                      <span className="buttonFlightsText">See Flights</span>
                    </button>
                  </li>
              </ul>
            </nav>

              {showFlightsOverlay}
      <div className="flight-container">
        {showFlightForm ? (
        <div className="form-wrapper">
        <div className="fligths-form">
              <form id="AddFlightForm" className="fligths_form" onSubmit={handleSubmit}>
            <div className="flight-form-section">
            <label className="fligt-label">
              Airline:
              <input
                type="text"
                name="airline"
                className="flight-text-box"
                value={flight.airline}
                onChange={handleInputChange}

              />
            </label>
            </div>
            <div className="flight-form-section">
              <label className="fligt-label">
                Flight Number:
                <input
                  type="text"
                  name="flight_number"
                  className="flight-text-box"
                  value={flight.flight_number}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div className="flight-form-section">
            <label className="fligt-label">
              Departure Airport:
              <input
                type="text"
                name="departure_airport"
                value={flight.departure_airport}
                onChange={handleInputChange}
                className="flight-text-box"
              />
            </label>
            </div>
            <div className="flight-form-section">
              <label className="fligt-label">
                Departure City:
                <input
                  type="text"
                  name="departure_city"
                  value={flight.departure_city}
                  onChange={handleInputChange}
                  className="flight-text-box"
                />
              </label>
            </div>
            <div className="flight-form-section">
              <label className="fligt-label">
                Departure Time:
                <input
                  type="text"
                  name="departure_time"
                  value={flight.departure_time}
                  onChange={handleInputChange}
                  className="flight-text-box"
                />
              </label>
            </div>
            <div className="flight-form-section">
            <label className="fligt-label">
              Arrival Airport:
              <input
                type="text"
                name="arrival_airport"
                value={flight.arrival_airport}
                onChange={handleInputChange}
                className="flight-text-box"
              />
            </label>
            </div>
            <div className="flight-form-section">
            <label className="fligt-label">
              Arrival City:
              <input
                type="text"
                name="arrival_city"
                value={flight.arrival_city}
                onChange={handleInputChange}
                className="flight-text-box"
              />
            </label>
            </div>
            <div className="flight-form-section">
            <label className="fligt-label">
              Arrival Time:
              <input
                type="text"
                name="arrival_time"
                value={flight.arrival_time}
                onChange={handleInputChange}
                className="flight-text-box"
              />
            </label>
            </div>
            <div className="flight-form-section">
              <label className="fligt-label">
                Duration:
                <input
                  type="text"
                  name="duration"
                  value={flight.duration}
                  onChange={handleInputChange}
                  className="flight-text-box"
                />
              </label>
            </div>
            <div className="flight-form-section">
              <label className="fligt-label">
                Price:
                <input
                  type="text"
                  name="price"
                  value={flight.price}
                  onChange={handleInputChange}
                  className="flight-text-box"
                />
              </label>
            </div>
            <div className="flight-form-section">
              <label className="fligt-label">
                Available Seats:
                <input
                  type="text"
                  name="available_seats"
                  value={flight.available_seats}
                  onChange={handleInputChange}
                  className="flight-text-box"
                />
              </label>
            </div>
            <div className="flight-form-section">
              <label className="fligt-label">
                Aircraft Type:
                <input
                  type="text"
                  name="aircraft_type"
                  value={flight.aircraft_type}
                  onChange={handleInputChange}
                  className="flight-text-box"
                />
              </label>
            </div>
            <div className="flight-form-section">
              <label className="fligt-label">
                Flight Class:
                <input
                  type="text"
                  name="flight_class"
                  value={flight.flight_class}
                  onChange={handleInputChange}
                  className="flight-text-box"
                />
              </label>
            </div>
            <div className="flight-form-section">
              <label className="fligt-label">
                Stopovers:
                <input
                  type="text"
                  name="stopovers"
                  value={flight.stopovers}
                  onChange={handleInputChange}
                  className="flight-text-box"
                />
              </label>
            </div>
            <div className="flight-form-section">
              <label className="fligt-label">
                Booking Info:
                <input
                  type="text"
                  name="booking_info"
                  value={flight.booking_info}
                  onChange={handleInputChange}
                  className="flight-text-box"
                />
              </label>
            </div>
            <div className="flight-form-section">
              <label className="fligt-label">
                Images:
                <input
                  type="text"
                  name="images"
                  value={flight.images}
                  onChange={handleInputChange}
                  className="flight-text-box"
                />
              </label>
            </div>
            <button className="flights_submit_button" type="submit">Submit</button>
          </form>
        </div>
            </div>
        ): loading ? (
            <p>Loading flights...</p>
          ) : error ? (
            <p>Error fetching flights: {error.message}</p>
          ) : flightsData.length > 0 ? (
            <div className="flights-table">
              <table className="flights-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Airline</th>
                    <th>Flight Number</th>
                    <th>Departure Airport</th>
                    <th>Departure City</th>
                    <th>Departure Time</th>
                    <th>Arrival Airport</th>
                    <th>Arrival City</th>
                    <th>Arrival Time</th>
                    <th>Duration</th>
                    <th>Price</th>
                    <th>Available Seats</th>
                    <th>Aircraft Type</th>
                    <th>Flight Class</th>
                    <th>Stopovers</th>
                    <th>Booking Info</th>
                    <th>Images</th>
                  </tr>
                </thead>
                <tbody>
                {flightsData.map((flight, index) => (
                    <tr key={index}>
                    {Object.values(flight).map((value, i) => (
            <td key={i}>{value}</td>
          ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          ) : (
            <p>No flights available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminFlights;