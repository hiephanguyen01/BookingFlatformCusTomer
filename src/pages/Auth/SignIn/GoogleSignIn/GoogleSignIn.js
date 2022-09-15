import React from "react";
import "../SignIn.scss";
import ggLogo from "../../../../assets/imgAuth/google.png";
import { googleSignIn } from "../../../../stores/actions/autheticateAction";
import { useDispatch } from "react-redux";
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
