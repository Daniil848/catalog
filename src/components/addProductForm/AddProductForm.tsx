import React from 'react';
import { useAddProductForm } from './useAddProductForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpFromBracket,
  faEdit,
  faTrash,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import styles from './AddProductForm.module.scss';
import Input from '../../UI/input/Input';

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
      {state.products
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
              <motion.div className={styles.productNameInput}>
                <Input
                  type="text"
                  label="Product name"
                  placeholder="Product name"
                  value={product.title}
                  onChange={(e) => handleChangeProductName(e, product.id)}
                />
              </motion.div>
              <motion.div className={styles.wrapper}>
                <motion.div className={styles.productInput}>
                  <Input
                    type="number"
                    label="Price"
                    placeholder="Price"
                    value={product.price !== 0 ? product.price : ''}
                    onChange={(e) => handleChangeProductPrice(e, product.id)}
                  />
                </motion.div>
                <motion.div className={styles.productInput}>
                  <Input
                    type="number"
                    label="Quantity"
                    placeholder="Quantity"
                    value={product.quantity !== 0 ? product.quantity : ''}
                    onChange={(e) => handleChangeProductQuantity(e, product.id)}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div className={styles.changeButtons}>
              <motion.button className={styles.changeButtons}>
                <FontAwesomeIcon icon={faEdit} />
              </motion.button>
              <motion.button className={styles.changeButtons}>
                <FontAwesomeIcon icon={faTrash} />
              </motion.button>
            </motion.div>
          </motion.div>
        ))}
    </>
  );
};

export default AddProductForm;
