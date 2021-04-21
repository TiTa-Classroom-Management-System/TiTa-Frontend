import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ isLoggedIn, component: Component, ...rest }) => (
    <Route
        {...rest}
        component={(props) =>
            isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
        }
    />
);

export const StudentRoute = ({
    isLoggedIn,
    type,
    component: Component,
    ...rest
}) => (
    <Route
        {...rest}
        component={(props) =>
            type === "student" ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);

export const TeacherRoute = ({
    isLoggedIn,
    type,
    component: Component,
    ...rest
}) => (
    <Route
        {...rest}
        component={(props) =>
            type === "teacher" ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);

const mapStateToProps = (state) => ({
    isLoggedIn: !!state.user,
    type: state.user.type,
});

export default connect(mapStateToProps)(withRouter(PrivateRoute));
