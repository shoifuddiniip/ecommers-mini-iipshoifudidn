import React, { useState } from 'react';
import { Box, Typography, Paper, Button, IconButton, Divider, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IMAGE_URL } from '../utils/imageurl';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  qty: number;
}

const DELIVERY_FEE = 15;
const DISCOUNT_RATE = 0.2;

const Cart: React.FC = () => {

  const [cart, setCart] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Gradient Graphic T-shirt',
      price: 145,
      image: 'tshirt1.png',
      size: 'Large',
      color: 'White',
      qty: 1
    },
    {
      id: '2',
      name: 'Checkered Shirt',
      price: 180,
      image: 'shirt1.png',
      size: 'Medium',
      color: 'Red',
      qty: 1
    },
    {
      id: '3',
      name: 'Skinny Fit Jeans',
      price: 240,
      image: 'jeans1.png',
      size: 'Large',
      color: 'Blue',
      qty: 1
    }
  ]);
  const [promo, setPromo] = useState('');

  const updateQty = (id: string, delta: number) => {
    setCart(prev => {
      const updated = prev.map(item =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      );
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeItem = (id: string) => {
    setCart(prev => {
      const updated = prev.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = Math.round(subtotal * DISCOUNT_RATE);
  const total = subtotal - discount + DELIVERY_FEE;

  return (
    <Box sx={{ maxWidth: 1100, mx: 'auto', mt: 4, mb: 6 }}>
      <Typography variant="subtitle2" color="text.secondary" mb={1}>Home {'>'} Cart</Typography>
      <Typography variant="h4" fontWeight={900} mb={3}>YOUR CART</Typography>
      <Box display="flex" gap={4} alignItems="flex-start">
        {/* Cart List */}
        <Paper sx={{ flex: 1, p: 3, borderRadius: 4 }}>
          {cart.length === 0 ? (
            <Typography color="text.secondary">Keranjang kosong.</Typography>
          ) : (
            cart.map(item => (
              <Box key={item.id} display="flex" alignItems="center" mb={3}>
                <img src={IMAGE_URL+item.image} alt={item.name} style={{ width: 90, height: 90, objectFit: 'cover', borderRadius: 12, marginRight: 24 }} />
                <Box flex={1}>
                  <Typography fontWeight={700}>{item.name}</Typography>
                  <Typography fontSize={15} color="text.secondary">Size: {item.size}</Typography>
                  <Typography fontSize={15} color="text.secondary">Color: {item.color}</Typography>
                  <Typography fontWeight={700} fontSize={18} mt={1}>${item.price}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <IconButton onClick={() => updateQty(item.id, -1)}><RemoveIcon /></IconButton>
                  <Typography fontWeight={700}>{item.qty}</Typography>
                  <IconButton onClick={() => updateQty(item.id, 1)}><AddIcon /></IconButton>
                </Box>
                <IconButton onClick={() => removeItem(item.id)} color="error" sx={{ ml: 2 }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))
          )}
        </Paper>
        {/* Order Summary */}
        <Paper sx={{ width: 340, p: 3, borderRadius: 4 }}>
          <Typography variant="h6" fontWeight={700} mb={2}>Order Summary</Typography>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography>Subtotal</Typography>
            <Typography fontWeight={700}>${subtotal}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography>Discount (-20%)</Typography>
            <Typography color="error.main" fontWeight={700}>-${discount}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography>Delivery Fee</Typography>
            <Typography fontWeight={700}>${DELIVERY_FEE}</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography fontWeight={700}>Total</Typography>
            <Typography fontWeight={900} fontSize={22}>${total}</Typography>
          </Box>
          <Box display="flex" gap={1} mb={2}>
            <TextField
              size="small"
              placeholder="Add promo code"
              value={promo}
              onChange={e => setPromo(e.target.value)}
              sx={{ flex: 1, bgcolor: '#f5f5f5', borderRadius: 2 }}
              InputProps={{ sx: { borderRadius: 2 } }}
            />
            <Button variant="contained" sx={{ borderRadius: 2, minWidth: 80 }}>Apply</Button>
          </Box>
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ borderRadius: 99, fontWeight: 700, fontSize: 18, py: 1.5 }}
          >
            Go to Checkout &rarr;
          </Button>
        </Paper>
      </Box>
    </Box>
  );
};

export default Cart;
