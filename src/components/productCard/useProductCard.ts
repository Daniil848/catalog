import { useAppDispatch } from '../../app/hooks';
import { deleteProduct } from '../../app/mainSlice';

export const useProductCard = () => {
  const dispatch = useAppDispatch();

  const handleDeleteProduct = (productId: string) => {
    dispatch(deleteProduct(productId));
  };

  return {
    handleDeleteProduct,
  };
};
