import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { updateTimetable } from "../../redux/actions/timetableAction";
import { createClassroom } from "../../functions/classroom";
import { updateClassrooms } from "../../redux/actions/classroomsAction";
import ClassModal from "../../components/Modal/teacher/createClassModal";
import axios from "axios";

import ShowClassroom from "../../components/ShowClassrooms/showclassroom";
import "./Classrooms.css";

const TeacherClassrooms = ({dispatch, classrooms }) => {
  const [classroom, setClassroom] = useState(null);
  const { user } = useSelector((state) => ({ ...state }));

  const [modal, setModal] = useState(false);
  const [code, setCode] = useState(null);
  const initialState = {
    branchYear: "",
    branchName: "",
    subjectName: "",
    subjectCode: "",
    subGroups: "",
    email: user.email,
  };
  const [values, setValues] = useState(initialState);
  const branchOptions = [
    "AE",
    "CivE",
    "CSE",
    "EE",
    "ECE",
    "MechE",
    "MetE",
    "PE",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    createClassroom(values)
      .then((res) => {
        setCode(res.data.classroom_id);
        dispatch(updateClassrooms([res.data]));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const toggleModal = () => {
    setValues(initialState);
    setCode(null);
    setModal(!modal);
  };

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
      <div class="col-lg-12">
        <div class="TeacherClasrooms__create row">
          <div class="col-lg-3 col-md-3">
            <h3 className="heading">Classrooms</h3>
          </div>
          <div class="col-lg-6 col-md-6">

          </div>
          <div class="TeacherClassrooms__create-btn col-lg-3 col-md-3"> 
            <button class="Create_Classroom" onClick={toggleModal}>
              <h6>Create Classroom</h6><i className="fa fa-plus-circle fa-2x create" aria-hidden="true"></i>
            </button>
          </div>
        </div>
                
        {modal ? (
        <ClassModal
          code={code}
          setCode={setCode}
          toggle={toggleModal}
          modal={modal}
          className="classModal"
          branches={branchOptions}
          values={values}
          setValues={setValues}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      ) : (
        ""
      )}
      </div>
      <div className="TeacherClassrooms__list cards-row row">
        {classroom && Array.isArray(classroom) ? (
          classroom.length > 0 ? (
            classroom.map((c) => <ShowClassroom classR={c} who="teachers" />)
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

const dispatchStateToProp = (state) => {
  return { tt: state.timetable, classrooms: state.classrooms };
};
export default connect(dispatchStateToProp)(withRouter(TeacherClassrooms));
