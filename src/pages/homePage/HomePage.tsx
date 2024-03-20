import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getCategories, getProducts } from '../../app/mainSlice';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, []);

  return (
    <>
      <div className={styles.container}>
        {state.categories.map((category) => (
          <div key={category.id}>
            <p className={styles.categoryName}>{category.name}</p>
            <div className={styles.products}>
              {state.products
                .filter((el) => el.categoryId == category.id)
                .map((product) => (
                  <div key={product.id} className={styles.product}>
                    <div className={styles.productImageContainer}>
                      <img
                        src={product.image}
                        alt="product image"
                        className={styles.productImage}
                      />
                    </div>
                    <div className={styles.productInfo}>
                      <p className={styles.productTitle}>{product.title}</p>
                      <div className={styles.wrapper}>
                        <p className={styles.productPrice}>
                          Price: <span>${product.price}</span>
                        </p>
                        <p className={styles.productQuantity}>
                          Quantity: <span>{product.quantity}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
