import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from "./images/logo0.png";

const Account = () => {
return (
    <div>
        <div className="header1">
            <nav id="navbar" className="nav-white">
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
            <div class="account-page">
        
                <div className="container">
                    <div className="footer">
                        <a href="https://facebook.com/"><i className="fa-brands fa-facebook-f"></i></a>
                        <a href="https://instagram.com/"><i className="fa-brands fa-instagram"></i></a>
                        <hr />
                        <p>Copyright © 2023, Trip Planner.</p>
                    </div>
                </div>
            </div>    
        </div>
    </div>
);
};

export default Account;