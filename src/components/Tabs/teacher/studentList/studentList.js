import React, {useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router";

import "./studentList.css";

const StudentList = () =>
{
    const params=useParams();

    const [list, setList]=useState([]);

    const loadQuizzes = ()=>
    {
        axios(
            {
                method:"GET",
                url:`${process.env.REACT_APP_API}/teachers/list/${params.id}`
            }
        )
        .then((res)=>{
            setList(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    useEffect(()=>
    {
        loadQuizzes();
    },[])

    return(
        <div className="StudentList_list">
            <div id="StudentList__header" className="row">
                <div className="col-lg-3"><h5>SID</h5></div>
                <div className="col-lg-4"><h5>Name</h5></div>
                <div className="col-lg-4"><h5>Email</h5></div>
            </div>

            {(list && list.length>0) ? (list.map((l)=>(
                <div className="StudentList_object row">
                    <div className="col-lg-3">{l.sid}</div>
                    <div className="col-lg-4">{l.name}</div>
                    <div className="col-lg-4">{l.email}</div>
                </div>
            ))):(
                <>
                    <hr/>
                    <p className="text-center">Sorry, No one has joined this class yet.</p>
                </>
            )}
        </div>
    )
}

export default StudentList;