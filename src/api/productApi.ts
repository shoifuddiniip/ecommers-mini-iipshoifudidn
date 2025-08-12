import axios from 'axios';
import { API_URL } from './utils';

export const getProducts = async (search: string = '') => {
  const url = search
    ? `${API_URL}/products?search=${encodeURIComponent(search)}`
    : `${API_URL}/products`;
  const res = await axios.get(url);
  return res.data;
};
