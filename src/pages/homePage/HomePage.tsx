import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Category, getCategories, getProducts } from '../../app/mainSlice';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../../components/productCard/ProductCard';
import styles from './HomePage.module.scss';

interface Accordion {
  [key: string]: boolean;
}

const HomePage = () => {
  const state = useAppSelector((state) => state.mainSlice);
  const dispatch = useAppDispatch();

  const [accordion, setAccordion] = useState<Accordion>({});

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, []);

  const handleAccordion = (category: Category) => {
    setAccordion((prevState: any) => ({
      ...prevState,
      [category.id]: !prevState[category.id] || false,
    }));
  };

  return (
    <>
      <div className={styles.container}>
        {state.categories.map((category) => (
          <div key={category.id}>
            <div className={styles.category}>
              <p
                className={styles.categoryName}
                onClick={() => handleAccordion(category)}
              >
                {category.name}
              </p>
            </div>
            <AnimatePresence>
              {accordion[category.id] && (
                <motion.div
                  className={styles.products}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: 1,
                    height: 'auto',
                    transition: {
                      duration: 0.5,
                    },
                  }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {state.products
                    .filter((el) => el.categoryId == category.id)
                    .map((product) => (
                      <ProductCard product={product} key={product.id} />
                    ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
