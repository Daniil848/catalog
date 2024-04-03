import React from 'react';
import { useProductCard } from './useProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpFromBracket,
  faCheck,
  faEdit,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import styles from './ProductCard.module.scss';
import Input from '../../UI/input/Input';

interface Props {
  categoryId: string;
}

const ProductCard = (props: Props) => {
  const {
    state,
    handleProductName,
    productImage,
    productName,
    productPrice,
    productCount,
    setProductImage,
    handleProductImage,
    handleProductPrice,
    handleProductCount,
    handleChangeProduct,
    isEditProduct,
    handleSwitchEditProduct,
    handleDeleteProduct,
  } = useProductCard();

  return (
    <>
      {state.history[state.history.length - 1]
        .filter((i) => i.categoryId == props.categoryId)
        .map((product) => (
          <motion.div key={product.id}>
            {!isEditProduct[product.id] ? (
              <motion.div
                className={styles.product}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
              >
                <motion.div className={styles.productImageContainer}>
                  <motion.img
                    src={product.image}
                    alt="product"
                    className={styles.productImage}
                  />
                </motion.div>
                <motion.div className={styles.productInfo}>
                  <motion.p className={styles.productTitle}>
                    {product.title}
                  </motion.p>
                  <motion.div className={styles.wrapper}>
                    <motion.p className={styles.productPrice}>
                      Price: <motion.span>${product.price}</motion.span>
                    </motion.p>
                    <motion.p className={styles.productQuantity}>
                      Count: <span>{product.quantity}</span>
                    </motion.p>
                  </motion.div>
                </motion.div>
                <motion.div className={styles.productChangeButtons}>
                  <motion.button
                    className={styles.productChangeButtonEdit}
                    onClick={() => handleSwitchEditProduct(product.id)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </motion.button>
                  <motion.button
                    className={styles.productChangeButtonDelete}
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </motion.button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                className={styles.addProductForm}
                key={product.id}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
              >
                {productImage[product.id] ? (
                  <motion.div className={styles.productImageContainer}>
                    <motion.img
                      src={productImage[product.id]}
                      alt="product"
                      className={styles.productImage}
                    />
                  </motion.div>
                ) : (
                  <motion.div className={styles.productUploadContainer}>
                    <motion.input
                      type="file"
                      name={`${product.image}-${product.id}`}
                      accept="image/*"
                      onChange={(e) =>
                        e.target.files && e.target.files.length > 0
                          ? handleProductImage(
                              URL.createObjectURL(e.target.files[0]),
                              product.id,
                            )
                          : setProductImage({})
                      }
                      id="upload-photo"
                    ></motion.input>
                    <FontAwesomeIcon
                      icon={faArrowUpFromBracket}
                      className={styles.productUploadIcon}
                    ></FontAwesomeIcon>
                  </motion.div>
                )}
                <motion.div className={styles.productInfo}>
                  <motion.div className={styles.productNameInput}>
                    <Input
                      type="text"
                      name={`${product.title}-${product.id}`}
                      label="Product name"
                      placeholder="Product name"
                      value={productName[product.id] ?? product.title ?? ''}
                      onChange={(e) =>
                        handleProductName(e.target.value, product.id)
                      }
                    />
                  </motion.div>
                  <motion.div className={styles.wrapper}>
                    <motion.div className={styles.productInput}>
                      <Input
                        type="number"
                        name={`${product.price}-${product.id}`}
                        label="Price"
                        placeholder="Price"
                        value={productPrice[product.id] ?? product.price ?? ''}
                        onChange={(e) =>
                          handleProductPrice(Number(e.target.value), product.id)
                        }
                      />
                    </motion.div>
                    <motion.div className={styles.productInput}>
                      <Input
                        type="number"
                        name={`${product.quantity}-${product.id}`}
                        label="Count"
                        placeholder="Count"
                        value={
                          productCount[product.id] ?? product.quantity ?? ''
                        }
                        onChange={(e) =>
                          handleProductCount(Number(e.target.value), product.id)
                        }
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
                <motion.div className={styles.changeButtons}>
                  <motion.button
                    className={styles.changeButtonsEdit}
                    onClick={() => handleChangeProduct(product.id)}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </motion.button>
                  <motion.button
                    className={styles.changeButtonsDelete}
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        ))}
    </>
  );
};

export default ProductCard;
