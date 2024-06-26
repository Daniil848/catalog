import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  Product,
  deleteProduct,
  setDeletedProducts,
  updateProductsToAdd,
} from '../../app/mainSlice';
import toast from 'react-hot-toast';
import { useDragControls } from 'framer-motion';

export const useProductCard = () => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const controls = useDragControls();

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
  const [productNameError, setProductNameError] = useState<boolean>(false);

  const handleSwitchEditProduct = (productId: string) => {
    setIsEditProduct((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId] || false,
    }));
  };

  const handleProductImage = (value: string, productId: string) => {
    setProductImage((pervProductImage) => ({
      ...pervProductImage,
      [productId]: value,
    }));
  };

  const handleProductName = (value: string, productId: string) => {
    const productName = state.products.find(
      (product) => product.title === value,
    );
    productName ? setProductNameError(true) : setProductNameError(false);

    setProductName((pervProductName) => ({
      ...pervProductName,
      [productId]: value,
    }));
  };

  const handleProductPrice = (value: number, productId: string) => {
    setProductPrice((pervProductPrice) => ({
      ...pervProductPrice,
      [productId]: value,
    }));
  };

  const handleProductCount = (value: number, productId: string) => {
    setProductCount((pervProductCount) => ({
      ...pervProductCount,
      [productId]: value,
    }));
  };

  const handleChangeProduct = (productId: string) => {
    if (productNameError) return;

    const updatedProducts = state.products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          image: productImage[productId],
          title: productName[productId],
          price: productPrice[productId] ? productPrice[productId] : 0,
          quantity: productCount[productId] ? productCount[productId] : 0,
        };
      }
      return product;
    });
    handleSwitchEditProduct(productId);
    console.log(state.history);

    dispatch(updateProductsToAdd(updatedProducts));
    toast.success('Product changed!');
  };

  const handleDeleteProduct = (product: Product) => {
    dispatch(setDeletedProducts(product));
    dispatch(deleteProduct(product.id));
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
    productNameError,
    handleProductPrice,
    handleProductCount,
    handleChangeProduct,
    isEditProduct,
    handleSwitchEditProduct,
    handleDeleteProduct,
    controls,
  };
};
