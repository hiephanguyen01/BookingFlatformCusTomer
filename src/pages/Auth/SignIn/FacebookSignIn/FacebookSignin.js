import React from "react";
import "../SignIn.scss";
import fbLogo from "../../../../assets/imgAuth/facebook.png";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../AuthContext/AuthContext";
import { confirmPassAction } from "../../../../stores/actions/PhoneNumberAction";
import { useDispatch } from "react-redux";
export const FacebookSignin = ({ redirect }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { facebookSignIn } = UserAuth();
  const handleFacebookSignIn = async () => {
    try {
      await facebookSignIn();
      redirect && navigate("/home/dao");
      localStorage.PassConfirm = true;
      dispatch(confirmPassAction(true));
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
