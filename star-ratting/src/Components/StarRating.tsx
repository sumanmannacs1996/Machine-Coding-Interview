import React, { useState } from "react";

type StarRatingProps = {
  currentRating: number;
  onChange?: (value: number) => void;
  size?: number;
};

function StarRating({
  currentRating,
  onChange = () => {},
  size = 5,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState<number>(0);
  const handleMouseEnter = (value: number) => {
    setHoverRating(value);
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
