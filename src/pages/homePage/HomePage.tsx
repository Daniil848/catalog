import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getCategories, getProducts } from '../../app/mainSlice';
import styles from './HomePage.module.scss';
import ProductCard from '../../components/productCard/ProductCard';

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
                  <ProductCard product={product} key={product.id} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
