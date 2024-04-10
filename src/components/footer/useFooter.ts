import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';

export const useFooter = () => {
  const state = useAppSelector((state) => state.mainSlice);

  const [openSummary, setOpenSummary] = useState<boolean>(false);

  const handleOpenSummary = () => {
    setOpenSummary(!openSummary);
  };

  const totalPrice = () => {
    const products =
      state.history[state.history.length - state.historyIndex].products;

    let totalPrice = 0;

    for (let i = 0; i < products.length; i++) {
      totalPrice += products[i].price * products[i].quantity;
    }

    return totalPrice;
  };

  return { openSummary, handleOpenSummary, totalPrice };
};
