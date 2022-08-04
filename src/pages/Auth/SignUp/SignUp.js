import React, { useState } from "react";
import vietnam from "../../../assets/imgAuth/vietnam.png";
import ReactLoading from "react-loading";
import "./SignUp.scss";
import { Link, useNavigate } from "react-router-dom";
import firebase from "../FireBaseSetUp/Firebase";
import { GoogleSignIn } from "../SignIn/GoogleSignIn/GoogleSignIn";
import { FacebookSignin } from "../SignIn/FacebookSignIn/FacebookSignin";
export const SignUp = () => {
  const navigate = useNavigate();
  const [phoneNum, setPhoneNum] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSendOtp = () => {
    configureCaptcha();
    const phoneNumber = "+84" + phoneNum;
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
       /*  console.log("OTP has been sent"); */
        navigate("/auth/sign-up/phone");
      })
      .catch((error) => {
       /*  console.log("SMS not sent"); */
      });
  };
  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          handleSendOtp();
        /*   console.log("Recaptca varified"); */
        },
        defaultCountry: "VN",
      }
    );
  };
  return (
    <>
      <div style={{ marginBottom: "52px" }}>
        <button className="sign-up-button">Đăng ký</button>
        <Link to="/auth/sign-in">
          <button className="sign-in-button">Đăng nhập</button>
        </Link>
      </div>
      <div className="face-google-login">
        <GoogleSignIn />
        <FacebookSignin />
      </div>
      <div className="divine-login">
        <div className="divinve-login-content">hoặc</div>
      </div>
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
          <div className="white-hide"></div>
        </div>
      </div>
      {phoneNum.length >= 9 && phoneNum.length <= 11 ? (
        <>
          <div id="sign-in-button"></div>
          <button
            className="confirm-sign-up"
            onClick={() => {
              handleSendOtp();
              setLoading(true);
            }}
          >
            {!loading && <span>Đăng ký</span>}
            {loading && (
              <>
                <ReactLoading
                  type="cylon"
                  color="#fff"
                  className="loadingEffect"
                />{" "}
                <span>Đăng ký</span>
              </>
            )}
          </button>
        </>
      ) : (
        <button className="confirm-sign-up">Đăng ký</button>
      )}
      <div className="have-account">
        <span className="have-account-content">Bạn đã có tài khoản?</span>
        <Link to="/auth/sign-in">
          <span className="have-account-button">Đăng nhập</span>
        </Link>
      </div>
    </>
  );
};
