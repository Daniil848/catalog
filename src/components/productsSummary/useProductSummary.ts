import { useAppSelector } from '../../app/hooks';

export const useProductSummary = () => {
  const state = useAppSelector((state) => state.mainSlice);

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

  return {
    state,
    totalPriceInCategory,
  };
};
