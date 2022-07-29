import React, { useState } from 'react';
import ReactGlobe from 'react-globe';
 
// import tippy styles for tooltip support
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import countriesCords from './markers/countriesCoords.json';
import markerColors from "./markers/markers_colors.json";

const countryInfoURL = "https://restcountries.com/v3.1/alpha/"

const options = {
  cameraRotateSpeed: 0.5,
  focusAnimationDuration: 2000,
  focusEasingFunction: ['Linear', 'None'],
  pointLightColor: 'black',
  pointLightIntensity: 1.5,
  globeGlowColor: 'darkblue',
  markerTooltipRenderer: marker => `${marker.country}`,
};

export default function MyGlobe({setCountry,setCity,setInput}) {

  const countries = JSON.parse(JSON.stringify(countriesCords));
  const colors = JSON.parse(JSON.stringify(markerColors));
  const defaultMarkers = countries.map((marker,i)=>({
    id:i,
    ...marker,
    coordinates: [marker.latitude,marker.longitude],
    value: marker.numeric,
    color: colors[i%130]["hex"],
  }))

  const [markers, setMarkers] = useState(defaultMarkers);
  const [event, setEvent] = useState(null);
  const [details, setDetails] = useState(null);
  function onClickMarker(marker, markerObject, event) {
    setEvent({
      type: "CLICK",
      marker,
      markerObjectID: markerObject.uuid,
      pointerEventPosition: { x: event.clientX, y: event.clientY }
    });
    setCountry(marker.country);
    fetch(`${countryInfoURL}${marker.alpha3}`)
    .then((res)=>res.json())
    .then((info)=>{
      const country = info[0];
      const capital = (country.capital === undefined || country.capital.length === 0) ? "" : country.capital[0];
      setCity(capital);
      setInput(capital);

    })
  }
  function onDefocus(previousFocus) {
    setEvent({
      type: "DEFOCUS",
      previousFocus
    });
    setDetails(null);
  }

  return (
    <div style={{margin : "0px 20px"}}>
      {details && (
        <div
          style={{
            background: "white",
            position: "absolute",
            fontSize: 20,
            bottom: 0,
            right: 0,
            padding: 12
          }}
        >
          <p>{details}</p>
          <p>
            EVENT: type={event.type}, position=
            {JSON.stringify(event.pointerEventPosition)})
          </p>
        </div>
      )}
      <ReactGlobe
        globeBackgroundTexture="https://toppng.com/uploads/preview/and-blank-effect-transparent-11546868080xgtiz6hxid.png"
        height="70vh"
        markers={markers}
        options={options}
        width="100%"
        onClickMarker={onClickMarker}
        onDefocus={onDefocus}
      />
    </div>

)}