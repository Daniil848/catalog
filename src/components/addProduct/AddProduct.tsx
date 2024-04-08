import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setProductsToAdd } from '../../app/mainSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { AnimatePresence, motion } from 'framer-motion';
import { nanoid } from 'nanoid';
import styles from './AddProduct.module.scss';
import { delay } from '@reduxjs/toolkit/dist/utils';

interface Props {
  categoryId: string;
}

const AddProduct = (props: Props) => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const [showDeletedProducts, setShowDeletedProducts] =
    useState<boolean>(false);

  const product = {
    id: nanoid(),
    title: '',
    price: 0,
    categoryId: props.categoryId,
    image: '',
    quantity: 0,
  };

  return (
    <>
      <motion.div className={styles.container}>
        <motion.div className={styles.addProduct}>
          <motion.button
            className={styles.addProductButton}
            onClick={() => dispatch(setProductsToAdd(product))}
          >
            <motion.p>Add new product</motion.p>
            <FontAwesomeIcon icon={faPlus} className={styles.addProductIcon} />
          </motion.button>
        </motion.div>
        <motion.div className={styles.addProduct}>
          <motion.button
            className={styles.addProductButton}
            onClick={() => setShowDeletedProducts(!showDeletedProducts)}
          >
            <motion.p>Add from deleted products</motion.p>
            <FontAwesomeIcon icon={faPlus} className={styles.addProductIcon} />
          </motion.button>
          <AnimatePresence>
            {showDeletedProducts && (
              <motion.div
                key={''}
                className={styles.deletedProducts}
                initial={{ height: 0 }}
                animate={{ height: 'auto' }}
                exit={{ height: 0, transition: { delay: 0.2 } }}
              >
                {state.deletedProducts.map((el) => {
                  const isProductInState = state.history[
                    state.history.length - state.historyIndex
                  ].find((i) => i.id === el.id);

                  if (!isProductInState) {
                    return (
                      <motion.button
                        key={el.id}
                        className={styles.deletedProduct}
                        onClick={() => dispatch(setProductsToAdd(el))}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          transition: { delay: 0.1 },
                        }}
                        exit={{ opacity: 0, scale: 0.5 }}
                      >
                        {el.title}
                      </motion.button>
                    );
                  }
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
};

export default AddProduct;
