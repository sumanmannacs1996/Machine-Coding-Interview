import { useMemo, useState } from "react";
import "./App.css";
import useCustomMemo from "./hooks/useCustomMemo";

function App() {
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(100);

  const squaredValue = () => {
    console.log("Expensive function!!");
    return count * count;
  };

  const memoisedSquaredValue = useCustomMemo(squaredValue, [count]);
  return (
    <div className="App">
      <h2>Use Memeo hook and its polyfill</h2>

      <div>
        <h3>Count: {count}</h3>
        <h3>Squred Counter: {memoisedSquaredValue}</h3>
        <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      </div>

      <div>
        <h3>Count: {count1}</h3>
        <button onClick={() => setCount1((prev) => prev - 1)}>Decrement</button>
      </div>
    </div>
  );
}

export default App;
