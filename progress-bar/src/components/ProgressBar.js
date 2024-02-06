import React, { useEffect, useState } from "react";

function ProgressBar({ value = 0, onCompleate = () => {} }) {
  const [percent, setPercent] = useState(value);
  useEffect(() => {
    setPercent(Math.min(Math.max(value, 0), 100));

    if (value >= 100) {
      onCompleate();
    }
  });
  return (
    <div className="progress">
      <span
        style={{
          color: percent > 49 ? "white" : "black",
        }}
      >
        {percent.toFixed(2)}%
      </span>
      <div style={{ width: `${percent}%` }}></div>
    </div>
  );
}

export default ProgressBar;
