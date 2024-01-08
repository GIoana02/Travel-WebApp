import api from './api';

const fetchFlightsData = async (shouldFetch = true) => {
  if (!shouldFetch) {
    return [];
  }
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await api('/admin/get_all_flights/', {
      method: 'GET',
      headers: headers,
    });

    if (response.status !== 200) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching flights:', error);
    throw error; // Rethrow the error to handle in the calling function if needed
  }
};

export default fetchFlightsData;
