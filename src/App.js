import { useEffect, useState } from "react";
import "./App.css";
import logo from "./mlh-prep.png";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUseCurrentLocation, setIsUseCurrentLocation] = useState(false);
  const [city, setCity] = useState("New York");
  const [latitude, setLatitude] = useState(40.7143);
  const [longitude, setLongitude] = useState(-74.006);
  const [results, setResults] = useState(null);

  const getResults = (result) => {
    if (result["cod"] !== 200) {
      setIsLoaded(false);
    } else {
      setIsLoaded(true);
      setResults(result);
      setCity(result.name)
    }
  };

  const getError = (error) => {
    setIsLoaded(true);
    setError(error);
  };

  const getCurrentPosition = () => {
    setIsUseCurrentLocation(true);
    const userAllowPositionAccess = (position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    };

    const userDenyPositionAccess = (error) => {
      alert(error.message);
    };

    window.navigator.geolocation.getCurrentPosition(
      userAllowPositionAccess,
      userDenyPositionAccess
    );
  };

  useEffect(() => {
    let apiURL = "";
    if (isUseCurrentLocation) {
      apiURL =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&units=metric&appid=" +
        process.env.REACT_APP_APIKEY;
    } else {
      apiURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        process.env.REACT_APP_APIKEY;
    }
    fetch(apiURL)
      .then((res) => res.json())
      .then(getResults, getError);
  }, [city, longitude, latitude, isUseCurrentLocation]);

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
            onChange={(event) => {
              setCity(event.target.value);
              setIsUseCurrentLocation(false);
            }}
          />
          <br />
          <i onClick={getCurrentPosition} className="link">
            Use current location
          </i>
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
