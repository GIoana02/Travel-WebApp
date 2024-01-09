import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import logoImage from "./images/logo0.png";
import {logoutUser} from "./logout_function";
import api from "./api";

const Cart = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set to true if token exists, otherwise false

        if(token){
            fetchCartItems();
        }
    }, []);

    const fetchCartItems = async () => {
        try {
            const response = await api.get('/cart/items', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setCartItems(response.data);
        } catch (error) {
            console.error('Error fetching cart items:', error);
            // Handle error appropriately
        }
    };
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            // fetch user info and other data
        } else {
            setIsLoggedIn(false);
            navigate('/Login'); // Redirect to login page if no token
        }
    }, [navigate]);

  const handleLogout = async () => {
    await logoutUser();
    setIsLoggedIn(false); // Update state to reflect logged out status
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
            <div className="cart-container">
                    <h2>Cart Items</h2>
                   {cartItems.length > 0 ? (
                cartItems.map((item, index) => {
                    let details = item.reservation_details;

                    // Check if details is a string and parse it
                    if (typeof details === 'string') {
                        try {
                            details = JSON.parse(details);
                        } catch (e) {
                            console.error('Error parsing reservation details:', e);
                            return <div key={index}>Error loading details.</div>;
                        }
                    }
                    const isFlight = !isNaN(details[0]);

                    return (
                        <div key={index} className="cart-item">
                            {isFlight ? (
                                <div>
                                    <h3>Flight Number: {details[2]}</h3>
                                    <p>Departure: {details[3]} - {details[4]}</p>
                                    <p>Arrival: {details[6]} - {details[7]}</p>
                                    {/* Add other flight details as needed */}
                                </div>
                            ) : (
                                <div>
                                    <h3>Hotel Name: {details[0]}</h3>
                                    <p>Location: {details[1]}</p>
                                    <p>Country: {details[3]}</p>
                                    <p>Address: {details[4]}</p>
                                    {/* Add other hotel details as needed */}
                                </div>
                            )}
                        </div>
                        );
                    })
                ) : (
                    <p>Your cart is empty.</p>
                )}
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

export default Cart;