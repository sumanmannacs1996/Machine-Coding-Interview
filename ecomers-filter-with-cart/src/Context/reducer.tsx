import { filterInitilState } from "./context";

export const shopingCartReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_PRODUCTS_FROM_API":
      return {
        ...state,
        products: payload,
      };
    default:
      return { ...state };
  }
};

export const filterReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "SORT_BY":
      return { ...state, sortBy: payload, sortType: "asc" };
    case "SORT_TYPE":
      return { ...state, sortType: payload };
    case "CATEGORIES":
      return { ...state, category: payload };
    case "RATTING":
      return { ...state, ratting: payload };
    case "SEARCH":
      return { ...state, search: payload };
    case "RESET":
      return { ...filterInitilState };
    default:
      return state;
  }
};
