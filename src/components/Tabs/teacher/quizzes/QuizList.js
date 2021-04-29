import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import "./Quizzes.css";

const QuizList = ({ loadQuizzes, quizzes }) => {
    const [quizres, setQuizres] = useState(null);
    const [quizid, setQuizid] = useState(null);
    const [isfile, setIsfile] = useState(false);
    const [resmodal, setResmodal] = useState(false);

    const toggleResModal = (e) => {
        setResmodal((prev) => !prev);
        setQuizid(e.target.value);
    };

    useEffect(() => {
        loadQuizzes();
    }, []);

    const parseDates = (date) => {
        const this_date = date.split("T")[0];
        const this_time = date.split("T")[1];
        return `${this_date.split("-")[2]}-${this_date.split("-")[1]}-${
            this_date.split("-")[0]
        } ${this_time.slice(0, 8)}`;
    };

    const quizresSelect = (e) => {
        let file = e.target.files;
        if (file) {
            setQuizres(file);
            setIsfile(true);
        }
    };

    const createFormData = () => {
        let formData = new FormData();
        formData.append("quiz_result", quizres[0]);

        return formData;
    };

    const handleResultUpload = async () => {
        await axios({
            method: "POST",
            url: `${process.env.REACT_APP_API}/teachers/quiz/result/${quizid}`,
            data: createFormData(),
        })
            .then((res) => {
                console.log(res.data);
                setIsfile(false);
            })
            .catch((err) => {
                console.log(err);
            });
        setResmodal((prev) => !prev);
    };

    return (
        <div className="QuizList_list">
            <div id="QuizList__header" className="row">
                <div className="col-lg-3">
                    <h5>Quiz Name</h5>
                </div>
                <div className="col-lg-2">
                    <h5>Start Time</h5>
                </div>
                <div className="col-lg-2">
                    <h5>End Time</h5>
                </div>
                <div className="col-lg-2">
                    <h5>Quiz Link</h5>
                </div>
                <div className="col-lg-3">
                    <h5>Upload Result</h5>
                </div>
            </div>

            {quizzes && quizzes.length > 0 ? (
                quizzes.map((q) => (
                    <div className="QuizList_object row">
                        <div className="col-lg-3">{q.quiz_name}</div>
                        <div className="col-lg-2">
                            {parseDates(q.start_time)}
                        </div>
                        <div className="col-lg-2">{parseDates(q.end_time)}</div>
                        <div className="col-lg-2">
                            <a
                                href={q.quiz_link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <button className="Quizzes__view-quiz">
                                    View Quiz
                                </button>
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <button
                                value={q.quiz_id}
                                onClick={toggleResModal}
                                className="Quizzes__view-quiz"
                            >
                                Upload Result
                            </button>
                        </div>

                        <Modal isOpen={resmodal} toggle={toggleResModal}>
                        <form onSubmit={handleResultUpload}>
                            <ModalHeader >Upload Quiz Result</ModalHeader>
                            <ModalBody>
                                <label for="quiz_res_upload">
                                    Choose Result File (.csv)
                                </label>
                                <input
                                    id="quiz_res_upload"
                                    type="file"
                                    accept=".csv"
                                    onChange={quizresSelect}
                                    required
                                />
                            </ModalBody>
                            <ModalFooter>
                                <button
                                    className="Quizzes__view-quiz"
                                >
                                    Submit
                                </button>
                            </ModalFooter>
                        </form>
                        </Modal>
                    </div>
                ))
            ) : (
                <>
                    <br/>
                    <br/>
                    <p className="text-center">
                        Sorry, you haven't created any Quizzes for this class yet.
                    </p>
                    <hr />
                </>
            )}
        </div>
    );
};

export default QuizList;
