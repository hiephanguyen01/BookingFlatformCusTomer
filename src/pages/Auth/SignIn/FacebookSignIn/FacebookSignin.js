import React from "react";
import { useDispatch } from "react-redux";
import fbLogo from "../../../../assets/imgAuth/facebook.png";
import { facebookSignIn } from "../../../../stores/actions/autheticateAction";
import "../SignIn.scss";
export const FacebookSignin = () => {
  const dispatch = useDispatch();
  const handleFacebookSignIn = () => {
    dispatch(facebookSignIn());
  };

  return (
    <button className="facebook-button" onClick={() => handleFacebookSignIn()}>
      <img alt="facebook" src={fbLogo} className="fb-logo"></img>
      Tiếp tục với Facebook
    </button>
  );
};
