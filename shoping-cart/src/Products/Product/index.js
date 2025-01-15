import React from "react";

function Product({ product, dispatch, cart }) {
  const { title, thumbnail, id, price } = product;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "30%",
        border: "1px solid gray",
        marginTop: 10,
        padding: 10,
        gap: 10,
        borderRadius: 5,
      }}
    >
      <img
        src={thumbnail}
        alt={title}
        style={{ height: 200, objectFit: "cover" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{title}</span>
        <b>${price}</b>
      </div>
      {cart[id] === undefined ? (
        <button
          style={{
            padding: 5,
            border: 0,
            borderRadius: 5,
            color: "white",
            backgroundColor: "green",
          }}
          onClick={() => {
            dispatch({ type: "ADD_TO_CART", payload: product });
          }}
        >
          Add To Cart
        </button>
      ) : (
        <button
          style={{
            padding: 5,
            border: 0,
            borderRadius: 5,
            color: "white",
            backgroundColor: "orange",
          }}
          onClick={() => {
            dispatch({ type: "DELETE_FROM_CART", payload: id });
          }}
        >
          Delete From Cart
        </button>
      )}
    </div>
  );
}

export default Product;
