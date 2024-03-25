import React from 'react';
import { useHomePage } from './useHomePage';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../../components/productCard/ProductCard';
import AddProduct from '../../components/addProduct/AddProduct';
import AddProductForm from '../../components/addProductForm/AddProductForm';
import styles from './HomePage.module.scss';

const HomePage = () => {
  const { state, accordion, handleAccordion, totalPriceInCategory } =
    useHomePage();

  console.log(state.productsToAdd);

  return (
    <>
      <motion.div className={styles.container}>
        {state.categories.map((category) => (
          <motion.div key={category.id}>
            <motion.div className={styles.category}>
              <motion.p
                className={styles.categoryName}
                onClick={() => handleAccordion(category)}
              >
                {category.name}
              </motion.p>
            </motion.div>
            <AnimatePresence>
              {accordion[category.id] && (
                <motion.div
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
                  <motion.div className={styles.products}>
                    {state.products
                      .filter((el) => el.categoryId == category.id)
                      .map((product) => (
                        <ProductCard product={product} key={product.id} />
                      ))}
                    <AddProduct categoryId={category.id} />
                    <AddProductForm categoryId={category.id} />
                  </motion.div>
                  {/* <motion.div className={styles.categoryTotal}>
                    <motion.p>Total:</motion.p>
                    <motion.p>
                      ${totalPriceInCategory(category.id).toFixed(2)}
                    </motion.p>
                  </motion.div> */}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default HomePage;
