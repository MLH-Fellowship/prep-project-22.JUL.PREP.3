import {useEffect, useState} from 'react';
import "./Forecast.css";



var localTime = new Date().toLocaleTimeString();
var weatherIconsMap = {
  "01d": "wi-day-sunny",
  "01n": "wi-night-clear",
  "02d": "wi-day-cloudy",
  "02n": "wi-night-cloudy",
  "03d": "wi-cloud",
  "03n": "wi-cloud",
  "04d": "wi-cloudy",
  "04n": "wi-cloudy",
  "09d": "wi-showers",
  "09n": "wi-showers",
  "10d": "wi-day-hail",
  "10n": "wi-night-hail",
  "11d": "wi-thunderstorm",
  "11n": "wi-thunderstorm",
  "13d": "wi-snow",
  "13n": "wi-snow",
  "50d": "wi-fog",
  "50n": "wi-fog"
};



const Forecast = ({data, results}) => {


  let [c, setC] = useState();
  let [f, setF] = useState();
  var [isFerenheit, setIsFerenheit] = useState(false);
  function toFerenheit(){
    if(!isFerenheit){
      c.style.opacity = 0.5;
      f.style.opacity = 1;
      var degrees = (temp * 1.8) + 32;
      var degrees_max = (temp_max * 1.8) + 32;
      var degrees_min = (temp_min * 1.8) + 32;
    setTemp(Math.round(degrees));
    setTempMax(Math.round(degrees_max));
    setTempMin(Math.round(degrees_min));
    setIsFerenheit(true);
    }
    
    
  }
  function toCelsius(){
    f.style.opacity = 0.5;
    c.style.opacity = 1;
    setIsFerenheit(false);
    setTemp(Math.round(results.main.feels_like));
    setTempMax(Math.round(results.main.temp_max));
    setTempMin(Math.round(results.main.temp_min));
  }

  if(results !== null ){
    var weatherIcon = "wi "+weatherIconsMap[results.weather[0].icon];
  }
  let currentTime = new Date().toLocaleTimeString();
  const [time, setTime] = useState(currentTime);
  
  function updateTime() {
    let time = new Date().toLocaleTimeString();
    setTime(time);
    
  }
  const [temp, setTemp] = useState();
  const [temp_max, setTempMax] = useState();
  const [temp_min, setTempMin] = useState();

  function updateTemp(){
    if(results !== null){
      if(results.sys.country === "US" && !isFerenheit){ // set the default metric to Farenheit for US users
        var degrees = (results.main.feels_like * 1.8) + 32;
        var degrees_max = (results.main.temp_max * 1.8) + 32;
        var degrees_min = (results.main.temp_min * 1.8) + 32;
        setTemp(Math.round(degrees));
        setTempMax(Math.round(degrees_max));
        setTempMin(Math.round(degrees_min));
        setIsFerenheit(true);
        console.log(isFerenheit);
      }else if(isFerenheit){
        var degrees = (results.main.feels_like * 1.8) + 32;
        var degrees_max = (results.main.temp_max * 1.8) + 32;
        var degrees_min = (results.main.temp_min * 1.8) + 32;
        setTemp(Math.round(degrees));
        setTempMax(Math.round(degrees_max));
        setTempMin(Math.round(degrees_min));
      }else{
        setTemp(Math.round(results.main.feels_like));
        setTempMax(Math.round(results.main.temp_max));
        setTempMin(Math.round(results.main.temp_min));
        setIsFerenheit(false);
      }
    }
      
  }
  useEffect(()=> {
    setIsFerenheit(false);
    setC( document.getElementById("celsius"));
    setF(document.getElementById("ferenheit"));
    updateTemp();
  
  
},[results]);
  
  

  setInterval(updateTime, 1000);
  
  try{
    return (
        <div className="container-fluid" id="current-weather">
          <div className="row">
            <div className="col-md-4 col-sm-5" style={{ textAlign: "left" }}>
              <h5>
                <spam id="cityName">{results.name}</spam>, <spam id="cityCode">{results.sys.country}</spam>
              </h5>
              <h6 id="localDate">{new Date().toDateString()}</h6>
              <h5 id="localTime">{currentTime}</h5>
              <a id="refreshButton" href="#">
                <i class="fa fa-refresh fa-fw" aria-hidden="true"></i> Refresh
              </a>
            </div>
  
            <div
              className="col-md-5 col-sm-7"
              style={{ margin: "10px auto", padding: "0" }}
            >
              <div className="row">
                <i className={weatherIcon} id="main-icon" style={{ fontSize: "85px" }}></i>
                <div>
                  <spam id="mainTemperature">{temp}</spam>
                  <p id="tempDescription">{results.weather[0].description}</p>
                </div>
                <p style={{ fontSize: "1.5rem" }}>{}
                  <button id="celsius" onClick={toCelsius}>
                    °C
                  </button>{" "}
                  |{" "}
                  <button id="ferenheit" onClick={toFerenheit}>
                    °F
                  </button>
                </p>
              </div>
            </div>
  
            <div
              className="col-xs-12 col-sm-12 col-md-3 row"
              style={{ textAlign: "right" }}
            >
              <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                <h6>
                  Humidity: <spam id="humidity">{results.main.humidity}</spam>%
                </h6>
              </div>
              <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                <h6>
                  Wind: <spam id="wind">{results.wind.speed}</spam> m/s
                </h6>
              </div>
              <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                <h6>
                  High: <spam id="mainTempHot">{temp_max}</spam>°
                </h6>
              </div>
              <div className="col-md-12 col-sm-3 col-xs-3 side-weather-info">
                <h6>
                  Low: <spam id="mainTempLow">{temp_min}</spam>°
                </h6>
              </div>
            </div>
          </div>
        </div>

       
        
  
        

    );
  }catch(error){
    console.log(error);
    return (
    <div
      className="modal fade"
      id="protocol-modal"
      tabindex="-1"
      role="dialog"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              dataDismiss="modal"
              ariaLabel="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>
              Due to weather api restrictions, data can only be shown via HTTP
              request.
            </p>
            <p>Sorry for the inconvenience.</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-default"
              dataDismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>);
  }
  
};

export default Forecast;
