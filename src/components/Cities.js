import React from "react";

export default function Cities({ list }) {
    if (!list?.length) {
        return (
          <div class="no-suggestions">
            <em>No suggestions, you're on your own!</em>
          </div>
        );
    }
  return (
    <ul className="suggestions">
      {list.map((el, i) => (
        <li key={i}>
          {el.name}, {el.country}
        </li>
      ))}
    </ul>
  );
}
