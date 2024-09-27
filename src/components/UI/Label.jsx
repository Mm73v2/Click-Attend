import React from "react";

const Label = (props) => {
  return (
    <label className="form-label fw-semibold" htmlFor={props.htmlFor}>
      {props.children}
    </label>
  );
};

export default Label;
