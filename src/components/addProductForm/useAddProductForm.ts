import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { updateProductsToAdd } from '../../app/mainSlice';

export const useAddProductForm = () => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const handleChangeProductImage = (
    event: React.ChangeEvent<HTMLInputElement>,
    productId: string,
  ) => {
    const updatedProducts = state.products.map((product) => {
      if (product.id === productId && event.target.files) {
        return {
          ...product,
          image: URL.createObjectURL(event.target.files[0]),
        };
      }
      return product;
    });

    dispatch(updateProductsToAdd(updatedProducts));
  };

  const handleChangeProductName = (
    event: React.ChangeEvent<HTMLInputElement>,
    productId: string,
  ) => {
    const updatedProducts = state.products.map((product) => {
      if (product.id === productId) {
        return { ...product, title: event.target.value };
      }
      return product;
    });

    dispatch(updateProductsToAdd(updatedProducts));
  };

  const handleChangeProductPrice = (
    event: React.ChangeEvent<HTMLInputElement>,
    productId: string,
  ) => {
    const updatedProducts = state.products.map((product) => {
      if (product.id === productId) {
        return { ...product, price: event.target.value };
      }
      return product;
    });

    dispatch(updateProductsToAdd(updatedProducts));
  };

  const handleChangeProductQuantity = (
    event: React.ChangeEvent<HTMLInputElement>,
    productId: string,
  ) => {
    const updatedProducts = state.products.map((product) => {
      if (product.id === productId) {
        return { ...product, quantity: event.target.value };
      }
      return product;
    });

    dispatch(updateProductsToAdd(updatedProducts));
  };

  return {
    state,
    handleChangeProductImage,
    handleChangeProductName,
    handleChangeProductPrice,
    handleChangeProductQuantity,
  };
};
