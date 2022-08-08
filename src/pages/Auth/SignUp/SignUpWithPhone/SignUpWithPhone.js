import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import ReactInputVerificationCode from "react-input-verification-code";
import back from "../../../../assets/imgAuth/back-arrow.png";
import "./SignUpWithPhone.scss";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/exports";
import { phoneNumberSelector } from "../../../../stores/selectors/PhoneNumberSelector";
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
    box-shadow: none;
  }
`;
export const SignUpWithPhone = ({
  backLink,
  nextLink,
  onClickPop,
  onClickSignUp,
}) => {
  const phoneNum = useSelector(phoneNumberSelector);
  const [code, setCode] = useState("");
  const [flag, setFlag] = useState(true);
  const [isInvalid, setIsInvalid] = useState(true);
  const [next, setNext] = useState(false);
  const navigate = useNavigate();
  const [countDown, setCountDown] = useState(60);
  const handleCompletedCode = (data) => {
    window.confirmationResult
      .confirm(Number(data))
      .then((result) => {
        if (flag) {
          setCode(data);
          setIsInvalid(false);
          {
            onClickPop
              ? onClickPop(4)
              : onClickSignUp
              ? onClickSignUp(7)
              : navigate(nextLink);
          }
        } else if (!flag) {
          setCode(data);
          setIsInvalid(false);
          setNext(true);
        }
      })
      .catch((error) => {
        setCode(data);
        setIsInvalid(true);
        setFlag(false);
      });
  };
  useEffect(() => {
    if (phoneNum === "1") {
      navigate("/auth/sign-up");
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    let i = countDown;
    let timerId = setInterval(() => {
      setCountDown((countDown) => countDown - 1);
      --i;
      if (i <= 0) clearInterval(timerId);
    }, 1000);

    return () => clearInterval(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="SignUpWithPhone">
      <div className="header">
        {onClickPop ? (
          <button className="back-button-sign-up" onClick={() => onClickPop(2)}>
            <img alt="back" src={back} style={{ height: "16px" }} />
          </button>
        ) : onClickSignUp ? (
          <button
            className="back-button-sign-up"
            onClick={() => onClickSignUp(5)}
          >
            <img alt="back" src={back} style={{ height: "16px" }} />
          </button>
        ) : (
          <Link to={backLink}>
            <button className="back-button-sign-up">
              <img alt="back" src={back} style={{ height: "16px" }} />
            </button>
          </Link>
        )}
        <span>Xác minh số điện thoại</span>
      </div>
      <div className="noti-sign-up">
        Vui lòng nhập mã mà chúng tôi đã gửi qua tin nhắn SMS tới số{" "}
        {phoneNum.slice(0, 3)} *** ** {phoneNum.slice(-2)} :{" "}
      </div>
      <div className="verify-code-sign-up">
        <StyledReactInputVerificationCode isInvalid={isInvalid}>
          <ReactInputVerificationCode
            length={6}
            autoFocus={true}
            placeholder={""}
            onCompleted={(data) => {
              handleCompletedCode(data);
              setCode("");
            }}
          />
        </StyledReactInputVerificationCode>
      </div>
      {isInvalid && code.length === 6 ? (
        <div className="invalid-code">
          Rất tiếc, chúng tôi không thể xác minh mã số đó. <br></br> Vui lòng
          đảm bảo bạn nhập đúng mã số.
        </div>
      ) : (
        <div></div>
      )}
      {countDown ? (
        <div>Vui lòng chờ {countDown} giây để gửi lại mã</div>
      ) : (
        <div>
          Bạn không nhận được mã?{" "}
          <button
            className="send-code-again-sign-up"
            onClick={() => {
              setCountDown(60);
              let i = 60;
              let timerId = setInterval(() => {
                setCountDown((countDown) => countDown - 1);
                --i;
                if (i <= 0) clearInterval(timerId);
              }, 1000);

              return () => clearInterval(timerId);
            }}
          >
            Gửi lại
          </button>
        </div>
      )}
      {code.length === 6 && next ? (
        <div>
          {onClickPop ? (
            <button className="continue-sign-up" onClick={() => onClickPop(4)}>
              Tiếp tục
            </button>
          ) : onClickSignUp ? (
            <button
              className="continue-sign-up"
              onClick={() => onClickSignUp(7)}
            >
              Tiếp tục
            </button>
          ) : (
            <Link to={nextLink}>
              <button className="continue-sign-up">Tiếp tục</button>
            </Link>
          )}
        </div>
      ) : (
        <button className="stop-sign-up">Tiếp tục</button>
      )}
    </div>
  );
};
