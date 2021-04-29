import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router";
import "./Assignments.css";

import AssignmentUpload from "./AssignmentUpload"

const Assignments = () =>
{
    const { user } = useSelector((state) => ({ ...state }));
    const params = useParams();

    const [assignments, setAssignments] = useState([]);

    const loadAssignments = (user) =>
    {
        axios(
            {
                method: "GET",
                url: `${process.env.REACT_APP_API}/students/assignment/${user.email}/${params.id}`,
            }
        )
        .then((res) =>
        {
            setAssignments(res.data);
        })
        .catch((err) =>
        {
            console.log(err);
        })
    }

    useEffect(() =>
    {
        loadAssignments(user);
    }, []);

    const parseDates = (date) =>
    {
        const this_date = date.split("T")[0];
        const this_time = date.split("T")[1];
        return `${this_date.split("-")[2]}-${this_date.split("-")[1]}-${this_date.split("-")[0]} ${this_time.slice(0, 8)}`;
    }

    return(
        <div className = "AssignmentList__list">
            <div id = "AssignmentList__header" class = "row">
                <div className = "col-lg-3"><h5>Assignment Name</h5></div>
                <div className = "col-lg-2"><h5>Deadline</h5></div>
                <div className = "col-lg-3"><h5>Assignment</h5></div>
                <div className = "col-lg-3"><h5>Upload/View solution</h5></div>
            </div>

            {(assignments && Array.isArray(assignments) && assignments.length > 0) ? (
                assignments.map((a) => 
                <div className = "AssignmentList__object-student row">
                    <div className = "col-lg-3">{a.assignment_name}</div>
                    <div className = "col-lg-2">{parseDates(a.submission_date)}</div>
                    <div className = "col-lg-3"><a href={a.assignment_link} target="_blank" rel = "noreferrer"><button id = "Assignments__view-ass" >View Assignment</button></a></div>
                    {a.solution_link ? (<div className = "col-lg-3"><a href={a.solution_link} target="_blank" rel = "noreferrer"><button id = "Assignments__view-ass" >View Your Solution {(a.submission_date > a.submitted_at) ? (<i class="fas fa-clock Assignment_Solved__on-time"></i>) : (<i class="fas fa-clock Assignment_Solved__late"></i>)}</button></a></div>) : (<AssignmentUpload assign = {a} loadAssignments = {loadAssignments} />)}
                </div>
                )   
            ) : (
                <>
                <br/>
                <br/>
                <p className="text-center">Sorry, you haven't received any assignments for this class yet.</p>
                <hr/>
                </>
            )}
        </div>
    )
}

export default Assignments;