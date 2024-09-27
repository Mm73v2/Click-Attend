const indexFinder = (arr, id, key) => {
  const studentIndex = arr.findIndex((student) => {
    if (student[key] === id) return student;
  });
  return studentIndex;
};

const captalizeFirstLetter = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};

export { indexFinder, captalizeFirstLetter };
