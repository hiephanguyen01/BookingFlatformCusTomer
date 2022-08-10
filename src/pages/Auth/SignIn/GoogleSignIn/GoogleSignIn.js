import React, { useEffect } from "react";
import "../SignIn.scss";
import ggLogo from "../../../../assets/imgAuth/google.png";
import { useNavigate } from "react-router-dom";
import { googleSignIn } from "../../../../stores/actions/autheticateAction";
import { useDispatch, useSelector } from "react-redux";
export const GoogleSignIn = () => {
  const dispatch = useDispatch();
  const handleGoogleSignIn = async () => {
    dispatch(googleSignIn());
  };
  return (
    <button className="google-button" onClick={() => handleGoogleSignIn()}>
      <img alt="google" src={ggLogo} className="gg-logo"></img>
      Tiếp tục với Google
    </button>
  );
};
