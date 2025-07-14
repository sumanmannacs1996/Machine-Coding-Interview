import { createContext, useContext, useEffect, useReducer } from "react";
import type { ReactNode } from "react";
import { shopingCartReducer } from "./reducer";
// import { filterReducer, shopingCartReducer } from "./reducer";

// Define the type for the context value (update as needed)
export type productType = {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  rating: number;
};

export type EcomersContextType = {
  state: {
    products: productType[];
  };
  dispatch: React.Dispatch<any>;
};

export const productInitialState = {
  products: [],
};

// export const filterInitilState = {
//   sortBy: "",
//   sortType: "",
//   category: "",
//   search: "",
//   ratting: 0,
// };

const EcomersContext = createContext<EcomersContextType | undefined>(undefined);

type EcomersProviderProps = {
  children: ReactNode;
};

const EcomersProvider = ({ children }: EcomersProviderProps) => {
  // Products State
  const [state, dispatch] = useReducer(shopingCartReducer, productInitialState);
  // Filter State
  // const [filterState, filterDispatch] = useReducer(
  //   filterReducer,
  //   filterInitilState
  // );

  // Fetch Products
  const fetchProducts = async (url: string) => {
    const jsonResponse = await fetch(url);
    const response = await jsonResponse.json();
    if (response.products && response.products.length > 0) {
      dispatch({ type: "FETCH_PRODUCTS_FROM_API", payload: response.products });
    } else {
      dispatch({ type: "FETCH_PRODUCTS_FROM_API", payload: [] });
    }
  };

  useEffect(() => {
    fetchProducts("https://dummyjson.com/products?skip=0&limit=194");
  }, []);
  return (
    <EcomersContext.Provider
      value={{ state, dispatch }}
      // value={{ state, dispatch, filterState, filterDispatch }}
    >
      {children}
    </EcomersContext.Provider>
  );
};

const getEcomersState = () => {
  const context = useContext(EcomersContext);
  if (!context) {
    throw new Error("getEcomersState must be used within an EcomersProvider");
  }
  return context;
};

export { EcomersContext, EcomersProvider, getEcomersState };
