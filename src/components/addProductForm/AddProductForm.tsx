import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import styles from './AddProductForm.module.scss';

const AddProductForm = () => {
  return (
    <>
      <motion.div className={styles.addProductForm}>
        <FontAwesomeIcon
          icon={faArrowUpFromBracket}
          className={styles.productUploadImage}
        ></FontAwesomeIcon>
        <motion.div className={styles.productImageContainer}></motion.div>
        <motion.div className={styles.productInfo}>
          <motion.textarea className={styles.productArea} />
          <motion.div
            aria-placeholder="Product name"
            className={styles.wrapper}
          >
            <motion.input
              type="number"
              placeholder="Price"
              className={styles.productInput}
            />
            <motion.input
              type="number"
              placeholder="Quantity"
              className={styles.productInput}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default AddProductForm;
