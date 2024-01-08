import React, { useState } from 'react';
import api from "./api";

const DeleteFlight = () => {
  const [flightNumber, setFlightNumber] = useState('');
  const [message, setMessage] = useState('');
  const [deletedFlight, setDeletedFlight] = useState(null);

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/admin/delete_flight/${flightNumber}`);
      setMessage(response.data.message);
      setDeletedFlight(flightNumber);
      setFlightNumber('');
    } catch (error) {
      console.error('Error deleting flight:', error);
      setMessage('Error deleting flight');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={flightNumber}
        className="flight-text-box"
        onChange={(e) => setFlightNumber(e.target.value)}
        placeholder="Enter Flight Number"
      />
      <button onClick={handleDelete}>Delete Flight</button>

      {message && <p>{message}</p>}
      {deletedFlight && <p>Flight {deletedFlight} has been deleted.</p>}
    </div>
  );
};

export default DeleteFlight;
