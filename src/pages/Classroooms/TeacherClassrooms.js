import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { updateTimetable } from "../../redux/actions/timetableAction";
import { updateClassrooms } from "../../redux/actions/classroomsAction";
import axios from "axios";

import ShowClassroom from "../../components/ShowClassrooms/showclassroom";
import "./Classrooms.css";

const TeacherClassrooms = ({ dispatch }) => {
    const [classroom, setClassroom] = useState(null);
    const { user } = useSelector((state) => ({ ...state }));

    const loadClassroom = (user) => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/teachers/classrooms/${user.email}`,
        })
            .then((res) => {
                dispatch(updateClassrooms(res.data));
                setClassroom(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const loadTimetable = (user) => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/teachers/timetable/${user.email}`,
        })
            .then((res) => {
                dispatch(updateTimetable(res.data));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        loadClassroom(user);
        loadTimetable(user);
    }, []);

    return (
        <div class="row">
            <div className="cards-row row">
                {classroom && Array.isArray(classroom) ? (
                    classroom.length > 0 ? (
                        classroom.map((c) => (
                            <ShowClassroom classR={c} who="teachers" />
                        ))
                    ) : (
                        <p className="class-loading">
                            You have not created any classroom yet...
                        </p>
                    )
                ) : (
                    <p className="class-loading">Loading classrooms...</p>
                )}
            </div>
        </div>
    );
};

export default connect()(withRouter(TeacherClassrooms));
