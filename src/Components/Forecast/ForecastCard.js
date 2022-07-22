import React, {useState, useEffect} from 'react';
import "./ForecastCard.css";

const ForecastCard = ({data, results}) => {
    console.log("data", data);
    const [error, setError] = useState(null);
    useEffect(()=> {
            setError(error);
          
    },[]);

    let days = new Date().getDay()

    const [today, setToday] = useState("")
    useEffect(()=> {
        if(days === 4) {
            setToday("Thursday")
        }
    },[])

    const toCelsius = (el) => {
        return el-273.15;
    }

    const getImage = (e) => {
        if(e === "Clear") {
            return "https://img.icons8.com/emoji/96/000000/sun-emoji.png"
        } else if(e === "Rain") {
            return "https://img.icons8.com/external-flat-lima-studio/344/external-rainny-spring-flat-lima-studio.png"
        } else if(e === "Clouds") {
            return "https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/344/external-clouds-weather-smashingstocks-flat-smashing-stocks.png"
        } else if(e==="Snow") {
            return "https://img.icons8.com/color/344/snow--v1.png"
        } else if(e==="Extreme") {
            return "https://img.icons8.com/clouds/344/storm.png"
        }
    }

    let allData = data.list;
    
    if (error) {
        return <div>Error: {error.message}</div>;
      } else {

    return <>
        <div  className="main-block">
            <h3>Weekly Forecast for {results.name}</h3>
            <div className="car-block">
              {
                allData.map(e =>(
                    <div className="card" key={e.dt}>
                        <div className="card-container">
                            <img className="icon" src={getImage(e.weather[0].main)} alt="weather-icon"/>
                            <div className="temp">{Math.round(`${toCelsius(`${e.feels_like.day}`)}`, -1)}°C</div>
                            <div className="desc">{`${e.weather[0].description}`.toUpperCase()}</div>
                            <ul className="details">
                                <li>
                                    <div>Cloudiness {e.clouds}%</div>
                                </li>
                                <li>
                                    <div>Wind speed {e.speed} m/s</div>
                                </li>
                                <li>
                                    <div>Humidity {e.humidity}%</div>
                                </li>
                                <li className="min-max">
                                    <div>Min temp {Math.round(`${toCelsius(`${e.temp.min}`)}`, -1)}°C</div>
                                </li>
                                <li>
                                    <div>Max temp {Math.round(`${toCelsius(`${e.temp.max}`)}`, -1)}°C</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    </>
    };
};

export default ForecastCard;
