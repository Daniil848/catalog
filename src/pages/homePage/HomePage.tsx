import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getCategories, getProducts } from '../../app/mainSlice';
import ProductCard from '../../components/productCard/ProductCard';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const [accordion, setAccordion] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, []);

  return (
    <>
      <div className={styles.container}>
        {state.categories.map((category) => (
          <div key={category.id}>
            <div className={styles.category}>
              <p
                className={styles.categoryName}
                onClick={() => setAccordion(!accordion)}
              >
                {category.name}
              </p>
            </div>
            <div
              className={accordion ? styles.products : styles.hiddenProducts}
            >
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
