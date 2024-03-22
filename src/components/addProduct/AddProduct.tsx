import React from 'react';
import { useAppDispatch } from '../../app/hooks';
import { setProductsToAdd } from '../../app/mainSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { nanoid } from 'nanoid';
import styles from './AddProduct.module.scss';

interface Props {
  categoryId: number;
}

const AddProduct = (props: Props) => {
  const dispatch = useAppDispatch();

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
