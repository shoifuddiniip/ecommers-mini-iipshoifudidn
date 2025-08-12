
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
    id: String(item.id), // id harus string sesuai backend
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
