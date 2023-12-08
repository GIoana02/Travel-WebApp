import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "./api";
import { Link } from 'react-router-dom';
import logoImage from "./images/logo0.png";

const Login = () => {
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
    const formData = new URLSearchParams(); // Create form data object
    formData.append('username', loginData.username);
    formData.append('password', loginData.password);

    const response = await api.post('/user/login', formData);

    if (response.status === 200) {
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      navigate('/Home');
    } else {
      console.error('Login failed');
    }
  } catch (error) {
    console.error('Error:', error);
  }
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
    <div className="account-page">
      <div className="form-container">
        <div className="form-btn">
          <span onClick={handleLogin}>Login</span>
          <hr id="Indicator" />
        </div>
        <form id="LoginForm" onSubmit={handleLogin}>
          <input
            type="text"
            id="loginUsername"
            name="username" // Add 'name' attribute
            placeholder="Username"
            value={loginData.username} // Connect value to state
            onChange={handleInputChange} // Connect onChange to update state
          />
          <input
            type="password"
            id="loginPassword"
            name="password" // Add 'name' attribute
            placeholder="Password"
            value={loginData.password} // Connect value to state
            onChange={handleInputChange} // Connect onChange to update state
          />
          <input type="submit" className="btn" value="Login" />
          <Link to="/">Forgot password</Link><br/>
          <Link to="/Register">Don't have an account? Register here.</Link>
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

export default Login;