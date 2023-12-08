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
import {React, useState} from "react";
import logoImage from "./images/logo0.png";
import hotelImg from "./images/hotel.png";
import flightImg from "./images/flights.png";
import fhImg from "./images/f&h.jpeg";
import "./App.css";
import {Link} from "react-router-dom";

const Home = () => {
    const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
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

  const navigate = useNavigate();

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
      <div className="header">
          <nav>
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
          <div className="container">
              <div className="text-box">
                  <h1>Let us be your guide to an unforgettable vacation!</h1>
                  <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faBed} className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPerson} className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
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
