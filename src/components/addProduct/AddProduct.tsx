import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import styles from './AddProduct.module.scss';
import { useAppDispatch } from '../../app/hooks';
import { setProductsToAdd } from '../../app/mainSlice';

interface Props {
  categoryId: number;
}

const AddProduct = (props: Props) => {
  const dispatch = useAppDispatch();

  const product = {
    id: 0,
    title: '',
    price: 0,
    categoryId: props.categoryId,
    image: '',
    quantity: 0,
  };

  return (
    <>
      <motion.div className={styles.addProduct}>
        <motion.button
          className={styles.addProductButton}
          onClick={() => dispatch(setProductsToAdd(product))}
        >
          <FontAwesomeIcon icon={faPlus} className={styles.addProductIcon} />
        </motion.button>
      </motion.div>
    </>
  );
};

export default AddProduct;
