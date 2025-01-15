const reducer = (state, action) => {
  const { type, payload } = action;
  let updatedCartData;
  switch (type) {
    case "ADD_PRODUCTS":
      return { ...state, products: payload };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: { ...state.cart, [payload.id]: { ...payload, quantity: 1 } },
      };
    case "DELETE_FROM_CART":
      updatedCartData = { ...state.cart };
      delete updatedCartData[payload];
      return { ...state, cart: updatedCartData };
    case "INCREASE_QUANTITY":
      updatedCartData = { ...state.cart[payload] };
      ++updatedCartData.quantity;
      return { ...state, cart: { ...state.cart, [payload]: updatedCartData } };
    case "DECREASE_QUANTITY":
      updatedCartData = { ...state.cart[payload] };
      --updatedCartData.quantity;
      return { ...state, cart: { ...state.cart, [payload]: updatedCartData } };
    default:
      return state;
  }
};

export default reducer;
