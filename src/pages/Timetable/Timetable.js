import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import axios from "axios";

import Timetable from "../../components/Timetable/Timetable";
import TeacherNav from "../../components/Navbar/teacher/teacherNav";

import "./Timetable.css";

const Timetablepage = () =>
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
            console.log(res);
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
            <div class = "col-11 Timetable__timetable-component">

            {(tt && tt.length > 0) ? <Timetable tt = {tt} /> : <h5>Loading timetable...</h5>}

            </div>
        </div>
    )
}

export default connect()(withRouter(Timetablepage));