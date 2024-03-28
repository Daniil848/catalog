import React from 'react';
import { useProductSummary } from './useProductSummary';
import styles from './ProductsSummary.module.scss';

const ProductsSummary = () => {
  const {
    state,
    openSummary,
    totalPrice,
    totalPriceInCategory,
    handleOpenSummary,
    summaryRef,
  } = useProductSummary();

  return (
    <>
      <div className={styles.container}>
        <button
          className={styles.showButton}
          onClick={() => handleOpenSummary()}
        >
          {openSummary
            ? 'Hide the product summary'
            : 'Show the product summary'}
        </button>
        <div className={styles.tableContainer} ref={summaryRef}>
          <table className={styles.summary}>
            <caption className={styles.tableCaption}>
              Total price: ${totalPrice().toFixed(2)}
            </caption>
            {openSummary && (
              <>
                <thead className={styles.summaryHead}>
                  <tr>
                    <th scope="col" className={styles.summaryHeadTitle}>
                      Product name
                    </th>

                    <th scope="col" className={styles.summaryHeadTitle}>
                      Category
                    </th>
                    <th scope="col" className={styles.summaryHeadTitle}>
                      Quantiy
                    </th>
                    <th scope="col" className={styles.summaryHeadTitle}>
                      Price
                    </th>
                  </tr>
                </thead>
                {state.categories.map((category) => (
                  <tbody key={category.id} className={styles.summaryBody}>
                    {state.products
                      .filter((el) => el.categoryId == category.id)
                      .map((product) => (
                        <tr key={product.id} className={styles.summaryBodyTr}>
                          <td className={styles.summaryBodyTd}>
                            {product.title}
                          </td>
                          <td className={styles.summaryBodyTd}>
                            {category.name}
                          </td>
                          <td className={styles.summaryBodyTd}>
                            {product.quantity}
                          </td>
                          <td className={styles.summaryBodyTd}>
                            ${product.price}
                          </td>
                        </tr>
                      ))}
                    <tr>
                      <td className={styles.summaryBodyTotal}>
                        {category.name} total:
                      </td>
                      <td className={styles.summaryBodyTotal}></td>
                      <td className={styles.summaryBodyTotal}></td>
                      <td className={styles.summaryBodyTotal}>
                        ${totalPriceInCategory(category.id).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </>
            )}
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductsSummary;
