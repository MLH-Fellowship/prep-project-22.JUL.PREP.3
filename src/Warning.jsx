import React from "react"
import "./App.css"
import warning from './img/NicePng_exclamation-point-png_229128.png'

const Warning = () => {
    return (
        <div class="warning">
            <img src={warning} alt="warning" class="exclaim" />
            <h3>WARNING: EXTREME WEATHER <br /> CONDITION</h3>
        </div>
    )
}

export default Warning