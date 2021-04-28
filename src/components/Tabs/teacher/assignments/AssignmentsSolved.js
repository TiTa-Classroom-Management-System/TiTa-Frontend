import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./Assignments.css";

const Assignments_Solved = () => {
    const [loading, setLoading] = useState(false);
    const [allass, setAllass] = useState(null);
    const params = useParams();
    const loadAllAssignments = () => {
        setLoading(true);
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/teachers/assignment/solved/${params.assignment_id}`,
        })
            .then((res) => {
                setLoading(false);
                setAllass(res.data);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };

    useEffect(() => {
        loadAllAssignments();
    }, []);

    const parseDates = (date) => {
        const this_date = date.split("T")[0];
        const this_time = date.split("T")[1];
        return `${this_date.split("-")[2]}-${this_date.split("-")[1]}-${
            this_date.split("-")[0]
        } ${this_time.slice(0, 8)}`;
    };

    return (
        <>
            <div class="row">
                <div className="Assignment_Solved col-11">
                    <h2>
                        <strong>Submissions</strong>
                    </h2>
                    <hr />
                    {!loading ? (
                        <>
                            <div className="Assignment_Solved__header row">
                                <div className="col-lg-2">
                                    <h5>Student ID</h5>
                                </div>
                                <div className="col-lg-3">
                                    <h5>Student Name</h5>
                                </div>
                                <div className="col-lg-2">
                                    <h5>Submitted at</h5>
                                </div>
                                <div className="col-lg-3">
                                    <h5>Submissions</h5>
                                </div>
                            </div>
                            {allass && allass.length > 0 ? (
                                allass.map((a) => (
                                    <div className="Assignment_Solved__object row">
                                        <div className="col-lg-2">{a.sid}</div>
                                        <div className="col-lg-3">{a.name}</div>
                                        <div className="col-lg-2">
                                            {parseDates(a.submitted_at)}{" "}
                                            {a.submission_date >=
                                            a.submitted_at ? (
                                                <i class="fas fa-clock Assignment_Solved__on-time"></i>
                                            ) : (
                                                <i class="fas fa-clock Assignment_Solved__late"></i>
                                            )}
                                        </div>
                                        <div className="col-lg-3">
                                            <a
                                                href={a.assignment_link}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <button className="Assignments__view-assignment">
                                                    View Submission
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No Submission yet...</p>
                            )}
                        </>
                    ) : (
                        <p>Loading Submissions...</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default Assignments_Solved;
