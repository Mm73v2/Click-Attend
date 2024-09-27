import React from "react";
import PopupModal from "../UI/PopupModal";

const RemoveData = (props) => {
  return (
    <div className="my-3">
      <PopupModal
        id={`remove-grade`}
        toggleTitle={"Remove Grade"}
        toggleBtnClasses="btn-danger"
        header="Remove Grade"
        modalSize={"modal-dialog-centered"}
        saveBtn={true}
        onClick={props.onRemoveGrade}
      >
        Are you sure you want to remove this grade?
      </PopupModal>
      {props.groupSelected && (
        <PopupModal
          id={`clear-group`}
          toggleTitle={"Clear Group"}
          toggleBtnClasses="btn-danger mx-3"
          header="Clear Group"
          modalSize={"modal-dialog-centered"}
          saveBtn={true}
          onClick={props.onClearGroup}
        >
          Are you sure you want to clear this group?
        </PopupModal>
      )}
    </div>
  );
};

export default RemoveData;
