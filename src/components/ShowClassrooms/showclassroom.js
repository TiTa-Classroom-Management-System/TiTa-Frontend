import React from 'react'
import { Card, CardTitle,  Button } from 'reactstrap';

import "../ShowClassrooms/showclassroom.css";
import logo from "./../Navbar/logo.png";
import { Link } from 'react-router-dom';

const ShowClassroom = ({classR}) => {
    return (
            <Card body className="text-left col-lg-3">
                <div className="card-heading">
                    <CardTitle tag="h5">{classR.course_name} <br/> <h6>{classR.course_code}</h6></CardTitle>
                    {classR.name ? <h6 id = "teacher">{classR.name}</h6> : <p>{classR.branchName} - {classR.branchYear}</p>}
                    <img className="card-image"src={logo} alt="Hello" ></img>
                </div>
                <br></br>
                <Button className="card-button">Details</Button>
            </Card>
    )
}

export default ShowClassroom;