import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { synchronizeIdexDb, togglePrintModal } from '../../app/mainSlice';

export const useHeader = () => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const [showLoadButtons, setShowLoadButtons] = useState<boolean>(false);

  const handleOpenModal = () => {
    dispatch(togglePrintModal(true));
  };

  const synchronizeData = () => {
    dispatch(synchronizeIdexDb());
  };

  return {
    dispatch,
    showLoadButtons,
    setShowLoadButtons,
    handleOpenModal,
    synchronizeData,
  };
};
