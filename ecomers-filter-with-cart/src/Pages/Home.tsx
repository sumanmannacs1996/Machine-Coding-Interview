import React, { useMemo } from "react";
import ProductWithPagination from "../Components/products/ProductWithPagination";
import { getEcomersState } from "../Context/context";
import styles from "./Home.module.css";
import Filter from "../Components/filter/Filter";
import { useGetSearchParams } from "../hooks/useGetSearchParams";

function Home() {
  const {
    sortBy = "",
    sortType = "",
    ratting = 0,
    category = "",
    search = "",
  } = useGetSearchParams();
  const {
    state: { products },
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
      filterList = filterList.sort((a, b) => {
        const aValue = a[sortBy as keyof typeof a];
        const bValue = b[sortBy as keyof typeof b];
        // Only sort if both values are numbers
        if (typeof aValue === "number" && typeof bValue === "number") {
          return sortType === "asc" ? aValue - bValue : bValue - aValue;
        }
        // Fallback for string sorting
        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortType === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        return 0;
      });
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
