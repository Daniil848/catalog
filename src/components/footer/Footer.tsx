import React from 'react';
import { useFooter } from './useFooter';
import styles from './Footer.module.scss';
import ProductsSummary from '../productsSummary/ProductsSummary';

const Footer = () => {
  const { openSummary, handleOpenSummary, totalPrice } = useFooter();

  return (
    <>
      {openSummary && <ProductsSummary />}
      <footer className={styles.footer}>
        <button
          className={styles.showButton}
          onClick={() => handleOpenSummary()}
        >
          {openSummary
            ? 'Hide the product summary'
            : 'Show the product summary'}
        </button>
        <p className={styles.footerPrice}>
          Total price: ${totalPrice().toFixed(2)}
        </p>
      </footer>
    </>
  );
};

export default Footer;
