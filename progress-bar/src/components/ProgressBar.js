import React, { useEffect, useState } from "react";

function ProgressBar({ value = 0, onCompleate = () => {} }) {
  useEffect(() => {
    if (value >= 100) {
      onCompleate();
    }
  });
  return (
    <div className="progress">
      <span
        style={{
          color: value > 49 ? "white" : "black",
        }}
      >
        {value.toFixed(2)}%
      </span>
      <div style={{ width: `${value}%` }}></div>
    </div>
  );
}

export default ProgressBar;
