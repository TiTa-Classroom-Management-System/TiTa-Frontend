import React from "react";
import { Switch, Route } from "react-router-dom";
import StudentNav from "./components/Navbar/student/studentnav";
import TeacherNav from "./components/Navbar/teacher/teacherNav";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={() => <Login />} />
        <PrivateRoute path="/student" component={() => <StudentNav />} />
        <PrivateRoute path="/teacher" component={() => <TeacherNav />} />
      </Switch>
      TITA
    </div>
  );
}

export default App;
