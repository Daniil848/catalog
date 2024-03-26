import { useState } from 'react';
import { useAppSelector } from '../../app/hooks';

export const useProductSummary = () => {
  const state = useAppSelector((state) => state.mainSlice);

  const [openSummary, setOpenSummary] = useState<boolean>(false);

  const totalPriceInCategory = (categoryID: string) => {
    const productsInCategory = state.products.filter(
      (product) => product.categoryId == categoryID,
    );

    const totalPriceInCategory = productsInCategory
      .map((el) => el.price)
      .reduce((acc, number) => acc + number, 0);

    const totalQuantityInCategory = productsInCategory
      .map((el) => el.quantity)
      .reduce((acc, number) => acc + number, 0);

    return totalPriceInCategory * totalQuantityInCategory;
  };

  const totalPrice = () => {
    const totalPrice = state.products
      .map((el) => el.price)
      .reduce((acc, number) => acc + number, 0);

    const totalQuantity = state.products
      .map((el) => el.quantity)
      .reduce((acc, number) => acc + number, 0);

    return totalPrice * totalQuantity;
  };

  return {
    state,
    openSummary,
    setOpenSummary,
    totalPrice,
    totalPriceInCategory,
  };
};
