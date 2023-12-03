import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "./Login"; // Import your login page component
import Register from "./Register"; // Import your registration page component
import MainPage from './MainPage'; // Import your main page component

function App() {
  return (
    <div>
      <Routes>
        <Route path="/MainPage" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Add more routes for other pages */}
      </Routes>
    </div>
  );
}

export default App;



/*import React, {useState,useEffect} from "react";
import {Router, Routes, Route, Link} from "react-router-dom"
import api from "./api"
import logoImage from "./images/logo0.png";
import "./App.css";
import MainPage from "./MainPage.js";

function App() {

  const [registrationData, setRegistrationData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const handleRegistration = async () => {
    try {
      const response = await api.post('/user/register', registrationData);
      if (response.status === 200) {
        console.log(response.data); // Success message
      } else {
        console.error('Error:', response.data); // Error message
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await api.post('/user/login', loginData);
      if (response.status === 200) {
        console.log(response.data); // Success message
      } else {
        console.error('Error:', response.data); // Error message
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
      <div>
        <nav id="navbar" className="nav-white">
        <Link to="/MainPage"><img src={logoImage} className="logo0" alt="Logo"/></Link>
          <ul className="nav-links">
            <li><Link to="/MainPage">HOME</Link></li>
            <li><Link to="/Offers">OFFERS</Link></li>
            <li><Link to="/Orders">ORDERS</Link></li>
            <li><Link to="/Favorites">FAVORITES</Link></li>
            <li><Link to="/Account">ACCOUNT</Link></li>
          </ul>
          <Link to="/App" className="register-btn">Register Now</Link>
        </nav>
        <Routes>
          <Route path="/MainPage" element={<MainPage />} />
        </Routes>
        <div className="account-page">
          <div className="form-container">
            <div className="form-btn">
              <span onClick={handleLogin}>Login</span>
              <span onClick={handleRegistration}>Register</span>
              <hr id="Indicator" />
            </div>
            <form id="LoginForm" onSubmit={handleLogin}>
              <input type="text" id="loginUsername" placeholder="Username" />
              <input type="password" id="loginPassword" placeholder="Password" />
              <input type="submit" className="btn" value="Login" />
              <Link to="/">Forgot password</Link>
            </form>

            <form id="RegisterForm" onSubmit={handleRegistration}>
              <input type="text" id="registerUsername" placeholder="Username" />
              <input type="email" id="registerEmail" placeholder="Email" />
              <input type="password" id="registerPassword" placeholder="Password" />
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

}

export default App;
*/