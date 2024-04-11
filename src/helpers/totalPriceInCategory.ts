import { Product } from '../app/mainSlice';

export const totalPriceInCategory = (
  categoryID: string,
  products: Product[],
) => {
  const productsInCategory = products.filter(
    (product) => product.categoryId == categoryID,
  );

  let totalPrice = 0;

  for (let i = 0; i < productsInCategory.length; i++) {
    totalPrice += productsInCategory[i].price * productsInCategory[i].quantity;
  }

  return totalPrice;
};
