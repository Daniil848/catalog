import React from 'react';
import { useAddProductForm } from './useAddProductForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import styles from './AddProductForm.module.scss';

interface Props {
  categoryId: string;
}

const AddProductForm = (props: Props) => {
  const {
    state,
    handleChangeProductImage,
    handleChangeProductName,
    handleChangeProductPrice,
    handleChangeProductQuantity,
  } = useAddProductForm();

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
