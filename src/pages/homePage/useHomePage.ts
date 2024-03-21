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
  }, []);

  const handleAccordion = (category: Category) => {
    setAccordion((prevState: any) => ({
      ...prevState,
      [category.id]: !prevState[category.id] || false,
    }));
  };

  return {
    state,
    accordion,
    handleAccordion,
  };
};
