import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Category, getCategories, getProducts } from '../../app/mainSlice';

interface Accordion {
  [key: string]: boolean;
}

export const useHomePage = () => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const [accordion, setAccordion] = useState<Accordion>({});

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [state.isAddCategory]);

  const handleAccordion = (category: Category) => {
    setAccordion((prevState: Accordion) => ({
      ...prevState,
      [category.id]: !prevState[category.id] || false,
    }));
  };

  // const totalPriceInCategory = (categoryID: number) => {
  //   const productsInCategory = state.products.filter(
  //     (product) => product.categoryId == categoryID,
  //   );
  //   const totalPriceInCategory = productsInCategory
  //     .map((el) => el.price)
  //     .reduce((acc, number) => acc + number, 0);

  //   const totalQuantityInCategory = productsInCategory
  //     .map((el) => el.quantity)
  //     .reduce((acc, number) => acc + number, 0);

  //   return totalPriceInCategory * totalQuantityInCategory;
  // };

  return {
    state,
    accordion,
    handleAccordion,
  };
};
