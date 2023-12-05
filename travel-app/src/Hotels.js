import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from "./images/logo0.png";
import bbParis from "./images/B&B-Paris.png";

const Hotels = () => {
return (
    <div>
        <div className="header1">
            <nav id="navbar" className="nav-white">
                <Link to="/Home"><img src={logoImage} className="logo0" alt="Logo"/></Link>
                <ul className="nav-links">
                    <li><Link to="/Home">HOME</Link></li>
                    <li><Link to="/Offers">OFFERS</Link></li>
                    <li><Link to="/Orders">ORDERS</Link></li>
                    <li><Link to="/Favorites">FAVORITES</Link></li>
                    <li><Link to="/Account">ACCOUNT</Link></li>  
                </ul>
                <Link to="/Register" className="register-btn">Register Now</Link>
            </nav>
            <div className="container">
                <div className="list-container">
                    <div className="left-col">
                        <h1>Recommended places:</h1>
                        <div className="hotels">
                            <div className="hotels-img">
                                <img src={bbParis} className="Paris" alt="Paris" />
                            </div>
                            <div className="hotels-info">
                                <p>B&B HOTEL Paris Porte des Lilas</p>
                                <h2>Superior Double Room</h2>
                                <p>1 double bed / Air conditioning / Ensuite bathroom / Free WiFi</p>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-regular fa-star-half-stroke"></i>
                                <div className="hotels-price">
                                    <p>2 Guests</p>
                                    <h3>70$ / night</h3>
                                </div>
                            </div>
                        </div>    
                    </div>
                </div>
                <div className="right-col"></div>
                <div className="footer">
                    <a href="https://facebook.com/"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="https://instagram.com/"><i className="fa-brands fa-instagram"></i></a>
                    <hr />
                    <p>Copyright © 2023, Trip Planner.</p>
                </div>
            </div>
        </div>    
    </div>
);
};

export default Hotels;