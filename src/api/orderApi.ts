import axios from 'axios';
import { API_URL } from './utils';

export const createOrder = async (orderPayload: any, token: string) => {
  const res = await axios.post(`${API_URL}/orders`, orderPayload, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getOrderDetail = async (orderId: string, token: string) => {
  const res = await axios.get(`${API_URL}/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const confirmPayment = async (orderId: string, paymentCode: string, token: string) => {
  const res = await axios.post(`${API_URL}/payments/confirm`, { orderId, paymentCode }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getOrders = async (userId: string, token: string) => {
  const res = await axios.get(`${API_URL}/orders?userId=${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
