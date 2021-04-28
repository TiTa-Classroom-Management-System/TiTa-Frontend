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
    InputGroup,
} from "reactstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import QuizList from "./QuizList";

import "./Quizzes.css";
import TiTa_Load from "./TiTa_Load.gif";

const Quizzes = () => {
    const [quizmodal, setQuizmodal] = useState(false);
    const [quizname, setQuizname] = useState("");
    const [quizlink, setQuizlink] = useState("");
    const [grps, setGrps] = useState([]);
    const [startdate, setStartdate] = useState(null);
    const [starttime, setStarttime] = useState(null);
    const [enddate, setEnddate] = useState(null);
    const [endtime, setEndtime] = useState(null);
    const [loading, setLoading] = useState(false);
    const [quizzes, setQuizzes] = useState([]);
    
    
    

    const classrooms = useStore().getState().classrooms;
    const params = useParams();

    const animatedComponents = makeAnimated();
    const num_grps = classrooms.find((c) => c.classroom_id === params.id).num_groups;
    const options = [];
    Array.from(Array(num_grps).keys()).forEach((v) => {
        options.push({ value: v + 1, label: `Group ${v + 1}` });
    });

    const toggleQuizModal = () => {
        setQuizmodal(!quizmodal);
        setGrps([]);
    };

    const handleStartDateChange = (e) => {
        setStartdate(e.target.value);
    };
    const handleStartTimeChange = (e) => {
        setStarttime(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEnddate(e.target.value);
    };
    const handleEndTimeChange = (e) => {
        setEndtime(e.target.value);
    };

    const getClickableLink = (link) =>
        link.startsWith("http://") || link.startsWith("https://")
            ? link
            : `https://${link}`;

    const createFormData = () => {
        let formData = new FormData();
        formData.append("quizLink", getClickableLink(quizlink));
        formData.append("quizName", quizname);
        formData.append("subGroups", grps);
        formData.append("classroom_id", params.id);
        formData.append(
            "startTime",
            `${startdate.split("-")[0]}-${startdate.split("-")[1]}-${
                startdate.split("-")[2]
            } ${starttime.split(":")[0]}:${starttime.split(":")[1]}:00`
        );
        formData.append(
            "endTime",
            `${enddate.split("-")[0]}-${enddate.split("-")[1]}-${
                enddate.split("-")[2]
            } ${endtime.split(":")[0]}:${endtime.split(":")[1]}:00`
        );
        return formData;
    };

    const handleQuizSubmit = async () => {
        setLoading(true);
        await axios({
            method: "POST",
            url: `${process.env.REACT_APP_API}/quiz/create`,
            data: createFormData(),
        })
            .then((res) => {
                setLoading(false);
                setQuizlink(null);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
        loadQuizzes();
        toggleQuizModal();
    };

    const loadQuizzes = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/teachers/quiz/${params.id}`,
        })
            .then((res) => {
                setQuizzes(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <h2>
                <strong>Quizzes</strong>
            </h2>
            <p>Create and view quizzes.</p>

            <button id="Quizzes__create-quiz" onClick={toggleQuizModal}>
                Create New Quiz
            </button>
            
                <Modal isOpen={quizmodal} toggle={toggleQuizModal}>
                    {!loading ? (
                        <>
                        <form onSubmit={handleQuizSubmit}>
                            <ModalHeader toggle={toggleQuizModal}>
                                Create Quiz
                            </ModalHeader>
                            <ModalBody>
                                <div className="Quizzes_quiz-link">
                                    <Input
                                        placeholder="Enter Quiz Link"
                                        onChange={(e) =>
                                            setQuizlink(e.target.value)
                                        }
                                        required
                                    ></Input>
                                </div>
                                <div className="Quizzes_quiz-name">
                                    <Input
                                        placeholder="Name of the quiz"
                                        onChange={(e) =>
                                            setQuizname(e.target.value)
                                        }
                                        required
                                    ></Input>
                                </div>

                                <hr className="Quiz_Modal-hr" />

                                <label for="Quizzes__start-date">
                                    Choose Start Time
                                </label>
                                <div class="Quizzes__start-date-time row">
                                    <input
                                        class="col-lg-5"
                                        id="Quizzes__start-date"
                                        type="date"
                                        onChange={handleStartDateChange}
                                        required
                                    />
                                    <input
                                        class="col-lg-5"
                                        id="Quizzes__start-time"
                                        type="time"
                                        onChange={handleStartTimeChange}
                                        required
                                    />
                                </div>

                                <label for="Quizzes__end-date">
                                    Choose End Time
                                </label>
                                <div class="Quizzes__end-date-time row">
                                    <input
                                        class="col-lg-5"
                                        id="Quizzes__end-date"
                                        type="date"
                                        onChange={handleEndDateChange}
                                        required
                                    />
                                    <input
                                        class="col-lg-5"
                                        id="Quizzes__end-time"
                                        type="time"
                                        onChange={handleEndTimeChange}
                                        required
                                    />
                                </div>
                                <hr className="Quiz_Modal-hr" />

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
                                    className="Quizzes__submit"
                                    disabled={grps.length==0}
                                >
                                    Create and Upload
                                </Button>{" "}
                                <Button
                                    className="Quizzes__submit"
                                    onClick={toggleQuizModal}
                                >
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </form>
                        </>
                    ) : (
                        <ModalBody>
                            <div className="Quizzes__loading">
                                <img
                                    className="tita-load"
                                    src={TiTa_Load}
                                    alt="tita-logo"
                                />
                                <h5>Uploading quiz...</h5>
                            </div>
                        </ModalBody>
                    )}
                </Modal>
            
            <hr />
            <QuizList loadQuizzes={loadQuizzes} quizzes={quizzes} />
        </div>
    );
};

export default Quizzes;
