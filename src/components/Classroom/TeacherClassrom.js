import React, { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { updateTimetable } from "../../redux/actions/timetableAction";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import axios from "axios";

import Timetable from "../Timetable/Timetable";
import TeacherNav from "../Navbar/teacher/teacherNav";

import "../../pages/Timetable/Timetable.css";

const TeacherClassroom = ({ dispatch, tt, params }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [timetable, setTimetable] = useState([]);
  let { id } = useParams();
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

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
    <div>
      <div class="row">
        <div class="col-12">
          <TeacherNav />
        </div>
        <div class="col-11 Timetable__timetable-component">
          <Nav tabs>
            <NavItem>
              <NavLink onClick={() => toggle("1")}>Timetable</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => toggle("2")}>Assignments</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => toggle("3")}>Quizzes</NavLink>
            </NavItem>
          </Nav>
        </div>
        <TabContent activeTab={activeTab} style={{ width: "100%" }}>
          <TabPane tabId="1">
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
          </TabPane>
          <TabPane tabId="2">
            <div class="col-11 Timetable__timetable-component">Assignments</div>
          </TabPane>
          <TabPane tabId="3">
            <div class="col-11 Timetable__timetable-component">Quizzes</div>
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
};

const dispatchStateToProp = (state) => {
  return { tt: state.timetable };
};

export default connect(dispatchStateToProp)(withRouter(TeacherClassroom));
