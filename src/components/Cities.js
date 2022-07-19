import React from "react";

export default function Cities({list})
{
    return (
        <ul>
            {list.map((el,i) => (
                <li key={i}>{el.name}, {el.country}</li>
            ))}
        </ul>
    )
}