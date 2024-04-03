import React from 'react';
import { useHeader } from './useHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faPrint,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';
import PrintModal from '../printModal/PrintModal';
import { setNextHistoryIndex, setPervHistoryIndex } from '../../app/mainSlice';

const Header = () => {
  const { dispatch, handleOpenModal, synchronizeData } = useHeader();

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
        </div>
      </header>
      <PrintModal />
    </>
  );
};

export default Header;
