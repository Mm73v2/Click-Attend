import React from "react";

const Input = (props) => {
  if (props.type === "number") {
    return (
      <>
        <input
          type={props.type}
          className={`form-control`}
          id={props.id}
          placeholder={props.placeholder}
          min={props.min}
          max={props.max}
          value={props.value}
          required={props.required}
          onChange={props.onChange}
        />
        <div className="valid-feedback">Looks good!</div>
        <div className="invalid-feedback">
          Please enter a number between {props.min} and {props.max}
        </div>
      </>
    );
  } else {
    return (
      <>
        <input
          type={props.type}
          className={`form-control ${props.classes}`}
          id={props.id}
          placeholder={props.placeholder}
          disabled={props.disabled}
          value={props.value}
          required={props.required}
          onChange={props.onChange}
        />
        <div className="valid-feedback">Looks good!</div>
        <div className="invalid-feedback">{props.invalidMsg}</div>
      </>
    );
  }
};

export default Input;
