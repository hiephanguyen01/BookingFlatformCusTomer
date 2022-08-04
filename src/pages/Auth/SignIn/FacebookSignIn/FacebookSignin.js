import React, { useEffect } from "react";
import "../SignIn.scss";
import fbLogo from "../../../../assets/imgAuth/facebook.png";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../AuthContext/AuthContext";
export const FacebookSignin = () => {
  const navigate = useNavigate();
  const { facebookSignIn, user } = UserAuth();
  const handleFacebookSignIn = async () => {
    try {
      await facebookSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user != null) {
      navigate("/home/dao");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <button className="facebook-button" onClick={() => handleFacebookSignIn()}>
      <img alt="google" src={fbLogo} className="fb-logo"></img>
      Tiếp tục với Facebook
    </button>
  );
};
