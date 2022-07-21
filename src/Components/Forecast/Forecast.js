import React, {useEffect, useLayoutEffect} from 'react';
import "./Forecast.css";

const Forecast = () => {
  // console.log("results",results)
  // // const useScript = () => {
  // //   const script = document.getElementById("forecast-script")
  // //   script.innerHTML = `window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];  window.myWidgetParam.push({id: 11,cityid:${results ? results.id : "2643743"},appid: '7817e68c00a90c5a142287a9f7d664c3',units: 'metric',containerid: 'openweathermap-widget-11',  });  (function() {var script = document.createElement('script');script.async = true;script.charset = "utf-8";script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  })();`
  // //   console.log("Hello")
  // }
  

  // useEffect(()=> {
  //   const script = document.getElementById("forecast-script")
  //   console.log("script", script)
  //   console.log("results",results)
  //   let a = `window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];  window.myWidgetParam.push({id: 11,cityid:${results ? results.id : "2643743"},appid: '7817e68c00a90c5a142287a9f7d664c3',units: 'metric',containerid: 'openweathermap-widget-11',  });  (function() {var script = document.createElement('script');script.async = true;script.charset = "utf-8";script.src = "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  })();`
  //   console.log("a", a)
  //   script.innerHTML = a

  // }, [results])

  return (
    <div className="forecast-display">
      <h3>The forecast for selected city</h3>
      <div id="openweathermap-widget-11"></div>
    </div>
  );
};

export default Forecast;

