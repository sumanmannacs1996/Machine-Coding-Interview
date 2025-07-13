import React, { useMemo } from "react";
import ProductWithPagination from "../Components/products/ProductWithPagination";
import { getEcomersState } from "../Context/context";
import styles from "./Home.module.css";
import Filter from "../Components/filter/Filter";

function Home() {
  const {
    state: { products },
    filterState: { sortBy, sortType, category, search, ratting },
  } = getEcomersState();

  const filterdProducts = useMemo(() => {
    let filterList = products || [];
    if (category) {
      filterList = filterList.filter(
        (product) => product.category === category
      );
    }
    if (ratting) {
      filterList = filterList.filter(
        (product) => Number(product.rating) <= Number(ratting)
      );
    }
    if (search) {
      filterList = filterList.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (sortBy) {
      filterList = filterList.sort((a, b) =>
        sortType === "asc" ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]
      );
    }
    return filterList;
  }, [products, sortBy, sortType, category, search, ratting]);
  return (
    <div className={styles.homeContainer}>
      <div className={styles.filter}>
        <Filter />
      </div>
      <div className={styles.products}>
        <ProductWithPagination products={filterdProducts} />
      </div>
    </div>
  );
}

export default Home;
