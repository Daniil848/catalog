import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  Category,
  Product,
  editCategory,
  getDataFromIndexDB,
  reorderProducts,
} from '../../app/mainSlice';

interface Accordion {
  [key: string]: boolean;
}

export const useHomePage = () => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const [accordion, setAccordion] = useState<Accordion>({});
  const [isEditCategory, setIsEditCategory] = useState<string>('');
  const [categoryName, setCategoryName] = useState<string>('');

  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    setItems(state.history[state.history.length - state.historyIndex]);
  }, [state.history]);

  useEffect(() => {
    dispatch(reorderProducts(items));
  }, [items]);

  const handleReorder = (reorderedItems: Product[]) => {
    setItems(reorderedItems);
  };

  useEffect(() => {
    dispatch(getDataFromIndexDB());
  }, []);

  const handleAccordion = (category: Category) => {
    setAccordion((prevState: Accordion) => ({
      ...prevState,
      [category.id]: !prevState[category.id] || false,
    }));
  };

  const openEditCategory = (category: Category) => {
    setIsEditCategory((prevState) => {
      return prevState === category.id ? '' : category.id;
    });
  };

  const handleEditCategory = (id: string) => {
    const category = {
      id: id,
      name: categoryName,
    };

    dispatch(editCategory(category));
    setIsEditCategory('');
  };

  return {
    state,
    dispatch,
    accordion,
    handleAccordion,
    openEditCategory,
    isEditCategory,
    categoryName,
    handleEditCategory,
    setCategoryName,
    items,
    handleReorder,
  };
};
