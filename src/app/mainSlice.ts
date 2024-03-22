import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Category {
  id: number;
  name: string;
}
export interface Product {
  id: number;
  title: string;
  price: number;
  categoryId: number;
  image: string;
  quantity: number;
}
export interface State {
  category: Category | null;
  categories: Category[];
  product: Product | null;
  products: Product[];
  productsToAdd: Product[];
  loading: boolean;
  error: boolean;
}

const initialState: State = {
  category: null,
  categories: [],
  product: null,
  products: [],
  productsToAdd: [],
  loading: false,
  error: false,
};

export const getCategories = createAsyncThunk<
  Category[],
  undefined,
  { rejectValue: string }
>('store/getCategories', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('http://localhost:3001/categories');

    return data;
  } catch (error) {
    return rejectWithValue('Server error!');
  }
});

export const getProducts = createAsyncThunk<
  Product[],
  undefined,
  { rejectValue: string }
>('store/getProducts', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('http://localhost:3001/products');

    return data;
  } catch (error) {
    return rejectWithValue('Server error!');
  }
});

const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    setProductsToAdd(state, action) {
      state.productsToAdd.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      });
  },
});

export const { setProductsToAdd } = mainSlice.actions;

export default mainSlice.reducer;
