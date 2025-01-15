import { useEffect, useReducer, useRef, useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import { reducer } from "./Reducer";
import { fetchData } from "./Utils";
import FilterController from "./Components/FilterController";
import ProductsContainer from "./Components/ProductsContainer";

const INITIAL_STATE = {
  products: [],
  productWithoutFilter: [],
};

const filterInitilState = {
  sortOption: "",
  sortType: "asc",
  catagory: {},
  filterRatting: 0,
};
//https://dummyjson.com/products/search?q=phone
function App() {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(20);
  const [search, setSearch] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [currentProduct, setCurrentProduct] = useState({});
  const [filterState, setFilterState] = useState(filterInitilState);

  useEffect(() => {
    (async function () {
      let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
      if (search) {
        url = `https://dummyjson.com/products/search?q=${search}`;
      }
      const productData = await fetchData(url);
      if (search) {
        dispatch({ type: "REPLACE_PRODUCTS", payload: productData.products });
      } else {
        dispatch({ type: "APPEND_PRODUCTS", payload: productData.products });
      }
    })();
  }, [skip, search]);

  useEffect(() => {
    (async function () {
      if (filterState.catagory?.url) {
        const productData = await fetchData(filterState.catagory.url);
        dispatch({ type: "REPLACE_PRODUCTS", payload: productData.products });
      }
      dispatch({ type: "SORT_PORDUCTS", payload: filterState });
      dispatch({ type: "FILTER_RATTING", payload: filterState.filterRatting });
    })();
  }, [
    filterState.catagory?.url,
    filterState.sortOption,
    filterState.sortType,
    filterState.filterRatting,
  ]);

  return (
    <div className="App">
      <Header search={search} setSearch={setSearch} setSkip={setSkip} />
      <div className="product-wrapper">
        <FilterController
          filterState={filterState}
          setFilterState={setFilterState}
        />
        <ProductsContainer
          products={state.products}
          disatch={dispatch}
          skip={skip}
          setSkip={setSkip}
          limit={limit}
          isOpen={isOpen}
          setOpen={setOpen}
          currentProduct={currentProduct}
          setCurrentProduct={setCurrentProduct}
        />
      </div>
    </div>
  );
}

export default App;
