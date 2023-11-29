import React, {useState,useEffect} from "react";
import api from "./api"
import logoImage from "./images/logo0.png";
import "./App.css";
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
      <a href="TravellingPlanner.html"><img src={logoImage} className="logo0" alt="Logo"/></a>
      <ul className="nav-links">
        <li><a href="TravellingPlanner.html">HOME</a></li>
        <li><a href="offers.html">OFFERS</a></li>
        <li><a href="orders.html">ORDERS</a></li>
        <li><a href="favorites.html">FAVORITES</a></li>
        <li><a href="account.html">ACCOUNT</a></li>
      </ul>
      <a href="account.html" className="register-btn">Register Now</a>
    </nav>
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
          <a href="#">Forgot password</a>
        </form>

        <form id="RegisterForm" onSubmit={handleRegistration}>
          <input type="text" id="registerUsername" placeholder="Username" />
          <input type="email" id="registerEmail" placeholder="Email" />
          <input type="password" id="registerPassword" placeholder="Password" />
          <input type="submit" className="btn" value="Register" />
        </form>
      </div>

      <div className="footer">
        <a href="https://facebook.com/"><i className="fa-brands fa-facebook-f"></i></a>
        <a href="https://instagram.com/"><i className="fa-brands fa-instagram"></i></a>
        <hr />
        <p>Copyright © 2023, Trip Planner.</p>
      </div>
    </div>
  </div>
);

}

export default App;
