import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { updateProductsToAdd } from '../../app/mainSlice';
import styles from './AddProductForm.module.scss';

interface Props {
  categoryId: number;
}

const AddProductForm = (props: Props) => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const handleChangeProductImage = (
    event: React.ChangeEvent<HTMLInputElement>,
    productId: string,
  ) => {
    const updatedProducts = state.productsToAdd.map((product) => {
      if (product.id === productId && event.target.files) {
        return {
          ...product,
          image: URL.createObjectURL(event.target.files[0]),
        };
      }
      return product;
    });

    dispatch(updateProductsToAdd(updatedProducts));
  };

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
        return { ...product, quantity: event.target.value };
      }
      return product;
    });

    dispatch(updateProductsToAdd(updatedProducts));
  };

  return (
    <>
      {state.productsToAdd
        .filter((i) => i.categoryId == props.categoryId)
        .map((product) => (
          <motion.div
            className={styles.addProductForm}
            key={product.id}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
          >
            {!product.image ? (
              <motion.div className={styles.productUploadContainer}>
                <motion.input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleChangeProductImage(e, product.id)}
                  id="upload-photo"
                ></motion.input>
                <FontAwesomeIcon
                  icon={faArrowUpFromBracket}
                  className={styles.productUploadIcon}
                ></FontAwesomeIcon>
              </motion.div>
            ) : (
              <motion.div className={styles.productImageContainer}>
                <motion.img
                  src={product.image}
                  alt="product image"
                  className={styles.productImage}
                />
              </motion.div>
            )}
            <motion.div className={styles.productInfo}>
              <motion.textarea
                placeholder="Product name"
                className={styles.productArea}
                value={product.title}
                onChange={(e) => handleChangeProductName(e, product.id)}
              />
              <motion.div
                aria-placeholder="Product name"
                className={styles.wrapper}
              >
                <motion.input
                  type="number"
                  placeholder="Price"
                  className={styles.productInput}
                  value={product.price !== 0 ? product.price : ''}
                  onChange={(e) => handleChangeProductPrice(e, product.id)}
                />
                <motion.input
                  type="number"
                  placeholder="Quantity"
                  className={styles.productInput}
                  value={product.quantity !== 0 ? product.quantity : ''}
                  onChange={(e) => handleChangeProductQuantity(e, product.id)}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
    </>
  );
};

export default AddProductForm;
