import { useEffect, useState } from "react";
import "./App.css";
import ImageCarousel from "./carousel/ImageCarousel";
import CarouselComponent from "./carousel/CarouselComponent";

export type singleImageType = {
  title: string;
  description: string;
  id: number;
  url: string;
};

function App() {
  const [images, setImages] = useState<singleImageType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async (limit: number) => {
    return fetch(`https://boringapi.com/api/v1/photos?limit=${limit}`)
      .then((jsonResponse) => {
        return jsonResponse.json();
      })
      .then((response) => {
        console.log(response);
        return response.photos;
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  };

  useEffect(() => {
    (async function () {
      setLoading(true);
      const imageData = await fetchImages(3);
      setLoading(false);
      setImages(imageData);
    })();
  }, []);
  return (
    <>
      {/* <h1>Image Crousel</h1>
      {loading ? <div>Loading....</div> : <ImageCarousel imageList={images} />} */}
      <div className="carousel-container">
        <CarouselComponent
          images={images}
          isLoading={loading}
          imagePerSlide={1}
          customPrevButton={(onClick) => (
            <button className="btn prev" onClick={onClick}>
              ◀️
            </button>
          )}
          customNextButton={(onClick) => (
            <button className="btn next" onClick={onClick}>
              ▶️
            </button>
          )}
        />
      </div>
    </>
  );
}

export default App;
