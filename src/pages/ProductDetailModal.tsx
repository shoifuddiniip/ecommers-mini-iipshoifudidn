
import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { IMAGE_URL } from '../utils/imageurl';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, syncCartToBackend } from '../store/cartSlice';
import { RootState, AppDispatch } from '../store';

interface ProductDetailModalProps {
  product: any;
  onClose: () => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const [qty, setQty] = React.useState(1);
  const maxQty = product.stock || 99;
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart.items);
  const handleCheckout = async () => {
    // Pastikan productId selalu ada dan bertipe number
    const productId = product.productId !== undefined ? product.productId : product.id;
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.size,
      color: product.color,
      qty,
      productId: Number(productId),
      userId: user.id,
    };
    // Buat array cart terbaru secara manual
    const existing = cart.find((item: any) => String(item.productId) === String(productId));
    let latestCart;
    if (existing) {
      latestCart = cart.map((item: any) =>
        String(item.productId) === String(productId)
          ? { ...item, qty: item.qty + qty }
          : item
      );
    } else {
      latestCart = [...cart, cartItem];
    }
    dispatch(addToCart(cartItem));
    if (user.id && user.token) {
      dispatch(syncCartToBackend({ userId: user.id, items: latestCart, token: user.token }));
    }
    onClose();
  };
  return (
    <Box>
      <img
        src={IMAGE_URL+product.image}
        alt={product.name}
        style={{ width: '100%', maxHeight: 320, objectFit: 'cover', borderRadius: 8, marginBottom: 20 }}
        loading="lazy"
      />
      <Typography variant="h4" fontWeight={700} mb={1}>{product.name}</Typography>
      <Typography color="text.secondary" mb={1}>{product.category}</Typography>
      <Typography variant="h5" color="primary" fontWeight={700} mb={2}>
        Rp {product.price?.toLocaleString()}
      </Typography>
      <Typography mb={2}>{product.description}</Typography>
      <Box display="flex" gap={2} mb={2}>
        <Typography variant="body2"><b>Color:</b> {product.color}</Typography>
        <Typography variant="body2"><b>Size:</b> {product.size}</Typography>
      </Box>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <Typography>Jumlah:</Typography>
        <input
          type="number"
          min={1}
          max={maxQty}
          value={qty}
          onChange={e => setQty(Math.max(1, Math.min(maxQty, Number(e.target.value))))}
          style={{ width: 60, borderRadius: 4, border: '1px solid #ccc', padding: 4 }}
        />
        <Typography color="text.secondary">(Stock: {maxQty})</Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{ borderRadius: 99, fontWeight: 700, mt: 2, width: '100%' }}
        disabled={product.stock === 0}
        onClick={handleCheckout}
      >
        {product.stock === 0 ? 'Out of Stock' : 'Checkout'}
      </Button>
    </Box>
  );
};

export default ProductDetailModal;
