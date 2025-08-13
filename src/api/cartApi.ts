
import axios from 'axios';
import { API_URL } from './utils'

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
    id: item.id, // id harus number sesuai backend
    productId: Number(item.productId),
  }));
  // Log payload sebelum request
  console.log('PUT /cart payload:', { userId, items: mappedItems });
  // Validasi jika array kosong
  if (mappedItems.length === 0) {
    alert('Cart kosong, tidak dapat mengirim ke backend.');
    return { error: 'Cart kosong' };
  }
  const res = await axios.put(
    `${API_URL}/cart`,
    { userId, items: mappedItems },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
