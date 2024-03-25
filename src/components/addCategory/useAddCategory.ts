import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addCategory, setIsAddCategory } from '../../app/mainSlice';
import { nanoid } from 'nanoid';

export const useAddCategory = () => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const [categoryName, setCategoryName] = useState<string>('');

  const handleChangeCtegory = () => {
    dispatch(addCategory({ id: nanoid(), name: categoryName }));
    dispatch(setIsAddCategory(false));
  };
  return {
    state,
    dispatch,
    setCategoryName,
    handleChangeCtegory,
  };
};
