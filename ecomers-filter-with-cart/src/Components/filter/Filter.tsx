import React, { useMemo } from "react";
import styles from "./Filter.module.css";
import { getEcomersState } from "../../Context/context";
import StarRating from "../starRatting/StarRatting";
import { useUpdateSearchParams } from "../../hooks/useUpdateSearchParams";
import { useGetSearchParams } from "../../hooks/useGetSearchParams";

function Filter() {
  // const [searchParams, setSerchParams] = useSearchParams();
  const { removeSearchParams, updateSearchParams } = useUpdateSearchParams();
  const {
    sortBy = "",
    sortType = "",
    ratting = "",
    category = "",
  } = useGetSearchParams();
  const {
    state: { products = [] },
  } = getEcomersState();
  const catagoryList = useMemo(() => {
    if (products && products.length > 0) {
      const allCatagory = products.map((product) => product.category);
      return ["", ...new Set(allCatagory)];
    } else {
      return [];
    }
  }, [products]);

  return (
    <div className={styles.filterContainer}>
      <div style={{ display: "flex", gap: "20px" }}>
        <div className={styles.filterElement}>
          <label>Sort By:-</label>
          <select
            onChange={(e) => updateSearchParams({ sortBy: e.target.value })}
            value={sortBy}
          >
            {["", "price", "rating"].map((sortType) => (
              <option key={sortType} value={sortType}>
                {sortType}
              </option>
            ))}
          </select>
        </div>
        {sortBy && (
          <button
            onClick={() =>
              updateSearchParams({
                sortType: sortType === "asc" ? "dsc" : "asc",
              })
            }
          >
            {sortType === "asc" ? "⬆️" : "⬇️"}
          </button>
        )}
      </div>
      <div className={styles.filterElement}>
        <label>Catagory:-</label>
        <select
          onChange={(e) => updateSearchParams({ category: e.target.value })}
          value={category}
        >
          {catagoryList.map((catagory) => (
            <option key={catagory} value={catagory}>
              {catagory}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.filterElement}>
        <label>Ratting:-</label>
        <StarRating
          currentRating={ratting}
          onChange={(value) => updateSearchParams({ ratting: parseInt(value) })}
        />
      </div>
      <button
        onClick={() =>
          removeSearchParams([
            "sortBy",
            "sortType",
            "ratting",
            "category",
            "search",
          ])
        }
        style={{ width: "100%", cursor: "pointer", padding: "10px 15px" }}
      >
        Clear Filter
      </button>
    </div>
  );
}

export default Filter;
