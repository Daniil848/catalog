import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addProducts, togglePrintModal } from '../../app/mainSlice';

export const useHeader = () => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const handleAddProducts = () => {
    if (state.productsToAdd.length === 0) {
      toast.error('There are no products to add');
      return;
    }
    dispatch(addProducts(state.productsToAdd));
  };

  const handleOpenModal = () => {
    dispatch(togglePrintModal(true));
  };
  return {
    handleAddProducts,
    handleOpenModal,
  };
};
