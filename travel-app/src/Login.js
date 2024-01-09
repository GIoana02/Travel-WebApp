import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from "./api";
import { Link } from 'react-router-dom';
import logoImage from "./images/logo0.png";
import {logoutUser} from "./logout_function";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set to true if token exists, otherwise false
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setIsLoggedIn(false); // Update state to reflect logged out status
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
    <div className="header-pages">
        <nav id="navbar" className="nav-white-login">
          <Link to="/"><img src={logoImage} className="logo0" alt="Logo"/></Link>
              <ul className="nav-links">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/Flights">Flights</Link></li>
                    <li><Link to="/Hotels">Hotels</Link></li>
                    <li><Link to="/Cart">Cart</Link></li>
                    <li><Link to="/Account">Account</Link></li>
                </ul>
                {isLoggedIn ? (
                  <button className="logout-btn" onClick={handleLogout}>Log Out</button>
                ) : (
                  <Link to="/Login" className="register-btn">Log In</Link>
                )}
        </nav>
    </div>
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