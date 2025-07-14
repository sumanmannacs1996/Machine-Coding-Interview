import React, { useState } from "react";
import "./StarRatting.css";

type StarRatingProps = {
  currentRating: number;
  onChange?: (value: number) => void;
  size?: number;
  isOnlyView?: boolean;
};

function StarRating({
  currentRating,
  onChange = () => {},
  size = 5,
  isOnlyView = false,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number>(0);
  const handleMouseEnter = (value: number) => {
    if (!isOnlyView) {
      setHoverRating(value);
    }
  };
  return (
    <div className="star-rating-contaner">
      {Array(size)
        .fill("")
        .map((_, idx) => {
          const starValue = idx + 1;
          let starClass = "star";
          if (hoverRating >= starValue) {
            starClass += " hover";
          } else if (currentRating >= starValue) {
            starClass += " active";
          }
          return (
            <span
              key={starValue}
              className={starClass}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => onChange(starValue)}
            >
              &#9733;
            </span>
          );
        })}
    </div>
  );
}

export default StarRating;
