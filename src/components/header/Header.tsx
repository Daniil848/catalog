import React from 'react';
import { useHeader } from './useHeader';
import { setNextHistoryIndex, setPervHistoryIndex } from '../../app/mainSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faFile,
  faFileDownload,
  faFileUpload,
  faPrint,
} from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';
import PrintModal from '../printModal/PrintModal';
import styles from './Header.module.scss';

const Header = () => {
  const {
    dispatch,
    showLoadButtons,
    setShowLoadButtons,
    handleOpenModal,
    synchronizeData,
  } = useHeader();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerArrows}>
          <button
            className={styles.headerArrowsButton}
            onClick={() => dispatch(setPervHistoryIndex())}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            className={styles.headerArrowsButton}
            onClick={() => dispatch(setNextHistoryIndex())}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
        <p className={styles.headerTitle}>Catalog</p>
        <div className={styles.headerSubmit}>
          <button
            className={styles.headerSubmitButton}
            onClick={() => synchronizeData()}
          >
            <FontAwesomeIcon icon={faCheck} />
            <p>Synchornize</p>
          </button>
          <button
            className={styles.headerSubmitButton}
            onClick={() => handleOpenModal()}
          >
            <FontAwesomeIcon icon={faPrint} />
            <p>Print</p>
          </button>
          <div className={styles.headerSubmitLoad}>
            <button
              className={styles.headerSubmitLoadButton}
              onClick={() => setShowLoadButtons(!showLoadButtons)}
            >
              <FontAwesomeIcon icon={faFile} />
            </button>
            <AnimatePresence>
              {showLoadButtons && (
                <motion.div
                  className={styles.loadButtonsContainer}
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0, transition: { delay: 0.2 } }}
                >
                  <motion.button
                    className={styles.loadButton}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: { delay: 0.1 },
                    }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    <FontAwesomeIcon icon={faFileUpload} />
                  </motion.button>
                  <motion.button
                    className={styles.loadButton}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: { delay: 0.1 },
                    }}
                    exit={{ opacity: 0, scale: 0.5 }}
                  >
                    <FontAwesomeIcon icon={faFileDownload} />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>
      <PrintModal />
    </>
  );
};

export default Header;
