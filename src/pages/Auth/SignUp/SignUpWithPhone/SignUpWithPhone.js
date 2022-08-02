import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import ReactInputVerificationCode from "react-input-verification-code";
import back from "../../../../assets/imgAuth/back-arrow.png";
import "./SignUpWithPhone.scss";
import { Link, useNavigate } from "react-router-dom";
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
export const SignUpWithPhone = ({ backLink, nextLink }) => {
  const phoneNum = "0965026910";
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
        const user = result.user;
        console.log(JSON.stringify(user));
        if (flag) {
          setCode(data);
          setIsInvalid(false);
          navigate(nextLink);
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
    <>
      <div className="header">
        <Link to={backLink}>
          <button className="back-button-sign-up">
            <img alt="back" src={back} style={{ height: "16px" }} />
          </button>
        </Link>
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
        <Link to={nextLink}>
          <button className="continue-sign-up">Tiếp tục</button>
        </Link>
      ) : (
        <button className="stop-sign-up">Tiếp tục</button>
      )}
    </>
  );
};
