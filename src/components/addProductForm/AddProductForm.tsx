import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import styles from './AddProductForm.module.scss';
import { updateProductsToAdd } from '../../app/mainSlice';

interface Props {
  categoryId: number;
}

const AddProductForm = (props: Props) => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const handleChangeProductName = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    productId: string,
  ) => {
    const updatedProducts = state.productsToAdd.map((product) => {
      if (product.id === productId) {
        return { ...product, title: event.target.value };
      }
      return product;
    });

    dispatch(updateProductsToAdd(updatedProducts));
  };

  const handleChangeProductPrice = (
    event: React.ChangeEvent<HTMLInputElement>,
    productId: string,
  ) => {
    const updatedProducts = state.productsToAdd.map((product) => {
      if (product.id === productId) {
        return { ...product, price: event.target.value };
      }
      return product;
    });

    dispatch(updateProductsToAdd(updatedProducts));
  };

  const handleChangeProductQuantity = (
    event: React.ChangeEvent<HTMLInputElement>,
    productId: string,
  ) => {
    const updatedProducts = state.productsToAdd.map((product) => {
      if (product.id === productId) {
        return { ...product, price: event.target.value };
      }
      return product;
    });

    dispatch(updateProductsToAdd(updatedProducts));
  };

  return (
    <>
      {state.productsToAdd
        .filter((i) => i.categoryId == props.categoryId)
        .map((el) => (
          <motion.div className={styles.addProductForm} key={el.id}>
            <FontAwesomeIcon
              icon={faArrowUpFromBracket}
              className={styles.productUploadImage}
            ></FontAwesomeIcon>
            <motion.div className={styles.productImageContainer}></motion.div>
            <motion.div className={styles.productInfo}>
              <motion.textarea
                placeholder="Product name"
                className={styles.productArea}
                value={el.title}
                onChange={(e) => handleChangeProductName(e, el.id)}
              />
              <motion.div
                aria-placeholder="Product name"
                className={styles.wrapper}
              >
                <motion.input
                  type="number"
                  placeholder="Price"
                  className={styles.productInput}
                  value={el.price !== 0 ? el.price : ''}
                  onChange={(e) => handleChangeProductPrice(e, el.id)}
                />
                <motion.input
                  type="number"
                  placeholder="Quantity"
                  className={styles.productInput}
                  value={el.quantity !== 0 ? el.quantity : ''}
                  onChange={(e) => handleChangeProductQuantity(e, el.id)}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
    </>
  );
};

export default AddProductForm;
