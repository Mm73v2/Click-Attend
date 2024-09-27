import { useReducer } from "react";
const initFormState = {
  selectInput: "",
  secondSelectInput: "",
  textInput: "",
  numInput: "",
  secondNumInput: "",
};
const formStateReducer = (state, action) => {
  switch (action.type) {
    case "SELECT":
      if (action.identifier === "selectInput") {
        return {
          ...state,
          selectInput: action.value,
        };
      } else if (action.identifier === "secondSelectInput") {
        return {
          ...state,
          secondSelectInput: action.value,
        };
      }
    case "TEXT":
      return {
        ...state,
        textInput: action.value.trim().length > 0 ? action.value : "",
      };
    case "NUMBER":
      if (action.identifier === "numInput") {
        return {
          ...state,
          numInput: action.value,
        };
      } else if (action.identifier === "secondNumInput") {
        return {
          ...state,
          secondNumInput: action.value,
        };
      }
  }
  return {
    selectInput: "",
    textInput: "",
    numInput: "",
    secondNumInput: "",
  };
};

const useFormData = () => {
  const [formState, dispatchFormState] = useReducer(
    formStateReducer,
    initFormState
  );

  const updateSelectInput = (data) => {
    dispatchFormState({
      type: "SELECT",
      value: data.value,
      identifier: data.identifier,
    });
  };

  const updateTextInput = (value) => {
    dispatchFormState({ type: "TEXT", value });
  };

  const updateNumInput = (data) => {
    dispatchFormState({
      type: "NUMBER",
      value: data.value,
      identifier: data.identifier,
    });
  };

  return {
    formState,
    updateSelectInput,
    updateTextInput,
    updateNumInput,
  };
};

export default useFormData;
