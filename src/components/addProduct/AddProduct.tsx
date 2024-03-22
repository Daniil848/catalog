import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AddProduct.module.scss';

const AddProduct = () => {
  return (
    <>
      <motion.div className={styles.addProduct}>
        <motion.button className={styles.addProductButton}>
          <FontAwesomeIcon icon={faPlus} className={styles.addProductIcon} />
        </motion.button>
      </motion.div>
    </>
  );
};

export default AddProduct;
