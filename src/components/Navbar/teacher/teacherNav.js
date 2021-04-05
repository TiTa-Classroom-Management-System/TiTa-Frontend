import React, { useState } from "react";
import { Navbar, NavItem, Nav } from "reactstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-social/bootstrap-social.css";

import "./teacherNav.css";
import logo from "./../logo.png";
import logoText from "./../logoText.png";
import ClassModal from "../../Modal/teacher/createClassModal";
import Profile from "./../../Profile/profile";

import { createClassroom } from "../../../functions/classroom";

const TeacherNav=()=>{

    const [modal, setModal] = useState(false);
    const initialState = {
        branchYear : "",
        branchName : "Choose Branch",
        subjectName : "",
        subjectCode : "",
        subGroups : "",
    };
    const [values, setValues] = useState(initialState);
    const branchOptions = [["Aerospace Engineering", 1], 
                        ["Civil Engineering", 2], 
                        ["Computer Science and Engineering", 3], 
                        ["Electrical Engineering", 4], 
                        ["Electronics and Communication Engineering", 5], 
                        ["Mechanical Engineering", 6], 
                        ["Metallurgical Engineering", 7], 
                        ["Production Engineering", 8]]

    const handleSubmit = (e) =>
    {
        e.preventDefault();
        createClassroom(values)
        .then((res) =>
        {
            console.log(res);
        })
        .catch((err) =>
        {
            console.log(err);
        })
    }

    const handleChange = (e) =>
    {
        setValues(
            {
                ...values, 
                [e.target.name] : e.target.value,
            }
        )
    }

    const toggleModal = () =>
    {
        setModal(!modal);
    }

    return(
        <div>
            <Navbar light expand="lg">
                <Nav navbar className="flex-column">
                    <NavItem>
                        <Link className="logo2" to="#">
                            <img className="logo-image2" src={logo} alt="logo" />
                            <span className="logo-text2"> <img src={logoText} alt="TITA" /></span>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="/teachtimetable">
                            <i className="fa fa-calendar fa-2x" aria-hidden="true"></i>
                            <span className="link-text"> Time table</span>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="#">
                            <i className="fa fa-users fa-2x" aria-hidden="true"></i>
                            <span className="link-text"> Classrooms</span>
                        </Link>
                    </NavItem>
                    <NavItem onClick = {toggleModal}>
                        <Link className="nav-link" to="#">
                            <i className="fa fa-plus-circle fa-2x" aria-hidden="true"></i>
                            <span className="link-text"> Create Classroom</span>
                        </Link>
                    </NavItem>
                </Nav>
            </Navbar>
            {modal ? <ClassModal 
                        toggle = {toggleModal} 
                        modal = {modal} 
                        className = "classModal"
                        branches = {branchOptions}
                        values = {values}
                        setValues = {setValues} 
                        handleChange = {handleChange}
                        handleSubmit = {handleSubmit} /> : ""}
            <Profile />
        </div>
    )
}
export default TeacherNav;
