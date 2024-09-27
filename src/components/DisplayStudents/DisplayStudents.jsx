import React, { useContext } from "react";
import StudentCard from "./StudentCard";
import AppContext from "../Store/AppContext";

const DisplayStudents = (props) => {
  const ctx = useContext(AppContext);
  const {
    textInput: searchTerm,
    selectInput: searchGrade,
    secondSelectInput: searchGroup,
  } = props.data;

  const studentCardDisplay = () => {
    const studentsCardArr = ctx.studentsArr
      .filter((student) => {
        const nameMatch =
          !searchTerm ||
          student.studentName.toLowerCase().includes(searchTerm.toLowerCase());
        const gradeMatch = !searchGrade || student.studentGrade === searchGrade;
        const groupMatch = !searchGroup || student.studentGroup === searchGroup;

        if (!searchGrade && searchGroup) {
          return nameMatch;
        } else if (!searchGrade) {
          return nameMatch;
        } else if (searchGrade && !searchGroup) {
          return gradeMatch && nameMatch;
        } else if (searchGrade) {
          if (searchGroup) {
            return gradeMatch && groupMatch && nameMatch;
          }
        } else if (!searchGrade && searchGroup && !searchTerm) {
          return true;
        }
      })
      .map((student) => (
        <StudentCard
          key={student.studentId}
          studentName={student.studentName}
          studentGrade={student.studentGrade}
          studentLectures={student.studentGradeLectures}
          studentGroup={student.studentGroup}
          studentId={student.studentId}
          studentPresence={student.studentPresence}
          studentAbsence={student.studentAbsence}
        />
      ));
    return studentsCardArr;
  };

  const noResult = studentCardDisplay().length === 0;
  const noStudents = ctx.studentsArr.length !== 0;
  return (
    <>
      {noStudents ? (
        <table className="table bg-white table-striped table-bordered p-2 ">
          <thead>
            <tr className="text-center">
              <th>Name</th>
              <th>Grade</th>
              <th>Group</th>
              <th>Presence</th>
              <th>Absence</th>
              <th>Presence Rate</th>
              <th>Present / Absent</th>
              <th>Edit / Remove</th>
            </tr>
          </thead>
          <tbody>{studentCardDisplay()}</tbody>
        </table>
      ) : (
        <div className="text-center fs-4 mt-4">No Students Added.</div>
      )}
      {noResult && noStudents && (
        <div className="text-center fs-4 mt-4">No Student Match.</div>
      )}
    </>
  );
};

export default DisplayStudents;
