import React from 'react';
import logo from "./../Navbar/logo.png";
import "./profile.css"

const Profile =() => {
      
    return (
        <div className="row profile-box">
            <div className="profile-text">
                <h6>Hello, Puneet Bansal</h6>   
            </div>
            <div class="dropdown">
                <button class="dropbtn"> <img className="profile-image"src={logo} alt="userImage"/></button>
                <div class="dropdown-content">
                    <button class="logout-btn"> Logout </button>
                </div>
            </div>
        </div>
    )
}

export default Profile;

    