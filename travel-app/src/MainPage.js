import React from "react";
import logoImage from "./images/logo0.png";
import searchImg from "./images/search1.jpeg";
import hotelImg from "./images/hotel.png";
import flightImg from "./images/flights.png";
import fhImg from "./images/f&h.jpeg";
import "./App.css";
import {Link} from "react-router-dom"

const MainPage = () => {
return (
    <div>
      <div className="header">
          <nav>
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
          <div className="container">
              <div className="text-box">
                  <h1>Let us be your guide to an unforgettable vacation!</h1>
                  <div className="search-bar">
                      <form>
                          <div className="location-input">
                              <label>Location</label>
                              <input type="text" placeholder="Where are you going?"/>
                          </div>
                          <div>
                              <label>Check In</label>
                              <input type="text" placeholder="Choose date"/>
                          </div>
                          <div>
                              <label>Check Out</label>
                              <input type="text" placeholder="Choose date"/>
                          </div>
                          <div>
                              <label>Guests</label>
                              <input type="text" placeholder="Add no. of guests"/>
                          </div>
                          <button type="submit"><img src={searchImg} className="search1" alt="Search"/></button>
                      </form>
                  </div>
              </div>    
              
          </div>
      </div>
      
    
      <div className="bookings">
          <h1>Recommended Hotels & Flights</h1>
          <p>Don't miss your chance. Choose the one that suits you best!</p>
          <div className="categories">
            <div>
                <Link to="/Hotels" className="hotel-btn"><img src={hotelImg} className="hotel" alt="hotel"/></Link>
                <span>
                    <Link to="/Hotels" className="hotel-btn">
                    <h2>Book Hotel</h2>
                    <p>Starting from 50$</p></Link>
                </span>
            </div>
            <div>
                <Link to="/Flights" className="flights-btn"><img src={flightImg} className="flights" alt="flights"/></Link>
                <span>
                  <Link to="/Flights" className="flights-btn">
                  <h2>Book Flights</h2>
                  <p>Starting from 30$</p></Link>
                </span>
            </div>
            <div>
              <Link to="/Offers" className="hf-btn"><img src={fhImg} className="fh" alt="fh"/></Link>
              <span>
                <Link to="/Offers" className="hf-btn">
                <h2>View Offers</h2>
                <p>Starting from 150$/night</p></Link>
              </span>
            </div>
        </div>
    </div>

  
  <div className="about">
    <h3>About Trip Planner</h3>
    <p>Welcome to Trip Planner, your one-stop destination for hassle-free travel planning. 
        Whether you're dreaming of an exotic getaway, a business trip, or a quick weekend escape,
    <br />we're here to make your travel experience seamless and unforgettable.</p>
  </div>
  <div className="container">
    <div className="footer">
        <a href="https://facebook.com/"><i className="fa-brands fa-facebook-f"></i></a>
        <a href="https://instagram.com/"><i className="fa-brands fa-instagram"></i></a>
        <hr />
        <p>Copyright © 2023, Trip Planner.</p>
    </div>
  </div>
 </div>
);
};

export default MainPage;
