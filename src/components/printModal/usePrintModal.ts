import { useAppDispatch } from '../../app/hooks';
import { togglePrintModal } from '../../app/mainSlice';

export const usePrintModal = () => {
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(togglePrintModal(false));
  };

  return {
    handleCloseModal,
  };
};
