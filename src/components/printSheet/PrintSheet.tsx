/* eslint-disable react/display-name */
import React from 'react';
import { usePrintSheet } from './usePrintSheet';
import styles from './PrintSheet.module.scss';

interface Props {
  contacts: string;
  comment: string;
}

const PrintSheet = React.forwardRef((props: Props, ref: any) => {
  const { state, totalPriceInCategory } = usePrintSheet();

  return (
    <>
      <div className={styles.sheet}>
        <table ref={ref}>
          <caption>
            <p>Contacts: {props.contacts}</p>
            <p>Comment: {props.comment}</p>
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
    </>
  );
});

export default PrintSheet;
