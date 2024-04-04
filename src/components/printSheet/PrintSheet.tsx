import React, { useRef } from 'react';
import styles from './PrintSheet.module.scss';
import { useAppSelector } from '../../app/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import ReactToPrint from 'react-to-print';

const PrintSheet = () => {
  const state = useAppSelector((state) => state.mainSlice);

  const printRef = useRef(null);

  const totalPriceInCategory = (categoryID: string) => {
    const productsInCategory = state.history[
      state.history.length - state.historyIndex
    ].filter((product) => product.categoryId == categoryID);

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
      <div className={styles.wrapper}>
        <ReactToPrint
          trigger={() => (
            <button className={styles.printbuton}>
              <FontAwesomeIcon icon={faPrint} />
              <span>Print</span>
            </button>
          )}
          content={() => printRef.current}
        />
        <div className={styles.sheet} ref={printRef}>
          <table>
            <caption>
              <p>Contacts:</p>
              <p>Comment:</p>
            </caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            {state.categories.map((category) => (
              <tbody key={category.id}>
                {state.history[state.history.length - state.historyIndex]
                  .filter((el) => el.categoryId == category.id)
                  .map((product) => (
                    <tr key={product.id}>
                      <td>{product.title}</td>
                      <td>{category.name}</td>
                      <td>{product.quantity}</td>
                      <td>{product.price}</td>
                    </tr>
                  ))}
                <tr>
                  <td>{category.name} total:</td>
                  <td></td>
                  <td></td>
                  <td>${totalPriceInCategory(category.id).toFixed(2)}</td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default React.forwardRef(PrintSheet);
