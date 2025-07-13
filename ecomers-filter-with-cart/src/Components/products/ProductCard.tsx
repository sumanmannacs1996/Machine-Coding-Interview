import React from "react";
import styles from "./products.module.css";
import StarRating from "../starRatting/StarRatting";

function ProductCard({ product }) {
  const { thumbnail, title, id, price, rating } = product;
  return (
    <div className={styles.prouctCard}>
      <img src={thumbnail} alt={title} />
      <span className={styles.prouctCard__title}>{title}</span>
      <div className={styles.prouctCard__other}>
        <span className={styles.prouctCard__other__price}>${price}</span>
        <span className={styles.prouctCard__other__ratting}>
          <StarRating currentRating={Math.ceil(rating)} isOnlyView={true} />
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
