import React from "react";
import StudentCardControl from "./StudentCardControl";
import { captalizeFirstLetter } from "../../utils/utilityFunctions";

const StudentCard = (props) => {
  const attendanceRate = (
    ((props.studentLectures - props.studentAbsence) / props.studentLectures) *
    100
  ).toFixed(1);

  return (
    <>
      <tr className="text-center align-middle">
        <td>{captalizeFirstLetter(props.studentName)}</td>
        <td>{captalizeFirstLetter(props.studentGrade)}</td>
        <td>{captalizeFirstLetter(props.studentGroup)}</td>
        <td>{props.studentPresence}</td>
        <td>{props.studentAbsence}</td>
        <td>
          <div
            className="progress"
            role="progressbar"
            aria-label="presence rate"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ height: "1.2rem" }}
          >
            <div
              className={`progress-bar  ${
                attendanceRate > 50
                  ? "bg-success"
                  : attendanceRate <= 50 && attendanceRate > 30
                  ? "bg-warning"
                  : "bg-danger"
              } ${+attendanceRate === 0 ? "w-100" : ""}`}
              style={{
                width: `${attendanceRate}%`,
                fontSize: "16px",
              }}
            >
              {attendanceRate}
            </div>
          </div>
        </td>
        <StudentCardControl data={props} />
      </tr>
    </>
  );
};

export default StudentCard;
