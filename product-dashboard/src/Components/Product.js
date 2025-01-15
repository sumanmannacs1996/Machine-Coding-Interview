import React from "react";
import "../App.css";
import Model from "./Model";

function Product({
  product,
  isOpen,
  setOpen,
  currentProduct,
  setCurrentProduct,
}) {
  const { thumbnail, title, price, rating, id } = product;
  return (
    <>
      <div
        key={id}
        className="product-container"
        onClick={(e) => {
          setOpen(true);
          setCurrentProduct(product);
        }}
      >
        <img src={thumbnail} alt={title} className="product-image" />
        <span className="product-title">{title}</span>
        <div className="ratting-price-container">
          <span>{rating}⭐⭐⭐⭐⭐</span>
          <b>${price}</b>
        </div>
        <button className="add-to-cart">Add To Cart</button>
      </div>
      <Model
        isOpen={isOpen}
        setOpen={setOpen}
        currentProduct={currentProduct}
      />
    </>
  );
}

export default Product;
