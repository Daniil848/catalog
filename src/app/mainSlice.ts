import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { openDB } from 'idb';
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

export const synchronizeIndexedDb = createAsyncThunk<
  { categories: Category[]; products: Product[]; deletedProducts: Product[] },
  { categories: Category[]; products: Product[]; deletedProducts: Product[] },
  { rejectValue: string }
>('store/sync', async (data) => {
  const { categories, products, deletedProducts } = data;
  const db = await openDB('Catalog', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('categories')) {
        db.createObjectStore('categories', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('products')) {
        db.createObjectStore('products', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('deletedProducts')) {
        db.createObjectStore('deletedProducts', { keyPath: 'id' });
      }
    },
  });

  const tx = db.transaction(
    ['categories', 'products', 'deletedProducts'],
    'readwrite',
  );
  const categoryStore = tx.objectStore('categories');
  const productStore = tx.objectStore('products');
  const deletedProductStore = tx.objectStore('deletedProducts');

  categoryStore.clear();
  productStore.clear();
  deletedProductStore.clear();

  await tx.done;

  const writeTx = db.transaction(
    ['categories', 'products', 'deletedProducts'],
    'readwrite',
  );
  const writeCategoryStore = writeTx.objectStore('categories');
  const writeProductStore = writeTx.objectStore('products');
  const writeDeletedProductStore = writeTx.objectStore('deletedProducts');

  for (const category of categories) {
    await writeCategoryStore.put(category);
  }

  for (const product of products) {
    await writeProductStore.put(product);
  }

  for (const deletedProduct of deletedProducts) {
    await writeDeletedProductStore.put(deletedProduct);
  }

  await writeTx.done;

  return data;
});

export const getDataFromIndexedDB = createAsyncThunk<
  { categories: Category[]; products: Product[]; deletedProducts: Product[] },
  undefined,
  { rejectValue: string }
>('store/get', async () => {
  const db = await openDB('Catalog', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('categories')) {
        db.createObjectStore('categories', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('products')) {
        db.createObjectStore('products', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('deletedProducts')) {
        db.createObjectStore('deletedProducts', { keyPath: 'id' });
      }
    },
  });

  const tx = db.transaction(
    ['categories', 'products', 'deletedProducts'],
    'readonly',
  );
  const categoryStore = tx.objectStore('categories');
  const productStore = tx.objectStore('products');
  const deletedProductStore = tx.objectStore('deletedProducts');

  const categories = await categoryStore.getAll();
  const products = await productStore.getAll();
  const deletedProducts = await deletedProductStore.getAll();

  await tx.done;

  console.log();

  return { categories, products, deletedProducts };
});

const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
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
    togglePrintModal(state, action) {
      state.togglePrintModal = action.payload;
    },
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
    builder
      .addCase(synchronizeIndexedDb.fulfilled, () => {
        toast.success('Synchronized!');
      })
      .addCase(synchronizeIndexedDb.rejected, () => {
        toast.error('Server error!');
      })
      .addCase(getDataFromIndexedDB.fulfilled, (state, action) => {
        if (Array.isArray(action.payload.categories)) {
          state.categories = action.payload.categories;
          state.history.push({
            products: state.products,
            categories: state.categories,
          });
        } else {
          state.categories = [];
        }

        if (
          Array.isArray(action.payload.products) &&
          action.payload.products.length !== 0
        ) {
          state.products = action.payload.products;
          state.history.push({
            products: state.products,
            categories: state.categories,
          });
        } else {
          state.products = [];
        }

        if (Array.isArray(action.payload.deletedProducts)) {
          state.deletedProducts = action.payload.deletedProducts;
        } else {
          state.deletedProducts = [];
        }
      });
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
  togglePrintModal,
  setNextHistoryIndex,
  setPervHistoryIndex,
  donwnloadData,
} = mainSlice.actions;

export default mainSlice.reducer;
