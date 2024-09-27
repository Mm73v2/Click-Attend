import React from "react";

const PopupModal = (props) => {
  return (
    <>
      <button
        type="button"
        className={`btn ${props.toggleBtnClasses}`}
        data-bs-toggle="modal"
        data-bs-target={`#${props.id}`}
      >
        {props.toggleTitle}
      </button>

      <div
        className="modal fade"
        id={props.id}
        tabIndex="-1"
        aria-labelledby="popup modal"
        aria-hidden="true"
      >
        <div className={`modal-dialog ${props.modalSize}`}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5" id="popup modal">
                {props.header}
              </h2>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-start">{props.children}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                cancel
              </button>
              {props.saveBtn && (
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={props.onClick}
                >
                  Yes
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupModal;
