import React from "react";
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";
import { loginUser } from "../../redux/actions/userAction";
import {withRouter} from 'react-router-dom';
import "./Login.css";


const Login = (props) => {
    const dispatch = props.dispatch;
    const history = props.history;
    const login = (res) => {
        var user = res.profileObj;
        if (user.email.includes("bt")) {
            user = { ...user, type: "student" };
        } else {
            user = { ...user, type: "teacher" };
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
              
            />
        </div>
    );
};

export default connect()(withRouter(Login));
