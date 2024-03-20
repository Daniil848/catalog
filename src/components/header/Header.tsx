import React from 'react';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <p className={styles.headerTitle}>Catalog</p>
      </header>
    </>
  );
};

export default Header;
