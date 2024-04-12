import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  donwnloadData,
  synchronizeIndexedDb,
  togglePrintModal,
} from '../../app/mainSlice';

export const useHeader = () => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const [showLoadButtons, setShowLoadButtons] = useState<boolean>(false);

  const handleOpenModal = () => {
    dispatch(togglePrintModal(true));
  };

  const synchronizeData = () => {
    dispatch(
      synchronizeIndexedDb({
        categories:
          state.history[state.history.length - state.historyIndex].categories,
        products:
          state.history[state.history.length - state.historyIndex].products,
        deletedProducts: state.deletedProducts,
      }),
    );
  };

  const upload = () => {
    const jsonData = JSON.stringify(
      state.history[state.history.length - state.historyIndex],
    );
    const data = new Blob([jsonData], { type: 'application/json' });
    const url = window.URL.createObjectURL(data);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    link.click();
  };

  const download = (evt: React.ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files) return;
    const file = evt.target.files[0]; // Получаем файл
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const data = JSON.parse(e.target.result); // Преобразуем содержимое файла
      console.log(data);

      dispatch(donwnloadData(data));
    };

    reader.onerror = (e) => {
      console.error('Ошибка FileReader:', e); // Обработка ошибки
    };

    reader.readAsText(file);
    evt.target.value = '';
  };

  return {
    dispatch,
    showLoadButtons,
    setShowLoadButtons,
    handleOpenModal,
    synchronizeData,
    upload,
    download,
  };
};
