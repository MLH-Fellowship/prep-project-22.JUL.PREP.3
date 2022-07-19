import { useEffect, useState } from "react";
import "./App.css";
import logo from "./mlh-prep.png";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [results, setResults] = useState(null);

  const getResults = (result) => {
    if (result["cod"] !== 200) {
      setIsLoaded(false);
    } else {
      setIsLoaded(true);
      setResults(result);
    }
  };

  const getError = (error) => {
    setIsLoaded(true);
    setError(error);
  };

  useEffect(() => {
    setError(null);
    const userAllowPositionAccess = (position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    };

    window.navigator.geolocation.getCurrentPosition(
      userAllowPositionAccess,
      getError
    );
  }, []);

  const getWeatherOnCurrentPosition = () => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&units=metric&appid=" +
        process.env.REACT_APP_APIKEY
    )
      .then((res) => res.json())
      .then(getResults, getError);
  };

  // if (!city || city.length <= 0) getWeatherOnCurrentPosition()
  useEffect(getWeatherOnCurrentPosition,[latitude, longitude])

  useEffect(() => {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        process.env.REACT_APP_APIKEY
    )
      .then((res) => res.json())
      .then(getResults, getError);
  }, [city]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <img className="logo" src={logo} alt="MLH Prep Logo"></img>
        <div>
          <h2>Enter a city below 👇</h2>
          <input
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          <div className="Results">
            {!isLoaded && <h2>Loading...</h2>}
            {console.log(results)}
            {isLoaded && results && (
              <>
                <h3>{results.weather[0].main}</h3>
                <p>Feels like {results.main.feels_like}°C</p>
                <i>
                  <p>
                    {results.name}, {results.sys.country}
                  </p>
                </i>
              </>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default App;
