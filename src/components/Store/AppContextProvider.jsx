import React, { useReducer } from "react";
import AppContext from "./AppContext";
import { indexFinder } from "../../utils/utilityFunctions";

const initAppState = {
  gradeInfoArr: [],
  studentsArr: [],
};

const appStateReducer = (state, action) => {
  switch (action.type) {
    case "ADD_GRADE":
      const updatedGradeInfo = [...state.gradeInfoArr, action.gradeInfoItem];
      return {
        ...state,
        gradeInfoArr: updatedGradeInfo,
      };
    case "ADD_STUDENT":
      const updatedStudents = [...state.studentsArr, action.studentDataItem];
      return {
        ...state,
        studentsArr: updatedStudents,
      };
    case "PRESENCE_INCREASE": {
      const studentIndex = indexFinder(
        state.studentsArr,
        action.id,
        "studentId"
      );
      const currentStudent = state.studentsArr[studentIndex];
      let updatedStudentsArr;
      let updatedStudent;
      if (action.attendance === "presence") {
        updatedStudent = {
          ...currentStudent,
          studentPresence: currentStudent.studentPresence + 1,
        };
      } else {
        updatedStudent = {
          ...currentStudent,
          studentAbsence: currentStudent.studentAbsence + 1,
        };
      }
      updatedStudentsArr = [...state.studentsArr];

      if (
        +currentStudent.studentPresence + +currentStudent.studentAbsence ===
        +currentStudent.studentGradeLectures
      ) {
        return {
          ...state,
          studentsArr: updatedStudentsArr,
        };
      }

      updatedStudentsArr[studentIndex] = updatedStudent;

      return {
        ...state,
        studentsArr: updatedStudentsArr,
      };
    }
    case "MODIFY_STUDENT": {
      const studentIndex = indexFinder(
        state.studentsArr,
        action.id,
        "studentId"
      );
      const currentStudent = state.studentsArr[studentIndex];
      const modifiedStudent = {
        ...currentStudent,
        studentName: action.data.newName
          ? action.data.newName
          : currentStudent.studentName,
        studentGrade: action.data.newGrade
          ? action.data.newGrade
          : currentStudent.studentGrade,
        studentGradeLectures: action.data.gradeLectures
          ? action.data.gradeLectures
          : currentStudent.studentGradeLectures,
        studentGroup: action.data.newGroup
          ? action.data.newGroup
          : currentStudent.studentGroup,
        studentPresence: action.data.newPresence
          ? +action.data.newPresence
          : currentStudent.studentPresence,
        studentAbsence: action.data.newAbsence
          ? +action.data.newAbsence
          : currentStudent.studentAbsence,
      };
      let updatedStudentsArr = [...state.studentsArr];
      updatedStudentsArr[studentIndex] = modifiedStudent;

      return {
        ...state,
        studentsArr: updatedStudentsArr,
      };
    }

    case "REMOVE_STUDENT": {
      const studentIndex = indexFinder(
        state.studentsArr,
        action.id,
        "studentId"
      );
      const updatedStudentsArr = [...state.studentsArr];
      updatedStudentsArr.splice(studentIndex, 1);
      return {
        ...state,
        studentsArr: updatedStudentsArr,
      };
    }

    case "REMOVE_GRADE": {
      const gradeIndex = indexFinder(
        state.gradeInfoArr,
        action.gradeName,
        "gradeName"
      );
      let updatedGradeInfoArr = [...state.gradeInfoArr];
      updatedGradeInfoArr.splice(gradeIndex, 1);
      let updatedStudentsArr = [];
      updatedStudentsArr = state.studentsArr.filter(
        (student) => student.studentGrade !== action.gradeName
      );
      return {
        ...state,
        gradeInfoArr: updatedGradeInfoArr,
        studentsArr: updatedStudentsArr,
      };
    }
    case "GROUP_CLEAR":
      let updatedStudentsArr = [];
      updatedStudentsArr = state.studentsArr.filter(
        (student) => student.studentGroup !== action.groupNum
      );
      return {
        ...state,
        studentsArr: updatedStudentsArr,
      };
  }

  return initAppState;
};

const AppContextProvider = (props) => {
  const [appState, dispatchAppState] = useReducer(
    appStateReducer,
    initAppState
  );

  const addGradeInfoHandler = (gradeInfo) => {
    dispatchAppState({ type: "ADD_GRADE", gradeInfoItem: gradeInfo });
  };

  const removeGradeHandler = (gradeName) => {
    dispatchAppState({ type: "REMOVE_GRADE", gradeName });
  };

  // making option elements with the value of the grades coming from the array of grades.
  const gradesOptionMaker = () => {
    const gradeOptionEl = appState.gradeInfoArr.map((grade) => {
      return (
        <option key={grade.id} value={grade.gradeName}>
          {grade.gradeName}
        </option>
      );
    });
    return gradeOptionEl;
  };

  // making option elements with the amount of groups coming from the array of grades.
  const groupsOptionMaker = (gradeValue) => {
    if (gradeValue !== "") {
      const currentGrade = appState.gradeInfoArr.findIndex((grade) => {
        return grade.gradeName === gradeValue;
      });
      if (currentGrade !== -1) {
        const amountOfGroups = appState.gradeInfoArr[currentGrade].groupsNumber;
        const amountOfLectures =
          appState.gradeInfoArr[currentGrade].lecturesNumber;
        const groupsOptionElArr = [];
        for (let i = 1; i <= amountOfGroups; i++) {
          const optionEl = <option key={i}>{`group ${i}`}</option>;
          groupsOptionElArr.push(optionEl);
        }
        return [groupsOptionElArr, amountOfLectures];
      }
    }
  };

  const clearGroupHandler = (groupNum) => {
    dispatchAppState({ type: "GROUP_CLEAR", groupNum });
  };

  const addStudentHandler = (studentData) => {
    dispatchAppState({ type: "ADD_STUDENT", studentDataItem: studentData });
  };

  const studentAttendanceHandler = (id, attendance) => {
    dispatchAppState({
      type: "PRESENCE_INCREASE",
      id,
      attendance,
    });
  };

  const modifyStudentHandler = (id, data) => {
    dispatchAppState({ type: "MODIFY_STUDENT", id, data });
  };

  const removeStudentHandler = (id) => {
    dispatchAppState({ type: "REMOVE_STUDENT", id });
  };

  const appWideContext = {
    gradeInfoArr: appState.gradeInfoArr,
    addGradeInfo: addGradeInfoHandler,
    removeGrade: removeGradeHandler,
    gradesMaker: gradesOptionMaker,
    groupsMaker: groupsOptionMaker,
    studentsArr: appState.studentsArr,
    addStudent: addStudentHandler,
    studentAttendace: studentAttendanceHandler,
    modifyStudent: modifyStudentHandler,
    removeStudent: removeStudentHandler,
    clearGroup: clearGroupHandler,
  };

  return (
    <AppContext.Provider value={appWideContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
