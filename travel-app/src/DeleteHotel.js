import React, { useState } from 'react';
import api from "./api";

const DeleteHotel = () => {
  const [hotelNumber, setHotelNumber] = useState('');
  const [message, setMessage] = useState('');
  const [deletedHotel, setDeletedHotel] = useState(null);

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/admin/delete_hotel/${hotelNumber}`);
      setMessage(response.data.message);
      setDeletedHotel(hotelNumber);
      setHotelNumber('');
    } catch (error) {
      console.error('Error deleting hotel:', error);
      setMessage('Error deleting hotel');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={hotelNumber}
        className="hotel-text-box"
        onChange={(e) => setHotelNumber(e.target.value)}
        placeholder="Enter Hotel Number"
      />
      <button onClick={handleDelete}>Delete Hotel</button>

      {message && <p>{message}</p>}
      {deletedHotel && <p>Hotel {deletedHotel} has been deleted.</p>}
    </div>
  );
};

export default DeleteHotel;
