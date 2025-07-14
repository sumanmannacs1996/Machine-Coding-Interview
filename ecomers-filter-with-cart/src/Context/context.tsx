import { createContext, useContext, useEffect, useReducer } from "react";
import type { ReactNode } from "react";
import { shopingCartReducer } from "./reducer";
// import { filterReducer, shopingCartReducer } from "./reducer";

// Define the type for the context value (update as needed)
type EcomersContextType = {};

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

const EcomersContext = createContext<EcomersContextType>({});

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
  return useContext(EcomersContext);
};

export { EcomersContext, EcomersProvider, getEcomersState };
