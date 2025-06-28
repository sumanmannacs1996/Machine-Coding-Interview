import React, { useEffect, useMemo, useState } from "react";
import "./style.css";
import { fetchData } from "../utils/fetchData";

function PaginationButtons({
  totalItems,
  page,
  selectPageHandler,
  pageSize,
  handlePageSize,
  handlePrev,
  handleNext,
  maxVisiblePages = 10,
}) {
  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / pageSize);
  }, [totalItems, pageSize]);
  const renderSingleButton = (currentPageIndex, key = currentPageIndex) => {
    return (
      <button
        className={page === currentPageIndex ? "pagination__selected" : ""}
        key={key}
        onClick={() => selectPageHandler(currentPageIndex)}
        disabled={currentPageIndex !== key}
      >
        {currentPageIndex}
      </button>
    );
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= maxVisiblePages) {
      return [...Array(totalPages)].map((_, i) => renderSingleButton(i + 1));
    } else {
      const startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      if (startPage > 1) {
        if (startPage > 2) pageNumbers.push(renderSingleButton(1));
        pageNumbers.push(renderSingleButton("...", "ellipsis-start"));
      }
      for (let i = startPage; i < endPage; i++) {
        pageNumbers.push(renderSingleButton(i));
      }
      if (endPage < totalPages) {
        pageNumbers.push(renderSingleButton("...", "ellipsis-end"));
        if (endPage < totalPages - 1) {
          pageNumbers.push(renderSingleButton(totalPages));
        }
      }
      return pageNumbers;
    }
  };
  return (
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
      {renderPageNumbers()}
      <button
        onClick={handleNext}
        disabled={page === Math.ceil(totalItems / pageSize)}
      >
        ▶️
      </button>
    </div>
  );
}

function PaginationBackend() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalItems, setTotalItems] = useState(0);

  const selectPageHandler = (selectedPage) => {
    setPage(selectedPage);
  };

  const handlePrev = () => {
    if (page !== 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (page !== Math.ceil(totalItems / pageSize)) {
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
        `https://dummyjson.com/products?limit=${pageSize}&skip=${
          (page - 1) * pageSize
        }`
      );
      if (productData.products) {
        setProducts(productData.products);
        setTotalItems(productData.total);
      }
    })();
  }, [page, pageSize]);
  return (
    <div>
      {totalItems > 0 && (
        <div className="products">
          {products.map((product) => (
            <span className="products__single">
              <img src={product.thumbnail} alt={product.title} />
              <span>{product.title}</span>
            </span>
          ))}
        </div>
      )}

      {totalItems > 0 && (
        <PaginationButtons
          page={page}
          totalItems={totalItems}
          pageSize={pageSize}
          selectPageHandler={selectPageHandler}
          handlePageSize={handlePageSize}
          handlePrev={handlePrev}
          handleNext={handleNext}
          maxVisiblePages={5}
        />
      )}
    </div>
  );
}

export default PaginationBackend;
