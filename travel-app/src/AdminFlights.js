import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import api from "./api";
import logoImage from "./images/logo0.png"; // Assuming React Router is being used

function decodeToken(token) {
  if (!token) {
    return null;
  }

  const tokenParts = token.split('.');

  if (tokenParts.length !== 3) {
    throw new Error('Invalid token format');
  }

  const payload = atob(tokenParts[1]);
  const decodedToken = JSON.parse(payload);
  return decodedToken;
}

function AdminFlights() {
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useNavigate();
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
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from wherever it's stored

    if (!token) {
      // Redirect the user to the login page if no token is found
      history.push('/login');
    } else {
      try {
        const decodedToken = decodeToken(token);
        // Check if the decoded token indicates the user is an admin
        if (decodedToken && decodedToken.role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          // Redirect to a different page or show a message for non-admin users
        }
      } catch (error) {
        console.error('Error decoding token:', error.message);
        // Handle token decoding error (e.g., redirect to login)
        history('/login');
      }
    }
  }, [history]);

  // Functions to handle admin-only endpoints
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFlight({ ...flight, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      // Prevent non-admin users from submitting the form
      return;
    }

    // Make API call to add_flight endpoint
    // Use proper API handling methods (fetch, axios, etc.) here
    try {
  const response = await api.post('/admin/add_flight/', flight, {
    headers: {
      'Content-Type': 'application/json',
      // Include authorization token in headers for authenticated requests
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  console.log('Flight added successfully:', response.data); // Handle success response
} catch (error) {
  console.error('Error adding flight:', error);
  // Handle error
}
  };



    const fetchAllFlights = async () => {
  if (!isAdmin) {
    // Prevent non-admin users from fetching flights
    return;
  }

  try {
    const response = await api.get('/admin/get_all_flights/', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });

    // Log the raw response to check its structure and contents
    console.error('Fetched flights:', response.data);

    // Transform the response data (array of arrays) into an array of objects
    const formattedFlights = response.data.map((flightArray) => {
      // Assuming the structure of each inner array matches the flight object keys
      return {
          airline: flightArray[1],
          flight_number: flightArray[2],
          departure_airport: flightArray[3],
          departure_city: flightArray[4],
          departure_time: flightArray[5],
          arrival_airport: flightArray[6],
          arrival_city: flightArray[7],
          arrival_time: flightArray[8],
          duration: flightArray[9],
          price: flightArray[10],
          available_seats: flightArray[11],
          aircraft_type: flightArray[12],
          flight_class: flightArray[13],
          stopovers: flightArray[14],
          booking_info: flightArray[15],
          images: flightArray[16]
      };
    });

    // Update the flights state with the formatted data
    setFlights(formattedFlights);
  } catch (error) {
    console.error('Error fetching flights:', error);
    // Handle error: Log the error or perform necessary actions
  }
};
    const handleSeeFlights = async () => {
        await fetchAllFlights(); // Fetch flights when the button is clicked
        setShowFlightsOverlay(true); // Show the flights container after fetching
      };

    const closeFlightsOverlay = () => {
    // Function to close the flights overlay
    setShowFlightsOverlay(false);
  };


    const renderFlightsOverlay = () => {
      return (
        <div className="flights-overlay">
          <div className="flights-info">
            <button onClick={closeFlightsOverlay} className="close-btn">
              Close
            </button>
            <h2>All Flights</h2>
            <div className="flights-list">
              {flights && flights.length > 0 ? (
                flights.map((flight, index) => (
                  <div key={index}>
                    <p>{flight.flight_number}</p>
                    <p>{flight.airline}</p>
                    {/* Display other flight information */}
                  </div>
                ))
              ) : (
                <p>No flights available</p>
              )}
            </div>
          </div>
        </div>
      );
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
            <Link to="/Login" className="register-btn">Log In</Link>
        </nav>
          <div>
            <nav className="action-navbar">
              <ul className="flights-navbar">
                <li><a href="#add_flights">Add Flights</a></li>
                <li><a href="#delete_flights">Delete Flights</a></li>
                <li><Link to="#" onClick={handleSeeFlights}>See Flights</Link></li>
              </ul>
            </nav>
              {showFlightsOverlay && renderFlightsOverlay()}
          </div>
        <div className="fligth_form">
              <form id="AddFlightForm" className="fligths_form" onSubmit={handleSubmit}>
            <div>
            <label className="label">
              Airline:
              <input
                type="text"
                name="airline"
                className="text_box"
                value={flight.airline}
                onChange={handleInputChange}

              />
            </label>
            </div>
            <div>
              <label className="label">
                Flight Number:
                <input
                  type="text"
                  name="flight_number"
                  className="text_box"
                  value={flight.flight_number}
                  onChange={handleInputChange}
                />
              </label>
            </div>
            <div>
            <label className="label">
              Departure Airport:
              <input
                type="text"
                name="departure_airport"
                value={flight.departure_airport}
                onChange={handleInputChange}
                className="text_box"
              />
            </label>
            </div>
            <div>
              <label className="label">
                Departure City:
                <input
                  type="text"
                  name="departure_city"
                  value={flight.departure_city}
                  onChange={handleInputChange}
                  className="text_box"
                />
              </label>
            </div>
            <div>
              <label className="label">
                Departure Time:
                <input
                  type="text"
                  name="departure_time"
                  value={flight.departure_time}
                  onChange={handleInputChange}
                  className="text_box"
                />
              </label>
            </div>
            <div>
            <label className="label">
              Arrival Airport:
              <input
                type="text"
                name="arrival_airport"
                value={flight.arrival_airport}
                onChange={handleInputChange}
                className="text_box"
              />
            </label>
            </div>
            <div>
            <label className="label">
              Arrival City:
              <input
                type="text"
                name="arrival_city"
                value={flight.arrival_city}
                onChange={handleInputChange}
                className="text_box"
              />
            </label>
            </div>
            <div>
            <label className="label">
              Arrival Time:
              <input
                type="text"
                name="arrival_time"
                value={flight.arrival_time}
                onChange={handleInputChange}
                className="text_box"
              />
            </label>
            </div>
            <div>
              <label className="label">
                Duration:
                <input
                  type="text"
                  name="duration"
                  value={flight.duration}
                  onChange={handleInputChange}
                  className="text_box"
                />
              </label>
            </div>
            <div>
              <label className="label">
                Price:
                <input
                  type="text"
                  name="price"
                  value={flight.price}
                  onChange={handleInputChange}
                  className="text_box"
                />
              </label>
            </div>
            <div>
              <label className="label">
                Available Seats:
                <input
                  type="text"
                  name="available_seats"
                  value={flight.available_seats}
                  onChange={handleInputChange}
                  className="text_box"
                />
              </label>
            </div>
            <div>
              <label className="label">
                Aircraft Type:
                <input
                  type="text"
                  name="aircraft_type"
                  value={flight.aircraft_type}
                  onChange={handleInputChange}
                  className="text_box"
                />
              </label>
            </div>
            <div>
              <label className="label">
                Flight Class:
                <input
                  type="text"
                  name="flight_class"
                  value={flight.flight_class}
                  onChange={handleInputChange}
                  className="text_box"
                />
              </label>
            </div>
            <div>
              <label className="label">
                Stopovers:
                <input
                  type="text"
                  name="stopovers"
                  value={flight.stopovers}
                  onChange={handleInputChange}
                  className="text_box"
                />
              </label>
            </div>
            <div>
              <label className="label">
                Booking Info:
                <input
                  type="text"
                  name="booking_info"
                  value={flight.booking_info}
                  onChange={handleInputChange}
                  className="text_box"
                />
              </label>
            </div>
            <div>
              <label className="label">
                Images:
                <input
                  type="text"
                  name="images"
                  value={flight.images}
                  onChange={handleInputChange}
                  className="text_box"
                />
              </label>
            </div>
            <button className="flights_submit_button" type="submit">Submit</button>
          </form>
        </div>
      </div>
);
}

export default AdminFlights;