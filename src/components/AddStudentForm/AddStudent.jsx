import React, { useContext } from "react";
import useValidForm from "../../hooks/useValidForm";
import useDuplicatedValue from "../../hooks/useDuplicatedValue";
import useFormData from "../../hooks/useFormData";
import { HiPlus } from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";
import Label from "../UI/Label";
import Input from "../UI/Input";
import SubmitBtn from "../UI/SubmitBtn";
import SelectElement from "../UI/SelectElement";
import AppContext from "../Store/AppContext";

const AddStudentForm = () => {
  // Hooks

  // custom hook to prevent default behavior of form submition and to validate it.
  const { handleFormSubmit, formIsValid } = useValidForm();

  // custom hook to check for duplicated students.
  const { checkForDuplicatation, isDuplicated } = useDuplicatedValue();

  const {
    formState,
    updateTextInput: studentNameChangeHandler,
    updateSelectInput: studentGradeAndGroupChangeHandler,
  } = useFormData();

  const {
    textInput: studentName,
    selectInput: studentGrade,
    secondSelectInput: studentGroup,
  } = formState;
  // the app context.
  const ctx = useContext(AppContext);
  let lectures = null;
  if (ctx.groupsMaker(studentGrade)) {
    lectures = ctx.groupsMaker(studentGrade)[1];
  }

  // the form submition function
  const formSubmitHandler = (e) => {
    // handling the prevent default and changing the ui when the form is not valid.
    handleFormSubmit(e);

    // the conditions for the useDuplicatedValue hook to check if the student already exits in the student's array.
    const duplicatationConditions = [
      (student) =>
        student.studentName.toLowerCase() === studentName.toLowerCase() &&
        student.studentGrade === studentGrade &&
        student.studentGroup === studentGroup,
    ];

    // the reutrn value from the function after checking if the student exist or not.
    const duplicatationFound = checkForDuplicatation(
      ctx.studentsArr,
      duplicatationConditions
    );

    // checking if the value back from the function is true to stop the submition.
    if (duplicatationFound) {
      return;
    }

    // checking if all inputs have values and then submiting the values to the student's array.
    if (studentName !== "" && studentGrade !== "" && studentGroup !== "") {
      ctx.addStudent({
        studentName,
        studentGrade,
        studentGradeLectures: lectures,
        studentGroup,
        studentId: uuidv4(),
        studentPresence: 0,
        studentAbsence: 0,
      });

      // reseting the inputs.
      // updatedStudentName("");
      // updatedGrade("");
      // updatedGroup("");
    }
  };

  return (
    <div className="mt-5 mb-3">
      <button
        className="btn btn-primary mb-3 d-flex align-items-center "
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#student-form-collapse"
        aria-expanded="false"
        aria-controls="student-form-collapse"
      >
        Add Student <HiPlus />
      </button>

      <div className="collapse" id="student-form-collapse">
        <form
          className={`border p-3 mx-auto w-75 needs-validation bg-white ${
            !formIsValid && "was-validated"
          }`}
          noValidate
          onSubmit={formSubmitHandler}
        >
          <div className="mb-3">
            <Label htmlFor="student-name">Student Name:</Label>
            <Input
              type="text"
              id="student-name"
              placeholder="Student Name"
              onChange={(e) => studentNameChangeHandler(e.target.value)}
              value={studentName}
              required={true}
              invalidMsg="Please enter a student name."
            />
          </div>

          <div className="mb-3">
            <Label htmlFor="grade-select">Select A Grade</Label>
            <SelectElement
              id="grade-select"
              onChange={(e) =>
                studentGradeAndGroupChangeHandler({
                  value: e.target.value,
                  identifier: "selectInput",
                })
              }
              value={studentGrade}
              required={true}
              invalidMsg="Please select a grade."
            >
              <option value="">--Choose Grade:</option>
              {ctx.gradeInfoArr.length <= 0 && (
                <option disabled value="">
                  No Grades Added.
                </option>
              )}
              {ctx.gradesMaker()}
            </SelectElement>
          </div>

          <div className="mb-3">
            <Label htmlFor="group-select">Select A Group:</Label>
            <SelectElement
              id="group-select"
              value={studentGroup}
              required={true}
              onChange={(e) =>
                studentGradeAndGroupChangeHandler({
                  value: e.target.value,
                  identifier: "secondSelectInput",
                })
              }
              invalidMsg="Please Select a group."
            >
              <option value="">--Choose Group:</option>
              {studentGrade === "" && (
                <option disabled value="">
                  No Grade Selected
                </option>
              )}
              {ctx.groupsMaker(studentGrade)}
            </SelectElement>
          </div>

          <SubmitBtn>Add Student</SubmitBtn>
          {isDuplicated && (
            <div className="mt-3 text-danger fw-bold">
              This Student Is Already Added To This Grade And Group!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddStudentForm;
