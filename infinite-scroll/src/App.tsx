import "./App.css";
import InfinteScroll from "./Components/InfinteScroll";
// import InfiniteScrollList from "./Components/InfiniteScrollList";

function App() {
  return (
    <div className="app-contaner">
      <h2>Product List Woth On Scrool Pagination</h2>
      <InfinteScroll />
      {/* <InfiniteScrollList /> */}
    </div>
  );
}

export default App;
