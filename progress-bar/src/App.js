import { useEffect, useState } from "react";
import "./App.css";
import ProgressBar from "./components/ProgressBar";

function App() {
  const [value, setValue] = useState(0);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => prev + 0.1);
    }, 20);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="App">
      <span>Progress Bar</span>
      <ProgressBar value={value} onCompleate={() => setSuccess(true)} />
      <span>{success ? "Complete!" : "Loading..."}</span>
    </div>
  );
}

export default App;
