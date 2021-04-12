import React, { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { updateTimetable } from "../../redux/actions/timetableAction";
import axios from "axios";

import Timetable from "../Timetable/Timetable";
import TeacherNav from "../Navbar/teacher/teacherNav";

import "../../pages/Timetable/Timetable.css";

const TeacherClassroom = ({ dispatch, tt, params }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [timetable, setTimetable] = useState([]);
  let { id } = useParams();

  const loadTimetable = (user) => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/teachers/timetable/${user.email}`,
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
    setTimetable(() => tt.filter((t) => t.class_id === id));
    console.log(timetable);
  }, []);

  return (
    <div class="row">
      <div class="col-12">
        <TeacherNav />
      </div>
      <div class="col-11 Timetable__timetable-component">
        {tt ? (
          tt.length > 0 ? (
            <Timetable tt={timetable} />
          ) : (
            <p>You have not created any timetable yet...</p>
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

export default connect(dispatchStateToProp)(withRouter(TeacherClassroom));
