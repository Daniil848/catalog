import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { togglePrintModal } from '../../app/mainSlice';

export const usePrintModal = () => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(togglePrintModal(false));
  };

  return {
    state,
    handleCloseModal,
  };
};
