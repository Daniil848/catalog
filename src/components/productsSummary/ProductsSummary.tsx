import React from 'react';
import { useProductSummary } from './useProductSummary';
import { motion } from 'framer-motion';
import styles from './ProductsSummary.module.scss';

const ProductsSummary = () => {
  const { state, totalPriceInCategory } = useProductSummary();

  return (
    <>
      <motion.div className={styles.container}>
        <motion.div
          className={styles.tableContainer}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        >
          <motion.table className={styles.summary}>
            <motion.thead className={styles.summaryHead}>
              <motion.tr>
                <motion.th scope="col" className={styles.summaryHeadTitle}>
                  Product name
                </motion.th>

                <motion.th scope="col" className={styles.summaryHeadTitle}>
                  Category
                </motion.th>
                <motion.th scope="col" className={styles.summaryHeadTitle}>
                  Quantiy
                </motion.th>
                <motion.th scope="col" className={styles.summaryHeadTitle}>
                  Price
                </motion.th>
              </motion.tr>
            </motion.thead>
            {state.categories.map((category) => (
              <motion.tbody key={category.id} className={styles.summaryBody}>
                {state.history[state.history.length - state.historyIndex]
                  .filter((el) => el.categoryId == category.id)
                  .map((product) => (
                    <motion.tr
                      key={product.id}
                      className={styles.summaryBodyTr}
                    >
                      <motion.td className={styles.summaryBodyTd}>
                        {product.title}
                      </motion.td>
                      <motion.td className={styles.summaryBodyTd}>
                        {category.name}
                      </motion.td>
                      <motion.td className={styles.summaryBodyTd}>
                        {product.quantity}
                      </motion.td>
                      <motion.td className={styles.summaryBodyTd}>
                        ${product.price}
                      </motion.td>
                    </motion.tr>
                  ))}
                <motion.tr>
                  <motion.td className={styles.summaryBodyTotal}>
                    {category.name} total:
                  </motion.td>
                  <motion.td className={styles.summaryBodyTotal}></motion.td>
                  <motion.td className={styles.summaryBodyTotal}></motion.td>
                  <motion.td className={styles.summaryBodyTotal}>
                    ${totalPriceInCategory(category.id).toFixed(2)}
                  </motion.td>
                </motion.tr>
              </motion.tbody>
            ))}
          </motion.table>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ProductsSummary;
