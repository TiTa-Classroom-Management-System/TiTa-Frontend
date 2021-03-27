import React from "react";
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";
import { loginUser } from "../../redux/actions/userAction";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = (props) => {
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
    if (user.type === "student") history.push("/student");
    else history.push("/teacher");
  };

  return (
    <div className="login__button">
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={login}
        isSignedIn={true}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default connect()(withRouter(Login));
