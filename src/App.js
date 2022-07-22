import { useEffect, useState } from "react";
import "./App.css";
import logo from "./img/mlh-prep.png";
import locationIcon from "./img/location-icon.jpg";
import ItemCard from "./ItemCard";
import Objects from "./Utilities/Objects";
import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import { Helmet } from "react-helmet";
import defaultBg from "./assets/default.jpg";
import changeBackground from "./utils/changeBackground";
import Forecast from "./Components/Forecast/Forecast";

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
  const [city, setCity] = useState("New York City");
  const [results, setResults] = useState(null);
  const [content, setcontent] = useState("");
  const [objects, setObjects] = useState([]);
  const [isUseCurrentLocation, setIsUseCurrentLocation] = useState(false);
  const [latitude, setLatitude] = useState(40.7143);
  const [longitude, setLongitude] = useState(-74.006);

  const [weatherIcon, setWeatherIcon] = useState(""); //hook for updating the weather icon
  const [background, setBackground] = useState(defaultBg); //default.jpg will be the default background picture in our assets

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

  function bringRightThings(results) {
    if (results.weather[0].main === "Clear") {
      setObjects([Objects.hat, , Objects.sunscreen, Objects.sunglasses]);
    } else if (
      results.weather[0].main === "Rain" ||
      results.weather[0].main === "Thunderstorm" ||
      results.weather[0].main === "Drizzle" ||
      results.weather[0].main === "Tornado" ||
      results.weather[0].main === "Squall"
    ) {
      setObjects([Objects.raincoat, Objects.umbrella, Objects.boots]);
    } else if (
      results.weather[0].main === "Mist" ||
      results.weather[0].main === "Smoke" ||
      results.weather[0].main === "Haze" ||
      results.weather[0].main === "Fog"
    ) {
      setObjects([Objects.torch, Objects.Coat]);
    } else if (results.weather[0].main === "Snow") {
      setObjects([Objects.coat, Objects.scarf, Objects.boots]);
    } else if (results.weather[0].main === "Clouds") {
      setObjects([Objects.coat, Objects.hat]);
    } else if (
      results.weather[0].main === "Ash" ||
      results.weather[0].main === "Dust" ||
      results.weather[0].main === "Sand"
    ) {
      setObjects([Objects.Hat, Objects.Glasses]);
    }
  }

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

    const getResults = (result) => {
      if (result["cod"] !== 200) {
        setIsLoaded(false);
      } else {
        setIsLoaded(true);
        setResults(result);
        bringRightThings(result);
        isUseCurrentLocation && setCity(result.name);
        //Inside this function we can make a switch case on results, and change the background picture
        //to different sources based on the temperature provided
        let weatherMetaData = changeBackground(result);
        setBackground(weatherMetaData.backgroundImg);
        setWeatherIcon(weatherMetaData.weatherIcon);
      }
    };

    const getError = (error) => {
      setIsLoaded(true);
      setError(error);
    };

    fetch(apiURL)
      .then((res) => res.json())
      .then(getResults, getError);
  }, [city, longitude, latitude, isUseCurrentLocation]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div className="fade">
        <Helmet>
          <style>{`body { background-image: url('${background}'); background-repeat: no-repeat;
  background-size: cover; }`}</style>
        </Helmet>
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
          <button onClick={getCurrentPosition} className="btn">
            <img
              className="location-icon"
              src={locationIcon}
              alt="Current Location Icon"
            ></img>{" "}
            Current Location
          </button>
          <div className="Results">
            {!isLoaded && <h2>Loading...</h2>}
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
          <div className="mapContainer">
            <h1> Global Weather Map </h1>
            <ReactTooltip>{content}</ReactTooltip>
            <div style={{ width: "320%", borderStyle: "double" }}>
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
                      <circle
                        r={10}
                        fill="#F00"
                        stroke="#fff"
                        strokeWidth={2}
                      />
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
          <Forecast />
          <div className="cards">
            {objects &&
              objects.map((object) => {
                let key = Object.keys(Objects).filter(function (key) {
                  return Objects[key] === object;
                });

                return (
                  <div className="card">
                    {" "}
                    <ItemCard name={key} image={object} />{" "}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
