import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from './api';
import logoImage from "./images/logo0.png";

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await api.get('/flights/get_list_flights/');
        if (Array.isArray(response.data)) {
          setFlights(response.data);
        } else {
          throw new Error('Invalid data format received.');
        }
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, []);

  const handleFlightClick = (flightNumber) => {
    navigate(`/flight/${flightNumber}`);
  };

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
      <h1>Flight List</h1>
      {flights.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Flight Number</th>
              <th>Departure City</th>
              <th>Arrival City</th>
              {/* Include other table headers */}
            </tr>
          </thead>
          <tbody>
            {flights.map((flight, index) => (
              <tr key={index} onClick={() => handleFlightClick(flight[2])}>
                <td>{flight[1]}</td>
                <td>{flight[4]}</td>
                <td>{flight[7]}</td>
                {/* Include other table cells for specific fields */}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No flights found.</p>
      )}
    </div>
  );
};

export default Flights;
