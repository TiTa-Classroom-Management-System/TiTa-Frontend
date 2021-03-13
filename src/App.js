import React from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from 'react-router-dom'
import StudentNav from './components/Navbar/student/studentnav';
import TeacherNav from './components/Navbar/teacher/teacherNav';


function App() {
  
  const dispatch = useDispatch();

  return (
    <div className="App">
      <Switch>
        <Route path='/student' component={() => <StudentNav />} />
        <Route path='/teacher' component={() => <TeacherNav />} />
      </Switch>
      TITA
    </div>
  );
}

export default App;
