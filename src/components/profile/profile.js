import React from "react";
import { connect } from "react-redux";
import { GoogleLogout } from "react-google-login";
import { withRouter } from "react-router-dom";
import { logoutUser } from "../../redux/actions/userAction";
import "./profile.css";

const Profile = ({ user, dispatch, history }) => {
  console.log(history);
  const logout = () => {
    history.push("/login");
    dispatch(logoutUser());
    console.log("pushing");
  };

  return (
    <div className="row profile-box">
      <div className="profile-text">
        <h6>Hello, {user.name}</h6>
      </div>
      <div className="dropdown">
        <button className="dropbtn">
          {" "}
          <img className="profile-image" src={user.imageUrl} alt="userImage" />
        </button>
        <div className="dropdown-content">
          <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={logout}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="logout-btn"
              >
                Logout
              </button>
            )}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps)(withRouter(Profile));