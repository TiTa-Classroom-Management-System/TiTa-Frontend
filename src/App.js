import React from "react";
import { Switch, Route } from "react-router-dom";
import StudentNav from "./components/Navbar/student/studentnav";
import TeacherNav from "./components/Navbar/teacher/teacherNav";
import Login from "./components/Login/Login";
// import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import TeachTimetablePage from "./pages/Timetable/TeacherTimetable";
import StudTimetablePage from "./pages/Timetable/StudentTimetable";
import TeacherClassroom from "./components/Classroom/TeacherClassrom";
import StudentClassroom from "./components/Classroom/StudentClassroom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route strict path="/login" component={() => <Login />} />
        <Route strict path="/student" component={() => <StudentNav />} />
        <Route strict path="/teacher" component={() => <TeacherNav />} />
        <Route
          strict
          path="/teachtimetable"
          component={() => <TeachTimetablePage />}
        />
        <Route
          strict
          path="/studtimetable"
          component={() => <StudTimetablePage />}
        />
        <Route
          strict
          path="/teachers/classrooms/:id"
          component={() => <TeacherClassroom />}
        />
        <Route
          strict
          path="/students/classrooms/:id"
          component={() => <StudentClassroom />}
        />
      </Switch>
      TITA
    </div>
  );
}

export default App;
