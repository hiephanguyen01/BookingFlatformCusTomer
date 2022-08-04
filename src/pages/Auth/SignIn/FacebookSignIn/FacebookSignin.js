import React from "react";
import "../SignIn.scss";
import fbLogo from "../../../../assets/imgAuth/facebook.png";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../AuthContext/AuthContext";
export const FacebookSignin = ({redirect}) => {
  const navigate = useNavigate();
  const { facebookSignIn } = UserAuth();
  const handleFacebookSignIn = async () => {
    try {
      await facebookSignIn();
      redirect && navigate("/home/dao")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      className="facebook-button"
      onClick={() => {
        handleFacebookSignIn();
      }}
    >
      <img alt="google" src={fbLogo} className="fb-logo"></img>
      Tiếp tục với Facebook
    </button>
  );
};
