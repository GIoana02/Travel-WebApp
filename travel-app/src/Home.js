import {
    faBed,
    faCalendarDays,
    faCar,
    faPerson,
    faPlane,
    faTaxi,
  } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import "./headerSearch.css";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import {React, useEffect, useState} from "react";
import logoImage from "./images/logo0.png";
import hotelImg from "./images/home-hotels.jpg";
import flightImg from "./images/home-flights.jpg";
import fhImg from "./images/f&h.jpeg";
import "./App.css";
import {Link} from "react-router-dom";
import {logoutUser} from "./logout_function";
const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false);
    const navigate = useNavigate();
    const [date, setDate] = useState([
        {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set to true if token exists, otherwise false
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setIsLoggedIn(false); // Update state to reflect logged out status
  };
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options } });
  };
return (
    <div>
      <div className="header-home">
          <nav>
              <Link to="/"><img src={logoImage} className="logo0" alt="Logo"/></Link>
              <ul className="nav-links-home">
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
          <div className="container">

      <div className="bookings">
          <div className="text-box">
                  <h1>Let us be your guide to an unforgettable vacation!</h1>
                    <h1>Recommended Hotels & Flights</h1>
            </div>

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
        </div>
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

export default Home;
