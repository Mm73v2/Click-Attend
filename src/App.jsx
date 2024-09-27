import React from "react";
import AppContextProvider from "./components/Store/AppContextProvider";
import Container from "./components/UI/Container";
import Header from "./components/Header/Header";
import AddGrade from "./components/AddGradeForm/AddGrade";
import AddStudent from "./components/AddStudentForm/AddStudent";
import StudentsDisplayer from "./components/DisplayStudents/StudentsDisplayer";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "./theme.scss";

const App = () => {
  return (
    <AppContextProvider>
      <Header />
      <Container>
        <AddGrade />
        <AddStudent />
        <StudentsDisplayer />
      </Container>
    </AppContextProvider>
  );
};

export default App;
