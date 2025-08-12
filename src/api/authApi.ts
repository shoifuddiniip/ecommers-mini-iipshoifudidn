import axios from 'axios';
import { API_URL } from './utils';

export const login = async (username: string, password: string) => {
  const basicAuth = 'Basic ' + btoa(`${username}:${password}`);
  const res = await axios.post(`${API_URL}/login`, null, {
    headers: {
      Authorization: basicAuth,
      'Content-Type': 'application/json',
    },
  });
  return res.data;
};
