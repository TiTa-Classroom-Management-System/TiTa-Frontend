import React, { useState } from "react";
import { useEffect } from "react"
import axios from "axios";
import { useParams } from "react-router";

import "./Assignments.css";

const AssignmentList = () =>
{
    const params = useParams();

    const [assignments, setAssignments] = useState([]);
    const loadAssignments = () =>
    {
        axios(
            {
                method: "GET",
                url: `${process.env.REACT_APP_API}/jobhiroute/${params.id}`
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
        loadAssignments();
    }, []);

    return(
        <div class = "AssignmentList__list">
            <div id = "AssignmentList__header" class = "row">
                <div class = "col-lg-3"><h5>Assignment Name</h5></div>
                <div class = "col-lg-2"><h5>Sub-Groups</h5></div>
                <div class = "col-lg-2"><h5>Deadline</h5></div>
                <div class = "col-lg-2"><h5>Submissions</h5></div>
                <div class = "col-lg-3"><h5>Assignment Link</h5></div>
            </div>

            {(assignments && assignments.length > 0) ? (
                <div class = "AssignmentList__object row">
                    <div class = "col-lg-3">{/*Enter data here*/}</div>
                    <div class = "col-lg-2">{/*Enter data here*/}</div>
                    <div class = "col-lg-2">{/*Enter data here*/}</div>
                    <div class = "col-lg-2">{/*Enter data here*/}</div>
                    <div class = "col-lg-3">{/*Enter data here*/}</div>
                </div>
            ) : (
                <>
                <hr/>
                <p>Sorry, you haven't created any assignments for this class yet.</p>
                </>
            )}
        </div>
    )
}

export default AssignmentList;