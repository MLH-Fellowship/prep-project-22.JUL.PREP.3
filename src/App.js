import axios from "axios";
import { useEffect, useState } from "react";
import './App.css';
import logo from './mlh-prep.png';

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City");
  const [results, setResults] = useState(null);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=7817e68c00a90c5a142287a9f7d664c3")
      .then(res => res.json())
      .then(
        (result) => {
          if (result['cod'] !== 200) {
            setIsLoaded(false)
          } else {
            setIsLoaded(true);
            setResults(result);
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [city])

  useEffect(()=> {
    axios
      .get("http://api.openweathermap.org/data/2.5/forecast/daily?q=" + city + "&cnt=7&appid=7817e68c00a90c5a142287a9f7d664c3")
      .then(resp=> {
        setForecast(resp.data)
      })
  },[city])


  // useEffect(()=> {
  //   const script = document.getElementById("forecast-script")
  //   console.log("script", script)
  //   console.log("results",results)
  //   let a = `window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];  window.myWidgetParam.push({id: 11,cityid:${results ? results.id : "2643743"},appid: '7817e68c00a90c5a142287a9f7d664c3',units: 'metric',containerid: 'openweathermap-widget-11',  });  (function() {var script = document.createElement('script');script.async = true;script.charset = "utf-8";script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  })();`
  //   console.log("a", a)
  //   script.innerHTML = a
  //   const aa = document.getElementsByTagName("body")[0];
  //   aa.style.backgroundColor = "red";
  // }, [results])

  // function getData(){
  //   const script = document.getElementById("forecast-script")
  //   console.log("script", script)
  //   console.log("results",results)
  //   let a = `window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];  window.myWidgetParam.push({id: 11,cityid:${results ? results.id : "2643743"},appid: '7817e68c00a90c5a142287a9f7d664c3',units: 'metric',containerid: 'openweathermap-widget-11',  });  (function() {var script = document.createElement('script');script.async = true;script.charset = "utf-8";script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  })();`
  //   console.log("a", a)
  //   script.innerHTML = a
  // }

  // useEffect(()=> {
  //   return getData;
  // },[results])

  // useEffect(()=> {
  //   axios
  //     .get("https://api.openweathermap.org/data/2.5/forecast/daily?id=524901&appid=7817e68c00a90c5a142287a9f7d664c3")
  //     .then(resp=> {
  //       setForecast(resp.data)
  //     })
  // },[])

  console.log("forecast", forecast)


  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return <>
      <img className="logo" src={logo} alt="MLH Prep Logo"></img>
      <div>
        <h2>Enter a city below 👇</h2>
        <input
          type="text"
          value={city}
          onChange={event => setCity(event.target.value)} />
        <div className="Results">
          {!isLoaded && <h2>Loading...</h2>}
          {console.log(results)}
          {isLoaded && results && <>
            <h3>{results.weather[0].main}</h3>
            <p>Feels like {results.main.feels_like}°C</p>
            <i><p>{results.name}, {results.sys.country}</p></i>
            {/* <table>
              <tr>
                <th>City</th>
                <th>{forecast.list[0].dt}</th>
              </tr>
            </table> */}
            <ul>
              {
                forecast.list.map(e =>(
                  <li>
                    <h2>Date: Monday</h2>
                    <h3>The weather is: {e.weather[0].description}</h3>
                    <p>Day: {e.feels_like.day}</p>
                    <p>Evening: {e.feels_like.eve}</p>
                    <p>Morning: {e.feels_like.morn}</p>
                    <p>Night: {e.feels_like.night}</p>
                  </li>
                ))
              }
            </ul>
          </>}
        </div>
            {/* <Forecast />
        <button onClick={getData}>Check forecast</button> */}
            {/* <p>{forecast.city.name}</p>
            <p>{forecast.list[0].clouds}</p>
            <p>{forecast.city.name}</p>
            <p>{forecast.city.name}</p> */}
      </div>
    </>
  }
}

export default App;
