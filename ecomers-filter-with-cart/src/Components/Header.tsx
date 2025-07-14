import React from "react";
import styles from "./componenets.module.css";
import { useGetSearchParams } from "../hooks/useGetSearchParams";
import { useUpdateSearchParams } from "../hooks/useUpdateSearchParams";

function Header() {
  const { search = "" } = useGetSearchParams();
  const { updateSearchParams } = useUpdateSearchParams();
  return (
    <div className={styles.header}>
      <h1>Suman Ecomers</h1>
      <input
        onChange={(e) => updateSearchParams({ search: e.target.value })}
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
