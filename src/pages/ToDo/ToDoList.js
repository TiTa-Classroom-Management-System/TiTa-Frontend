import React, { useEffect, useState } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import axios from "axios";
import { Collapse, button, CardBody, Card } from "reactstrap";

import "./ToDoList.css";

const ToDoList = () => {
    const [allassignments, setAllassignments] = useState([]);
    const [allquizzes, setAllquizzes] = useState([]);
    const [dueassopen, setDueassopen] = useState(false);
    const [compassopen, setCompassopen] = useState(false);
    const [missassopen, setMissassopen] = useState(false);
    const [schedquiz, setSchedquiz] = useState(false);
    const [pastquiz, setPastquiz] = useState(false);

    const history = useHistory();

    const toggleDueAss = () => {
        setDueassopen((prev) => !prev);
    };

    const toggleCompAss = () => {
        setCompassopen((prev) => !prev);
    };

    const toggleMissAss = () => {
        setMissassopen((prev) => !prev);
    };

    const toggleSchedQuiz = () => {
        setSchedquiz((prev) => !prev);
    };

    const togglePastQuiz = () => {
        setPastquiz((prev) => !prev);
    };

    const { user } = useSelector((state) => ({ ...state }));

    const loadAllAssignments = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/students/assignments/${user.email}`,
        })
            .then((res) => {
                setAllassignments(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    let dueass = [];
    let compass = [];
    let missass = [];

    const loadAllQuizzes = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/students/quizzes/${user.email}`,
        })
            .then((res) => {
                setAllquizzes(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        loadAllQuizzes();
        loadAllAssignments();
    }, []);

    const today = new Date();

    dueass = allassignments.filter(
        (ass) => !ass.submitted_at && today.toISOString() < ass.submission_date
    );
    compass = allassignments.filter((ass) => ass.submitted_at);
    missass = allassignments.filter(
        (ass) => today.toISOString() > ass.submission_date && !ass.submitted_at
    );

    const scheduledquiz = allquizzes.filter(
        (quiz) => quiz.start_time > today.toISOString()
    );
    const gonequiz = allquizzes.filter(
        (quiz) => quiz.end_time < today.toISOString()
    );

    const getDueTime = (date1, date2) => {
        let day_remain =
            parseInt(date1.slice(8, 10)) - parseInt(date2.slice(8, 10));
        let hours_remain =
            parseInt(date1.slice(11, 13)) - parseInt(date2.slice(11, 13));
        let minutes_remain =
            parseInt(date1.slice(14, 16)) - parseInt(date2.slice(14, 16));
        console.log(day_remain, hours_remain, minutes_remain);

        return day_remain > 0
            ? `${day_remain} days`
            : hours_remain > 0
            ? `${hours_remain} hours`
            : `${minutes_remain} minutes`;
    };

    return (
        <div>
            <div className="Todolist">
                <h3>To-Do List</h3>
                <hr />
                <div className="row">
                    <div className="col-lg-5 Todolist__assignments">
                        <h4>Assignments</h4>
                        <div className="Todolist__assignments-item Todolist__assignments-item-due">
                            <button
                                className="Todolist__assignments-item-button"
                                color="primary"
                                onClick={toggleDueAss}
                            >
                                Assignments Due Soon{" "}
                                <i
                                    id="due-ass"
                                    class="fas fa-chevron-circle-down"
                                ></i>
                            </button>
                            <Collapse isOpen={dueassopen}>
                                {dueass.length > 0 ? (
                                    dueass.map((ass) => (
                                        <Card>
                                            <CardBody>
                                                <p>{ass.assignment_name}</p>
                                                <p>
                                                    Assignment due in :{" "}
                                                    {getDueTime(
                                                        ass.submission_date,
                                                        today.toISOString()
                                                    )}
                                                </p>
                                                <i
                                                    onClick={() =>
                                                        history.push(
                                                            `/students/classrooms/${ass.class_id}`
                                                        )
                                                    }
                                                    class="fas fa-external-link-square-alt"
                                                ></i>
                                            </CardBody>
                                        </Card>
                                    ))
                                ) : (
                                    <p>No assignments due...</p>
                                )}
                            </Collapse>
                        </div>
                        <div className="Todolist__assignments-item">
                            <button
                                className="Todolist__assignments-item-button"
                                color="primary"
                                onClick={toggleCompAss}
                            >
                                Assignments Submitted{" "}
                                <i
                                    id="comp-ass"
                                    class="fas fa-chevron-circle-down"
                                ></i>
                            </button>
                            <Collapse isOpen={compassopen}>
                                {compass.length > 0 ? (
                                    compass.map((ass) => (
                                        <Card>
                                            <CardBody>
                                                <p>{ass.assignment_name}</p>
                                                <i
                                                    onClick={() =>
                                                        history.push(
                                                            `/students/classrooms/${ass.class_id}`
                                                        )
                                                    }
                                                    class="fas fa-external-link-square-alt"
                                                ></i>
                                            </CardBody>
                                        </Card>
                                    ))
                                ) : (
                                    <p>No assignments submitted yet...</p>
                                )}
                            </Collapse>
                        </div>
                        <div className="Todolist__assignments-item">
                            <button
                                className="Todolist__assignments-item-button"
                                color="primary"
                                onClick={toggleMissAss}
                            >
                                Assignments Missed{" "}
                                <i
                                    id="miss-ass"
                                    class="fas fa-chevron-circle-down"
                                ></i>
                            </button>
                            <Collapse isOpen={missassopen}>
                                {missass.length > 0 ? (
                                    missass.map((ass) => (
                                        <Card>
                                            <CardBody>
                                                <p>{ass.assignment_name}</p>
                                                <i
                                                    onClick={() =>
                                                        history.push(
                                                            `/students/classrooms/${ass.class_id}`
                                                        )
                                                    }
                                                    class="fas fa-external-link-square-alt"
                                                ></i>
                                            </CardBody>
                                        </Card>
                                    ))
                                ) : (
                                    <p>No assignments missed yet...</p>
                                )}
                            </Collapse>
                        </div>
                    </div>
                    <div className="col-lg-5 Todolist__quizzes">
                        <h4>Quizzes</h4>
                        <div className="Todolist__quizzes-item">
                            <button
                                className="Todolist__quizzes-item-button"
                                color="primary"
                                onClick={toggleSchedQuiz}
                            >
                                Upcoming Quizzes{" "}
                                <i
                                    id="sched-quiz"
                                    class="fas fa-chevron-circle-down"
                                ></i>
                            </button>
                            <Collapse isOpen={schedquiz}>
                                {scheduledquiz.length > 0 ? (
                                    scheduledquiz.map((q) => (
                                        <Card>
                                            <CardBody>
                                                <p>{q.quiz_name}</p>
                                                <a
                                                    href={`${q.quiz_link}`}
                                                    rel="noreferrer"
                                                >
                                                    <i class="fas fa-external-link-square-alt"></i>
                                                </a>
                                            </CardBody>
                                        </Card>
                                    ))
                                ) : (
                                    <p>No Quizzes scheduled ahead</p>
                                )}
                            </Collapse>
                        </div>
                        <div className="Todolist__quizzes-item">
                            <button
                                className="Todolist__quizzes-item-button"
                                color="primary"
                                onClick={togglePastQuiz}
                            >
                                Past Quizzes{" "}
                                <i
                                    id="past-quiz"
                                    class="fas fa-chevron-circle-down"
                                ></i>
                            </button>
                            <Collapse isOpen={pastquiz}>
                                {gonequiz.length > 0 ? (
                                    gonequiz.map((q) => (
                                        <Card>
                                            <CardBody>
                                                <p>{q.quiz_name}</p>
                                                <a
                                                    href={`${q.quiz_link}`}
                                                    rel="noreferrer"
                                                >
                                                    <i class="fas fa-external-link-square-alt"></i>
                                                </a>
                                            </CardBody>
                                        </Card>
                                    ))
                                ) : (
                                    <p>No Quizzes scheduled ahead</p>
                                )}
                            </Collapse>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect()(withRouter(ToDoList));
