import { Button, Divider } from "antd";
import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import vietnam from "../../../assets/imgAuth/vietnam.png";
import { handleSendOtp } from "../../../stores/actions/autheticateAction";
import { FacebookSignin } from "../SignIn/FacebookSignIn/FacebookSignin";
import { GoogleSignIn } from "../SignIn/GoogleSignIn/GoogleSignIn";
import "./SignUp.scss";
export const SignUp = ({ onClickSignUp }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [phoneNum, setPhoneNum] = useState("");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.authenticateReducer.currentUser);
  const handleSendOtpp = () => {
    dispatch(
      handleSendOtp(phoneNum, navigate, "/auth/sign-up/phone", onClickSignUp, 6)
    );
  };

  useEffect(() => {
    if (user?.Email) {
      navigate("/home/dao");
    }
  }, [user]);
  return (
    <>
      <div style={{ marginBottom: "52px" }}>
        <button className="sign-up-button">Đăng ký</button>
        {onClickSignUp ? (
          <button className="sign-in-button" onClick={() => onClickSignUp(1)}>
            Đăng nhập
          </button>
        ) : (
          <Link to="/auth/sign-in">
            <button className="sign-in-button">Đăng nhập</button>
          </Link>
        )}
      </div>
      <div className="face-google-login">
        <GoogleSignIn />
        <FacebookSignin />
      </div>
      <Divider />
      <div className="phone-sign-up">
        <div>Đăng ký tài khoản bằng số điện thoại</div>
        <div className="phone-zone-sign-up">
          <div className="d-flex align-items-center">
            <img alt="" src={vietnam}></img>
            <div className="code-vn-login">+84</div>
          </div>
          <input
            placeholder="Số điện thoại đăng ký tài khoản"
            className="input-phone"
            type="number"
            onChange={(e) => setPhoneNum(e.target.value)}
          />
          <div
            className={
              phoneNum.length >= 9 && phoneNum.length <= 11
                ? "d-none"
                : "invalidPhone"
            }
          >
            Vui lòng nhập số điện thoại hợp lệ !
          </div>
        </div>
      </div>
      <div id="sign-in-button"></div>
      {/* Capcha --------------- */}
      <Button
        onClick={() => {
          handleSendOtpp();
          setLoading(true);
        }}
        size="large"
        type="primary"
        loading={loading}
        disabled={phoneNum.length < 9 && phoneNum.length > 11}
        style={{ borderRadius: "10px" }}
      >
        Đăng ký
      </Button>
      <div className="have-account">
        <span className="have-account-content">Bạn đã có tài khoản?</span>
        {onClickSignUp ? (
          <span
            className="have-account-button"
            onClick={() => onClickSignUp(1)}
          >
            Đăng nhập
          </span>
        ) : (
          <Link to="/auth/sign-in">
            <span className="have-account-button">Đăng nhập</span>
          </Link>
        )}
      </div>
    </>
  );
};
