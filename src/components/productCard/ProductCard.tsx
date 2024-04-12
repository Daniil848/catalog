import React from 'react';
import { useProductCard } from './useProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpFromBracket,
  faCheck,
  faEdit,
  faGripVertical,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Reorder, motion } from 'framer-motion';
import styles from './ProductCard.module.scss';
import Input from '../../UI/input/Input';
import { Product } from '../../app/mainSlice';

interface Props {
  product: Product;
}

const ProductCard = (props: Props) => {
  const {
    handleProductName,
    productImage,
    productName,
    productNameError,
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
    controls,
  } = useProductCard();

  return (
    <>
      <Reorder.Item
        key={props.product.id}
        value={props.product}
        className={styles.reorderItem}
        dragControls={controls}
        dragListener={false}
      >
        <FontAwesomeIcon
          icon={faGripVertical}
          onPointerDown={(event) => controls.start(event)}
          className={styles.reorderIcon}
        />
        {!isEditProduct[props.product.id] ? (
          <motion.div
            className={styles.product}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
          >
            <motion.div className={styles.productImageContainer}>
              {props.product.image ? (
                <motion.img
                  src={props.product.image}
                  alt="product"
                  className={styles.productImage}
                />
              ) : (
                <motion.div className="w-full h-full bg-slate-200 animate-pulse rounded"></motion.div>
              )}
            </motion.div>
            <motion.div className={styles.productInfo}>
              {props.product.title ? (
                <motion.p className={styles.productTitle}>
                  {props.product.title}
                </motion.p>
              ) : (
                <motion.div className="w-1/2 h-1/2 bg-slate-200 rounded animate-pulse" />
              )}
              <motion.div className={styles.wrapper}>
                <motion.p className={styles.productPrice}>
                  Price: <motion.span>${props.product.price}</motion.span>
                </motion.p>
                <motion.p className={styles.productQuantity}>
                  Count: <span>{props.product.quantity}</span>
                </motion.p>
              </motion.div>
            </motion.div>
            <motion.div className={styles.productChangeButtons}>
              <motion.button
                className={styles.productChangeButtonEdit}
                onClick={() => handleSwitchEditProduct(props.product.id)}
              >
                <FontAwesomeIcon icon={faEdit} />
              </motion.button>
              <motion.button
                className={styles.productChangeButtonDelete}
                onClick={() => handleDeleteProduct(props.product)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className={styles.addProductForm}
            key={props.product.id}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
          >
            {productImage[props.product.id] ? (
              <motion.div className={styles.productImageContainer}>
                <motion.img
                  src={productImage[props.product.id]}
                  alt="product"
                  className={styles.productImage}
                />
              </motion.div>
            ) : (
              <motion.div className={styles.productUploadContainer}>
                <motion.input
                  type="file"
                  name={`${props.product.image}-${props.product.id}`}
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files && e.target.files.length > 0
                      ? handleProductImage(
                          URL.createObjectURL(e.target.files[0]),
                          props.product.id,
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
                  name={`${props.product.title}-${props.product.id}`}
                  label="Product name"
                  placeholder="Product name"
                  value={
                    productName[props.product.id] ?? props.product.title ?? ''
                  }
                  onChange={(e) =>
                    handleProductName(e.target.value, props.product.id)
                  }
                  error={productNameError}
                  errorText="There is already such a product"
                />
              </motion.div>
              <motion.div className={styles.wrapper}>
                <motion.div className={styles.productInput}>
                  <Input
                    type="number"
                    name={`${props.product.price}-${props.product.id}`}
                    label="Price"
                    placeholder="Price"
                    value={
                      productPrice[props.product.id] ?? props.product.price ?? 0
                    }
                    onChange={(e) =>
                      handleProductPrice(
                        Number(e.target.value),
                        props.product.id,
                      )
                    }
                  />
                </motion.div>
                <motion.div className={styles.productInput}>
                  <Input
                    type="number"
                    name={`${props.product.quantity}-${props.product.id}`}
                    label="Count"
                    placeholder="Count"
                    value={
                      productCount[props.product.id] ??
                      props.product.quantity ??
                      0
                    }
                    onChange={(e) =>
                      handleProductCount(
                        Number(e.target.value),
                        props.product.id,
                      )
                    }
                  />
                </motion.div>
              </motion.div>
            </motion.div>
            <motion.div className={styles.changeButtons}>
              <motion.button
                className={styles.changeButtonsEdit}
                onClick={() => handleChangeProduct(props.product.id)}
              >
                <FontAwesomeIcon icon={faCheck} />
              </motion.button>
              <motion.button
                className={styles.changeButtonsDelete}
                onClick={() => handleDeleteProduct(props.product)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </Reorder.Item>
    </>
  );
};

export default ProductCard;
