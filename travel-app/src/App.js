import {React, useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from "./Login"; // Import your login page component
import Register from "./Register"; // Import your registration page component
import Home from './Home';
import Hotels from './Hotels';
import Flights from './Flights'; 
import Offers from './Offers';
import Orders from './Orders';
import Account from './Account';
import AddImg from './AddImg';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Hotels" element={<Hotels />} />
        <Route path="/Flights" element={<Flights />} />
        <Route path="/Offers" element={<Offers />} />
        <Route path="/Orders" element={<Orders />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/AddImg" element={<AddImg />} />
        {/* Add more routes for other pages */}
      </Routes>
    </div>
  );
}

export default App;


