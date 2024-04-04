import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  setComment,
  setContacts,
  togglePrintModal,
  togglePrintSheet,
} from '../../app/mainSlice';

export const usePrintModal = () => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const [contactsValue, setContactsValue] = useState<string>('');
  const [commentValue, setCommentValue] = useState<string>('');

  const handleCloseModal = () => {
    dispatch(togglePrintModal(false));
  };

  const handlePrint = () => {
    dispatch(setContacts(contactsValue));
    dispatch(setComment(commentValue));
    dispatch(togglePrintSheet(true));
  };

  return {
    state,
    handleCloseModal,
    handlePrint,
    contactsValue,
    commentValue,
    setContactsValue,
    setCommentValue,
  };
};
