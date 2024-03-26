import React, { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './ProductsSummary.module.scss';

const ProductsSummary = () => {
  const state = useAppSelector((state) => state.mainSlice);

  const [openSummary, setOpenSummary] = useState<boolean>(false);

  const totalPriceInCategory = (categoryID: string) => {
    const productsInCategory = state.products.filter(
      (product) => product.categoryId == categoryID,
    );
    const totalPriceInCategory = productsInCategory
      .map((el) => el.price)
      .reduce((acc, number) => acc + number, 0);

    const totalQuantityInCategory = productsInCategory
      .map((el) => el.quantity)
      .reduce((acc, number) => acc + number, 0);
    return totalPriceInCategory * totalQuantityInCategory;
  };

  const totalPrice = () => {
    const totalPrice = state.products
      .map((el) => el.price)
      .reduce((acc, number) => acc + number, 0);

    const totalQuantity = state.products
      .map((el) => el.quantity)
      .reduce((acc, number) => acc + number, 0);

    return totalPrice * totalQuantity;
  };

  return (
    <>
      <motion.div
        className={styles.container}
        initial={{ y: '96px' }}
        exit={{ y: '96px' }}
      >
        <motion.button className={styles.showButton}>
          Show the product summary
        </motion.button>
        <motion.div className={styles.tableContainer}>
          <motion.table className={styles.summary}>
            <motion.caption className={styles.tableCaption}>
              Total price: ${totalPrice().toFixed(2)}
            </motion.caption>
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
              <>
                <motion.tbody>
                  {state.products
                    .filter((el) => el.categoryId == category.id)
                    .map((product) => (
                      <motion.tr key={product.id} className="w-full">
                        <motion.td className="bg-white border-b px-4 py-3">
                          {product.title}
                        </motion.td>
                        <motion.td className="bg-white border-b px-4 py-3">
                          {category.name}
                        </motion.td>
                        <motion.td className="bg-white border-b px-4 py-3">
                          {product.quantity}
                        </motion.td>
                        <motion.td className="bg-white border-b px-4 py-3">
                          ${product.price}
                        </motion.td>
                      </motion.tr>
                    ))}
                  <motion.tr>
                    <motion.td className="bg-slate-100 border-b px-4 py-3 w-full mt-4 uppercase">
                      {category.name} total:
                    </motion.td>
                    <motion.td className="bg-slate-100 border-b px-4 py-3 w-full mt-4"></motion.td>
                    <motion.td className="bg-slate-100 border-b px-4 py-3 w-full mt-4"></motion.td>
                    <motion.td className="bg-slate-100 border-b px-4 py-3 w-full">
                      ${totalPriceInCategory(category.id).toFixed(2)}
                    </motion.td>
                  </motion.tr>
                </motion.tbody>
              </>
            ))}
          </motion.table>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ProductsSummary;
