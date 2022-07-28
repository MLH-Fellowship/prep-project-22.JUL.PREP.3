import "./AQIPollution.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const AQIPollution = ({
  airQualityIndex,
  airQualityValue,
  airQualityDesc,
  barColor,
}) => {
  return (
    <div className="container-fluid" id="current-weather">
      <div className="row">
        <div className="col-md-5 col-sm-5 aqi-bar-display">
          <h4>
            <b>Air Quality</b>
          </h4>
          <div className="circular-bar">
            <CircularProgressbar
              value={airQualityIndex}
              text={airQualityIndex}
              maxValue={500}
              strokeWidth={10}
              styles={buildStyles({
                textColor: "white",
                pathColor: `${barColor}`,
              })}
            />
          </div>
        </div>

        <div
          className="col-md-6 col-sm-6"
          id="aqi-text"
          style={{ textAlign: "left" }}
        >
          <h4>{airQualityValue}</h4>
          <h5 className="aqi-text-desc">{airQualityDesc}</h5>
        </div>
      </div>
    </div>
  );
};

export default AQIPollution;
