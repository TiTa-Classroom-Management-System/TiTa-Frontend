import axios from "axios";
import React, { useState } from "react";
import { useStore } from "react-redux";
import { useParams } from "react-router";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
} from "reactstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import AssignmentList from "./AssignmentList";

import "./Assignments.css";
import TiTa_Load from "./TiTa_Load.gif";

const Assignments = () => {
    const [assmodal, setAssmodal] = useState(false);
    const [assignment, setAssignment] = useState(null);
    const [assignments, setAssignments] = useState([]);
    const [assname, setAssname] = useState("");
    const [grps, setGrps] = useState([]);
    const [deadline, setDeadline] = useState(null);
    const [deadlinetime, setDeadlinetime] = useState(null);
    const [loading, setLoading] = useState(false);

    const classrooms = useStore().getState().classrooms;
    const params = useParams();

    const animatedComponents = makeAnimated();
    const num_grps = classrooms.find((c) => c.classroom_id === params.id)
        .num_groups;
    const today = new Date();
    const options = [];
    Array.from(Array(num_grps).keys()).forEach((v) => {
        options.push({ value: v + 1, label: `Group ${v + 1}` });
    });

    const toggleAssModal = () => {
        setAssmodal(!assmodal);
        setGrps([]);
        setAssignment(null);
    };

    const assSelect = (e) => {
        let file = e.target.files;
        if (file) {
            setAssignment(file);
        }
    };

    const handleDateChange = (e) => {
        setDeadline(e.target.value);
    };
    const handleTimeChange = (e) => {
        setDeadlinetime(e.target.value);
    };

    const createFormData = () => {
        let formData = new FormData();
        formData.append("file", assignment[0]);
        formData.append("assignment_name", assname);
        formData.append("subGroups", grps);
        formData.append("classroom_id", params.id);
        formData.append(
            "creation_date",
            `${today.getFullYear()}-${
                today.getMonth() + 1
            }-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
        );
        formData.append(
            "submission_date",
            `${deadline.split("-")[0]}-${deadline.split("-")[1]}-${
                deadline.split("-")[2]
            } ${deadlinetime.split(":")[0]}:${deadlinetime.split(":")[1]}:00`
        );

        return formData;
    };

    const loadAssignments = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/teachers/assignment/${params.id}`,
        })
            .then((res) => {
                setAssignments(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleAssSubmit = async () => {
        setLoading(true);
        await axios({
            method: "POST",
            url: `${process.env.REACT_APP_API}/assignment/create`,
            data: createFormData(),
        })
            .then((res) => {
                setLoading(false);
                setAssignment(null);
                toggleAssModal();
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
        loadAssignments();
    };

    return (
        <div>
            <h2>
                <strong>Assignments</strong>
            </h2>
            <p>Create and view assignments.</p>

            <button id="Assignments__create-ass" onClick={toggleAssModal}>
                Create New Assignment
            </button>
            <Modal isOpen={assmodal} toggle={toggleAssModal}>
                {!loading ? (
                    <form onSubmit={handleAssSubmit}>
                        <ModalHeader toggle={toggleAssModal}>
                            Create Assignment
                        </ModalHeader>
                        <ModalBody>
                            <div class="Assignment__file-upload">
                                <label
                                    for="file-upload"
                                    id="Assignments__file-upload"
                                >
                                    Choose File to Upload
                                </label>
                                <input
                                    hidden
                                    id="file-upload"
                                    type="file"
                                    accept="application/pdf, .csv, application/msword, .odt, text/plain"
                                    onChange={assSelect}
                                    required
                                />
                            </div>
                            {assignment && assignment.length > 0 && (
                                <p>File added: {assignment[0].name}</p>
                            )}
                            <hr />

                            <Input
                                placeholder="Name of the assignment"
                                onChange={(e) => setAssname(e.target.value)}
                                required
                            ></Input>
                            <hr />

                            <label for="Assignments__submit-date">
                                Choose Submission Deadline
                            </label>
                            <div class="Assignments__submit-date-time row">
                                <input
                                    class="col-lg-5"
                                    id="Assignments__submit-date"
                                    type="date"
                                    onChange={handleDateChange}
                                    required
                                />
                                <input
                                    class="col-lg-5"
                                    id="Assignments__submit-time"
                                    type="time"
                                    onChange={handleTimeChange}
                                    required
                                />
                            </div>
                            <hr />

                            {/* Add Group Numbers from State */}
                            <h6>Choose Groups:</h6>
                            <Select
                                isMulti
                                options={options}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                components={animatedComponents}
                                onChange={(selectedValues) => {
                                    setGrps(
                                        selectedValues.map(
                                            (value) => value.value
                                        )
                                    );
                                }}
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                className="Assignments__submit"
                                disabled={grps.length==0}
                            >
                                Create and Upload
                            </Button>{" "}
                            <Button
                                className="Assignments__submit"
                                onClick={toggleAssModal}
                            >
                                Cancel
                            </Button>
                        </ModalFooter>
                    </form>
                ) : (
                    <ModalBody>
                        <div className="Assignments__loading">
                            <img
                                className="tita-load"
                                src={TiTa_Load}
                                alt="tita-logo"
                            />
                            <h5>Uploading assignment...</h5>
                        </div>
                    </ModalBody>
                )}
            </Modal>
            <hr />
            <AssignmentList
                loadAssignments={loadAssignments}
                assignments={assignments}
                params={params}
            />
        </div>
    );
};

export default Assignments;
