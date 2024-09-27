import React, { useContext, useEffect } from "react";
import AppContext from "../Store/AppContext";
import useFormData from "../../hooks/useFormData";
import Input from "../UI/Input";
import SelectElement from "../UI/SelectElement";
import { IoIosSearch } from "react-icons/io";

const DisplayStudentsForm = (props) => {
  const ctx = useContext(AppContext);

  const {
    formState,
    updateTextInput: searchTermChangerHandler,
    updateSelectInput: searchGradeAndGroupChangeHandler,
  } = useFormData();

  const {
    textInput: searchTerm,
    selectInput: searchGrade,
    secondSelectInput: searchGroup,
  } = formState;

  props.searchData(formState);

  const formSubmitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (props.removedGrade) {
      searchGradeAndGroupChangeHandler({
        value: "",
        identifier: "selectInput",
      });
      searchGradeAndGroupChangeHandler({
        value: "",
        identifier: "secondSelectInput",
      });
      props.resetRemoveGrade(false);
    }
  }, [props.removedGrade]);

  return (
    <form className="bg-white" onSubmit={formSubmitHandler}>
      <div className="d-md-flex d-block justify-content-between align-items-center">
        <div className="p-relative search-input mb-3">
          <Input
            id="search"
            placeholder="Search Students"
            type="text"
            classes="ps-5"
            value={searchTerm}
            onChange={(e) => searchTermChangerHandler(e.target.value)}
          />
          <IoIosSearch
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              left: "15px",
            }}
            size="1.3rem"
          />
        </div>
        <div className="select-elements d-md-flex justify-content-end gap-3">
          <SelectElement
            classes="display-students-select mb-3"
            value={searchGrade}
            onChange={(e) =>
              searchGradeAndGroupChangeHandler({
                value: e.target.value,
                identifier: "selectInput",
              })
            }
          >
            <option value="">--Choose Grade:</option>
            {ctx.gradeInfoArr.length <= 0 && (
              <option disabled value="">
                No Grades Added.
              </option>
            )}
            {ctx.gradesMaker()}
          </SelectElement>

          <SelectElement
            classes="display-students-select mb-3"
            value={searchGroup}
            onChange={(e) =>
              searchGradeAndGroupChangeHandler({
                value: e.target.value,
                identifier: "secondSelectInput",
              })
            }
          >
            <option value="">--Choose Group:</option>
            {searchGrade === "" && (
              <option disabled value="">
                No Grade Selected
              </option>
            )}
            {ctx.groupsMaker(searchGrade)}
          </SelectElement>
        </div>
      </div>
    </form>
  );
};

export default DisplayStudentsForm;
