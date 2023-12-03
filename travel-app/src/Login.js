import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "./api";
import { Link } from 'react-router-dom';
import logoImage from "./images/logo0.png";

const LoginPage = ({ isLoggedIn, onLogin }) => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/user/login', loginData); 
      if (response.status === 200) {
        // Assuming successful login
        // Set user as logged in
        onLogin();
        // Redirect to another page (e.g., main page)
        navigate('/MainPage');
      } else {
        // Handle login failure (e.g., show error message)
        console.error('Login failed');
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
          <Link to="/Register" className="register-btn">Register Now</Link>
    </nav>
    <div className="account-page">
      <div className="form-container">
        <div className="form-btn">
          <span onClick={handleLogin}>Login</span>
          <hr id="Indicator" />
        </div>
        <form id="LoginForm" onSubmit={handleLogin}>
          <input type="text" id="loginUsername" placeholder="Username" />
          <input type="password" id="loginPassword" placeholder="Password" />
          <input type="submit" className="btn" value="Login" />
          <Link to="/">Forgot password</Link>
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

export default LoginPage;
