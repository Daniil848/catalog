import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { togglePrintModal } from '../../app/mainSlice';
import { useReactToPrint } from 'react-to-print';

export const usePrintModal = () => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const printRef = useRef(null);

  const [contacts, setContacts] = useState<string>('');
  const [comment, setComment] = useState<string>('');

  const handleCloseModal = () => {
    dispatch(togglePrintModal(false));
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  return {
    state,
    printRef,
    handleCloseModal,
    handlePrint,
    contacts,
    comment,
    setContacts,
    setComment,
  };
};
