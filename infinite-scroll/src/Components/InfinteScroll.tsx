import React, { useEffect, useState, type UIEvent } from "react";
import "../App.css";

export type product = {
  id: number;
  title: string;
  thumbnail: string;
};

function InfinteScroll() {
  const [page, setPage] = useState(1);
  const [productPerPeg, setProductsPerPage] = useState<number>(16);
  const [productList, setProductList] = useState<product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async (url: string) => {
    return fetch(url)
      .then((jsonResponse) => {
        return jsonResponse.json();
      })
      .then((resonse) => {
        return resonse;
      })
      .catch((error) => {
        console.error(error);
        return {};
      });
  };

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      const data = await fetchProducts(
        `https://dummyjson.com/products?limit=${productPerPeg}&skip=${
          (page - 1) * productPerPeg
        }`
      );
      setIsLoading(false);
      if (data && data.products && data.products.length) {
        setProductList((prev) => [...prev, ...data.products]);
        setTotalProducts(data.total);
      }
    })();
  }, [page]);

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;

    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 100) {
      if (!isLoading && totalProducts > productList.length) {
        setPage((prev) => prev + 1);
      }
    }
  };
  return (
    <>
      <div onScroll={handleScroll} className="product-contaner">
        {productList.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.thumbnail} alt={product.title} />
            <p>{product.title}</p>
          </div>
        ))}
      </div>
      {isLoading && <div>Loading.....</div>}
    </>
  );
}

export default InfinteScroll;
