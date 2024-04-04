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
  categories: Category[];
  products: Product[];
  history: [Product[]];
  historyIndex: number;
  isAddCategory: boolean;
  isProductsChange: boolean;
  togglePrintModal: boolean;
  contacts: string;
  comment: string;
  loading: boolean;
  error: boolean;
}

const initialState: State = {
  categories: [],
  products: [],
  history: [[]],
  historyIndex: 1,
  isAddCategory: false,
  isProductsChange: false,
  togglePrintModal: false,
  contacts: '',
  comment: '',
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
    //=============================PRODUCTS ACTIONS=============================
    setProductsToAdd(state, action) {
      state.products.push(action.payload);
      state.history.push(state.products);
    },
    updateProductsToAdd(state, action) {
      state.products = action.payload;
      state.history.push(state.products);
    },
    deleteProduct(state, action) {
      state.products = state.products.filter((product) => {
        return product.id !== action.payload;
      });
      state.history.push(state.products);
      toast.success('Product deleted!');
    },
    //=============================CATEGORIES ACTIONS=============================
    setIsAddCategory(state, action) {
      state.isAddCategory = action.payload;
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
        return category.id !== action.payload.id;
      });
      state.products = state.products.filter((product) => {
        return product.categoryId !== action.payload.id;
      });
      toast.success('Category deleted!');
    },
    //=============================INDEXDB ACTIONS=============================
    synchronizeIdexDb(state) {
      localStorage.setItem('products', JSON.stringify(state.products));
      localStorage.setItem('categories', JSON.stringify(state.categories));
      toast.success('Synchronized!');
    },
    getDataFromIndexDB(state) {
      const categories = JSON.parse(localStorage.getItem('categories') || '{}');
      const products = JSON.parse(localStorage.getItem('products') || '{}');

      if (Array.isArray(categories)) {
        state.categories = categories.map((category) => category);
      } else {
        state.categories = [];
      }

      if (Array.isArray(products)) {
        state.products = products.map((product) => product);
      } else {
        state.products = [];
      }
    },
    //=============================PRINT ACTIONS=============================
    togglePrintModal(state, action) {
      state.togglePrintModal = action.payload;
    },
    setContacts(state, action) {
      state.contacts = action.payload;
    },
    setComment(state, action) {
      state.comment = action.payload;
    },
    //=============================HISTORY ACTIONS============================
    setPervHistoryIndex(state) {
      if (state.historyIndex >= state.history.length) return;
      state.historyIndex++;
    },
    setNextHistoryIndex(state) {
      if (state.historyIndex <= 1) return;
      state.historyIndex--;
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const {
  setProductsToAdd,
  updateProductsToAdd,
  deleteProduct,
  setIsAddCategory,
  addCategory,
  editCategory,
  deleteCategory,
  synchronizeIdexDb,
  getDataFromIndexDB,
  togglePrintModal,
  setComment,
  setContacts,
  setNextHistoryIndex,
  setPervHistoryIndex,
} = mainSlice.actions;

export default mainSlice.reducer;
