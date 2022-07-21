import React, {useState, useEffect} from 'react';
import "./ForecastCard.css";

const ForecastCard = ({data, results}) => {
    console.log("data", data);

    const [today, setToday] = useState("")
    
    // const weekDayHandle = () => {
    //     let days = new Date().getDay()
    //     console.log(days)
        // if(days==='0') {
        //     return "Monday"
        // } else if(days==='4') {
        //     return "Thursday"
        // }

    // }

    useEffect(()=> {
        let days = new Date().getDay()

        // console.log(indexOf(data.list[1])
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
        }
    }
    
    return (
        <div >
            <h3>Weekly Forecast for {results.name}</h3>
            <div className="d-flex justify-content">
              {
                data.list.map(e =>(
                    <div className="weather" key={e.dt}>
                        <div className="row">
                            <div className=" col-md-6">
                                <div className="card">
                                    <span className="icon"><img className="img-fluid" src={getImage(e.weather[0].main)}/></span>
                                    <h4>{today}</h4>
                                    <div className="temp">{Math.round(`${toCelsius(`${e.feels_like.day}`)}`, -1)}°C</div>
                                    <div className="value">{`${e.weather[0].description}`.toUpperCase()}</div>
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="header">General</div>
                                            <div className="value">{e.weather[0].description}</div>
                                        </div>
                                        <div className="col-4">
                                            <div className="header">Cloudiness</div>
                                            <div className="value">{e.clouds}%</div>
                                        </div>
                                        <div className="col-4">
                                            <div className="header">Wind speed</div>
                                            <div className="value">{e.speed} m/s</div>
                                        </div>
                                        <div className="col-4">
                                            <div className="header">Humidity</div>
                                            <div className="value">{e.humidity}%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                }
            </div>
        </div>
    );
};

export default ForecastCard;
