import React from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import StudentNav from "./components/Navbar/student/studentnav";
import Login from "./components/Login/Login";

function App() {
    const dispatch = useDispatch();

    return (
        <div className="App">
            <Switch>
                <Route path="/login" component={() => <Login />} />
                <Route path="/student" component={() => <StudentNav />} />
            </Switch>
            TITA
        </div>
    );
}

export default App;
