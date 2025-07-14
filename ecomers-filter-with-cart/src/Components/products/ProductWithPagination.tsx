import React, { useState } from "react";
import styles from "./products.module.css";
import ProductCard from "./ProductCard";
import type { productType } from "../../Context/context";

type ProductWithPaginationProps = {
  products: productType[];
};

function ProductWithPagination({ products = [] }: ProductWithPaginationProps) {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(12);

  const handelPrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handelNext = () => {
    if (page < Math.ceil(products.length / pageSize)) {
      setPage((prev) => prev + 1);
    }
  };

  if (!Array.isArray(products) || products.length <= 0) {
    return <div>No Product Available!</div>;
  }

  return (
    <div className={styles.productsWrapper}>
      <div className={styles.productListContiner}>
        {products
          .slice((page - 1) * pageSize, page * pageSize)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
      <div className={styles.paginationContainer}>
        <select
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1);
          }}
        >
          {[12, 18, 24, 30].map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
        <div className={styles.paginationContainer__buttons}>
          <button onClick={handelPrev}>◀️</button>
          {[...Array(Math.ceil(products.length / pageSize))].map((_, idx) => (
            <span
              className={idx + 1 === page ? styles.pagination__selected : ""}
              key={idx + 1}
              onClick={() => setPage(idx + 1)}
            >
              {idx + 1}
            </span>
          ))}
          <button onClick={handelNext}>▶️</button>
        </div>
      </div>
    </div>
  );
}

export default ProductWithPagination;
