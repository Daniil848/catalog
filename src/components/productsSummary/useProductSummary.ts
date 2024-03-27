import { useRef, useState } from 'react';
import { useAppSelector } from '../../app/hooks';

export const useProductSummary = () => {
  const state = useAppSelector((state) => state.mainSlice);

  const [openSummary, setOpenSummary] = useState<boolean>(false);
  const summaryRef = useRef<HTMLDivElement>(null);

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

  const handleOpenSummary = () => {
    setOpenSummary(!openSummary);
    setTimeout(() => {
      summaryRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return {
    state,
    openSummary,
    totalPrice,
    totalPriceInCategory,
    handleOpenSummary,
    summaryRef,
  };
};
