import React, { useState } from "react";
import type { singleImageType } from "../App";

export type ImageCarouselProps = {
  imageList: singleImageType[];
};

function ImageCarousel({ imageList = [] }: ImageCarouselProps) {
  const [currentImageIndx, setCurrentImageIndex] = useState<number>(0);
  const handelPrev = () => {
    if (currentImageIndx === 0) {
      setCurrentImageIndex(imageList.length - 1);
    } else {
      setCurrentImageIndex((prev) => prev - 1);
    }
  };

  const handelNext = () => {
    if (currentImageIndx === imageList.length - 1) {
      setCurrentImageIndex(0);
    } else {
      setCurrentImageIndex((prev) => prev + 1);
    }
  };
  if (imageList.length === 0) return <div>Loading....</div>;
  return (
    <div className="imageCarouselContainer" style={{ position: "relative" }}>
      <button
        className="imageCarouselBtn"
        onClick={handelPrev}
        style={{
          backgroundColor: "#ccc",
          position: "absolute",
          top: "50%",
          left: "0px",
          transform: "translate(-100%,-50%)",
        }}
      >
        ◀️
      </button>
      <img src={imageList[currentImageIndx].url} height="300px" width="450px" />
      <button
        className="imageCarouselBtn"
        onClick={handelNext}
        style={{
          backgroundColor: "#ccc",
          position: "absolute",
          top: "50%",
          left: "100%",
          transform: "translate(0%,-50%)",
        }}
      >
        ▶️
      </button>
    </div>
  );
}

export default ImageCarousel;
