import api from './api';

const fetchHotelsData = async (shouldFetch = true) => {
  if (!shouldFetch) {
    return [];
  }
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await api('/admin/get_all_hotels/', {
      method: 'GET',
      headers: headers,
    });

    if (response.status !== 200) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    throw error; // Rethrow the error to handle in the calling function if needed
  }
};

export default fetchHotelsData;
