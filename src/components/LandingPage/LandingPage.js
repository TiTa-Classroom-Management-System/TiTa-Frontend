import React from "react";
import GoogleLogin from "react-google-login";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import "./Landingpage.css";
import { loginUser } from "../../redux/actions/userAction"
import logo from "./images/logo.png";
import logotext from "./images/logoText.png";
import main from "./images/main_graphic.svg"
import quiz from "./images/quiz_graphic.svg"
import assignment from "./images/assignment_graphic.svg"
import resource from "./images/resource_graphic.svg"
import timetable from "./images/timetable_graphic.svg"
import puneet from "./images/puneet.jpeg"
import utkarsh from "./images/utkarsh.jpeg"
import shubh from "./images/shubh_ashish.jpg"
import taranjot from "./images/taranjot.jpg"

const LandingPage = (props) => {
    const dispatch = props.dispatch;
    const history = props.history;
    const login = async (res) => {
        var user = res.profileObj;
        if (user.email.includes("bt")) {
            user = { ...user, type: "student" };
        } else {
            user = { ...user, type: "teacher" };
        }
        if (user.type === "student") {
            try {
                await axios({
                    method: "post",
                    url: `${process.env.REACT_APP_API}/students/login`,
                    data: { name: user.name, email: user.email },
                    headers: { "Content-Type": "application/json" },
                });
            } catch (e) {
                console.log(e);
            }
        } else {
            try {
                await axios({
                    method: "post",
                    url: `${process.env.REACT_APP_API}/teachers/login`,
                    data: { name: user.name, email: user.email },
                    headers: { "Content-Type": "application/json" },
                });
            } catch (e) {
                console.log(e);
            }
        }
        dispatch(loginUser(user));
        if (user.type === "student") history.push("/studtimetable");
        else history.push("/teachtimetable");
    };
    return (
        <>
            <section id="title">

                <div className="container-fluid" id="title-box">
                    <nav className="navbar navbar-expand-lg navbar-dark" id="nav-bar">
                        <a className="navbar-brand" id="logo-text" href="#"><img className="logoimage" src={logo} alt="Tita logo"/></a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-auto">
                                <li className="outer_nav-item ">
                                    <a className="nav-link" href="#">Home</a>
                                </li>
                                <li className="outer_nav-item">
                                    <a className="nav-link" href="#features">Features</a>
                                </li>
                                <li className="outer_nav-item">
                                    <a className="nav-link" href="#team">Team</a>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <div className="row" id="title-body">
                        <div className="col-lg-6">
                            <h1 className="title"><img className="tita" src={logotext} alt="Tita logo"/><br />Online Classroom Management System</h1>
                            <GoogleLogin
                                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                buttonText="Login with Google"
                                onSuccess={login}
                                isSignedIn={true}
                                cookiePolicy={"single_host_origin"}
                            />
                        </div>
                        <div className="col-lg-6">
                            <img className="title-image" src={main} alt="Title-iamge" />
                        </div>
                    </div>
                </div>

            </section>


            <section id="features">
            <h2 className="feature-title">Features</h2>
                <div className="row">
                    <div className="feature-box col-12 col-sm-6 col-lg-3">
                        <img className="feature-icon"src={timetable} alt="Time Table icon"/><h3>Time Table</h3>
                        <p>View and Schedule classes</p>
                    </div>

                    <div className="feature-box col-12 col-sm-6 col-lg-3">
                        <img className="feature-icon"src={assignment} alt="Assignment icon"/><h3>Assignments</h3>
                        <p>View, Create and Upload solutions of Assignments</p>
                    </div>

                    <div className="feature-box col-12 col-sm-6 col-lg-3">
                        <img className="feature-icon"src={quiz} alt="Quiz icon"/><h3>Quizzes</h3>
                        <p>View, Create and Check stats of Quizzes</p>
                    </div>
                    <div className="feature-box col-12 col-sm-6 col-lg-3">
                        <img className="feature-icon"src={resource} alt="Resource icon"/><h3>Resources</h3>
                        <p>View and Create Resources</p>
                    </div>
                </div>
            </section>


            <section id="team">

            <h2 className="team-title">Our Team</h2>
            <div calssName="container">
                <div className="row">
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="our-team">
                            <div className="picture">
                                <img className="img-fluid" src={puneet} alt="Puneet" />
                            </div>
                            <div className="team-content">
                                    <h3 className="name">Puneet Bansal</h3>
                            </div>
                            <ul className="social">
                                <li><a href="https://github.com/bansalpuneet15" target="_blank" rel="noreferrer" className="fa fa-github" aria-hidden="true" ></a></li>
                                <li><a href="https://www.linkedin.com/in/puneet-bansal15/" target="_blank" rel="noreferrer" className="fa fa-linkedin" aria-hidden="true"></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="our-team">
                            <div className="picture">
                                <img className="img-fluid" src={taranjot} alt="Taranjot" />
                            </div>
                            <div className="team-content">
                                    <h3 className="name">Taranjot Singh</h3>
                            </div>
                            <ul className="social">
                                <li><a href="https://github.com/TARANJOTS" target="_blank" rel="noreferrer" className="fa fa-github" aria-hidden="true"></a></li>
                                <li><a href="https://www.linkedin.com/in/taranjot-singh-809193197/" target="_blank" rel="noreferrer" className="fa fa-linkedin" aria-hidden="true"></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="our-team">
                            <div className="picture">
                                <img className="img-fluid" src={utkarsh} alt="Utkarsh" />
                            </div>
                            <div className="team-content">
                                <h3 className="name">Utkarsh Goel</h3>
                            </div>
                            <ul className="social">
                                <li><a href="https://github.com/UtkarshGoelUT" target="_blank" rel="noreferrer" className="fa fa-github" aria-hidden="true"></a></li>
                                <li><a href="https://www.linkedin.com/in/utkarshgoelut/" target="_blank" rel="noreferrer" className="fa fa-linkedin" aria-hidden="true"></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                        <div className="our-team">
                            <div className="picture">
                                <img className="img-fluid" src={shubh} alt="Shubh" />
                            </div>
                            <div className="team-content">
                                    <h3 className="name">Shubh Ashish</h3>
                            </div>
                            <ul className="social">
                                <li><a href="https://github.com/solarconstant" target="_blank" rel="noreferrer" className="fa fa-github" aria-hidden="true"></a></li>
                                <li><a href="https://www.linkedin.com/in/shubh-ashish-a4a415190/" target="_blank" rel="noreferrer" className="fa fa-linkedin" aria-hidden="true"></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            </section>

            <footer id="footer">
                <p className="copyright">© Copyright 2021 TiTa</p>
            </footer>
        </>
    );
}

export default connect()(withRouter(LandingPage));

