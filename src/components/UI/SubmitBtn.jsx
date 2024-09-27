import React from "react";

const SubmitBtn = (props) => {
  return (
    <button
      data-bs-dismiss={props.dismiss}
      className="btn btn-success fw-bold my-1"
      type="submit"
    >
      {props.children}
    </button>
  );
};

export default SubmitBtn;
