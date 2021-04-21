import React from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import StudentNav from "./components/Navbar/student/studentnav";
import TeacherNav from "./components/Navbar/teacher/teacherNav";
import Login from "./components/Login/Login";
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

const App = ({ user }) => {
    let routes = null;
    if (user === null || user.type === null) {
        console.log(routes);
        routes = (
            <Switch>
                <Route strict path="/login" component={() => <Login />} />
            </Switch>
        );
        console.log(routes);
    } else if (user.type === "student") {
        console.log(user.type);
        routes = (
            <Switch>
                <Route strict path="/login" component={() => <Login />} />
                <Route
                    strict
                    path="/student"
                    component={() => <StudentNav />}
                />
                <Route
                    strict
                    path="/studtimetable"
                    component={() => <StudTimetablePage />}
                />
                <Route
                    strict
                    path="/studentclassrooms"
                    component={() => <StudentClassrooms />}
                />
                <Route
                    strict
                    path="/students/classrooms/:id"
                    component={() => <StudentClassroom />}
                />
                <Redirect exact to="/studtimetable" />
            </Switch>
        );
    } else if (user.type === "teacher") {
        console.log("hello");
        console.log(user.type);
        console.log(user);
        routes = (
            <Switch>
                <Route strict path="/login" component={() => <Login />} />
                <Route
                    strict
                    path="/teacher"
                    component={() => <TeacherNav />}
                />
                <Route
                    strict
                    path="/teachtimetable"
                    component={() => <TeachTimetablePage />}
                />

                <Route
                    strict
                    path="/teacherclassrooms"
                    component={() => <TeacherClassrooms />}
                />

                <Route
                    strict
                    path="/teachers/classrooms/:id"
                    component={() => <TeacherClassroom />}
                />

                <Route
                    strict
                    path="/teachers/:class_id/assignments/:assignment_id"
                    component={() => <Assignments_Solved />}
                />
                <Redirect exact to="/teachtimetable" />
            </Switch>
        );
    }
    return <div className="App">{routes}</div>;
};

const mapStateToProps = (state) => {
    return { user: state.user };
};

export default connect(mapStateToProps)(App);
