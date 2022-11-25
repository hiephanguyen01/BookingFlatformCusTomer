import React from "react";
import "../SignIn.scss";
import ggLogo from "../../../../assets/imgAuth/google.png";
import { googleSignIn } from "../../../../stores/actions/autheticateAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export const GoogleSignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    dispatch(googleSignIn(navigate));
  };
  return (
    <button
      className="google-button"
      onClick={(e) => {
        e.stopPropagation();
        handleGoogleSignIn();
      }}
    >
      <img alt="google" src={ggLogo} className="gg-logo"></img>
      Tiếp tục với Google
    </button>
  );
};
