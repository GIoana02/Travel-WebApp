import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logoImage from "./images/logo0.png"; // Update the path to your logo image
import api from "./api";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await api.get('/orders'); // Adjust the endpoint to fetch user orders
                setOrders(response.data); // Assuming response.data contains an array of orders
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <nav id="navbar" className="nav-white">
                <Link to="/"><img src={logoImage} className="logo0" alt="Logo"/></Link>
                    <ul className="nav-links">
                        <li><Link to="/">HOME</Link></li>
                        <li><Link to="/Offers">OFFERS</Link></li>
                        <li><Link to="/Orders">ORDERS</Link></li>
                        <li><Link to="/Flights">FLIGHTS</Link></li>
                        <li><Link to="/Account">ACCOUNT</Link></li>
                    </ul>
            </nav>
            <div className="orders-container">
                <h1>Order History</h1>
                {orders.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Total Amount</th>
                                {/* Add other order-related headers */}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.order_id}</td>
                                    <td>{order.date}</td>
                                    <td>{order.total_amount}</td>
                                    {/* Add other order-related fields */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default Orders;
