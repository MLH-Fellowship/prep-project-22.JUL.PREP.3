import { useEffect, useState } from "react";
import "./App.css";
import useFetch from "./hooks/useFetch";
import Cities from "./Components/Cities";
import logo from "./img/mlh-prep.png";
import locationIcon from "./img/location-icon.jpg";
import ItemCard from "./ItemCard";
import Warning from "./Warning";
import Objects from "./Utilities/Objects";
import React from "react";
import MyGlobe from "./Components/globe_model.js";
import { Helmet } from "react-helmet";
import defaultBg from "./assets/default.jpg";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import changeBackground from "./utils/changeBackground";
import Forecast from "./Components/Forecast/Forecast";
import AQIPollution from "./Components/AQIPollutionRate/AQIPollution";

// OpenAI API
const { Configuration, OpenAIApi } = require("openai");
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

import ScrollToTop from "react-scroll-to-top";
const markers = [
  {
    markerOffset: -15,
    name: "South America",
    coordinates: [-55.491478, -8.783195],
  },
  {
    markerOffset: -15,
    name: "Asia",
    coordinates: [100.619652, 34.047863],
  },
  {
    markerOffset: -15,
    name: "North America",
    coordinates: [-105.255119, 54.525963],
  },
  {
    markerOffset: -15,
    name: "Africa",
    coordinates: [34.508522, -8.783195],
  },
  {
    markerOffset: -15,
    name: "Australia",
    coordinates: [133.775131, -25.274399],
  },
  {
    markerOffset: -15,
    name: "Europe",
    coordinates: [15.255119, 54.525963],
  },
  {
    markerOffset: -15,
    name: "Antarctica",
    coordinates: [135.0, -82.862755],
  },
];

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City");
  const [countryCode, setCountryCode] = useState("US");
  const [results, setResults] = useState(null);
  const [content, setcontent] = useState("");
  const [objects, setObjects] = useState([]);
  const [isUseCurrentLocation, setIsUseCurrentLocation] = useState(false);
  const [latitude, setLatitude] = useState(40.7143);
  const [longitude, setLongitude] = useState(-74.006);
  const { suggestions, setSuggestions } = useFetch(
    "https://autocomplete.search.hereapi.com/v1/autocomplete?"
  );
  const [weatherIcon, setWeatherIcon] = useState(""); //hook for updating the weather icon
  const [background, setBackground] = useState(defaultBg); //default.jpg will be the default background picture in our assets
  const [inputValue, setInputValue] = useState("");
  const [activities, setActivities] = useState("");
  const [showWarning,setShowWarning] = useState(false);
  const [airQualityIndex, setAirQualityIndex] = useState(null);
  const [airQualityValue, setAirQualityValue] = useState(null);
  const [airQualityDesc, setAirQualityDesc] = useState("");
  const [barColor, setBarColor] = useState("transparent");

  useEffect(() => {
    // no city is selected yet
    if (city === "" && countryCode === "") {
      setSuggestions({ ...suggestions, cityPrefix: inputValue });
    }
  }, [inputValue]);

  useEffect(() => {
    if (!airQualityIndex) {
      setAirQualityIndex(null);
      setAirQualityValue(null);
      setAirQualityDesc("");
      setBarColor("transparent");
    } else if (airQualityIndex <= 50) {
      setAirQualityValue("Good");
      setAirQualityDesc(
        "Air quality is satisfactory, and air pollution poses little or no risk."
      );
      setBarColor("green");
    } else if (airQualityIndex <= 100) {
      setAirQualityValue("Moderate");
      setAirQualityDesc(
        "Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution."
      );
      setBarColor("yellow");
    } else if (airQualityIndex <= 150) {
      setAirQualityValue("Unhealthy for sensitive groups");
      setAirQualityDesc(
        "Members of sensitive groups may experience health effects. The general public is less likely to be affected."
      );
      setBarColor("orange");
    } else if (airQualityIndex <= 200) {
      setAirQualityValue("Unhealthy");
      setAirQualityDesc(
        "Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects."
      );
      setBarColor("red");
    } else if (airQualityIndex <= 300) {
      setAirQualityValue("Very Unhealthy");
      setAirQualityDesc(
        "Health alert: The risk of health effects is increased for everyone."
      );
      setBarColor("purple");
    } else {
      setAirQualityValue("Harzadous");
      setAirQualityDesc(
        "Health warning of emergency conditions: everyone is more likely to be affected."
      );
      setBarColor("brown");
    }
    console.log(airQualityIndex);
  }, [airQualityIndex]);

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

  function extremeWeather(results) {
    if (
      results.weather[0].main === "Thunderstorm" ||
      results.weather[0].main === "Tornado" ||
      results.weather[0].main === "Squall"
    ) {
      return setShowWarning(true);
    }
  }

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

  const getResults = (result) => {
    if (result["cod"] !== 200) {
      setIsLoaded(false);
    } else {
      if (city && countryCode) {
        setInputValue(`${city}, ${countryCode}`);
        setSuggestions({ ...suggestions, results: null });

        // OpenAI API
        console.log(
          `Top 5 activities to do in ${city} when its ${result.weather[0].main}`
        );
        openai
          .createCompletion({
            model: "text-davinci-002",
            prompt: `Top 5 activities to do in ${city} when its ${result.weather[0].main}:`,
            temperature: 0.86,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          })
          .then((response) => {
            console.log(response.data.choices[0].text);
            setActivities(response.data.choices[0].text);
          });
      }
      setIsLoaded(true);
      setResults(result);
      extremeWeather(result);
      bringRightThings(result);
      if (isUseCurrentLocation) {
        setCity(result.name);
      } else {
        setLatitude(result.coord.lat);
        setLongitude(result.coord.lon);
      }
      //Inside this function we can make a switch case on results, and change the background picture
      //to different sources based on the temperature provided
      let weatherMetaData = changeBackground(result);
      setBackground(weatherMetaData.backgroundImg);
      setWeatherIcon(weatherMetaData.weatherIcon);
      setInputValue(result.name);
    }
  };

  const getError = (error) => {
    setIsLoaded(true);
    setError(error);
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
      var queryString = `${city},${countryCode}`;

      if (queryString[0] == ",") {
        queryString = queryString.substring(1);
      }
      apiURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        queryString.trim() +
        "&units=metric" +
        "&appid=" +
        process.env.REACT_APP_APIKEY;
    }

    fetch(apiURL)
      .then((res) => res.json())
      .then(getResults, getError);

    // get Air Quality Index
    fetch(
      "https://api.openweathermap.org/data/2.5/air_pollution?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=" +
        process.env.REACT_APP_APIKEY
    )
      .then((res) => res.json())
      .then((result) => {
        const o3Rate = Math.round(result.list[0].components.o3);
        const no2Rate = Math.round(result.list[0].components.no2);
        o3Rate > no2Rate
          ? setAirQualityIndex(o3Rate)
          : setAirQualityIndex(no2Rate);
      });
  }, [city, countryCode, longitude, latitude, isUseCurrentLocation]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div className="fade">
        <ScrollToTop smooth color="#6f00ff" />
        <Helmet>
          <style>{`body { background-image: url('${background}'); background-repeat: no-repeat;
  background-size: cover; }`}</style>
        </Helmet>
        <img className="logo" src={logo} alt="MLH Prep Logo"></img>
        <div>
          {showWarning ? <Warning /> : null}
          <h2>Enter a city below 👇</h2>
          <div
            style={{
              margin: "auto",
              width: 300,
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(event) => {
                setInputValue(event.target.value);
                setCity("");
                setCountryCode("");
                setIsUseCurrentLocation(false);
              }}
            />
            {suggestions.results !== null && (
              <Cities
                list={suggestions.results}
                selectCity={setCity}
                selectCountry={setCountryCode}
              />
            )}
          </div>
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
                <div>
                  <h3>{results.weather[0].main}</h3>
                  <p>Feels like {results.main.feels_like}°C</p>
                  <i>
                    <p>
                      {results.name}, {results.sys.country}
                    </p>
                  </i>
                </div>
                {airQualityValue && (
                  <AQIPollution
                    airQualityIndex={airQualityIndex}
                    airQualityValue={airQualityValue}
                    airQualityDesc={airQualityDesc}
                    barColor={barColor}
                  />
                )}
              </>
            )}
          </div>
        </div>
        {activities && (
          <div>
            <div className="Activities">
              <h2>Activities</h2>
              <ul>
                {activities.split("\n").map((activity) => (
                  <li>{activity}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div>
          <h1> Weather Globe </h1>
        </div>
        <span style={{ display: "inline-block", padding: "0px 10px" }}>
          <MyGlobe
            setCountry={setCountryCode}
            setCity={setCity}
            setInput={setInputValue}
          />
          <Forecast />
        </span>
        <div className="mapContainer">
          <h1> Global Weather Map </h1>
          <ReactTooltip>{content}</ReactTooltip>
          <div style={{ width: "320%" }}>
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
                          setCity("");
                          setCountryCode(`${name}`);
                          setInputValue(`${name}`);
                        }}
                        onMouseLeave={() => {
                          setcontent("");
                          setCity("");
                        }}
                        style={{
                          hover: {
                            fill: "#0088FF",
                            stroke: "#fff",
                          },
                        }}
                      />
                    ))
                  }
                </Geographies>
                {markers.map(({ name, coordinates, markerOffset }) => (
                  <Marker key={name} coordinates={coordinates}>
                    <circle
                      r={5}
                      fill="#0088FF"
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
        <div className="cards">
          {objects &&
            objects.map((object) => {
              let key = Object.keys(Objects).filter(function (key) {
                return Objects[key] === object;
              });
              return (
                <div className="card-wrapper">
                  {" "}
                  <ItemCard name={key} image={object} />{" "}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
}
export default App;
