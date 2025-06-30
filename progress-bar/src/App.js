import { useEffect, useRef, useState } from "react";
import "./App.css";
import ProgressBar from "./components/ProgressBar";

function App() {
  const [value, setValue] = useState(0);
  const [success, setSuccess] = useState(false);
  const timer = useRef(null);
  useEffect(() => {
    if (value < 100) {
      timer.current = setTimeout(() => {
        setValue((prev) => prev + 1);
      }, 50);
    } else {
      clearInterval(timer.current);
    }
    return () => {
      clearInterval(timer.current);
    };
  }, [value]);
  return (
    <div className="App">
      <span>Progress Bar</span>
      <ProgressBar value={value} onCompleate={() => setSuccess(true)} />
      <span>{success ? "Complete!" : "Loading..."}</span>
    </div>
  );
}

export default App;
