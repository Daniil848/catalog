import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addProducts } from '../../app/mainSlice';

export const useHeader = () => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const handleAddProducts = () => {
    dispatch(addProducts(state.productsToAdd));
  };

  return {
    handleAddProducts,
  };
};
