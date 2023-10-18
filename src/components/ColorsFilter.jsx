import React from "react";
import { availableColors, capitalize } from "../features/filters/colors";

const ColorsFilter = ({ onChangeColor }) => {
  const handleChangeColor = (e) => {
    const color = e.target.value;
    const checked = e.target.checked;
    checked ? onChangeColor(color, "addColor") : onChangeColor(color, "remove");
  };
  return (
    <div className="filter--color">
      {availableColors.map((color, index) => (
        <div key={index}>
          <input
            type="checkbox"
            value={color}
            name="color"
            onChange={handleChangeColor}
            id={`"status--${color}`}
          />
          <label htmlFor={`"status--${color}`}>{capitalize(color)}</label>
        </div>
      ))}
    </div>
  );
};

export default ColorsFilter;
