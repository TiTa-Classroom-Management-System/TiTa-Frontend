import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

const PrivateRoute = (props) =>
  props.user ? <p>{props.children}</p> : <Redirect to="/login" />;

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withRouter(PrivateRoute));
