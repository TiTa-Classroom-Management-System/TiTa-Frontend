import React from "react";
import { connect } from "react-redux";
import GoogleLogin from "react-google-login";
import { loginUser } from "../../redux/actions/userAction";
import { createBrowserHistory } from "history";
import "./Login.css";

const history = createBrowserHistory({ forceRefresh: true });

const Login = (props) => {
    const dispatch = props.dispatch;
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
                isSignedIn={true}
            />
        </div>
    );
};

export default connect()(Login);
