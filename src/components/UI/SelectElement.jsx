import React from "react";

const SelectElement = (props) => {
  return (
    <>
      <select
        className={`form-select ${props.classes}`}
        id={props.id}
        aria-label={props.aria}
        value={props.value}
        disabled={props.disabled}
        onChange={props.onChange}
        required={props.required}
      >
        {props.children}
      </select>
      <div className="valid-feedback">Looks good!</div>
      <div className="invalid-feedback">{props.invalidMsg}</div>
    </>
  );
};

export default SelectElement;
