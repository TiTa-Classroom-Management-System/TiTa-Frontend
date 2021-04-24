import React, {useState} from "react";
import {useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router";

import "./Quizzes.css";

const QuizList = ({ loadQuizzes, quizzes }) =>
{
    useEffect(()=>
    {
        loadQuizzes();
    },[])

    const parseDates = (date) =>
    {
        const this_date=date.split("T")[0];
        const this_time=date.split("T")[1];
        return `${this_date.split("-")[2]}-${this_date.split("-")[1]}-${this_date.split("-")[0]} ${this_time.slice(0, 8)}`;
    }

    return(
        <div className="QuizList_list">
            <div id="QuizList__header" className="row">
                <div className="col-lg-3"><h5>Quiz Name</h5></div>
                <div className="col-lg-3"><h5>Start Time</h5></div>
                <div className="col-lg-3"><h5>End Time</h5></div>
                <div className="col-lg-3"><h5>Quiz Link</h5></div>
            </div>

            {(quizzes && quizzes.length>0) ? (quizzes.map((q)=>(
                <div className="QuizList_object row">
                    <div className="col-lg-3">{q.quiz_name}</div>
                    <div className="col-lg-3">{parseDates(q.start_time)}</div>
                    <div className="col-lg-3">{parseDates(q.end_time)}</div>
                    <div className="col-lg-3"><a href = {q.quiz_link} target = "_blank" rel = "noreferrer"><button className = "Quizzes__view-quiz">View Quiz</button></a></div>
                </div>
            ))):(
                <>
                    <hr/>
                    <p className="text-center">Sorry, you haven't created any Quizzes for this class yet.</p>
                </>
            )}
        </div>
    )
}

export default QuizList;
