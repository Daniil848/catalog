import React from 'react';
import { Product } from '../../app/mainSlice';
import styles from './ProductCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useProductCard } from './useProductCard';

interface Props {
  product: Product;
}

const ProductCard = (props: Props) => {
  const { handleDeleteProduct } = useProductCard();

  return (
    <>
      <div className={styles.product}>
        <div className={styles.productChangeButtons}>
          <button className={styles.productChangeButtonEdit}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className={styles.productChangeButtonDelete}
            onClick={() => handleDeleteProduct(props.product.id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
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
