import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

import "./Assignments.css";

const AssignmentList = ({ loadAssignments, assignments, params }) => {
    useEffect(() => {
        loadAssignments();
    }, []);

    const parseDates = (date) => {
        const this_date = date.split("T")[0];
        const this_time = date.split("T")[1];
        return `${this_date.split("-")[2]}-${this_date.split("-")[1]}-${
            this_date.split("-")[0]
        } ${this_time.slice(0, 8)}`;
    };

    return (
        <div className="AssignmentList__list">
            <div id="AssignmentList__header" className="row">
                <div className="col-lg-3">
                    <h5>Assignment Name</h5>
                </div>
                <div className="col-lg-2">
                    <h5>Creation Date</h5>
                </div>
                <div className="col-lg-2">
                    <h5>Deadline</h5>
                </div>
                <div className="col-lg-2">
                    <h5>Assignment Link</h5>
                </div>
                <div className="col-lg-3">
                    <h5>Submissions</h5>
                </div>
            </div>

            {assignments && assignments.length > 0 ? (
                assignments.map((a) => (
                    <div className="AssignmentList__object row">
                        <div className="col-lg-3">{a.assignment_name}</div>
                        <div className="col-lg-2">
                            {parseDates(a.creation_date)}
                        </div>
                        <div className="col-lg-2">
                            {parseDates(a.submission_date)}
                        </div>
                        <div className="col-lg-2">
                            <a
                                href={a.assignment_link}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <button className="Assignments__view-assignment">
                                    View Assignment
                                </button>
                            </a>
                        </div>
                        <div className="col-lg-3">
                            <Link
                                to={`/teachers/${params.id}/assignments/${a.assignment_id}`}
                            >
                                <button className="Assignments__submissions">
                                    View All Submissions
                                </button>
                            </Link>
                        </div>
                    </div>
                ))
            ) : (
                <>
                    <br />
                    <br/>
                    <p className="text-center">
                        Sorry, you haven't created any assignments for this class yet.
                    </p>
                    <hr/>
                </>
            )}
        </div>
    );
};

export default AssignmentList;
