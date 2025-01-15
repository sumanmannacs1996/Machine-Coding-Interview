export const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "APPEND_PRODUCTS":
      return { ...state, products: [...state.products, ...payload] };
    case "REPLACE_PRODUCTS":
      return { ...state, products: [...payload] };
    case "SORT_PORDUCTS":
      if (payload.sortOption && payload.sortType) {
        return {
          ...state,
          products: state.products.sort((a, b) =>
            payload.sortType === "asc"
              ? a[payload.sortOption] - b[payload.sortOption]
              : b[payload.sortOption] - a[payload.sortOption]
          ),
        };
      } else {
        return state;
      }
    case "FILTER_RATTING":
      if (payload !== 0) {
        return {
          ...state,
          productWithoutFilter: [...state.products],
          products: state.products.filter(
            (product) => parseInt(product.rating) === payload
          ),
        };
      } else {
        return {
          ...state,
          products: [...state.productWithoutFilter],
          productWithoutFilter: [],
        };
      }
    default:
      return state;
  }
};
