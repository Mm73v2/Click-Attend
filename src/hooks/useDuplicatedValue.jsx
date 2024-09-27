import { useState } from "react";

const useDuplicatedValue = () => {
  const [isDuplicated, setIsDuplicated] = useState(false);
  const checkForDuplicatation = (loopArr, conditions) => {
    for (const loopEl of loopArr) {
      const duplicationConditions = conditions.some((condition) =>
        condition(loopEl)
      );
      if (duplicationConditions) {
        setIsDuplicated(true);
        return true;
      } else {
        setIsDuplicated(false);
      }
    }
  };
  return { checkForDuplicatation, isDuplicated };
};

export default useDuplicatedValue;
