import React from "react";
import { Navbar, NavItem, Nav, NavbarBrand } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-social/bootstrap-social.css";

import "./studentnav.css";
import logo from "./../logo.png";
import logoText from "./../logoText.png";
import Profile from "../../profile/profile";

const StudentNav = () => {
    return (
        <div>
            <Navbar light expand="lg" className="inner_navbar">
                <Nav navbar className="flex-column inner_navbar-nav">
                    <NavbarBrand className="first">
                        <Link className="logo2" to="#">
                            <img className="logo-image2" src={logo} alt="logo" />
                            <span className="logo-text2">
                                {" "}
                                <img src={logoText} alt="TITA" />
                            </span>
                        </Link>
                    </NavbarBrand>
                    <NavItem>
                        <Link className="inner_nav-link" to="/studtimetable">
                            <i
                                className="fa fa-calendar fa-2x"
                                aria-hidden="true"
                            ></i>
                            <span className="inner_link-text"> Time table</span>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link className="inner_nav-link" to="/studentclassrooms">
                            <i
                                className="fa fa-users fa-2x"
                                aria-hidden="true"
                            ></i>
                            <span className="inner_link-text"> Classrooms</span>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link className="inner_nav-link" to="/todolist">
                            <i
                                className="fa fa-folder fa-2x"
                                aria-hidden="true"
                            ></i>
                            <span className="inner_link-text"> To-Do List</span>
                        </Link>
                    </NavItem>
                </Nav>
            </Navbar>

            <div>
                <Profile />
            </div>
        </div>
    );
};

export default withRouter(StudentNav);
