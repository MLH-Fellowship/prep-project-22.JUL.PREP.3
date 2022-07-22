import { useEffect, useState } from "react";
import "./App.css";
import useFetch from "./hooks/useFetch";
import Cities from "./Components/Cities";
import logo from "./img/mlh-prep.png";
import ItemCard from "./ItemCard";
import Objects from "./Utilities/Objects";
import React from "react";
import MyGlobe from "./Components/globe_model.js";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import ReactTooltip from "react-tooltip";
import Forecast from "./Components/Forecast/Forecast"

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
  const [countryCode,setCountryCode] = useState("US");
  const [results, setResults] = useState(null);
  const [objects, setObjects] = useState([]);
  const [content, setcontent] = useState("");
  const { data, setData } = useFetch();

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
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // no city is selected yet
    if (city === "" && countryCode === "") {
      setData({ ...data, cityPrefix: inputValue });
    }
  }, [inputValue]);

  useEffect(() => {
    //city is selected ==> fill the input field and hide drop-down
    if (city && countryCode) {
      setInputValue(`${city}, ${countryCode}`);
      setData({ ...data, results: null });
    }
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        `${city},${countryCode}` +
        "&units=metric" +
        "&appid=" +
        process.env.REACT_APP_APIKEY
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result["cod"] !== 200) {
            setIsLoaded(false);
          } else {
            setIsLoaded(true);
            setResults(result);
            bringRightThings(result);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [city, countryCode]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <>
        <img className="logo" src={logo} alt="MLH Prep Logo"></img>
        <div>
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

                // input is changed --> clear selected city
                setCity("");
                setCountryCode("");
              }}
            />
            {data.results !== null && (
              <Cities
                list={data.results}
                selectCity={setCity}
                selectCountry={setCountryCode}
              />
            )}
          </div>
          <br />

                  
        <div className="Results">
          {!isLoaded && <h2>Loading...</h2>}
          {console.log(results)}
          {isLoaded && results && <>
            <h3>{results.weather[0].main}</h3>
            <p>Feels like {results.main.feels_like}°C</p>
            <i><p>{results.name}, {results.sys.country}</p></i>
          </>}
        </div>
    
        </div>
        <div
          // className="mapContainer"
          // style={{
          //   width: "100px",
          //   height: "80px",
          //   display: "flex",
          //   flexDirection: "column",
          //   justifyContent: "centre",
          //   alignItems: "center",
          // }}
        >
          <h1> Weather Globe </h1>
          {/* <ReactTooltip>{content}</ReactTooltip> */}
          
          {/* <div style={{ width: "1400px", borderStyle: "double" }}>
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
          </div> */}
        </div>
        <div style={{display : "flex",padding:"0px 10px"} }>
        <MyGlobe/>
        <Forecast />
        </div>
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
    </>
    )
  }
}

export default App;
