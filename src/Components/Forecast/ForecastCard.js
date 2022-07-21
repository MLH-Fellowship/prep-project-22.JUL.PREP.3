import React from 'react';
import "./ForecastCard.css";

const ForecastCard = ({data}) => {
    console.log("data", data);

    const weekDay = () => {
        let newDate = new Date()
        let day = newDate.getDate()
        console.log("day",day)
    }

    const toC = (el) => {
        return el-273.15
    }
    
    return (
        <div >
            {weekDay}
            <div className="d-flex justify-content">
              {
                data.list.map(e =>(
                    <div className="weather">
                        <div className="row">
                            <div className=" col-md-6">
                                <div className="card">
                                    <span className="icon"><img className="img-fluid" src="https://img.icons8.com/emoji/96/000000/sun-emoji.png"/></span>
                                    <div className="temp">{Math.round(`${toC(`${e.feels_like.day}`)}`, -1)}°C</div>
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

//   <li>
//     <h2>Date: Monday</h2>
//     <h3>The weather is: {e.weather[0].description}</h3>
//     <p>Day: {e.feels_like.day}</p>
//     <p>Evening: {e.feels_like.eve}</p>
//     <p>Morning: {e.feels_like.morn}</p>
//     <p>Night: {e.feels_like.night}</p>
//   </li>