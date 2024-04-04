import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setComment, setContacts, togglePrintModal } from '../../app/mainSlice';

export const usePrintModal = () => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const [contactsValue, setContactsValue] = useState<string>('');
  const [commentValue, setCommentValue] = useState<string>('');
  const [showPrintSheet, setShowPrintSheet] = useState<boolean>(false);

  const handleCloseModal = () => {
    dispatch(togglePrintModal(false));
  };

  const handlePrint = () => {
    dispatch(setContacts(contactsValue));
    dispatch(setComment(commentValue));
    setShowPrintSheet(true);
  };

  return {
    state,
    handleCloseModal,
    handlePrint,
    contactsValue,
    commentValue,
    setContactsValue,
    setCommentValue,
    showPrintSheet,
  };
};
