import { useEffect, useState } from "react";
import './App.css';
import logo from './img/mlh-prep.png'
import umbrella from './img/umbrella.png'
import hat from './img/pamela-hat.png'
import coat from './img/coat.png'
import sunscreen from './img/sunscreen.png'
import scarf from './img/scarf.png'
import boots from './img/boots.png'
import sunglasses from './img/sunglasses.png'
import ItemCard from './ItemCard'

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [city, setCity] = useState("New York City")
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=" + process.env.REACT_APP_APIKEY)
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
          </>}
        </div>
      </div>
      <div className="cards">
        <div class ="card"> <ItemCard name="umbrella" image={umbrella}/> </div>
        <div class ="card"> <ItemCard name="hat" image={hat}/> </div>
        <div class ="card"> <ItemCard name="coat" image={coat}/> </div>
        <div class ="card"> <ItemCard name="sunscreen" image={sunscreen}/> </div>
        <div class ="card"> <ItemCard name="scarf" image={scarf}/> </div>
        <div class ="card"> <ItemCard name="boots" image={boots}/> </div>
        <div class ="card"> <ItemCard name="sunglasses" image={sunglasses}/> </div>
      </div>
    </>
  }
}

export default App;
