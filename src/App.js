import { useEffect, useState } from "react";
import "./App.css";
import logo from "./mlh-prep.png";
import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";

const markers = [
  {
    markerOffset: -15,
    name: "Sao Paulo",
    coordinates: [-58.3816, -34.6037],
  },

  {
    markerOffset: -15,
    name: "Melbourne",
    coordinates: [144.963058, -37.813629],
  },
];

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isUseCurrentLocation, setIsUseCurrentLocation] = useState(false);
  const [latitude, setLatitude] = useState(40.7143);
  const [longitude, setLongitude] = useState(-74.006);
  const [city, setCity] = useState("London,uk");
  const [results, setResults] = useState(null);
  const [content, setcontent] = useState("");

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

  const getCurrentPosition = () => {
    setIsUseCurrentLocation(true);
    setCity("");
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
        <div
          className="mapContainer"
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "centre",
            alignItems: "center",
          }}
        >
          <h1> Global Weather Map </h1>
          <ReactTooltip>{content}</ReactTooltip>
          <div style={{ width: "1400px", borderStyle: "double" }}>
            <ComposableMap data-tip="">
              <ZoomableGroup zoom={1}>
                {" "}
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => {
                          const { name } = geo.properties;
                          setcontent(`${name}`);
                          setCity(`${name}`);
                        }}
                        onMouseLeave={() => {
                          setcontent("");
                          setCity("");
                        }}
                        style={{
                          hover: {
                            fill: "#F53",
                            outline: "none",
                          },
                        }}
                      />
                    ))
                  }
                </Geographies>
                {markers.map(({ name, coordinates, markerOffset }) => (
                  <Marker key={name} coordinates={coordinates}>
                    <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
                    <text
                      textAnchor="middle"
                      y={markerOffset}
                      style={{ fontFamily: "system-ui", fill: "#505A6D" }}
                    >
                      {" "}
                      {name}{" "}
                    </text>
                  </Marker>
                ))}
              </ZoomableGroup>
            </ComposableMap>
          </div>
        </div>
      </>
    );
  }
}

export default App;
