import { useState } from "react";

const useValidForm = () => {
  const [formIsValid, setFormIsValid] = useState(true);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!e.target.checkValidity()) {
      setFormIsValid(false);
    } else {
      setFormIsValid(true);
    }
  };

  return { handleFormSubmit, formIsValid };
};

export default useValidForm;
