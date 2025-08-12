

import React from 'react';
import { Box, Typography, Paper, Button, IconButton, Divider, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { IMAGE_URL } from '../utils/imageurl';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { removeFromCart, updateQty, fetchCartFromBackend, syncCartToBackend } from '../store/cartSlice';

const DELIVERY_FEE = 15;
const DISCOUNT_RATE = 0.2;

const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [promo, setPromo] = React.useState('');

  React.useEffect(() => {
    if (user.id && user.token) {
      dispatch(fetchCartFromBackend({ userId: user.id, token: user.token }));
    }
  }, [user.id, user.token, dispatch]);

  const handleQty = async (id: string, delta: number) => {
    const item = cart.find(i => i.id === id);
    if (!item) return;
    const newQty = Math.max(1, item.qty + delta);
    dispatch(updateQty({ id, qty: newQty }));
    // Sync ke backend
    if (user.id && user.token) {
      const updatedCart = cart.map(i =>
        i.id === id ? { ...i, qty: newQty } : i
      );
      dispatch(syncCartToBackend({ userId: user.id, items: updatedCart, token: user.token }));
    }
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
    // Sync ke backend
    if (user.id && user.token) {
      const updatedCart = cart.filter(i => i.id !== id);
      dispatch(syncCartToBackend({ userId: user.id, items: updatedCart, token: user.token }));
    }
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
                  <Typography fontWeight={700} fontSize={18} mt={1}>Rp{item.price.toLocaleString('id-ID')}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap={1}>
                  <IconButton onClick={() => handleQty(item.id, -1)}><RemoveIcon /></IconButton>
                  <Typography fontWeight={700}>{item.qty}</Typography>
                  <IconButton onClick={() => handleQty(item.id, 1)}><AddIcon /></IconButton>
                </Box>
                <IconButton onClick={() => handleRemove(item.id)} color="error" sx={{ ml: 2 }}>
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
            <Typography fontWeight={700}>Rp{subtotal.toLocaleString('id-ID')}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography>Discount (-20%)</Typography>
            <Typography color="error.main" fontWeight={700}>-Rp{discount.toLocaleString('id-ID')}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography>Delivery Fee</Typography>
            <Typography fontWeight={700}>Rp{DELIVERY_FEE.toLocaleString('id-ID')}</Typography>
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography fontWeight={700}>Total</Typography>
            <Typography fontWeight={900} fontSize={22}>Rp{total.toLocaleString('id-ID')}</Typography>
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
