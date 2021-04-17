import React, { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { updateTimetable } from "../../redux/actions/timetableAction";
import {
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
} from "reactstrap";
import axios from "axios";

import Timetable from "../Timetable/Timetable";
import TeacherNav from "../Navbar/teacher/teacherNav";
import Assignments from "../Tabs/teacher/assignments/Assignments";

import "../../pages/Timetable/Timetable.css";

const TeacherClassroom = ({ dispatch, tt, classrooms, params }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [timetable, setTimetable] = useState([]);
    let { id } = useParams();
    const [activeTab, setActiveTab] = useState("1");
    const [modal, setModal] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [typeDropDown, setTypeDropDown] = useState(false);
    const [startTime, setStartTime] = useState("00:00:00");
    const [endTime, setEndTime] = useState("00:00:00");
    const [groups, SetGroups] = useState([]);
    const [day, setDay] = useState("Monday");
    const [type, setType] = useState("Lecture");

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
        if (Array.isArray(tt))
            setTimetable(() => tt.filter((t) => t.class_id === id));
    }, []);

    const toggleModal = () => {
        setModal((cur) => !cur);
    };

    return (
        <div>
            <div class="row">
                <div class="col-12">
                    <TeacherNav />
                </div>
                <div class="col-11 Timetable__timetable-component">
                    <Nav tabs>
                        <NavItem>
                            <NavLink onClick={() => toggle("1")}>
                                Timetable
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={() => toggle("2")}>
                                Assignments
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={() => toggle("3")}>
                                Quizzes
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
                <TabContent activeTab={activeTab} style={{ width: "100%" }}>
                    <TabPane tabId="1">
                        <div class="col-11 Timetable__timetable-component">
                            <h2>
                                <strong>Timetable</strong>
                            </h2>
                            <p>View classroom timetable.</p>
                            <button
                                id="Assignments__create-ass"
                                onClick={() => {
                                    setModal(true);
                                }}
                            >
                                Add new class
                            </button>
                            <hr />
                            <Modal isOpen={modal} toggle={toggleModal}>
                                <ModalHeader toggle={toggleModal}>
                                    Add class
                                </ModalHeader>
                                <ModalBody>
                                    <label for="Assignments__submit-date">
                                        Choose day
                                    </label>
                                    Current day: {day}
                                    <br />
                                    <Dropdown
                                        isOpen={dropDown}
                                        toggle={() => {
                                            setDropDown((cur) => !cur);
                                        }}
                                    >
                                        <DropdownToggle caret>
                                            Choose day
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem
                                                onClick={() =>
                                                    setDay(() => "Monday")
                                                }
                                            >
                                                Monday
                                            </DropdownItem>
                                            <DropdownItem
                                                onClick={() =>
                                                    setDay(() => "Tuesday")
                                                }
                                            >
                                                Tuesday
                                            </DropdownItem>
                                            <DropdownItem
                                                onClick={() =>
                                                    setDay(() => "Wednesday")
                                                }
                                            >
                                                Wednesday
                                            </DropdownItem>
                                            <DropdownItem
                                                onClick={() =>
                                                    setDay(() => "Thursday")
                                                }
                                            >
                                                Thursday
                                            </DropdownItem>
                                            <DropdownItem
                                                onClick={() =>
                                                    setDay(() => "Friday")
                                                }
                                            >
                                                Friday
                                            </DropdownItem>
                                            <DropdownItem
                                                onClick={() =>
                                                    setDay(() => "Saturday")
                                                }
                                            >
                                                Saturday
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                    <label for="Assignments__submit-date">
                                        Choose class start time
                                    </label>
                                    <input
                                        class="col-lg-5"
                                        id="Assignments__submit-time"
                                        type="time"
                                        value={startTime}
                                        onChange={(e) =>
                                            setStartTime(e.target.value)
                                        }
                                    />
                                    <label for="Assignments__submit-date">
                                        Choose class end time
                                    </label>
                                    <input
                                        class="col-lg-5"
                                        id="Assignments__submit-time"
                                        type="time"
                                        value={endTime}
                                        onChange={(e) =>
                                            setEndTime(e.target.value)
                                        }
                                    />
                                    <br />
                                    <label for="Assignments__submit-date">
                                        Choose type
                                    </label>
                                    Current type: {type}
                                    <br />
                                    <Dropdown
                                        color="#6673fd"
                                        isOpen={typeDropDown}
                                        toggle={() => {
                                            setTypeDropDown((cur) => !cur);
                                        }}
                                    >
                                        <DropdownToggle caret>
                                            Choose class type
                                        </DropdownToggle>
                                        <DropdownMenu>
                                            <DropdownItem
                                                onClick={() =>
                                                    setType(() => "Lecture")
                                                }
                                            >
                                                Lecture
                                            </DropdownItem>
                                            <DropdownItem
                                                onClick={() =>
                                                    setType(() => "Tutorial")
                                                }
                                            >
                                                Tutorial
                                            </DropdownItem>
                                            <DropdownItem
                                                onClick={() =>
                                                    setType(() => "Lab")
                                                }
                                            >
                                                Lab
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </ModalBody>
                                <ModalFooter>
                                    <Button className="Assignments__submit">
                                        Create and Upload
                                    </Button>{" "}
                                    <Button
                                        className="Assignments__submit"
                                        onClick={toggleModal}
                                    >
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </Modal>
                            {tt ? (
                                tt.length > 0 ? (
                                    <Timetable tt={timetable} />
                                ) : (
                                    <p>
                                        You have not created any timetable
                                        yet...
                                    </p>
                                )
                            ) : (
                                <p>Loading timetable...</p>
                            )}
                        </div>
                    </TabPane>
                    <TabPane tabId="2">
                        <div class="col-11 Timetable__timetable-component">
                            <Assignments />
                        </div>
                    </TabPane>
                    <TabPane tabId="3">
                        <div class="col-11 Timetable__timetable-component">
                            Quizes
                        </div>
                    </TabPane>
                </TabContent>
            </div>
        </div>
    );
};

const dispatchStateToProp = (state) => {
    return { tt: state.timetable, classrooms: state.classrooms };
};

export default connect(dispatchStateToProp)(withRouter(TeacherClassroom));
