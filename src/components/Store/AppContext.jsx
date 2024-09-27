import React from "react";

const AppContext = React.createContext({
  gradeInfoArr: [],
  studentsArr: [],
  addGradeInfo: (grade) => {},
  removeGrade: (gradeName) => {},
  gradesMaker: () => {},
  groupsMaker: (studentGrade) => {},
  addStudent: (student) => {},
  studentAttendace: (id) => {},
  modifyStudent: (id, data) => {},
  removeStudent: (id) => {},
  clearGroup: (groupNum) => {},
});

export default AppContext;
