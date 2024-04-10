/* eslint-disable react/display-name */
import React, { ForwardedRef } from 'react';
import { usePrintSheet } from './usePrintSheet';
import styles from './PrintSheet.module.scss';
import { totalPriceInCategory } from '../../helpers/totalPriceInCategory';

interface Props {
  contacts: string;
  comment: string;
}

const PrintSheet = React.forwardRef(
  (props: Props, ref: ForwardedRef<HTMLTableElement>) => {
    const { state } = usePrintSheet();

    return (
      <>
        <div className={styles.sheet}>
          <table ref={ref} className="m-[2cm]">
            <caption className="text-start p-4 border">
              <p>Contacts: {props.contacts}</p>
              <p>Comment: {props.comment}</p>
            </caption>
            <thead>
              <tr>
                <th className="w-fit p-4 text-center border bg-slate-100">
                  Image
                </th>
                <th className="w-fit p-4 text-center border bg-slate-100">
                  Name
                </th>
                <th className="w-fit p-4 text-center border bg-slate-100">
                  Category
                </th>
                <th className="w-fit p-4 text-center border bg-slate-100">
                  Quantity
                </th>
                <th className="w-fit p-4 text-center border bg-slate-100">
                  Price
                </th>
              </tr>
            </thead>
            {state.categories.map((category) => (
              <tbody key={category.id}>
                {state.history[
                  state.history.length - state.historyIndex
                ].products
                  .filter((el) => el.categoryId == category.id)
                  .map((product) => (
                    <tr key={product.id}>
                      <td className="w-full min-h-[69px] p-4 border flex items-center justify-center">
                        {product.image && (
                          <img
                            src={product.image}
                            alt=""
                            width="70"
                            height="70"
                          />
                        )}
                      </td>
                      <td className="w-fit p-4 text-center border">
                        {product.title}
                      </td>
                      <td className="w-fit p-4 text-center border">
                        {category.name}
                      </td>
                      <td className="w-fit p-4 text-center border">
                        {product.quantity}
                      </td>
                      <td className="w-fit p-4 text-center border">
                        {product.price}
                      </td>
                    </tr>
                  ))}
                <tr className="border border-gray-200">
                  <td className="w-fit p-4 text-center font-semibold">
                    {category.name} total:
                  </td>
                  <td className="w-fit p-4 text-center"></td>
                  <td className="w-fit p-4 text-center"></td>
                  <td className="w-fit p-4 text-center"></td>
                  <td className="w-fit p-4 text-center font-semibold">
                    $
                    {totalPriceInCategory(
                      category.id,
                      state.history[state.history.length - state.historyIndex]
                        .products,
                    ).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      </>
    );
  },
);

export default PrintSheet;
