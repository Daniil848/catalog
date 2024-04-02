import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { synchronizeIdexDb, togglePrintModal } from '../../app/mainSlice';

export const useHeader = () => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(togglePrintModal(true));
  };

  const synchronizeData = () => {
    // if (!state.products.length && !state.categories.length) {
    //   toast.error('There are no data to add!');
    //   return;
    // }

    dispatch(synchronizeIdexDb());
  };
  return {
    handleOpenModal,
    synchronizeData,
  };
};
