import React from "react";

// need: name , labelText, value, type, onChangeHandler
const FormRow = (props) => {
  return (
    <div className="form-row">
      <label htmlFor={props.name} className="form-label">
        {props.labelText || props.name}
      </label>
      <input
        type={props.type}
        onChange={props.onChangeHandler}
        id={props.name}
        value={props.value}
        className="form-input"
      />
    </div>
  );
};

export default FormRow;
