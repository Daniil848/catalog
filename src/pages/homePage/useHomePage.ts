import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  Category,
  addCategory,
  getCategories,
  getProducts,
} from '../../app/mainSlice';
import { nanoid } from 'nanoid';

interface Accordion {
  [key: string]: boolean;
}

export const useHomePage = () => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const [accordion, setAccordion] = useState<Accordion>({});
  const [isAddCategory, setIsAddCategory] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>('');

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, [isAddCategory]);

  const handleAccordion = (category: Category) => {
    setAccordion((prevState: any) => ({
      ...prevState,
      [category.id]: !prevState[category.id] || false,
    }));
  };

  const handleChangeCtegory = () => {
    dispatch(addCategory({ id: nanoid(), name: categoryName }));
    setIsAddCategory(false);
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
    isAddCategory,
    setIsAddCategory,
    setCategoryName,
    handleChangeCtegory,
  };
};
