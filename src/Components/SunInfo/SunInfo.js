import React, { useEffect } from "react";
import sunIcon from "../../img/sun.png";
import moonIcon from "../../img/moon.png";
import "./SunInfo.css";

const getFormattedTime = (timestamp) => {
  const date = new Date(
    (timestamp + new Date().getTimezoneOffset() * 60) * 1000
  );
  // Hours part from the timestamp
  const hours = date.getHours();
  // Minutes part from the timestamp
  const minutes = "0" + date.getMinutes();

  // Will display time in 10:30:23 format
  const formattedTime = hours + ":" + minutes.substr(-2);

  return formattedTime;
};

function SunInfo({ results }) {
  console.log(results);
  const currentTimestamp = new Date().getTime() / 1000 + results?.timezone;
  const sunriseTimestamp = results?.sys.sunrise + results?.timezone;
  const sunsetTimestamp = results?.sys.sunset + results?.timezone;
  const isNight =
    currentTimestamp > sunsetTimestamp || currentTimestamp < sunriseTimestamp;
  const timeBeforeSunset = sunsetTimestamp - currentTimestamp;
  let timeBeforeSunrise = sunriseTimestamp - currentTimestamp;
  if (timeBeforeSunrise < 0) {
    timeBeforeSunrise = timeBeforeSunrise + 24 * 3600;
  }
  return (
    <div
      className="SunInfo"
      style={{ backgroundColor: isNight ? "#0d0d36" : "#f2f2e6" }}
    >
      {results && (
        <>
          <p
            className="sun_description"
            style={{ color: isNight ? "white" : "black" }}
          >
            <img
              className="sun-icon"
              src={isNight ? moonIcon : sunIcon}
              alt="Sun/Moon  Icon"
            ></img>
            Sunrise time: <span>{getFormattedTime(sunriseTimestamp)}</span>
          </p>
          <p
            className="moon_description"
            style={{ color: isNight ? "white" : "black" }}
          >
            Sunset time: <span>{getFormattedTime(sunsetTimestamp)}</span>
          </p>
          <i
            className="sun_description"
            style={{ color: isNight ? "white" : "black" }}
          >
            {isNight
              ? `${Math.floor(timeBeforeSunrise / 3600)} h. ${Math.floor(
                  (timeBeforeSunrise % 3600) / 60
                )}  min. before sunrise`
              : `${Math.floor(timeBeforeSunset / 3600)} h. ${Math.floor(
                  (timeBeforeSunset % 3600) / 60
                )}  min. before sunset`}
          </i>
        </>
      )}
    </div>
  );
}

export default SunInfo;
