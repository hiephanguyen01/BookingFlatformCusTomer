import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.scss";
import back from "../../../../assets/imgAuth/back-arrow.png";
import vietnam from "../../../../assets/imgAuth/vietnam.png";
import { CheckOutlined } from "@ant-design/icons";
import { phoneNumberAction } from "../../../../stores/actions/PhoneNumberAction";
import { Link } from "react-router-dom";
import firebase from "../../FireBaseSetUp/Firebase";
import { useDispatch } from "react-redux";
export const ForgotPassword = ({ onClickPop }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [phoneCheck, setPhoneCheck] = useState("");
  const handleSendOtp = () => {
    configureCaptcha();
    const phoneNumber = "+84" + phoneCheck;
    const thisVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, thisVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
        {
          onClickPop === undefined
            ? navigate("/auth/sign-in/forgot-password/phone")
            : onClickPop(3);
        }
      })
      .catch((error) => {
        console.log("SMS not sent");
      });
  };
  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          handleSendOtp();
        },
        defaultCountry: "VN",
      }
    );
  };
  return (
    <div className="ForgotPass">
      <div className="header">
        {onClickPop ? (
          <button
            className="back-button-forgot-pass"
            onClick={() => onClickPop(1)}
          >
            <img alt="back" src={back} style={{ height: "16px" }} />
          </button>
        ) : (
          <Link to="/auth/sign-in">
            <button className="back-button-forgot-pass">
              <img alt="back" src={back} style={{ height: "16px" }} />
            </button>
          </Link>
        )}
        <span>Xác minh số điện thoại</span>
      </div>
      <div className="noti-forgot-pass">
        Vui lòng nhập số điện thoại đăng ký tài khoản. Mã xác minh sẽ được gửi
        đến số điện thoại của quý khách hàng.
      </div>
      <div
        className={
          phoneCheck.length >= 9 && phoneCheck.length <= 12
            ? "phone-zone-forgotpass"
            : "invalid-phone"
        }
      >
        <div className="d-flex align-items-center">
          <img alt="" src={vietnam}></img>
          <div className="code-vn-login">+84</div>
        </div>
        <input
          placeholder="Số điện thoại đăng ký tài khoản"
          className="input-phone-forgot-pass"
          onChange={(e) => setPhoneCheck(e.target.value)}
          type="number"
        />
        <div className="white-background">
          {phoneCheck.length >= 9 && phoneCheck.length <= 12 ? (
            <CheckOutlined className="accepted" />
          ) : (
            <div className="fake"></div>
          )}
        </div>
        <div
          className={
            phoneCheck.length >= 9 && phoneCheck.length <= 12
              ? "d-none"
              : "phone-check"
          }
        >
          Xin vui lòng nhập một số điện thoại hợp lệ.
        </div>
      </div>

      {phoneCheck.length >= 9 && phoneCheck.length <= 12 ? (
        <div>
          <div id="sign-in-button"></div>
          <button
            className="continue-pass"
            onClick={() => {
              handleSendOtp();
              dispatch(phoneNumberAction(phoneCheck));
            }}
          >
            Gửi qua SMS
          </button>
        </div>
      ) : (
        <button
          className={
            phoneCheck.length >= 9 && phoneCheck.length <= 12
              ? "continue-pass"
              : "stop-pass"
          }
        >
          Gửi qua SMS
        </button>
      )}
    </div>
  );
};
