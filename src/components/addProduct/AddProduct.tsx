import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpFromBracket,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AddProduct.module.scss';

const variants = {
  open: { width: '100%', height: '100%', borderRadius: '4px' },
  closed: { width: '80px', height: '80px' },
};

const AddProduct = () => {
  const [clickAddProduct, setClickAddProduct] = useState<boolean>(false);

  return (
    <>
      <AnimatePresence>
        <motion.div className={styles.addProduct}>
          {!clickAddProduct ? (
            <motion.button
              animate={clickAddProduct ? 'open' : 'closed'}
              variants={variants}
              className={styles.addProductButton}
              onClick={() => setClickAddProduct(!clickAddProduct)}
            >
              <FontAwesomeIcon
                icon={faPlus}
                className={styles.addProductIcon}
              />
            </motion.button>
          ) : (
            <motion.div
              animate={clickAddProduct ? 'open' : 'closed'}
              variants={variants}
              className={styles.addProductForm}
            >
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
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default AddProduct;
