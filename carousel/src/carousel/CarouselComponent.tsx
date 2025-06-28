import React, { useRef, useState } from "react";
import "../App.css";

function CarouselComponent({
  images = [],
  isLoading = false,
  loadingComponent = null,
  imageLimit = images.length,
  customPrevButton = null,
  customNextButton = null,
  imagePerSlide = 1,
}) {
  const imageRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesWidth, setImageWidth] = useState(0);
  const handelPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const handelNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  if (isLoading) {
    if (loadingComponent) {
      return loadingComponent;
    } else {
      return <div>Loading....</div>;
    }
  }

  console.log("********imageRef", imageRef, currentIndex);

  return (
    <div className="crousel" style={{ width: imagePerSlide * imagesWidth }}>
      <div
        className="imageContainer"
        style={{ transform: `translateX(-${currentIndex * imagesWidth}px)` }}
      >
        {images
          .slice(0, imageLimit > images.length ? images.length : imageLimit)
          .map((image, idx) => (
            <img
              onLoad={() => setImageWidth(imageRef?.current.offsetWidth)}
              key={image.id}
              src={image.url}
              alt={image.title}
              className="single-image"
              ref={imageRef}
            />
          ))}
      </div>
      {customPrevButton instanceof Function ? (
        customPrevButton(handelPrev)
      ) : (
        <button className="btn prev" onClick={handelPrev}>
          Prev
        </button>
      )}
      {customNextButton instanceof Function ? (
        customNextButton(handelNext)
      ) : (
        <button className="btn next" onClick={handelNext}>
          Next
        </button>
      )}
    </div>
  );
}

export default CarouselComponent;
