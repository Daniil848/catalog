import React from 'react';
import { usePrintSheet } from './usePrintSheet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import ReactToPrint from 'react-to-print';
import styles from './PrintSheet.module.scss';

const PrintSheet = () => {
  const { state, printRef, totalPriceInCategory } = usePrintSheet();

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
