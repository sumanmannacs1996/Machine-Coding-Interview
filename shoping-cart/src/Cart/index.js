import React from "react";

function Cart({ cart, disaptch }) {
  const getSbtotal = (cart) => {
    const amount = Object.values(cart).reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    return amount.toFixed(2);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "20%",
        margin: 10,
        padding: 10,
        backgroundColor: "#ececec",
      }}
    >
      <b style={{ fontSize: 30, alignSelf: "center" }}>Cart</b>
      <b style={{ alignSelf: "center" }}>SubTotal: {getSbtotal(cart)}$</b>
      {Object.values(cart).map((cartItem) => (
        <div
          key={cartItem.id}
          style={{
            display: "flex",
            width: "95%",
            border: "1px solid gray",
            borderRadius: 6,
            padding: 10,
            margin: 5,
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 10 }}>
            <img
              src={cartItem.thumbnail}
              alt={cartItem.title}
              style={{ width: 70, objectFit: "cover" }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              <span>{cartItem.title}</span>
              <b>${cartItem.price}</b>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button
              onClick={() =>
                disaptch({ type: "INCREASE_QUANTITY", payload: cartItem.id })
              }
            >
              +
            </button>
            <span>{cartItem.quantity}</span>
            <button
              onClick={() => {
                if (cartItem.quantity === 1)
                  disaptch({ type: "DELETE_FROM_CART", payload: cartItem.id });
                else
                  disaptch({ type: "DECREASE_QUANTITY", payload: cartItem.id });
              }}
            >
              -
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
