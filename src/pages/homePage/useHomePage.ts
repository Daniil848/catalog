import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  Category,
  editCategory,
  getDataFromIndexDB,
  moveProduct,
} from '../../app/mainSlice';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

interface Accordion {
  [key: string]: boolean;
}

export const useHomePage = () => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const [accordion, setAccordion] = useState<Accordion>({});
  const [isEditCategory, setIsEditCategory] = useState<string>('');
  const [categoryName, setCategoryName] = useState<string>('');
  const [items, setItems] = useState(
    state.history[state.history.length - state.historyIndex],
  );

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

  function dragEndEvent(e: DragEndEvent) {
    const { over, active } = e;

    const draggedProduct = state.history[
      state.history.length - state.historyIndex
    ].find((product) => product.id === active.id);
    const overProduct = state.history[
      state.history.length - state.historyIndex
    ].find((product) => product.id === over?.id);

    if (draggedProduct && overProduct) {
      setItems((items) => {
        return arrayMove(
          items,
          items.indexOf(draggedProduct),
          items.indexOf(overProduct),
        );
      });
    }
    dispatch(moveProduct(items));
  }

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
    dragEndEvent,
  };
};
