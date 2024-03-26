import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Category {
  id: string;
  name: string;
}
export interface Product {
  id: string;
  title: string;
  price: number;
  categoryId: string;
  image: string;
  quantity: number;
}
export interface State {
  category: Category | null;
  categories: Category[];
  product: Product | null;
  products: Product[];
  productsToAdd: Product[];
  isAddCategory: boolean;
  loading: boolean;
  error: boolean;
}

const initialState: State = {
  category: null,
  categories: [],
  product: null,
  products: [],
  productsToAdd: [],
  isAddCategory: false,
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

export const addCategory = createAsyncThunk<
  void,
  Category,
  { rejectValue: string }
>('store/addCategory', async (category, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(
      'http://localhost:3001/categories',
      category,
    );

    return data;
  } catch (error) {
    return rejectWithValue('Server error!');
  }
});

export const editCategory = createAsyncThunk<
  Category,
  Category,
  { rejectValue: string }
>('store/editCategory', async (category, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(
      `http://localhost:3001/categories/${category.id}`,
      {
        id: category.id,
        name: category.name,
      },
    );
    console.log(data);

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
    updateProductsToAdd(state, action) {
      state.productsToAdd = action.payload;
    },
    setIsAddCategory(state, action) {
      state.isAddCategory = action.payload;
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
      })
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(editCategory.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const { setProductsToAdd, updateProductsToAdd, setIsAddCategory } =
  mainSlice.actions;

export default mainSlice.reducer;
