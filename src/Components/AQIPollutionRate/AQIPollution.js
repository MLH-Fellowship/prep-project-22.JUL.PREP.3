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
    <div className="aqi-display">
      <div className="aqi-box">
        <div className="aqi-text-group">
          <p className="aqi-text">Air Quality: </p>
          <div className="circular-bar">
          <CircularProgressbar value={airQualityIndex}
            text={airQualityIndex}
            maxValue={500}
            strokeWidth={10}
            styles={buildStyles({
              textColor: "black",
              pathColor: `${barColor}`,
            })}
          />
          </div>
        </div>
      </div>
      <p className="aqi-text">{airQualityValue}</p>
      <i>""  {airQualityDesc}  ""</i>
    </div>
  );
};

export default AQIPollution;
