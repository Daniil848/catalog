import React from 'react';
import { useHomePage } from './useHomePage';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import ProductCard from '../../components/productCard/ProductCard';
import AddProduct from '../../components/addProduct/AddProduct';
import AddProductForm from '../../components/addProductForm/AddProductForm';
import AddCategory from '../../components/addCategory/AddCategory';
import styles from './HomePage.module.scss';
import ProductsSummary from '../../components/productsSummary/ProductsSummary';

const HomePage = () => {
  const {
    state,
    accordion,
    handleAccordion,
    openEditCategory,
    isEditCategory,
    handleEditCategory,
    setCategoryName,
  } = useHomePage();

  console.log(state.productsToAdd);
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
              <motion.div>
                {isEditCategory !== category.id ? (
                  <motion.p
                    className={styles.categoryName}
                    onClick={() => handleAccordion(category)}
                  >
                    {category.name}
                  </motion.p>
                ) : (
                  <motion.div className={styles.editCategoryForm}>
                    <motion.input
                      type="text"
                      defaultValue={category.name}
                      onChange={(e) => setCategoryName(e.target.value)}
                      className={styles.editCategoryFormInput}
                    />
                    <motion.button
                      onClick={() => handleEditCategory(category.id)}
                      className={styles.editCategoryFormButton}
                    >
                      Ok
                    </motion.button>
                  </motion.div>
                )}
              </motion.div>
              <motion.div className={styles.categoryEdit}>
                <motion.button
                  onClick={() => openEditCategory(category)}
                  className={styles.categoryEditIcon}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </motion.button>
                <motion.button className={styles.categoryDeleteIcon}>
                  <FontAwesomeIcon icon={faTrash} />
                </motion.button>
              </motion.div>
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
                      .filter((product) => product.categoryId == category.id)
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
        <AddCategory />
      </motion.div>
      <ProductsSummary />
    </>
  );
};

export default HomePage;
