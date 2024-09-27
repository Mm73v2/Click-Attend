import React, { useReducer, useState, useContext } from "react";
import useValidForm from "../../hooks/useValidForm";
import useDuplicatedValue from "../../hooks/useDuplicatedValue";
import useFormData from "../../hooks/useFormData";
import Label from "../UI/Label";
import Input from "../UI/Input";
import SubmitBtn from "../UI/SubmitBtn";
import SelectElement from "../UI/SelectElement";
import AppContext from "../Store/AppContext";
import { HiPlus } from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";

const AddGrade = () => {
  // the default state for the reducer

  const {
    formState,
    updateSelectInput: gradeChangeHandler,
    updateTextInput: writtenGradeChangeHandler,
    updateNumInput: groupsAndLecturesNumberChangeHandler,
  } = useFormData();

  const {
    selectInput: selectedGrade,
    textInput: writtenGrade,
    numInput: groupsNumber,
    secondNumInput: lecturesNumber,
  } = formState;

  // Context
  const ctx = useContext(AppContext);

  // a state for making sure that the user can't choose an option from the select and write his own grade name at the same time.
  const [twoGradeValues, setTwoGradeValues] = useState(false);

  const { handleFormSubmit, formIsValid } = useValidForm();
  const { checkForDuplicatation, isDuplicated } = useDuplicatedValue();

  const formSubmitHandler = (e) => {
    handleFormSubmit(e);

    if (writtenGrade && selectedGrade) {
      setTwoGradeValues(true);
      gradeChangeHandler("");
      writtenGradeChangeHandler("");
      return;
    }

    const duplicatationConditions = [
      (grade) =>
        grade.selectedGrade === selectedGrade ||
        grade.writtenGrade === writtenGrade.toLowerCase(),
    ];
    const duplicationFound = checkForDuplicatation(
      ctx.gradeInfoArr,
      duplicatationConditions
    );
    if (duplicationFound) {
      return;
    }

    if (
      selectedGrade === "" &&
      groupsNumber !== "" &&
      +groupsNumber <= 20 &&
      +groupsNumber > 0 &&
      lecturesNumber !== "" &&
      +lecturesNumber <= 50 &&
      +lecturesNumber > 0 &&
      writtenGrade !== ""
    ) {
      ctx.addGradeInfo({
        gradeName: writtenGrade,
        groupsNumber,
        lecturesNumber,
        id: uuidv4(),
      });
      // updatedWrittenGrade("");
      // updatedGroupsNumber("");
      // updatedLecturesNumber("");
    } else if (
      writtenGrade === "" &&
      groupsNumber !== "" &&
      +groupsNumber <= 20 &&
      +groupsNumber > 0 &&
      lecturesNumber !== "" &&
      +lecturesNumber <= 50 &&
      +lecturesNumber > 0 &&
      selectedGrade !== ""
    ) {
      ctx.addGradeInfo({
        gradeName: selectedGrade,
        groupsNumber,
        lecturesNumber,
        id: uuidv4(),
      });
    }
  };

  return (
    <div className="mt-5">
      <button
        className="btn btn-primary mb-3 d-flex align-items-center "
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#grade-form-collapse"
        aria-expanded="false"
        aria-controls="grade-form-collapse"
      >
        Add Grade <HiPlus />
      </button>

      <div className="collapse" id="grade-form-collapse">
        <form
          className={`border p-3 mx-auto w-75 needs-validation bg-white ${
            !formIsValid && "was-validated"
          }`}
          noValidate
          onSubmit={formSubmitHandler}
        >
          <Label htmlFor="select-grade">Select A Grade:</Label>
          <SelectElement
            id="select-grade"
            aria="Select a grade"
            value={selectedGrade}
            disabled={writtenGrade === "" ? false : true}
            required={true}
            invalidMsg="Please Choose a grade! OR make your own."
            onChange={(e) =>
              gradeChangeHandler({
                value: e.target.value,
                identifier: "selectInput",
              })
            }
          >
            <option value="">--Choose Grade</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </SelectElement>

          {!twoGradeValues ? (
            <div className="my-3 text-success fw-bold fs-5">
              Or Just Make Your Own!
            </div>
          ) : (
            <div className="my-3 text-danger fw-bold fs-5">
              You Can't Choose Both!!
            </div>
          )}
          <div className="mb-3">
            <Label htmlFor="grade-maker">Grade Name:</Label>
            <Input
              type="text"
              id="grade-maker"
              placeholder="Grade Name"
              value={writtenGrade}
              required={true}
              onChange={(e) => writtenGradeChangeHandler(e.target.value)}
              invalidMsg="Please enter a grade name! OR Choose one from the select."
              disabled={selectedGrade === "" ? false : true}
            />
          </div>

          <div className="mb-3">
            <Label htmlFor="groups-number">How Many Groups Do You Want?</Label>
            <Input
              type="number"
              id="groups-number"
              placeholder="Number Of Gropus"
              min="1"
              max="20"
              value={groupsNumber}
              required={true}
              onChange={(e) =>
                groupsAndLecturesNumberChangeHandler({
                  value: e.target.value,
                  identifier: "numInput",
                })
              }
            />
          </div>

          <div className="mb-3">
            <Label htmlFor="lectures-number">
              How Many Lectures You Want To Set?
            </Label>
            <Input
              type="number"
              id="lectures-number"
              placeholder="Number Of Lecture"
              min="1"
              max="50"
              value={lecturesNumber}
              required={true}
              onChange={(e) =>
                groupsAndLecturesNumberChangeHandler({
                  value: e.target.value,
                  identifier: "secondNumInput",
                })
              }
            />
          </div>

          <SubmitBtn>Add Grade</SubmitBtn>
          {isDuplicated && (
            <div className="mt-3 text-danger fw-bold">
              This Grade Already Exists!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddGrade;
