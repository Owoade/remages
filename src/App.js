import "./styles.css";
import { useState, useCallback, useEffect } from "react";
export default function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

function Main() {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.RAPID_API_KEY,
        "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
      }
    };

    fetch(
      "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=tree&pageNumber=1&pageSize=10&autoCorrect=true",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setImages(response.value.map((value) => value.url));
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div style={{ textAlign: "left" }}>
      {images.map((image) => (
        <CustomImage src={image} />
      ))}
      hello
    </div>
  );
}

function CustomImage(props) {
  const { src } = props;
  const image = new Image();
  image.src = src;
  const [loaded, setLoaded] = useState(false);

  image.onload = function () {
    setTimeout(() => setLoaded(true), 2000);
    console.log("image loaded");
  };

  if (!loaded) return <img style={{ width: "300px" }} src="placeholder.png" />;
  return (
    <img
      src={src}
      style={{ textAlign: "left", width: "300px", height: "300px" }}
    />
  );
}
