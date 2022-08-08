import React, { useEffect } from "react";
import "../SignIn.scss";
import ggLogo from "../../../../assets/imgAuth/google.png";
import { UserAuth } from "../../AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { confirmPassAction } from "../../../../stores/actions/PhoneNumberAction";
import { useDispatch } from "react-redux";
export const GoogleSignIn = ({ redirect }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { googleSignIn } = UserAuth();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      redirect && navigate("/home/dao");
      localStorage.PassConfirm = true;
      dispatch(confirmPassAction(true));
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
