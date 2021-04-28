import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import axios from "axios";

import ShowClassroom from "../../components/ShowClassrooms/showclassroom";
import "./Classrooms.css";


import JoinClassModal from "../../components/Modal/student/joinClassModal";
import { getClassroom, joinClassroom } from "../../functions/classroom";
import { updateTimetable } from "../../redux/actions/timetableAction";

const StudentClassrooms = ({ history, dispatch }) => {
    const [classrooms, setClassrooms] = useState(null);
    const [modal, setModal] = useState(false);
  
  const { user } = useSelector((state) => ({ ...state }));
  const [code,setCode]=useState('');
  const [classroom,setClassroom]=useState("");
  const [grp,setGrp]=useState();

  const toggleModal= () => setModal(!modal);

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    getClassroom(code)
      .then((res) => {
        setClassroom(`${res.data.course_name}+${res.data.course_code}+${res.data.branchName}+${res.data.branchYear}+${res.data.num_groups}+${user.email}`)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleJoin=(e)=>{
    e.preventDefault()
    joinClassroom({
      classid: code,
      email: user.email,
      selected_grp_no: grp
    })
    .then((res) => {
      history.push(`/students/classrooms/${code}`)
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const handleChange = (e) => {
    setCode(e.target.value);
  };
  const handleSelect = (e) =>
  {
    setGrp(e.target.value);
  }

    const loadClassroom = (user) => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/students/classrooms/${user.email}`,
        })
            .then((res) => {
                setClassrooms(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const loadTimetable = (user) => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API}/students/timetable/${user.email}`,
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
                <div class="StudentClassrooms__join row">
                    <div class="col-lg-3 col-md-3">
                        <h3 className="heading">Classrooms</h3>
                    </div>
                    <div class="col-lg-6 col-md-6">

                    </div>
                    <div class="StudentClassrooms__join-btn col-lg-3 col-md-3"> 
                        <button class="Join_Classroom" onClick={toggleModal}>
                            <h6>Join Classroom</h6><i className="fa fa-plus-circle fa-2x create" aria-hidden="true"></i>
                        </button>
                    </div>
                </div>
                
                {modal ? <JoinClassModal 
                    toggle = {toggleModal} 
                    modal = {modal} 
                    code={code} 
                    setCode={setCode} 
                    classroom={classroom} 
                    setClassroom={setClassroom} 
                    handleCodeSubmit={handleCodeSubmit} 
                    handleChange={handleChange} 
                    handleSelect={handleSelect}
                    handleJoin={handleJoin}
                    setGrp={setGrp}
                    className = "classModal"/>
                :""}
            </div>
            
            <div className="StudentClassrooms__cards cards-row row">
                {classrooms && Array.isArray(classrooms) ? (
                    classrooms.length > 0 ? (
                        classrooms.map((c) => (
                            <ShowClassroom classR={c} who="students" />
                        ))
                    ) : (
                        <p className="class-loading">
                            You have not joined any classroom yet...
                        </p>
                    )
                ) : (
                    <p className="class-loading">Loading classrooms...</p>
                )}
            </div>
        </div>
    );
};

export default connect()(withRouter(StudentClassrooms));
