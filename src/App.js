import React from "react";
import ImageContainer from "./components/image-container";
import "./App.css";

const checkForError = response => {
  if (!response.ok) throw Error(response.statusText);
  return response;
};

function App() {
  const [loading, setLoading] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [page, setPage] = React.useState(1);

  const onIsVisible = index => {
    if (index === images.length - 1) {
      setPage(page => page + 1);
    }
  };

  React.useEffect(() => {
    const fetchPhotos = async page => {
      setLoading(true);
      try {
        const result = await fetch(`/.netlify/functions/images?page=${page}`);
        const photoResult = await checkForError(result).json();
        setImages(photos => {
          return photos.concat(photoResult);
        });
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    };
    fetchPhotos(page);
  }, [page]);

  return (
    <div className="app">
      <div className="container">
        {loading && <div>Loading...</div>}
        {images &&
          images.map((image, index) => {
            console.log(image);
            return (
              <div key={`${image.id}-${index}`} className="wrapper">
                <ImageContainer
                  color={image.color}
                  src={image.urls.regular}
                  thumb={image.urls.thumb}
                  height={image.height}
                  width={image.width}
                  alt={image.alt_description}
                  url={image.links.html}
                  onIsVisible={() => onIsVisible(index)}
                />
                <figcaption>
                  Photo by{" "}
                  <a
                    href={image.user.links.html}
                    rel="noopener noreferrer"
                    target="_BLANK"
                  >
                    {image.user.name}
                  </a>{" "}
                  on{" "}
                  <a
                    rel="noopener noreferrer"
                    target="_BLANK"
                    href="https://unsplash.com"
                  >
                    Unsplash
                  </a>
                </figcaption>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
