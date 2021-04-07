import React, { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { updateTimetable } from "../../redux/actions/timetableAction";
import axios from "axios";

import Timetable from "../../components/Timetable/Timetable";
import StudentNav from "../../components/Navbar/student/studentnav";

import "../../pages/Timetable/Timetable.css";

const StudentClassroom = ({ dispatch, tt }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [timetable, setTimetable] = useState([]);
  let { id } = useParams();

  const loadTimetable = (user) => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/students/timetable/${user.email}`,
    })
      .then((res) => {
        dispatch(updateTimetable(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    loadTimetable(user);
    setTimetable(() => tt.filter((t) => t.class_id == id));
    console.log(timetable);
  }, []);

  return (
    <div class="row">
      <div class="col-12">
        <StudentNav />
      </div>
      <div class="col-11 Timetable__timetable-component">
        {tt ? (
          tt.length > 0 ? (
            <Timetable tt={timetable} />
          ) : (
            <p>Join some classrooms first...</p>
          )
        ) : (
          <p>Loading timetable...</p>
        )}
      </div>
    </div>
  );
};

const dispatchStateToProp = (state) => {
  return { tt: state.timetable };
};

export default connect(dispatchStateToProp)(withRouter(StudentClassroom));
