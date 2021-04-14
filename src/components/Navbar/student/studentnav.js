import React,{useState} from "react";
import { useSelector } from "react-redux";
import { Navbar, NavItem, Nav, NavbarBrand } from "reactstrap";
import { Link , withRouter} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap-social/bootstrap-social.css";

import JoinClassModal from "../../Modal/student/joinClassModal";

import "./studentnav.css";
import logo from "./../logo.png";
import logoText from "./../logoText.png";
import Profile from "../../Profile/profile";


import { getClassroom, joinClassroom } from "../../../functions/classroom";

const StudentNav = ({history}) => {

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
        console.log(res);
        console.log(classroom)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleJoin=(e)=>{
    e.preventDefault()
    console.log(code,user.email,grp)
    joinClassroom({
      classid: code,
      email: user.email,
      selected_grp_no: grp
    })
    .then((res) => {
      console.log(res);
      history.push(`/students/classrooms/${code}`)
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const handleChange = (e) => {
    setCode(e.target.value);
    console.log(code)
  };
  const handleSelect = (e) =>
  {
    console.log(e.target.value);
    setGrp(e.target.value);
  }

  return (
    <div>
      <Navbar light expand="lg">
        <Nav navbar className="flex-column">
          <NavbarBrand>
            <Link className="logo" to="#">
              <img className="logo-image" src={logo} alt="logo" />
              <span className="logo-text">
                {" "}
                <img src={logoText} alt="TITA" />
              </span>
            </Link>
          </NavbarBrand>
          <NavItem>
            <Link className="nav-link" to="/studtimetable">
              <i className="fa fa-calendar fa-2x" aria-hidden="true"></i>
              <span className="link-text"> Time table</span>
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to="/studentclassrooms">
              <i className="fa fa-users fa-2x" aria-hidden="true"></i>
              <span className="link-text"> Classroom</span>
            </Link>
          </NavItem>
          <NavItem>
            <Link className="nav-link" to="#">
              <i className="fa fa-folder fa-2x" aria-hidden="true"></i>
              <span className="link-text"> Assignments</span>
            </Link>
          </NavItem>
          <NavItem onClick={toggleModal}>
            <Link className="nav-link" to="#">
              <i className="fa fa-plus-circle fa-2x" aria-hidden="true"></i>
              <span className="link-text"> Join Classroom</span>
            </Link>
          </NavItem>
        </Nav>
      </Navbar>
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
      <div>
        <Profile/>
      </div>
    </div>
  );
};

export default withRouter(StudentNav);
