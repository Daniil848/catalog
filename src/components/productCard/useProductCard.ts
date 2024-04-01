import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteProduct, updateProductsToAdd } from '../../app/mainSlice';
import toast from 'react-hot-toast';

interface SwitchById {
  [key: string]: boolean;
}

export const useProductCard = () => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const [isEditProduct, setIsEditProduct] = useState<SwitchById>({});
  const [productImage, setProductImage] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [productPrice, setProductPrice] = useState<number>();
  const [productCount, setProductCount] = useState<number>();

  const handleSwitchEditProduct = (productId: string) => {
    setIsEditProduct((prevState: SwitchById) => ({
      ...prevState,
      [productId]: !prevState[productId] || false,
    }));
  };

  const handleChangeProduct = (productId: string) => {
    const updatedProducts = state.products.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          image: productImage,
          title: productName,
          price: productPrice,
          quantity: productCount,
        };
      }
      return product;
    });
    toast.success('Product changed!');
    handleSwitchEditProduct(productId);
    dispatch(updateProductsToAdd(updatedProducts));
    setProductImage('');
    setProductName('');
    setProductPrice(0);
    setProductCount(0);
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
    setProductName,
    setProductPrice,
    setProductCount,
    handleChangeProduct,
    isEditProduct,
    handleSwitchEditProduct,
    handleDeleteProduct,
  };
};
