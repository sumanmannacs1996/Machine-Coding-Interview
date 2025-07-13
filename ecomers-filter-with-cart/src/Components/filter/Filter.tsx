import React, { useEffect, useMemo } from "react";
import styles from "./Filter.module.css";
import { getEcomersState } from "../../Context/context";
import StarRating from "../starRatting/StarRatting";
import { useSearchParams } from "react-router-dom";

export const FILER_MAP_WITH_DISPATCH_TYPE = {
  SORT_BY: "sortType",
  SORT_TYPE: "sortType",
  CATEGORIES: "category",
  RATTING: "ratting",
  SEARCH: "search",
};

function Filter() {
  const [searchParams, setSerchParams] = useSearchParams();
  const {
    state: { products = [] },
    filterState,
    filterDispatch,
  } = getEcomersState();
  const { sortBy, sortType, ratting, category } = filterState;
  const catagoryList = useMemo(() => {
    if (products && products.length > 0) {
      const allCatagory = products.map((product) => product.category);
      return ["", ...new Set(allCatagory)];
    } else {
      return [];
    }
  }, [products]);

  useEffect(() => {
    if (searchParams.size) {
      searchParams.forEach((value, key) => {
        filterDispatch({
          type: FILER_MAP_WITH_DISPATCH_TYPE[key],
          payload: value,
        });
      });
    }
  }, []);

  useEffect(() => {
    setSerchParams(filterState);
  }, [filterState]);
  return (
    <div className={styles.filterContainer}>
      <div style={{ display: "flex", gap: "20px" }}>
        <div className={styles.filterElement}>
          <label>Sort By:-</label>
          <select
            onChange={(e) =>
              filterDispatch({ type: "SORT_BY", payload: e.target.value })
            }
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
              filterDispatch({
                type: "SORT_TYPE",
                payload: sortType === "asc" ? "dsc" : "asc",
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
          onChange={(e) =>
            filterDispatch({ type: "CATEGORIES", payload: e.target.value })
          }
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
          onChange={(value) =>
            filterDispatch({ type: "RATTING", payload: parseInt(value) })
          }
        />
      </div>
      <button
        onClick={() => filterDispatch({ type: "RESET", payload: "" })}
        style={{ width: "100%", cursor: "pointer", padding: "10px 15px" }}
      >
        Clear Filter
      </button>
    </div>
  );
}

export default Filter;
