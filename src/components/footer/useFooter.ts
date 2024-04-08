import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';

export const useFooter = () => {
  const state = useAppSelector((state) => state.mainSlice);

  const [openSummary, setOpenSummary] = useState<boolean>(false);

  const handleOpenSummary = () => {
    setOpenSummary(!openSummary);
  };

  const totalPrice = () => {
    const totalPrice = state.history[state.history.length - state.historyIndex]
      .map((el) => el.price)
      .reduce((acc, number) => acc + number, 0);

    const totalQuantity = state.history[
      state.history.length - state.historyIndex
    ]
      .map((el) => el.quantity)
      .reduce((acc, number) => acc + number, 0);

    return totalPrice * totalQuantity;
  };

  return { openSummary, handleOpenSummary, totalPrice };
};
