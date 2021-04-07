import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import axios from "axios";

import Timetable from "../../components/Timetable/Timetable";
import TeacherNav from "../../components/Navbar/teacher/teacherNav";

import "./Timetable.css";

const TeachTimetablePage = () =>
{
    const [tt, setTt] = useState(null);
    const { user } = useSelector(state => ({...state}));

    const loadTimetable = (user) =>
    {
        axios(
        {
            method: "GET",
            url: `${process.env.REACT_APP_API}/teachers/timetable/${user.email}`,
        })
        .then((res) => 
        {
            setTt(res.data);
        })
        .catch((err) => 
        {
            console.log(err);
        });
    }

    useEffect(() =>
    {
        loadTimetable(user);
    }, []);

    return (
        <div class = "row">
            <div class = "col-12">
                <TeacherNav />
            </div>
            <div class = "col-lg-11 col-md-11 col-sm-10 Timetable__timetable-component">

            {tt ? (tt.length > 0 ? <Timetable tt = {tt} /> : <p>You have not created any timetable yet...</p>) : <p>Loading timetable...</p>}

            </div>
        </div>
    )
}

export default connect()(withRouter(TeachTimetablePage));