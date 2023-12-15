import {Link, useNavigate} from "react-router-dom";
import React from "react";
import logoImage from "./images/logo0.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faPlane } from '@fortawesome/free-solid-svg-icons';
const AdminPannel = () => {
    const history = useNavigate();

    const redirectToFlights = () => {
    history("/AdminFlights");
    };

    const redirectToHotels = () => {
    history("/AdminHotels");
    };

    const redirectToUsers = () => {
    history("/AdminUsers");
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
            <Link to="/Login" className="register-btn">Log Out</Link>
        </nav>
          <div>
            <nav className="action-navbar">
          <button className="adminButton" onClick={redirectToFlights}>
            <span className="icon"><FontAwesomeIcon icon={faPlane} className="tilted-plane"/></span>
            <span className="text">Flights</span>
          </button>
          <button className="adminButton" onClick={redirectToHotels}>
            <span className="icon"><FontAwesomeIcon icon={faBuilding} /></span>
            <span className="text">Hotels</span>
          </button>
          <button className="adminButton" onClick={redirectToUsers}>
            <span className="icon"><FontAwesomeIcon icon={faUsers}/></span>
            <span className="text">Users</span>
          </button>
        </nav>
          </div>
      </div>
);
}

export default AdminPannel;