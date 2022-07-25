import React from "react";
import Tilt from "react-tilt";
import "./itemCard.css";

function ItemCard(props) {
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <Tilt
      className="Tilt"
      options={{ max: 25 }}
      style={{ height: 300, width: 250 }}
    >
      <div className="card">
        <img src={props.image} alt="" className="icon" />
        <h3 className="desc">
          Don't forget to bring your <br /> {props.name}!{" "}
        </h3>
        <input type="checkbox" checked={checked} onChange={handleChange} />
      </div>
    </Tilt>
  );
}

export default ItemCard;
