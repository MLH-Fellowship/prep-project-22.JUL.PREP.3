import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Loader from "./Components/initialLoader/initialLoaderComp";
import BookmarkProvider from "./context/bookmarksApiContext";

const WeatherApp = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3500);
  }, []);

  return <>{isLoading ? <Loader /> : <BookmarkProvider><App /></BookmarkProvider>}</>;
};

ReactDOM.render(
  <WeatherApp />,

  document.getElementById("root")
);
