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
  deletedProducts: Product[];
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
  deletedProducts: [],
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
      const index = state.history.length - state.historyIndex;

      state.products.push(action.payload);
      state.history.splice(index + 1);
      state.history.push(state.products);
      state.historyIndex = initialState.historyIndex;
    },
    updateProductsToAdd(state, action) {
      const index = state.history.length - state.historyIndex;

      state.products = action.payload;
      state.history.splice(index + 1);
      state.history.push(state.products);
      state.historyIndex = initialState.historyIndex;
    },
    deleteProduct(state, action) {
      const index = state.history.length - state.historyIndex;

      state.products = state.products.filter((product) => {
        return product.id !== action.payload;
      });
      state.history.splice(index + 1);
      state.history.push(state.products);
      state.historyIndex = initialState.historyIndex;
      toast.success('Product deleted!');
    },
    moveProduct(state, action) {
      state.products = action.payload;
    },
    setDeletedProducts(state, action) {
      const isProductDeleted = state.deletedProducts.find(
        (i) => i.id === action.payload.id,
      );

      if (
        action.payload.title &&
        action.payload.image &&
        action.payload.price &&
        action.payload.quantity &&
        !isProductDeleted
      ) {
        state.deletedProducts.push(action.payload);
      }
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
      localStorage.setItem(
        'deletedProducts',
        JSON.stringify(state.deletedProducts),
      );
      toast.success('Synchronized!');
    },
    getDataFromIndexDB(state) {
      const categories = JSON.parse(localStorage.getItem('categories') || '{}');
      const products = JSON.parse(localStorage.getItem('products') || '{}');
      const deletedProducts = JSON.parse(
        localStorage.getItem('deletedProducts') || '{}',
      );

      if (Array.isArray(categories)) {
        state.categories = categories.map((category: Category) => category);
      } else {
        state.categories = [];
      }

      if (Array.isArray(products) && products.length !== 0) {
        state.products = products.map((product: Product) => product);
        state.history.push(state.products);
      } else {
        state.products = [];
      }

      if (Array.isArray(deletedProducts)) {
        state.deletedProducts = deletedProducts.map(
          (product: Product) => product,
        );
      } else {
        state.deletedProducts = [];
      }
    },
    //=============================PRINT ACTIONS=============================
    togglePrintModal(state, action) {
      state.togglePrintModal = action.payload;
    },
    //=============================HISTORY ACTIONS============================
    setPervHistoryIndex(state) {
      if (state.historyIndex >= state.history.length) return;
      state.historyIndex++;
      state.products = state.history[state.history.length - state.historyIndex];
    },
    setNextHistoryIndex(state) {
      if (state.historyIndex <= 1) return;
      state.historyIndex--;
      state.products = state.history[state.history.length - state.historyIndex];
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
  moveProduct,
  setDeletedProducts,
  setIsAddCategory,
  addCategory,
  editCategory,
  deleteCategory,
  synchronizeIdexDb,
  getDataFromIndexDB,
  togglePrintModal,
  setNextHistoryIndex,
  setPervHistoryIndex,
} = mainSlice.actions;

export default mainSlice.reducer;
