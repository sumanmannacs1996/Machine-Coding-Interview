import { useState } from "react";
import "./App.css";
import StarRating from "./Components/StarRating";

function App() {
  const [currentRating, setCurrentRating] = useState<number>(3);
  const handelRatingChange = (value: number) => {
    setCurrentRating(value);
  };
  return (
    <div>
      <p>Star Ratting </p>
      <StarRating
        currentRating={currentRating}
        onChange={handelRatingChange}
        size={5}
      />
    </div>
  );
}

export default App;
