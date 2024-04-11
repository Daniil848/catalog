import { createSlice } from '@reduxjs/toolkit';
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
  history: { products: Product[]; categories: Category[] }[];
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
  history: [{ products: [], categories: [] }],
  historyIndex: 1,
  isAddCategory: false,
  isProductsChange: false,
  togglePrintModal: false,
  deletedProducts: [],
  loading: false,
  error: false,
};

const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    //=============================PRODUCTS ACTIONS=============================
    setProductsToAdd(state, action) {
      const index = state.history.length - state.historyIndex;

      state.products.push(action.payload);
      state.history.splice(index + 1);
      state.history.push({
        products: state.products,
        categories: state.categories,
      });
      state.historyIndex = initialState.historyIndex;
    },
    updateProductsToAdd(state, action) {
      const index = state.history.length - state.historyIndex;

      state.products = action.payload;
      state.history.splice(index + 1);
      state.history.push({
        products: state.products,
        categories: state.categories,
      });
      state.historyIndex = initialState.historyIndex;
    },
    deleteProduct(state, action) {
      const index = state.history.length - state.historyIndex;

      state.products = state.products.filter(
        (product) => product.id !== action.payload,
      );
      state.history.splice(index + 1);
      state.history.push({
        products: state.products,
        categories: state.categories,
      });
      state.historyIndex = initialState.historyIndex;
      toast.success('Product deleted!');
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
      const index = state.history.length - state.historyIndex;

      state.categories.push(action.payload);
      state.history.splice(index + 1);
      state.history.push({
        products: state.products,
        categories: state.categories,
      });
      state.historyIndex = initialState.historyIndex;
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
          return category;
        }
      });

      const index = state.history.length - state.historyIndex;
      state.history.splice(index + 1);
      state.history.push({
        products: state.products,
        categories: state.categories,
      });
      state.historyIndex = initialState.historyIndex;
    },
    deleteCategory(state, action) {
      const index = state.history.length - state.historyIndex;

      state.categories = state.categories.filter((category) => {
        return category.id !== action.payload.id;
      });
      state.products = state.products.filter((product) => {
        return product.categoryId !== action.payload.id;
      });

      state.history.splice(index + 1);
      state.history.push({
        products: state.products,
        categories: state.categories,
      });
      state.historyIndex = initialState.historyIndex;
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
        state.history.push({
          products: state.products,
          categories: state.categories,
        });
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

      state.products =
        state.history[state.history.length - state.historyIndex].products;

      state.categories =
        state.history[state.history.length - state.historyIndex].categories;
    },
    setNextHistoryIndex(state) {
      if (state.historyIndex <= 1) return;
      state.historyIndex--;

      state.products =
        state.history[state.history.length - state.historyIndex].products;

      state.categories =
        state.history[state.history.length - state.historyIndex].categories;
    },
    //=============================LOAD ACTIONS============================
    donwnloadData(state, action) {
      state.products = initialState.products;
      state.categories = initialState.categories;
      state.history = [];

      state.products = action.payload.products;
      state.categories = action.payload.categories;
      state.history = [...state.history, action.payload];
      state.historyIndex = initialState.historyIndex;
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
  donwnloadData,
} = mainSlice.actions;

export default mainSlice.reducer;
