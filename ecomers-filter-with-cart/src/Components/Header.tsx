import React from "react";
import styles from "./componenets.module.css";
import { getEcomersState } from "../Context/context";

function Header() {
  const {
    filterState: { search },
    filterDispatch,
  } = getEcomersState();
  return (
    <div className={styles.header}>
      <h1>Suman Ecomers</h1>
      <input
        onChange={(e) =>
          filterDispatch({ type: "SEARCH", payload: e.target.value })
        }
        value={search}
        type="text"
        style={{
          width: "30%",
          padding: "12px",
          borderRadius: "10px",
          fontSize: "20px",
        }}
        placeholder="Search products...."
      />
      <button>🛒</button>
    </div>
  );
}

export default Header;
