import React, { useContext } from "react";
import ModifyStudentData from "./ModifyStudentData";
import AppContext from "../Store/AppContext";
import PopupModal from "../UI/PopupModal";
import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

const StudentCardControl = (props) => {
  const ctx = useContext(AppContext);
  const presenceClickHandler = () => {
    ctx.studentAttendace(props.data.studentId, "presence");
  };
  const absenceClickHandler = () => {
    ctx.studentAttendace(props.data.studentId, "absence");
  };

  const removeStudent = () => {
    ctx.removeStudent(props.data.studentId);
  };

  const modalHeader = (
    <>
      Change Student Data
      <FaInfoCircle
        data-tooltip-id="my-tooltip"
        data-tooltip-content="You don't have to fill the whole form just change the data you want. (changing the grade might make you want to modify the presence and absence because it might vary from grade to another)"
        className="text-primary"
        style={{ marginLeft: "1rem" }}
        size={"1.5rem"}
      />
      <Tooltip
        id="my-tooltip"
        style={{ zIndex: "999", width: "30%" }}
        className="text-white bg-primary opacity-100"
      />
    </>
  );

  return (
    <>
      <td>
        <div className="presence-control-btns d-flex justify-content-center gap-4">
          <button
            id="presence"
            className="btn btn-success"
            onClick={presenceClickHandler}
          >
            <FaCheck size="1.1rem" />
          </button>
          <button
            id="absence"
            className="btn btn-danger"
            onClick={absenceClickHandler}
          >
            <FaXmark size="1.1rem" />
          </button>
        </div>
      </td>
      <td>
        <div className="student-data-control-btns d-flex  justify-content-center gap-4">
          <PopupModal
            id={props.data.studentId}
            toggleTitle={<MdEdit size="1.1rem" />}
            toggleBtnClasses="btn-primary"
            header={modalHeader}
            modalSize={"modal-lg"}
            saveBtn={false}
          >
            <ModifyStudentData data={props.data} />
          </PopupModal>

          <PopupModal
            id={`remove${props.data.studentId}`}
            toggleTitle={<FaRegTrashCan size="1.1rem" />}
            toggleBtnClasses="btn-danger"
            header="Remove Student"
            modalSize={"modal-dialog-centered"}
            saveBtn={true}
            onClick={removeStudent}
          >
            Are you sure you want to delete this student?
          </PopupModal>
        </div>
      </td>
    </>
  );
};

export default StudentCardControl;
