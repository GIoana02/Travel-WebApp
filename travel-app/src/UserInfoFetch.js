import api from "./api";

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
};

export { getAuthHeader };

export const getUserInfo = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await api.get('/user/info', { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

export const fetchPreviousTrips = async () => {
  try {
    const response = await api.get('/user/previous_trips', { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Error fetching previous trips:', error);
    throw error;
  }
};

export const addFavoriteFlight = async (flightNo) => {
  try {
    const response = await api.post('/user/add_favorite_flight', { flight_no: flightNo }, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Error adding favorite flight:', error);
    throw error;
  }
};

export const fetchFavoriteFlights = async () => {
  try {
    const response = await api.get('/user/favorite_flights', { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Error fetching favorite flights:', error);
    throw error;
  }
};

export const fetchFavoriteHotels = async () => {
  try {
    const response = await api.get('/user/favorite_hotels', { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Error fetching favorite hotels:', error);
    throw error;
  }
};

export const deleteFavoriteFlight = async (flightNo) => {
  try {
    const response = await api.delete(`/user/delete_favorite_flight/${flightNo}`, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Error deleting favorite flight:', error);
    throw error;
  }
};

export const deleteFavoriteHotel = async (hotelName) => {
  try {
    const response = await api.delete(`/user/delete_favorite_hotel/${hotelName}`, { headers: getAuthHeader() });
    return response.data;
  } catch (error) {
    console.error('Error deleting favorite hotel:', error);
    throw error;
  }
};