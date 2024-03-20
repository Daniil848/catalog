import React from 'react';
import { Product } from '../../app/mainSlice';
import styles from './ProductCard.module.scss';

interface Props {
  product: Product;
}

const ProductCard = (props: Props) => {
  return (
    <>
      <div className={styles.product}>
        <div className={styles.productImageContainer}>
          <img
            src={props.product.image}
            alt="product image"
            className={styles.productImage}
          />
        </div>
        <div className={styles.productInfo}>
          <p className={styles.productTitle}>{props.product.title}</p>
          <div className={styles.wrapper}>
            <p className={styles.productPrice}>
              Price: <span>${props.product.price}</span>
            </p>
            <p className={styles.productQuantity}>
              Quantity: <span>{props.product.quantity}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
