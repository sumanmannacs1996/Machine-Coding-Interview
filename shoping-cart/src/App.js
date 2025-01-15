import { useEffect, useReducer } from "react";
import "./App.css";
import reducer from "./ShopingCartReducer";
import { fetchData } from "./utils";
import Products from "./Products";
import Cart from "./Cart";

const initialState = {
  products: [],
  cart: {},
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async function () {
      const productData = await fetchData("https://dummyjson.com/products");
      dispatch({ type: "ADD_PRODUCTS", payload: productData?.products || [] });
    })();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Products
        products={state.products}
        dispatch={dispatch}
        cart={state.cart}
      />
      <Cart cart={state.cart} disaptch={dispatch} />
    </div>
  );
}

export default App;
