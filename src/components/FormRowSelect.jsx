import React from "react";

// NEED: name , labelText, currValue, arrValue, onChangeHandler
const FormRowSelect = (props) => {
  return (
    <div className="form-row">
      <label htmlFor={props.name} className="form-label">
        {props.labelText || "labelSelect"}
      </label>
      <select
        name={props.name}
        id={props.name}
        value={props.currValue}
        onChange={props.onChangeHandler}
        className="form-select"
      >
        {props.arrValue.map((val, index) => {
          return (
            <option value={val} key={index}>
              {val}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormRowSelect;
