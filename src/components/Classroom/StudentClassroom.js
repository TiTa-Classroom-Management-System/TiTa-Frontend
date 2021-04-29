import React, { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { updateTimetable } from "../../redux/actions/timetableAction";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import axios from "axios";

import Timetable from "../../components/Timetable/Timetable";
import Assignments from "../Tabs/student/assignments/Assignments";
import QuizList from "../Tabs/student/quizzes/QuizList";
import ResourceList from "../Tabs/student/resources/ResourceList";

import "../../pages/Timetable/Timetable.css";

const StudentClassroom = ({ dispatch, tt }) => {
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
        if (Array.isArray(tt))
            setTimetable(() => tt.filter((t) => t.class_id === id));
    }, []);

    return (
        <div class="Timetable row" style={{ marginLeft: "10px" }}>
            <div class="col-lg-11 Timetable__timetable-component">
                <Nav tabs>
                    <NavItem>
                        <NavLink onClick={() => toggle("1")}>Timetable</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() => toggle("2")}>Resources</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() => toggle("3")}>
                            Assignments
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink onClick={() => toggle("4")}>Quizzes</NavLink>
                    </NavItem>
                </Nav>
            </div>
            <TabContent activeTab={activeTab} style={{ width: "100%" }}>
                <TabPane tabId="1">
                    <div class="col-lg-11 Timetable__timetable-component">
                        {tt ? (
                            <Timetable tt={timetable} />
                        ) : (
                            <p>Loading timetable...</p>
                        )}
                    </div>
                </TabPane>
                <TabPane tabId="2">
                    <div class="col-lg-11 Timetable__timetable-component">
                        <ResourceList />
                    </div>
                </TabPane>
                <TabPane tabId="3">
                    <div class="col-lg-11 Timetable__timetable-component">
                        <Assignments />
                    </div>
                </TabPane>
                <TabPane tabId="4">
                    <div class="col-lg-11 Timetable__timetable-component">
                        <QuizList />
                    </div>
                </TabPane>
            </TabContent>
        </div>
    );
};

const dispatchStateToProp = (state) => {
    return { tt: state.timetable };
};

export default connect(dispatchStateToProp)(withRouter(StudentClassroom));
