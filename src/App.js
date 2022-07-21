import { useEffect, useState } from "react";
import "./App.css";
import useFetch from "./hooks/useFetch";
import logo from "./mlh-prep.png";
import Cities from "./components/Cities";
function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [results, setResults] = useState(null);
  const { data, setData } = useFetch();
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
