import React from 'react';
import { motion } from 'framer-motion';
import { useAddCategory } from './useAddCategory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import styles from './AddCategory.module.scss';
import { setIsAddCategory } from '../../app/mainSlice';

const AddCategory = () => {
  const { state, dispatch, setCategoryName, handleChangeCtegory } =
    useAddCategory();

  return (
    <motion.div
      className={styles.addCategory}
      initial={{ opacity: 0, width: 0 }}
      animate={{
        opacity: 1,
        width: 'auto',
        transition: {
          duration: 0.6,
        },
      }}
    >
      {!state.isAddCategory ? (
        <motion.button
          onClick={() => dispatch(setIsAddCategory(true))}
          className={styles.addCategoryText}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          Add category <FontAwesomeIcon icon={faPlus} />
        </motion.button>
      ) : (
        <motion.div
          className={styles.addCategoryForm}
          initial={{ width: 0 }}
          animate={{ width: 'auto' }}
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
  );
};

export default AddCategory;
