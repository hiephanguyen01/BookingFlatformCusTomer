import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import fbLogo from "../../../../assets/imgAuth/facebook.png";
import { facebookSignIn } from "../../../../stores/actions/autheticateAction";
import "../SignIn.scss";
export const FacebookSignin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFacebookSignIn = () => {
    dispatch(facebookSignIn(navigate));
  };

  return (
    <button
      className="facebook-button"
      onClick={(e) => {
        e.stopPropagation();
        handleFacebookSignIn();
      }}
    >
      <img alt="facebook" src={fbLogo} className="fb-logo"></img>
      Tiếp tục với Facebook
    </button>
  );
};
