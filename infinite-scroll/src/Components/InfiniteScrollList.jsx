import React, { useState, useEffect, useRef } from "react";

function InfiniteScrollList() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const containerRef = useRef(null); // Ref for a scrollable container (optional)

  // Function to fetch data (replace with your actual data fetching logic)
  const fetchData = async (pageNum) => {
    setIsLoading(true);
    // Simulate fetching data from an API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newData = Array.from(
      { length: 10 },
      (_, i) => `Item ${items.length + i + 1}`
    );
    setItems((prevItems) => [...prevItems, ...newData]);
    setIsLoading(false);
  };

  // Fetch initial data on mount
  useEffect(() => {
    fetchData(page);
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (
        containerRef.current // Use ref for a container scroll
          ? containerRef.current.scrollHeight -
              containerRef.current.scrollTop <=
            containerRef.current.clientHeight + 100 // Add a buffer
          : window.innerHeight + window.scrollY >=
            document.body.offsetHeight - 100 // Use window scroll
      ) {
        if (!isLoading) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    };

    // Add scroll event listener
    const scrollTarget = containerRef.current || window;
    scrollTarget.addEventListener("scroll", handleScroll);

    // Clean up event listener
    return () => {
      scrollTarget.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]); // Re-run effect when isLoading changes

  // Fetch data when the page changes
  useEffect(() => {
    if (page > 1) {
      fetchData(page);
    }
  }, [page]);

  return (
    <div
      onScroll={(e) => {
        console.log("************", e);
      }}
      ref={containerRef}
      style={{ height: "100px", overflowY: "auto" }}
    >
      {" "}
      {/* Example container with scroll */}
      <ul>
        {items.map((item, index) => (
          <li key={index} style={{ height: "20px" }}>
            {item}
          </li>
        ))}
      </ul>
      {isLoading && <p>Loading...</p>}
    </div>
  );
}

export default InfiniteScrollList;
