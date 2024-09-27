import React, { useContext, useEffect, useState } from "react";
import Label from "../UI/Label";
import Input from "../UI/Input";
import SubmitBtn from "../UI/SubmitBtn";
import SelectElement from "../UI/SelectElement";
import useValidForm from "../../hooks/useValidForm";
import useFormData from "../../hooks/useFormData";
import useDuplicatedValue from "../../hooks/useDuplicatedValue";
import AppContext from "../Store/AppContext";

const ModifyStudentData = (props) => {
  const { handleFormSubmit, formIsValid } = useValidForm();

  const {
    formState,
    updateSelectInput: newGradeAndGroupChangeHandler,
    updateTextInput: newNameChangeHandler,
    updateNumInput: newPresenceAndAbsenceChangeHandler,
  } = useFormData();

  const {
    textInput: newName,
    selectInput: newGrade,
    secondSelectInput: newGroup,
    numInput: newPresence,
    secondNumInput: newAbsence,
  } = formState;

  const { checkForDuplicatation, isDuplicated } = useDuplicatedValue();

  const ctx = useContext(AppContext);

  let gradeLectures = null;
  if (ctx.groupsMaker(newGrade)) {
    gradeLectures = ctx.groupsMaker(newGrade)[1];
  } else {
    gradeLectures = +props.data.studentLectures;
  }

  const newTotalAttendance = +newPresence + +newAbsence;

  const totalAttendance =
    props.data.studentPresence + props.data.studentAbsence;

  const [mustChangeAttendance, setMustChangeAttendance] = useState(false);
  const [changesDone, setChangesDone] = useState(false);

  const formInputsReset = () => {
    newGradeAndGroupChangeHandler({ value: "", identifier: "selectInput" });
    newGradeAndGroupChangeHandler({
      value: "",
      identifier: "secondSelectInput",
    });
    newNameChangeHandler("");
    newPresenceAndAbsenceChangeHandler({ value: "", identifier: "numInput" });
    newPresenceAndAbsenceChangeHandler({
      value: "",
      identifier: "secondNumInput",
    });
  };

  const formSubmitHandler = (e) => {
    handleFormSubmit(e);
    // the conditions for the useDuplicatedValue hook to check if the student already exits in the student's array.
    const duplicatationConditions = [
      (student) =>
        student.studentName.toLowerCase() === newName.toLowerCase() &&
        student.studentGrade === props.data.studentGrade &&
        student.studentGroup === props.data.studentGroup,
    ];

    // the reutrn value from the function after checking if the student exist or not.
    const duplicatationFound = checkForDuplicatation(
      ctx.studentsArr,
      duplicatationConditions
    );
    // checking if the value back from the function is true to stop the submition.
    if (duplicatationFound) {
      if (
        (newGrade === props.data.studentGrade &&
          newGroup === props.data.studentGroup) ||
        (newGrade === "" && newGroup === "")
      ) {
        // formInputsReset();
        return;
      }
    }

    if (newGrade !== "") {
      if (totalAttendance > gradeLectures) {
        if (
          newTotalAttendance <= gradeLectures &&
          newPresence !== "" &&
          newAbsence !== ""
        ) {
          setMustChangeAttendance(false);
        } else {
          setMustChangeAttendance(true);
          setChangesDone(false);
          return;
        }
      }
    }
    if (newTotalAttendance > gradeLectures) {
      setMustChangeAttendance(true);
      return;
    } else {
      setMustChangeAttendance(false);
    }
    ctx.modifyStudent(props.data.studentId, {
      newName,
      newGrade,
      gradeLectures,
      newGroup,
      newPresence,
      newAbsence,
    });
    // reseting the input after submition
    formInputsReset();
    setChangesDone(true);
    setTimeout(() => setChangesDone(false), 3000);
  };

  useEffect(() => {
    if (newGrade !== "") {
      if (totalAttendance > gradeLectures) {
        if (
          newTotalAttendance <= gradeLectures &&
          newPresence !== "" &&
          newAbsence !== ""
        ) {
          setMustChangeAttendance(false);
        } else {
          setMustChangeAttendance(true);
          setChangesDone(false);
        }
      }
    }
  }, [totalAttendance, gradeLectures]);

  return (
    <>
      <form
        className={`border p-3 mx-auto w-75 needs-validation bg-white text-start ${
          !formIsValid && "was-validated"
        }`}
        noValidate
        onSubmit={formSubmitHandler}
      >
        <div className="mb-3">
          <Label htmlFor="change-student-name">Change Student Name:</Label>
          <Input
            type="text"
            id="change-student-name"
            placeholder="Change Student Name"
            onChange={(e) => newNameChangeHandler(e.target.value)}
            value={newName}
          />
        </div>

        <div className="mb-3">
          <Label htmlFor="change-grade-select">Change Grade:</Label>
          <SelectElement
            id="change-grade-select"
            required={false}
            onChange={(e) =>
              newGradeAndGroupChangeHandler({
                value: e.target.value,
                identifier: "selectInput",
              })
            }
            value={newGrade}
          >
            <option value="">--Change Grade:</option>
            {ctx.gradeInfoArr.length <= 0 && (
              <option disabled value="">
                No Grades Added.
              </option>
            )}
            {ctx.gradesMaker()}
          </SelectElement>
        </div>

        <div className="mb-3">
          <Label htmlFor="change-group-select">Change Group:</Label>
          <SelectElement
            id="change-group-select"
            required={false}
            onChange={(e) =>
              newGradeAndGroupChangeHandler({
                value: e.target.value,
                identifier: "secondSelectInput",
              })
            }
            value={newGroup}
          >
            <option value="">--Change Group:</option>
            {newGrade === "" && (
              <option disabled value="">
                No Grade Selected
              </option>
            )}
            {ctx.groupsMaker(newGrade)}
          </SelectElement>
        </div>

        <div className="mb-3">
          <Label htmlFor="presence-number">Change Presence:</Label>
          <Input
            type="number"
            id="presence-number"
            placeholder="Presence"
            min="0"
            max={
              gradeLectures - newAbsence < 0 ? "0" : gradeLectures - newAbsence
            }
            value={newPresence}
            required={mustChangeAttendance}
            onChange={(e) =>
              newPresenceAndAbsenceChangeHandler({
                value: e.target.value,
                identifier: "numInput",
              })
            }
          />
        </div>

        <div className="mb-3">
          <Label htmlFor="absence-number">Change Absence:</Label>
          <Input
            type="number"
            id="absence-number"
            placeholder="Absence"
            min="0"
            max={
              gradeLectures - newPresence < 0
                ? gradeLectures
                : gradeLectures - newPresence
            }
            value={newAbsence}
            required={mustChangeAttendance}
            onChange={(e) =>
              newPresenceAndAbsenceChangeHandler({
                value: e.target.value,
                identifier: "secondNumInput",
              })
            }
          />
        </div>

        {newName ? (
          <SubmitBtn dismiss="modal">Save Changes</SubmitBtn>
        ) : (
          <SubmitBtn>Save Changes</SubmitBtn>
        )}
        {changesDone && (
          <p className="text-success fs-5 mt-2">Changes Saved!</p>
        )}
        {isDuplicated && (
          <div className="mt-3 text-danger fw-bold">
            This Student Is Already Added To This Grade And Group!
          </div>
        )}
      </form>
    </>
  );
};

export default ModifyStudentData;
