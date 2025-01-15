import React, { useEffect, useRef, useCallback } from "react";
import Product from "./Product";
import { myThrottel } from "../Utils";

function ProductsContainer({
  products,
  disatch,
  skip,
  setSkip,
  limit,
  isOpen,
  setOpen,
  currentProduct,
  setCurrentProduct,
}) {
  const handleScrool = useCallback(
    myThrottel((e) => {
      setSkip((prev) => prev + limit);
    }, 1000),
    []
  );

  return (
    <div className="products-container" onScroll={handleScrool}>
      {products.map((product) => (
        <Product
          key={product.id}
          product={product}
          disatch={disatch}
          isOpen={isOpen}
          setOpen={setOpen}
          currentProduct={currentProduct}
          setCurrentProduct={setCurrentProduct}
        />
      ))}
    </div>
  );
}

export default ProductsContainer;
