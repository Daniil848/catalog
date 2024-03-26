import React from 'react';
import styles from './ProductsSummary.module.scss';
import { useAppSelector } from '../../app/hooks';

const ProductsSummary = () => {
  const state = useAppSelector((state) => state.mainSlice);

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

  return (
    <>
      <div className={styles.container}>
        <button>Show products summary</button>
        <div className={styles.tableContainer}>
          <caption></caption>
          <table className={styles.summary}>
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
              <>
                <tbody>
                  {state.products
                    .filter((el) => el.categoryId == category.id)
                    .map((product) => (
                      <tr key={product.id} className="w-full">
                        <td className="bg-white border-b px-4 py-3">
                          {product.title}
                        </td>
                        <td className="bg-white border-b px-4 py-3">
                          {category.name}
                        </td>
                        <td className="bg-white border-b px-4 py-3">
                          {product.quantity}
                        </td>
                        <td className="bg-white border-b px-4 py-3">
                          ${product.price}
                        </td>
                      </tr>
                    ))}
                  <tr>
                    <td className="bg-slate-100 border-b px-4 py-3 w-full mt-4 uppercase">
                      {category.name} total:
                    </td>
                    <td className="bg-slate-100 border-b px-4 py-3 w-full mt-4"></td>
                    <td className="bg-slate-100 border-b px-4 py-3 w-full mt-4"></td>
                    <td className="bg-slate-100 border-b px-4 py-3 w-full">
                      ${totalPriceInCategory(category.id).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default ProductsSummary;
