
import axios from 'axios';
const API_URL = 'http://localhost:8000';


export const getCart = async (userId: string, token: string) => {
  const res = await axios.get(`${API_URL}/cart?userId=${userId}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};




// CartItem.productId harus number agar cocok dengan backend Go
export const updateCart = async (userId: string, items: CartItem[], token: string) => {
  const mappedItems = items.map(item => ({
    ...item,
    productId: Number(item.productId),
  }));
  const res = await axios.put(
    `${API_URL}/cart`,
    { userId, items: mappedItems },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
