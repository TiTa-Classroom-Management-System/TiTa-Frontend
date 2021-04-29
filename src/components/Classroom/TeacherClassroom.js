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
import Select from "react-select";
import makeAnimated from "react-select/animated";

import Timetable from "../Timetable/Timetable";
import Assignments from "../Tabs/teacher/assignments/Assignments";
import Quizzes from "../Tabs/teacher/quizzes/Quizzes";
import Resources from "../Tabs/teacher/resources/Resources";
import StudentList from "../Tabs/teacher/studentList/studentList"

import "../../pages/Timetable/Timetable.css";
import "./Classroom.css";

const TeacherClassroom = ({ dispatch, tt, classrooms, params }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [timetable, setTimetable] = useState([]);
    let { id } = useParams();
    const [activeTab, setActiveTab] = useState("1");
    const [modal, setModal] = useState(false);
    const [dropDown, setDropDown] = useState(false);
    const [typeDropDown, setTypeDropDown] = useState(false);
    const [startTime, setStartTime] = useState("09:00:00");
    const [endTime, setEndTime] = useState("10:00:00");
    const [groups, SetGroups] = useState([]);
    const [day, setDay] = useState("Monday");
    const [type, setType] = useState("Lecture");
    const [numGroups, setNumGroups] = useState(0);
    const [options, setOptions] = useState([]);

    const animatedComponents = makeAnimated();

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

    const loadSubclassNum = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/classroom/count/${id}`,
        }).then((res) => {
            setNumGroups(() => res.data.count);
        });
    };

    useEffect(() => {
        loadTimetable(user);
        loadSubclassNum();
        if (Array.isArray(tt))
            setTimetable(() => tt.filter((t) => t.class_id === id));
    }, []);

    useEffect(() => {
        setOptions(() => {
            var arr = [];
            for (var i = 1; i <= numGroups; i++) {
                var ob = { label: `Group ${i}`, value: `${i}` };
                arr.push(ob);
            }
            return arr;
        });
    }, [numGroups]);

    const toggleModal = () => {
        setModal((cur) => !cur);
    };

    const handleTimetableCreation = async () => {
        setModal(() => false);
        for (var i = 0; i < groups.length; i++) {
            await axios({
                method: "POST",
                url: `${process.env.REACT_APP_API}/timetable/create`,
                data: {
                    class_id: id,
                    group_number: groups[i],
                    start_time: startTime,
                    end_time: endTime,
                    day: day,
                    type: type,
                },
            });
        }
        loadTimetable(user);
    };

    useEffect(() => {}, [tt]);

    return (
        <div>
            <div class="Timetable row" style={{ marginLeft: "10px" }}>
                <div class="col-lg-11 Timetable__timetable-component">
                    <Nav tabs>
                        <NavItem>
                            <NavLink onClick={() => toggle("1")}>
                                Timetable
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={() => toggle("2")}>
                                Resources
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={() => toggle("3")}>
                                Assignments
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={() => toggle("4")}>
                                Quizzes
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink onClick={() => toggle("5")}>
                                Student List
                            </NavLink>
                        </NavItem>
                    </Nav>
                </div>
                <TabContent activeTab={activeTab} style={{ width: "100%" }}>
                    <TabPane tabId="1">
                        <div class="col-lg-11 Timetable__timetable-component">
                            <h2>
                                <strong>Timetable</strong>
                            </h2>
                            <p>Schedule and View classroom timetable.</p>
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
                                <form onSubmit={handleTimetableCreation}>
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
                                            <DropdownToggle
                                                style={{
                                                    backgroundColor: "#6673fd",
                                                }}
                                                caret
                                            >
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
                                            Choose groups
                                        </label>
                                        <Select
                                            isMulti
                                            name="colors"
                                            options={options}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            components={animatedComponents}
                                            onChange={(selectedOption) => {
                                                SetGroups(() =>
                                                    selectedOption.map((ob) =>
                                                        parseInt(ob.value)
                                                    )
                                                );
                                            }}
                                        />
                                        <br />
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
                                            required
                                        />
                                        <label for="Assignments__submit-date">
                                            Choose class end time
                                        </label>
                                        <input
                                            class="col-lg-5"
                                            id="Assignments__submit-time"
                                            type="time"
                                            value={endTime}
                                            onChange={(e) => {
                                                console.log(e.target.value);
                                                return setEndTime(e.target.value);
                                            }}
                                            required
                                        />
                                        <br />
                                        <label for="Assignments__submit-date">
                                            Choose type
                                        </label>
                                        Current type: {type}
                                        <br />
                                        <Dropdown
                                            isOpen={typeDropDown}
                                            toggle={() => {
                                                setTypeDropDown((cur) => !cur);
                                            }}
                                        >
                                            <DropdownToggle
                                                style={{
                                                    backgroundColor: "#6673fd",
                                                }}
                                                caret
                                            >
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
                                        <Button
                                            className="Assignments__submit"
                                            disabled={groups.length==0}
                                        >
                                            Create and Upload
                                        </Button>{" "}
                                        <Button
                                            className="Assignments__submit"
                                            onClick={toggleModal}
                                        >
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                </form>
                                
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
                        <div class="col-lg-11 Timetable__timetable-component">
                            <Resources />
                        </div>
                    </TabPane>
                    <TabPane tabId="3">
                        <div class="col-lg-11 Timetable__timetable-component">
                            <Assignments />
                        </div>
                    </TabPane>
                    <TabPane tabId="4">
                        <div class="col-lg-11 Timetable__timetable-component">
                            <Quizzes />
                        </div>
                    </TabPane>
                    <TabPane tabId="5">
                        <div class="col-lg-11 Timetable__timetable-component">
                            <StudentList />
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
