import React from 'react'
import { Navbar, NavItem, Nav } from 'reactstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-social/bootstrap-social.css';


const TeacherNav=()=>{
    return(
        <div>
            <Navbar light expand="lg">
                <Nav navbar className="flex-column">
                    <NavItem>
                        <Link className="nav-link" to="#">
                            <i className="fa fa-user fa-2x" aria-hidden="true"></i>
                            <span className="link-text"> Profile</span>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="#">
                            <i className="fa fa-calendar fa-2x" aria-hidden="true"></i>
                            <span className="link-text"> Time table</span>
                        </Link>
                    </NavItem>
                    <NavItem>
                        <Link className="nav-link" to="#">
                            <i className="fa fa-users fa-2x" aria-hidden="true"></i>
                            <span className="link-text"> Classroom</span>
                        </Link>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    )
}
export default TeacherNav;