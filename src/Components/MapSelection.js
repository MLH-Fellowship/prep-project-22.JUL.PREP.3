import React, { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from "react-simple-maps";


const markers = [

    {
        markerOffset: -15,
        name: "Sao Paulo",
        coordinates: [-58.3816, -34.6037],

    },


    {
        markerOffset: -15,
        name: "Melbourne",
        coordinates: [144.963058, -37.813629],


    },
]

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const mapSelection = () => {

    return (

        <div className="mapContainer"
            style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'centre', alignItems: 'center' }}>

            <h1> Global Weather Map </h1>
            <div style={{ width: "1400px", borderStyle: "double" }}>

                <ComposableMap data-tip="">
                    <ZoomableGroup zoom={1}>
                        {" "}
                        <Geographies geography={geoUrl}>

                            {({ geographies }) =>

                                geographies.map((geo) => (

                                    <Geography key={geo.rsmKey} geography={geo} />
                                ))

                            }
                        </Geographies>
                        {
                            markers.map(({ name, coordinates, markerOffset }) => (
                                <Marker key={name} coordinates={coordinates}>

                                    <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
                                    <text textAnchor="middle" y={markerOffset} style={{ fontFamily: "system-ui", fill: '#505A6D' }}> {name} </text>

                                </Marker>
                            )

                            )
                        }

                    </ZoomableGroup>

                </ComposableMap>
            </div>

        </div>
    );
}


export default mapSelection