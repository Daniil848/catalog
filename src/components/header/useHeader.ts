import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addProducts, togglePrintModal } from '../../app/mainSlice';

export const useHeader = () => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const handleAddProducts = () => {
    dispatch(addProducts(state.productsToAdd));
  };

  const handleOpenModal = () => {
    dispatch(togglePrintModal(true));
  };
  return {
    state,
    handleAddProducts,
    handleOpenModal,
  };
};
