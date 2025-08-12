import axios from 'axios';
import { API_URL } from './utils';

export const getOrders = async (token: string) => {
  const res = await axios.get(`${API_URL}/orders`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
