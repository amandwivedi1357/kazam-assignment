import axios from 'axios';

//const API_BASE_URL = 'https://kazam-backend-i2rk.onrender.com';
const API_BASE_URL = 'http://localhost:3000';

export const fetchAllTasks = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/fetchAllTasks`);
    return response.data.tasks || [];
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};