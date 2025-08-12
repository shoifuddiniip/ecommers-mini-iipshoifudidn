import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getProducts } from '../api/productApi';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  category: string;
  description: string;
  stock: number;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: '',
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (search: string = '') => {
    const data = await getProducts(search);
    return data as Product[];
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = 'Gagal mengambil data produk';
      });
  },
});

export default productSlice.reducer;
