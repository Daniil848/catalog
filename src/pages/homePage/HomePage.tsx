import React from 'react';
import { useHomePage } from './useHomePage';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../../components/productCard/ProductCard';
import AddProduct from '../../components/addProduct/AddProduct';
import AddProductForm from '../../components/addProductForm/AddProductForm';
import styles from './HomePage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  const {
    state,
    accordion,
    handleAccordion,
    handleChangeCtegory,
    isAddCategory,
    setCategoryName,
    setIsAddCategory,
  } = useHomePage();

  console.log(state.productsToAdd);
  console.log(state.categories);

  return (
    <>
      <motion.div className={styles.container}>
        {state.categories.map((category) => (
          <motion.div key={category.id}>
            <motion.div
              className={styles.category}
              initial={{ opacity: 0, width: 0 }}
              animate={{
                opacity: 1,
                width: 'auto',
                transition: {
                  duration: 0.5,
                },
              }}
              exit={{ opacity: 0, width: 0 }}
            >
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
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
        <motion.div className={styles.addCategory}>
          {!isAddCategory ? (
            <motion.p
              onClick={() => setIsAddCategory(true)}
              className={styles.addCategoryText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Add category <FontAwesomeIcon icon={faPlus} />
            </motion.p>
          ) : (
            <motion.div
              className={styles.addCategoryForm}
              initial={{ width: 0 }}
              animate={{ width: 'auto' }}
              exit={{ width: 0 }}
            >
              <motion.input
                type="text"
                onChange={(e) => setCategoryName(e.target.value)}
                className={styles.addCategoryFormInput}
              />
              <motion.button
                className={styles.addCategoryFormButton}
                onClick={() => handleChangeCtegory()}
              >
                Ok
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default HomePage;
