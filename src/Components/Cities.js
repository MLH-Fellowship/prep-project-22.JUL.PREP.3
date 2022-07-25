import React from "react";

export default function Cities({ list , selectCity, selectCountry}) {
    if (!list?.length) {
        return (
          <div className="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
    }
  return (
    <ul className="suggestions">
      {list.map((el, i) => (
        <li key={i} onClick={(e)=>{
            selectCity(e.target.innerText.split(",")[0])
            selectCountry(e.target.innerText.split(",")[2].trim())}}>
          {el.address.city}, {el.address.state}, {el.address.countryCode}
        </li>
      ))}
    </ul>
  );
}
