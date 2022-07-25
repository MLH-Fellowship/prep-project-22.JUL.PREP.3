import React from "react";
import "./Forecast.css";

const Forecast = () => {
  return (
    <div className="forecast-display">
      <h3>The forecast for selected city</h3>
      <div className="forecast-widget" id="openweathermap-widget-11"></div>
      <script src="//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/d3.min.js" />
      <script>
        window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];
        window.myWidgetParam.push(id: 10,cityid: '587084',appid:
        '7817e68c00a90c5a142287a9f7d664c3',units: 'metric',containerid:
        'openweathermap-widget-11', ); (function() var script =
        document.createElement('script');script.async = true;script.charset =
        "utf-8";script.src =
        "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";var
        s =
        document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script,
        s);)();
      </script>
    </div>
  );
};

export default Forecast;
