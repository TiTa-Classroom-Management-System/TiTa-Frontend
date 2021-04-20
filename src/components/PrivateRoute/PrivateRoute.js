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

const mapStateToProps = (state) => ({
    isLoggedIn: !!state.user,
});

export default connect(mapStateToProps)(withRouter(PrivateRoute));
