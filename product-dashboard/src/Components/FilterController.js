import React, { useEffect, useState } from "react";
import "../App.css";
import { fetchData } from "../Utils";

export default function FilterController({
  filterState,
  setFilterState,
  dispatch,
}) {
  const [productCatagory, setProductCatagory] = useState([]);
  // const [selectedCatagory, setSelectedCatagory] = useState('');

  useEffect(() => {
    (async function () {
      const catagoryList = await fetchData(
        `https://dummyjson.com/products/categories`
      );
      setProductCatagory(catagoryList.slice(0, 12));
    })();
  }, []);
  return (
    <div className="filter-controller">
      <div className="filter-controller-box">
        <span>Sorting:-</span>
        <div className="sort-container">
          <select
            onChange={(e) =>
              setFilterState({ ...filterState, sortOption: e.target.value })
            }
          >
            <option></option>
            <option value="price">Price</option>
            <option value="rating">Rating</option>
          </select>
          {filterState.sortType === "asc" ? (
            <button
              className="btn-sort-type"
              onClick={() =>
                setFilterState({ ...filterState, sortType: "desc" })
              }
            >
              ⬆️
            </button>
          ) : (
            <button
              className="btn-sort-type"
              onClick={() =>
                setFilterState({ ...filterState, sortType: "asc" })
              }
            >
              ⬇️
            </button>
          )}
        </div>
      </div>
      <div className="filter-controller-box">
        <span>Filter By Catagory:-</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div className="filter-catagory">
            {productCatagory.map((catagory) => (
              <div key={catagory.slug} className="filter-catagory--item">
                <input
                  type="radio"
                  name="product-cattgory"
                  value={filterState.catagory?.slug}
                  checked={filterState.catagory?.slug === catagory.slug}
                  id={catagory.slug}
                  onChange={(e) => {
                    setFilterState({ ...filterState, catagory: catagory });
                  }}
                />
                <label htmlFor={catagory.slug}>{catagory.name}</label>
              </div>
            ))}
          </div>
          <button
            style={{ borderRadius: 6, border: "none", cursor: "pointer" }}
            onClick={() => {
              setFilterState({ ...filterState, catagory: {} });
            }}
          >
            Clear Catagory
          </button>
        </div>
      </div>

      <div className="filter-controller-box">
        <span>Filter By Ratting:-</span>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div className="filter-catagory">
            {[1, 2, 3, 4, 5].map((ratting) => (
              <div key={ratting} className="filter-catagory--item">
                <input
                  type="radio"
                  name="product-ratting"
                  value={filterState.catagory?.slug}
                  checked={filterState.filterRatting === ratting}
                  id={ratting}
                  onChange={(e) => {
                    setFilterState({ ...filterState, filterRatting: ratting });
                  }}
                />
                <label htmlFor={ratting}>{"⭐".repeat(ratting)}</label>
              </div>
            ))}
          </div>
          <button
            style={{ borderRadius: 6, border: "none", cursor: "pointer" }}
            onClick={() => {
              setFilterState({ ...filterState, filterRatting: 0 });
              dispatch({ type: "CLEAR_FILTER_RATTING" });
            }}
          >
            Clear Ratting
          </button>
        </div>
      </div>
    </div>
  );
}
