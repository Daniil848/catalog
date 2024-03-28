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

const Header = () => {
  const { handleAddProducts, handleOpenModal } = useHeader();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerArrows}>
          <button className={styles.headerArrowsButton}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button className={styles.headerArrowsButton}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
        <p className={styles.headerTitle}>Catalog</p>
        <div className={styles.headerSubmit}>
          <button
            className={styles.headerSubmitButton}
            onClick={() => handleAddProducts()}
          >
            <FontAwesomeIcon icon={faCheck} />
            <p>Add products</p>
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
