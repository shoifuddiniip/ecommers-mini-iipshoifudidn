import axios from 'axios';
import { API_URL } from './utils';

export const getUserProfile = async (token: string) => {
  const res = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
