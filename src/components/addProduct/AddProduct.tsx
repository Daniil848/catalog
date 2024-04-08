import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setProductsToAdd } from '../../app/mainSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { nanoid } from 'nanoid';
import styles from './AddProduct.module.scss';

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
          {showDeletedProducts && (
            <motion.div className={styles.deletedProducts}>
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
                    >
                      {el.title}
                    </motion.button>
                  );
                }
              })}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default AddProduct;
