import { createSlice } from '@reduxjs/toolkit';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
import toast from 'react-hot-toast';

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
  isAddCategory: boolean;
  isProductsChange: boolean;
  togglePrintModal: boolean;
  loading: boolean;
  error: boolean;
}

const initialState: State = {
  category: null,
  categories: [],
  product: null,
  products: [],
  isAddCategory: false,
  isProductsChange: false,
  togglePrintModal: false,
  loading: false,
  error: false,
};

// export const addProducts = createAsyncThunk<
//   Product[],
//   Product[],
//   { rejectValue: string }
// >('store/addProducts', async (productsArr, { rejectWithValue }) => {
//   try {
//     const promises = productsArr.map(async (product: Product) => {
//       const { data } = await axios.post(
//         'http://localhost:3001/products',
//         product,
//       );

//       return data;
//     });

//     const result = await Promise.all(promises);
//     toast.success('Products added!');
//     return result;
//   } catch (error) {
//     toast.error('Server error!');
//     return rejectWithValue('Server error!');
//   }
// });

const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    setProductsToAdd(state, action) {
      state.products.push(action.payload);
    },
    updateProductsToAdd(state, action) {
      state.products = action.payload;
    },
    setIsAddCategory(state, action) {
      state.isAddCategory = action.payload;
    },
    togglePrintModal(state, action) {
      state.togglePrintModal = action.payload;
    },
    addCategory(state, action) {
      state.categories.push(action.payload);
      toast.success('Category added!');
    },
    editCategory(state, action) {
      state.categories = state.categories.map((category) => {
        if (category.id === action.payload.id) {
          toast.success('Category changed!');
          return {
            ...category,
            name: action.payload.name,
          };
        } else {
          toast.error('Error!');
          return category;
        }
      });
    },
    deleteCategory(state, action) {
      state.categories = state.categories.filter((category) => {
        category.id !== action.payload;
      });
      state.products = state.products.filter((product) => {
        product.categoryId !== action.payload;
      });
      toast.success('Category deleted!');
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const {
  setProductsToAdd,
  updateProductsToAdd,
  setIsAddCategory,
  togglePrintModal,
  addCategory,
  editCategory,
  deleteCategory,
} = mainSlice.actions;

export default mainSlice.reducer;
