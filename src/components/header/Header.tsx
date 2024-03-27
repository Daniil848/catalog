import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faPrint,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss';

const Header = () => {
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
          <button className={styles.headerSubmitButton}>
            <FontAwesomeIcon icon={faCheck} />
            <p>Synchronize</p>
          </button>
          <button className={styles.headerSubmitButton}>
            <FontAwesomeIcon icon={faPrint} />
            <p>Print</p>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
