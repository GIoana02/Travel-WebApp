import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from "./images/logo0.png";


const Register = () => {
  const [registrationData, setRegistrationData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({ ...registrationData, [name]: value });
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    
    console.log('Registration data:', registrationData);
  };

  return (
    <div>
      <nav id="navbar" className="nav-white-register">
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
      <div className="account-page">
        <div className="form-container">
          <div className="form-btn">
            <span>Register</span>
            <hr id="Indicator" />
          </div>
          <form id="RegisterForm" onSubmit={handleRegistration}>
            <input type="text" name="username" placeholder="Username" onChange={handleInputChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleInputChange} />
            <button type="submit" className="btnreg" value="Register">Register</button>
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
