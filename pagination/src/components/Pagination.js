import React, { useEffect, useState } from "react";
import "./style.css";
import { fetchData } from "../utils/fetchData";

function Pagination() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const selectPageHandler = (selectedPage) => {
    setPage(selectedPage);
  };

  const handlePrev = () => {
    if (page !== 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page !== Math.ceil(products.length / pageSize)) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePageSize = (e) => {
    setPageSize(parseInt(e.target.value));
    setPage(1);
  };

  useEffect(() => {
    (async function () {
      const productData = await fetchData(
        "https://dummyjson.com/products?limit=100"
      );
      if (productData.products) {
        setProducts(productData.products);
      }
    })();
  }, []);
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products
            .slice((page - 1) * pageSize, page * pageSize)
            .map((product) => (
              <span className="products__single">
                <img src={product.thumbnail} alt={product.title} />
                <span>{product.title}</span>
              </span>
            ))}
        </div>
      )}

      {products.length > 0 && (
        <div className="pagination">
          <select
            onChange={handlePageSize}
            defaultValue={pageSize}
            style={{ margin: "0 20px" }}
          >
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>
          <button onClick={handlePrev} disabled={page === 1}>
            ◀️
          </button>
          {[...Array(Math.ceil(products.length / pageSize))].map((_, i) => (
            <span
              className={page === i + 1 ? "pagination__selected" : ""}
              key={i + 1}
              onClick={() => selectPageHandler(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          <button
            onClick={handleNext}
            disabled={page === Math.ceil(products.length / pageSize)}
          >
            ▶️
          </button>
        </div>
      )}
    </div>
  );
}

export default Pagination;
