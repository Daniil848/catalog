import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addCategory, setIsAddCategory } from '../../app/mainSlice';
import { nanoid } from 'nanoid';
import toast from 'react-hot-toast';

export const useAddCategory = () => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const [categoryName, setCategoryName] = useState<string>('');

  const handleChangeCtegory = () => {
    if (!categoryName) {
      toast.error('Enter the name of the category');
      return;
    }
    dispatch(addCategory({ id: nanoid(), name: categoryName }));
    dispatch(setIsAddCategory(false));
    setCategoryName('');
  };

  return {
    state,
    dispatch,
    setCategoryName,
    handleChangeCtegory,
  };
};
