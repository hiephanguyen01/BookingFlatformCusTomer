import React, { useEffect } from "react";
import "../SignIn.scss";
import ggLogo from "../../../../assets/imgAuth/google.png";
import { UserAuth } from "../../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
export const GoogleSignIn = ({redirect}) => {
  const navigate = useNavigate();
  const { googleSignIn } = UserAuth();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      redirect && navigate("/home/dao")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="google-button"
      onClick={() => {
        handleGoogleSignIn();
      }}
    >
      <img alt="google" src={ggLogo} className="gg-logo"></img>
      Tiếp tục với Google
    </button>
  );
};
