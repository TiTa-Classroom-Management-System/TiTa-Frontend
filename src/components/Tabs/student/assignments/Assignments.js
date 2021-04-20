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
            console.log(res.data);
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

    return(
        <div class = "AssignmentList__list">
            <div id = "AssignmentList__header" class = "row">
                <div class = "col-lg-3"><h5>Assignment Name</h5></div>
                <div class = "col-lg-2"><h5>Deadline</h5></div>
                <div class = "col-lg-3"><h5>Assignment</h5></div>
                <div class = "col-lg-3"><h5>Upload solution</h5></div>
            </div>

            {(assignments && Array.isArray(assignments) && assignments.length > 0) ? (
                assignments.map((a) => 
                <div class = "AssignmentList__object row">
                    <div class = "col-lg-3 assign">{a.assignment_name}</div>
                    <div class = "col-lg-2 assign">{a.submission_date}</div>
                    <div class = "col-lg-3 assign"><a href={a.assignment_link} target="_blank" ><button id = "Assignments__view-ass" >View Assignment</button></a></div>
                    <div class = "col-lg-3 assign"><AssignmentUpload assign={a}/></div>
                </div>
                )   
            ) : (
                <>
                <hr/>
                <p className="text-center">Sorry, you haven't received any assignments for this class yet.</p>
                </>
            )}
        </div>
    )
}

export default Assignments;