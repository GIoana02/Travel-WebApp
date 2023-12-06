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
    console.log('Login data:', loginData);
    /*try {
      const response = await api.post('/user/login', loginData); 
      if (response.status === 200) {
        // Assuming successful login
        // Set user as logged in
        onLogin();
        // Redirect to another page (e.g., main page)
        navigate('/');
      } else {
        // Handle login failure (e.g., show error message)
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }*/
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
          <input type="text" id="loginUsername" placeholder="Username" onChange={handleInputChange}/>
          <input type="password" id="loginPassword" placeholder="Password" onChange={handleInputChange}/>
          <input type="submit" className="btnlog" value="Login" />
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

export default LoginPage;