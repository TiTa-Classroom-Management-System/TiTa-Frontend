import React from 'react'
import { Card, CardTitle,  Button } from 'reactstrap';


import TeacherNav from "../../components/Navbar/teacher/teacherNav";
import "./showclassroom.css";
import logo from "./../Navbar/logo.png";

const ShowClassroom = () => {
    return (
        <div class = "row">
            <div class = "col-12">
                <TeacherNav />
                <h3 className="heading">Classrooms</h3>
            </div>
            <div className="cards-row row">
                <div className="class-cards col-lg-3 col-md-6 col-sm-12">
                    
                        <Card body className="text-left">
                            <div className="card-heading">
                                <CardTitle tag="h5">EAD (CSN-207)</CardTitle>
                                <h6>Rajesh Bhatia</h6>
                                <img className="card-image"src={logo} alt="Hello" ></img>
                            </div>
                            <br></br>
                            <Button className="card-button">Details</Button>
                        </Card>
                </div>
                <div className="class-cards col-lg-3 col-md-6 col-sm-12">
                    
                        <Card body className="text-left">
                            <div className="card-heading">
                                <CardTitle tag="h5">EAD (CSN-207)</CardTitle>
                                <h6>Rajesh Bhatia</h6>
                                <img className="card-image"src={logo} alt="Hello" ></img>
                            </div>
                            <br></br>
                            <Button className="card-button">Details</Button>
                        </Card>
                </div>
                <div className="class-cards col-lg-3 col-md-6 col-sm-12">
                    
                        <Card body className="text-left">
                            <div className="card-heading">
                                <CardTitle tag="h5">EAD (CSN-207)</CardTitle>
                                <h6>Rajesh Bhatia</h6>
                                <img className="card-image"src={logo} alt="Hello" ></img>
                            </div>
                            <br></br>
                            <Button className="card-button">Details</Button>
                        </Card>
                </div>
                <div className="class-cards col-lg-3 col-md-6 col-sm-12">
                    
                        <Card body className="text-left">
                            <div className="card-heading">
                                <CardTitle tag="h5">EAD (CSN-207)</CardTitle>
                                <h6>Rajesh Bhatia</h6>
                                <img className="card-image"src={logo} alt="Hello" ></img>
                            </div>
                            <br></br>
                            <Button className="card-button">Details</Button>
                        </Card>
                </div>
                <div className="class-cards col-lg-3 col-md-6 col-sm-12">
                    
                        <Card body className="text-left">
                            <div className="card-heading">
                                <CardTitle tag="h5">EAD (CSN-207)</CardTitle>
                                <h6>Rajesh Bhatia</h6>
                                <img className="card-image"src={logo} alt="Hello" ></img>
                            </div>
                            <br></br>
                            <Button className="card-button">Details</Button>
                        </Card>
                </div>
            </div>
        </div>
    )
}

export default ShowClassroom;