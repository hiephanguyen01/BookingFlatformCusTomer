import React from "react";
import logo from "../../../assets/imgAuth/logobooking.png";
import authPic from "../../../assets/imgAuth/auth-pic.png";
import "./AuthLayout.scss";
export const AuthLayout = ({ children }) => {
  return (
    <div className="login-container">
      <div className="header-login">
        <img alt="logo" src={logo} className="logo-booking"></img>
      </div>
      <div className="body-login ">
        <div className="body-contain-login">
          <img alt="pic" src={authPic} className="pic-login"></img>
          <div className="w-50 login-platform ">{children}</div>
        </div>
      </div>
    </div>
  );
};
