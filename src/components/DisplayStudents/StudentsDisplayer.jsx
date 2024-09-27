import React, { useContext, useState } from "react";
import DisplayStudentsForm from "./DisplayStudentsForm";
import DisplayStudents from "./DisplayStudents";
import RemoveData from "./RemoveData";
import AppContext from "../Store/AppContext";
const StudentsDisplayer = () => {
  const [searchData, setSearchData] = useState({});
  const [removeGradeReseter, setRemoveGradeReseter] = useState(false);
  const searchFilter = (data) => {
    setSearchData(data);
  };
  const ctx = useContext(AppContext);
  const { selectInput: gradeToRemove, secondSelectInput: groupToClear } =
    searchData;
  const removeGrade = () => {
    setRemoveGradeReseter(true);
    ctx.removeGrade(gradeToRemove);
  };

  const clearGroup = () => {
    ctx.clearGroup(groupToClear);
  };

  return (
    <>
      <div className="bg-white p-3">
        <DisplayStudentsForm
          removedGrade={removeGradeReseter}
          resetRemoveGrade={setRemoveGradeReseter}
          searchData={searchFilter}
        />
        {gradeToRemove && (
          <RemoveData
            onRemoveGrade={removeGrade}
            onClearGroup={clearGroup}
            groupSelected={groupToClear}
          />
        )}
      </div>
      <DisplayStudents data={searchData} />
    </>
  );
};

export default StudentsDisplayer;
