import React from "react";
import { Card, CardTitle, Button } from "reactstrap";

import "./showclassroom.css";
import logo from "./../Navbar/logo.png";
import { Link } from "react-router-dom";

const ShowClassroom = ({ classR, who }) => {
  return (
    <div className="class-cards col-lg-3 col-md-6 col-sm-12">
      {console.log(classR, who)}
      <Card body className="text-left">
        <div className="card-heading">
          <CardTitle tag="h5">
            {classR.course_name} - {classR.course_code}
          </CardTitle>
          {classR.name ? (
            <h6>{classR.name}</h6>
          ) : (
            <p>
              {classR.branchName} - {classR.branchYear}
            </p>
          )}
          <img className="card-image" src={logo} alt="Hello"></img>
        </div>
        <br></br>
        <Link to={`/${who}/classrooms/${classR.classroom_id}`}>
          {" "}
          <Button className="card-button">Details</Button>
        </Link>
      </Card>
    </div>
  );
};

export default ShowClassroom;
