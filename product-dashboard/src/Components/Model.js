import React from "react";
import "../App.css";

function Model({ isOpen, setOpen, currentProduct }) {
  const { images, title, price, rating, description } = currentProduct;
  return (
    <div
      className="model"
      style={{ display: isOpen ? "flex" : "none" }}
      onClick={(e) => {
        if (e.target.className === "model") {
          setOpen(false);
        }
      }}
    >
      <div className="product-details">
        <img src={images} alt={title} className="product-detail-image" />
        <span className="product-title">{title}</span>
        <span>{description}</span>
        <div className="ratting-price-container">
          <span>{rating}⭐⭐⭐⭐⭐</span>
          <b>${price}</b>
        </div>
        <button className="add-to-cart">Add To Cart</button>
      </div>
    </div>
  );
}

export default Model;
