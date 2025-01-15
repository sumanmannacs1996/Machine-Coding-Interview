import React from "react";
import Product from "./Product";

function Products({ products, dispatch, cart }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "80%",
        justifyContent: "space-evenly",
      }}
    >
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
          dispatch={dispatch}
          cart={cart}
        />
      ))}
    </div>
  );
}

export default Products;
