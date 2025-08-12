
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getCart, updateCart } from '../api/cartApi';

// Interface CartItem sudah didefinisikan secara global di src/interface/items.d.ts
// Async thunk untuk fetch cart dari backend
export const fetchCartFromBackend = createAsyncThunk(
  'cart/fetchCart',
  async ({ userId, token }: { userId: string; token: string }) => {
    const data = await getCart(userId, token);
    return data as CartItem[];
  }
);

// Thunk untuk sync cart ke backend
export const syncCartToBackend = createAsyncThunk(
  'cart/syncCart',
  async ({ userId, items, token }: { userId: string; items: CartItem[]; token: string }) => {
    await updateCart(userId, items, token);
    return items;
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
      const idx = state.items.findIndex(item =>
        item.productId === action.payload.productId &&
        item.size === action.payload.size &&
        item.color === action.payload.color
      );
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
    builder.addCase(syncCartToBackend.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
