import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  Product,
  deleteProduct,
  setHistory,
  updateProductsToAdd,
} from '../../app/mainSlice';
import toast from 'react-hot-toast';

export const useProductCard = () => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const [isEditProduct, setIsEditProduct] = useState<{
    [key: string]: boolean;
  }>({});
  const [productImage, setProductImage] = useState<{ [key: string]: string }>(
    {},
  );
  const [productName, setProductName] = useState<{ [key: string]: string }>({});
  const [productPrice, setProductPrice] = useState<{ [key: string]: number }>(
    {},
  );
  const [productCount, setProductCount] = useState<{ [key: string]: number }>(
    {},
  );

  const handleSwitchEditProduct = (productId: string) => {
    setIsEditProduct((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId] || false,
    }));
  };

  const handleProductImage = (value: string, productId: string) => {
    setProductImage(() => ({
      [productId]: value,
    }));
  };

  const handleProductName = (value: string, productId: string) => {
    setProductName(() => ({
      [productId]: value,
    }));
  };

  const handleProductPrice = (value: number, productId: string) => {
    setProductPrice(() => ({
      [productId]: value,
    }));
  };

  const handleProductCount = (value: number, productId: string) => {
    setProductCount(() => ({
      [productId]: value,
    }));
  };

  const handleChangeProduct = (productId: string) => {
    const updatedProducts = state.products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          image: productImage[productId],
          title: productName[productId],
          price: productPrice[productId],
          quantity: productCount[productId],
        };
      }
      return product;
    });
    handleSwitchEditProduct(productId);
    dispatch(setHistory(state.products));
    console.log(state.history);

    dispatch(updateProductsToAdd(updatedProducts));
    toast.success('Product changed!');
  };

  const handleDeleteProduct = (productId: string) => {
    dispatch(deleteProduct(productId));
  };

  return {
    state,
    productImage,
    productName,
    productPrice,
    productCount,
    setProductImage,
    handleProductImage,
    handleProductName,
    handleProductPrice,
    handleProductCount,
    handleChangeProduct,
    isEditProduct,
    handleSwitchEditProduct,
    handleDeleteProduct,
  };
};
