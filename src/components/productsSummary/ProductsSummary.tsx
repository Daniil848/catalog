import React from 'react';
import { useProductSummary } from './useProductSummary';
import { motion } from 'framer-motion';
import styles from './ProductsSummary.module.scss';

const ProductsSummary = () => {
  const {
    state,
    openSummary,
    setOpenSummary,
    totalPrice,
    totalPriceInCategory,
  } = useProductSummary();

  return (
    <>
      <motion.div className={styles.container}>
        <motion.button
          className={styles.showButton}
          onClick={() => setOpenSummary(!openSummary)}
        >
          {openSummary
            ? 'Hide the product summary'
            : 'Show the product summary'}
        </motion.button>
        <motion.div className={styles.tableContainer}>
          <motion.table className={styles.summary}>
            <motion.caption className={styles.tableCaption}>
              Total price: ${totalPrice().toFixed(2)}
            </motion.caption>
            {openSummary && (
              <>
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
                  <motion.tbody
                    key={category.id}
                    className={styles.summaryBody}
                  >
                    {state.products
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
                      <motion.td
                        className={styles.summaryBodyTotal}
                      ></motion.td>
                      <motion.td
                        className={styles.summaryBodyTotal}
                      ></motion.td>
                      <motion.td className={styles.summaryBodyTotal}>
                        ${totalPriceInCategory(category.id).toFixed(2)}
                      </motion.td>
                    </motion.tr>
                  </motion.tbody>
                ))}
              </>
            )}
          </motion.table>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ProductsSummary;
