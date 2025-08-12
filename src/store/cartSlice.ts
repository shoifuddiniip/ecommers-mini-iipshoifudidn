
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getCart } from '../api/cartApi';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  qty: number;
  productId: number;
}
// Async thunk untuk fetch cart dari backend
export const fetchCartFromBackend = createAsyncThunk(
  'cart/fetchCart',
  async ({ userId, token }: { userId: string; token: string }) => {
    const data = await getCart(userId, token);
    return data as CartItem[];
  }
);

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const idx = state.items.findIndex(item => item.id === action.payload.id);
      if (idx >= 0) {
        state.items[idx].qty += action.payload.qty;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQty: (state, action: PayloadAction<{ id: string; qty: number }>) => {
      const idx = state.items.findIndex(item => item.id === action.payload.id);
      if (idx >= 0) {
        state.items[idx].qty = action.payload.qty;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCartFromBackend.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
