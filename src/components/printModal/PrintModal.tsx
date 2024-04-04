import React from 'react';
import { usePrintModal } from './usePrintModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faXmark } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import TextArea from '../../UI/textArea/TextArea';
import styles from './PrintModal.module.scss';
import PrintSheet from '../printSheet/PrintSheet';

const PrintModal = () => {
  const {
    state,
    handleCloseModal,
    handlePrint,
    contactsValue,
    commentValue,
    setContactsValue,
    setCommentValue,
  } = usePrintModal();

  return (
    <>
      <AnimatePresence>
        {state.togglePrintModal && (
          <motion.div className={styles.wrapper}>
            <motion.div
              className={styles.form}
              initial={{ scale: 0, type: 'spring' }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <motion.button
                className={styles.closeForm}
                onClick={() => handleCloseModal()}
              >
                <FontAwesomeIcon icon={faXmark} />
              </motion.button>
              <motion.button
                className={styles.printbuton}
                onClick={() => handlePrint()}
              >
                <FontAwesomeIcon icon={faPrint} />
                <motion.span>Print</motion.span>
              </motion.button>
              <motion.div className={styles.textAreaContainer}>
                <motion.div className={styles.textArea}>
                  <TextArea
                    placeholder="Contacts"
                    label="Contacts"
                    value={contactsValue}
                    onChange={(e) => setContactsValue(e.target.value)}
                  />
                </motion.div>
                <motion.div className={styles.textArea}>
                  <TextArea
                    placeholder="Comment"
                    label="Comment"
                    value={commentValue}
                    onChange={(e) => setCommentValue(e.target.value)}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* <PrintSheet /> */}
    </>
  );
};

export default PrintModal;
