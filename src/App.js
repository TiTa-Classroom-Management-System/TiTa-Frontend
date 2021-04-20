import React from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import StudentNav from "./components/Navbar/student/studentnav";
import TeacherNav from "./components/Navbar/teacher/teacherNav";
import Login from "./components/Login/Login";
// import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import TeachTimetablePage from "./pages/Timetable/TeacherTimetable";
import StudTimetablePage from "./pages/Timetable/StudentTimetable";
import TeacherClassroom from "./components/Classroom/TeacherClassroom";
import StudentClassroom from "./components/Classroom/StudentClassroom";
import TeacherClassrooms from "./pages/Classroooms/TeacherClassrooms";
import StudentClassrooms from "./pages/Classroooms/StudentClassrooms";
import Assignments_Solved from "./components/Tabs/teacher/assignments/Assignments_Solved";
import PrivateRoute, {
    TeacherRoute,
    StudentRoute,
} from "./components/PrivateRoute/PrivateRoute";

function App() {
    return (
        <div className="App">
            <Switch>
                <Route strict path="/login" component={() => <Login />} />
                <StudentRoute
                    strict
                    path="/student"
                    component={() => <StudentNav />}
                />
                <TeacherRoute
                    strict
                    path="/teacher"
                    component={() => <TeacherNav />}
                />
                <TeacherRoute
                    strict
                    path="/teachtimetable"
                    component={() => <TeachTimetablePage />}
                />
                <StudentRoute
                    strict
                    path="/studtimetable"
                    component={() => <StudTimetablePage />}
                />
                <TeacherRoute
                    strict
                    path="/teacherclassrooms"
                    component={() => <TeacherClassrooms />}
                />
                <StudentRoute
                    strict
                    path="/studentclassrooms"
                    component={() => <StudentClassrooms />}
                />
                <TeacherRoute
                    strict
                    path="/teachers/classrooms/:id"
                    component={() => <TeacherClassroom />}
                />
                <StudentRoute
                    strict
                    path="/students/classrooms/:id"
                    component={() => <StudentClassroom />}
                />
                <TeacherRoute
                    strict
                    path="/teachers/:class_id/assignments/:assignment_id"
                    component={() => <Assignments_Solved />}
                />
            </Switch>
        </div>
    );
}

export default App;
