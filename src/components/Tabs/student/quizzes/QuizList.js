import React, {useState, useEffect} from "react";
import { useSelector } from "react-redux"
import axios from "axios";
import { useParams } from "react-router";
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "reactstrap";
import { Bar } from "react-chartjs-2";

import "./Quizzes.css";

const QuizList = () =>
{
    const { user } = useSelector((state) => ({ ...state }));
    const params=useParams();

    const [quizzes, setQuizzes]=useState([]);
    const [resmodal, setResmodal] = useState(null);
    const [thisquizstat, setThisquizstat] = useState([]);

    const toggleResModal = () =>
    {
        setResmodal((prev) => (!prev));
    }

    const loadQuizzes = (user)=>
    {
        axios(
            {
                method:"GET",
                url:`${process.env.REACT_APP_API}/students/quiz/${user.email}/${params.id}`
            }
        )
        .then((res)=>{
            setQuizzes(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const loadQuizResult = (quiz_id) =>
    {
        axios(
            {
                method: "GET",
                url:`${process.env.REACT_APP_API}/quiz/result/${quiz_id}`
            }
        )
        .then((res) =>
        {
            setThisquizstat(res.data);
        })
        .catch((err) =>
        {
            console.log(err);
        })
    }

    useEffect(()=>
    {
        loadQuizzes(user);
    },[])

    const parseDates = (date) =>
    {
        const this_date=date.split("T")[0];
        const this_time=date.split("T")[1];
        return `${this_date.split("-")[2]}-${this_date.split("-")[1]}-${this_date.split("-")[0]} ${this_time.slice(0, 8)}`;
    }

    const getClickableLink = (link) => 
    {
        return link.startsWith("http://") || link.startsWith("https://") ? link : `http://${link}`;
    };

    const getThisQuizAvg = (quiz_data) =>
    {
        let avg = 0;
        quiz_data.forEach(element => {
            avg += element.score_obtained;
        });

        return avg / quiz_data.length;
    }

    const getThisQuizMax = (quiz_data) =>
    {
        let max = -1;
        quiz_data.forEach((element) =>
        {
            if(element.score_obtained > max)
            {
                max = element.score_obtained;
            }
        })

        return max;
    }

    const getThisQuizMin = (quiz_data) =>
    {
        let min = 1000;
        quiz_data.forEach((element) =>
        {
            if(element.score_obtained < min)
            {
                min = element.score_obtained;
            }
        })

        return min;
    }

    var score_obtained = 0;
    var max_score = 0;
    var avg_score = 0;
    var max_score_obtained = 0;
    var min_score_obtained = 0;

    if(thisquizstat && thisquizstat.length > 0)
    {
        score_obtained = thisquizstat.find((a) => (a.email === user.email)).score_obtained;
        max_score = thisquizstat.find((a) => (a.email === user.email)).max_score;
        avg_score = getThisQuizAvg(thisquizstat);
        max_score_obtained = getThisQuizMax(thisquizstat);
        min_score_obtained = getThisQuizMin(thisquizstat);
    }

    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };

    return(
        <div className="QuizList_list">
            <div id="QuizList__header" className="row">
                <div className="col-lg-3"><h5>Quiz Name</h5></div>
                <div className="col-lg-2"><h5>Start Time</h5></div>
                <div className="col-lg-2"><h5>End Time</h5></div>
                <div className="col-lg-3"><h5>Quiz Link</h5></div>
                <div className="col-lg-2"><h5>Score</h5></div>
            </div>

            {(quizzes && quizzes.length>0) ? (quizzes.map((q)=>(
                <div className="QuizList_object row">
                    <div className="col-lg-3">{q.quiz_name}</div>
                    <div className="col-lg-2">{parseDates(q.start_time)}</div>
                    <div className="col-lg-2">{parseDates(q.end_time)}</div>
                    <div className="col-lg-3"><a href={getClickableLink(q.quiz_link)} target="_blank" rel="noreferrer"><button className="Quizzes__view-quiz">View Quiz</button></a></div>
                    <div className="col-lg-2">
                        {q.max_score ? (
                            <button onClick = {() =>
                            {
                                toggleResModal();
                                loadQuizResult(q.quiz_id);
                            }} id = {q.quiz_id} onMouseLeave = {(e) => (document.getElementById(e.target.id).innerHTML = `${q.score_obtained} / ${q.max_score}`)} onMouseOver = {(e) => (document.getElementById(e.target.id).innerHTML = "Analysis")} className="Quizzes__view-score">{q.score_obtained} / {q.max_score}</button>
                        ) : (
                            <p>Result not uploaded</p>
                        )}
                    </div>

                    <Modal className = "QuizList__modal" toggle = {toggleResModal} isOpen = {resmodal}>
                        <ModalHeader>
                            Analysis
                        </ModalHeader>
                        <ModalBody>
                        <div class = "row QuizList__chart-row-1">
                            <div class = "col-lg-12 chart">
                                <Bar data = {
                                {labels: ["You", "Class Average", "Max Obtainable Score", "Max Score Obtained", "Min Score Obtained"],
                                datasets: [
                                    {
                                        label: "Score",
                                        data: [parseFloat(score_obtained), parseFloat(avg_score), parseFloat(max_score), parseFloat(max_score_obtained), parseFloat(min_score_obtained)],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(219, 246, 233, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(255, 194, 136, 0.2)',
                                        ],
                                        borderColor: [
                                            '#f19b84',
                                            '#6673fd',
                                            '#2b3dff ',
                                            '#5a5d66',
                                            '#fd7b7b'
                                        ],
                                        borderWidth: 1,
                                    },
                                ],} 
                            } options = {options} />
                            </div>
                            <div class = "col-lg-6">

                            </div>
                        </div>
                        
                        </ModalBody>
                        <ModalFooter>
                            <button className = "Quizzes__view-quiz" onClick = {toggleResModal}>Close</button>
                        </ModalFooter>
                    </Modal>
                </div>
            ))):(
                <>
                    <br/>
                    <br/>
                    <p className="text-center">Sorry, you haven't received any Quizzes for this class yet.</p>
                    <hr/>
                </>
            )}
        </div>
    )
}

export default QuizList;