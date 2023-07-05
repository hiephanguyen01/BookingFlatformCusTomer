import { CloseCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import ReactInputVerificationCode from "react-input-verification-code";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { studioPostService } from "../../../services/StudioPostService";
import { HIDE_MODAL } from "../../../stores/types/modalTypes";
import styles from "./SignUpWithPhone.module.scss";
const StyledReactInputVerificationCode = styled.div`
  display: flex;
  justify-content: center;

  --ReactInputVerificationCode-itemWidth: 58px;
  --ReactInputVerificationCode-itemHeight: 58px;
  --ReactInputVerificationCode-itemSpacing: 27px;

  .ReactInputVerificationCode__item {
    font-size: 16px;
    font-weight: 500;
    color: ${({ isInvalid }) => (isInvalid ? "#e22828" : "#000")};
    background: #fff;
    border: 1px solid
      ${({ isInvalid }) => (isInvalid ? "#EF6C65" : "rgba(28, 30, 60, 0.4)")};
    border-radius: 4px;
    margin-top: 20px;
  }
`;
const cx = classNames.bind(styles);
export const VerifyOtp = ({ setValid, email }) => {
  const user = useSelector((state) => state.authenticateReducer.currentUser);
  const [value, setValue] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [countDown, setCountDown] = React.useState(60);
  const dispatch = useDispatch();
  // useEffect(() => {
  //   let timerId = setInterval(() => {
  //     setCountDown((countDown) => countDown - 1);
  //   }, 1000);
  //   if (countDown <= 0) {
  //     clearInterval(timerId);
  //     return;
  //   }
  //   return () => clearInterval(timerId);
  // }, [countDown]);

  useEffect(() => {
    let timerId = setInterval(() => {
      setCountDown((countDown) => countDown - 1);
    }, 1000);
    if (countDown <= 0) {
      clearInterval(timerId);

      return;
    }
    return () => {
      clearInterval(timerId);
    };
  }, [countDown]);

  const hanleChange = (data) => {
    // setValue(data);
    setIsInvalid(false);
  };

  const onSubmit = async () => {
    try {
      setValid(true);
      const { data } = await studioPostService.verifyCodeEmail({
        VerifyCode: value,
        UserId: user?.id || undefined,
        Email: email,
        isUpdate: true,
      });
      dispatch({ type: HIDE_MODAL });
      if (!user) {
        localStorage.setItem("access_token", data.token);
        dispatch({ type: HIDE_MODAL });
      }
      setValue("");
    } catch (error) {
      setIsInvalid(true);
      setValid(false);
    }
  };

  return (
    <div className={cx("container")}>
      <CloseCircleOutlined
        className={cx("close")}
        onClick={() => {
          dispatch({ type: HIDE_MODAL });
          setCountDown(60);
          setValue("");
        }}
      />
      <h2>Verify Your Account</h2>
      <p>
        We emailed you the six digit code to{" "}
        <span style={{ color: "green", fontWeight: "bold" }}>{email} </span>
        <br /> Enter the code below to confirm your email address.
      </p>
      <StyledReactInputVerificationCode isInvalid={isInvalid}>
        <ReactInputVerificationCode
          length={6}
          autoFocus
          placeholder=""
          disabled
          onChange={() => hanleChange()}
          onCompleted={(e) => setValue(e)}
          value={value}
          type="number"
        />
      </StyledReactInputVerificationCode>
      <div className={cx("bottom")}>
        {countDown > 0 ? (
          <div style={{ textAlign: "left" }}>
            Vui lòng chờ {countDown} giây để gửi lại mã
          </div>
        ) : (
          <div style={{ textAlign: "left" }}>
            Bạn không nhận được mã?{" "}
            <button
              className={cx("send-code-again-sign-up")}
              onClick={async () => {
                try {
                  setCountDown(60);
                  await studioPostService.sendCodeEmail({
                    Email: email,
                    UserId: user?.id || undefined,
                  });
                } catch (error) {}
              }}>
              Gửi lại
            </button>
          </div>
        )}
        <div>
          {value.length === 6 ? (
            <Button
              onClick={() => onSubmit()}
              loading={false}
              size="large"
              className={cx("continue-sign-up")}>
              Tiếp tục
            </Button>
          ) : (
            <Button
              onClick={() => onSubmit()}
              loading={false}
              disabled
              size="large"
              className={cx("continue-sign-up")}>
              Tiếp tục
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
