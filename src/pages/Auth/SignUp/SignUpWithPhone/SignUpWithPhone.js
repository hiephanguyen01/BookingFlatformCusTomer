import React from "react";
import { useState } from "react";
import styled from "styled-components";
import ReactInputVerificationCode from "react-input-verification-code";
import back from "../../../../assets/imgAuth/back-arrow.png";
import "./SignUpWithPhone.scss";
import { Link } from "react-router-dom";
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
export const SignUpWithPhone = ({backLink,nextLink}) => {
  const phoneNum = "0965026910";
  const [code, setCode] = useState("");
  const [waitForCode /* , setWaitForCode */] = useState(false);
  const [isInvalid,setIsInvalid] = useState(true)
 
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
            setCode(data);
            setIsInvalid(false)
          }}
        />
      </StyledReactInputVerificationCode>
        
      </div>
      {waitForCode ? (
        <div>Vui lòng chờ ... giây để gửi lại mã</div>
      ) : (
        <div>
          Bạn không nhận được mã?{" "}
          <button className="send-code-again-sign-up">Gửi lại</button>
        </div>
      )}
      {code.length === 6? (<Link to={nextLink}>
        <button
          className= "continue-sign-up" 
        >
          Tiếp tục
        </button>
        </Link>):( <button
          className= "stop-sign-up" 
        >
          Tiếp tục
        </button>)}
    </>
  );
};
