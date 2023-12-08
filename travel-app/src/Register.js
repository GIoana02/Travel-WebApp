import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "./api";
import { Link } from 'react-router-dom';
import logoImage from "./images/logo0.png";

const Register = () => {
  const [registrationData, setRegistrationData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({ ...registrationData, [name]: value });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    // Add your API call or registration logic here
    try {
      const response = await api.post('/user/register', registrationData);
      if (response.status === 200) {
        // Assuming successful registration
        // Redirect to login page or any other page
        navigate('/Home');
      } else {
        // Handle registration failure (e.g., show error message)
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <nav id="navbar" className="nav-white">
        <Link to="/Home"><img src={logoImage} className="logo0" alt="Logo"/></Link>
          <ul className="nav-links">
            <li><Link to="/Home">HOME</Link></li>
            <li><Link to="/Offers">OFFERS</Link></li>
            <li><Link to="/Orders">ORDERS</Link></li>
            <li><Link to="/Favorites">FAVORITES</Link></li>
            <li><Link to="/Account">ACCOUNT</Link></li>
          </ul>
          <Link to="/Register" className="register-btn">Register Now</Link>
    </nav>
    <div className="account-page">
      <div className="form-container">
        <div className="form-btn">
          <span onClick={handleRegistration}>Register</span>
          <hr id="Indicator" />
        </div>
        
        <form id="RegisterForm" onSubmit={handleRegistration}>
          <input
            type="text"
            id="registerUsername"
            name="username" // Add name attribute for mapping to state
            placeholder="Username"
            onChange={handleInputChange} // Add onChange event
          />
          <input
            type="email"
            id="registerEmail"
            name="email" // Add name attribute for mapping to state
            placeholder="Email"
            onChange={handleInputChange} // Add onChange event
          />
          <input
            type="password"
            id="registerPassword"
            name="password" // Add name attribute for mapping to state
            placeholder="Password"
            onChange={handleInputChange} // Add onChange event
          />
          <input type="submit" className="btn" value="Register" />
        </form>
      </div>
      <div className="footer">
            <Link to="https://facebook.com/"><i className="fa-brands fa-facebook-f"></i></Link>
            <Link to="https://instagram.com/"><i className="fa-brands fa-instagram"></i></Link>
            <hr />
            <p>Copyright © 2023, Trip Planner.</p>
          </div>
    </div>
  </div>
  );
};

export default Register;
