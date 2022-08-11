import { CheckOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import back from "../../../../assets/imgAuth/back-arrow.png";
import vietnam from "../../../../assets/imgAuth/vietnam.png";
import { handleSendOtp } from "../../../../stores/actions/autheticateAction";
import "./ForgotPassword.scss";
export const ForgotPassword = ({ onClickPop }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [phoneCheck, setPhoneCheck] = useState("");
  const handleSendSMS = () => {
    if (phoneCheck.length >= 9 && phoneCheck.length <= 12) {
      dispatch(
        handleSendOtp(
          phoneCheck,
          navigate,
          "/auth/sign-in/forgot-password/phone",
          onClickPop,
          3
        )
      );
    }
  };
  return (
    <div className="ForgotPass">
      <div className="header">
        {onClickPop ? (
          <button
            className="back-button-forgot-pass"
            onClick={() => onClickPop(1)}>
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
        style={{ marginBottom: "40px" }}
        className={
          phoneCheck.length >= 9 && phoneCheck.length <= 12
            ? "phone-zone-forgotpass"
            : "invalid-phone"
        }>
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
        <div id="sign-in-button"></div>
        <div
          className={
            phoneCheck.length >= 9 && phoneCheck.length <= 12
              ? "d-none"
              : "phone-check"
          }>
          Xin vui lòng nhập một số điện thoại hợp lệ.
        </div>
      </div>

      <Button
        style={{ width: "100%" }}
        size="large"
        type="primary"
        disabled={phoneCheck.length < 9 || phoneCheck.length > 12}
        onClick={() => handleSendSMS()}>
        Gửi qua SMS
      </Button>
    </div>
  );
};
