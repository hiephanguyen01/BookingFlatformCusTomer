import { Modal } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import { ForgotPassword } from "../SignIn/FogotPassword/ForgotPassword";
import { SignIn } from "../SignIn/SignIn";
import { SetPassword } from "../SignUp/SetPassword/SetPassword";
import { SignUp } from "../SignUp/SignUp";
import { SignUpWithPhone } from "../SignUp/SignUpWithPhone/SignUpWithPhone";
import "./PopUpSignIn.scss";
import { useNavigate } from "react-router-dom";
//Read before Using
// Warp your Component,Text inside PopUpSignIn
// Write your logic Onlick in PopUpSignIn component
//Change className,style as you wish
/////////////////////////////////////////////////
//Example
// <PopUpSignIn onClick={()=> yourFunction() className='' style={{}}>
// <YourComponent/>
// </PopUpSignIn>
//////////////////////////////////////////////////

const PopUpSignIn = ({ children, className, style, onClick }) => {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const user = useSelector((state) => state.authenticateReducer.currentUser);

  return (
    <div className="PopUpSignIn">
      <span
        onClick={user ? () => onClick() : () => setVisible(true)}
        className={className ? className : "pop-up-sign-in-button"}
        style={style}
      >
        {children}
      </span>

      {user ? (
        <div></div>
      ) : (
        <div>
          {page === 1 ? (
            <Modal
              centered
              className="pupmodal"
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              footer={false}
              width={400}
            >
              <SignIn onClickPop={(e) => setPage(e)}></SignIn>
            </Modal>
          ) : page === 2 ? (
            <Modal
              centered
              className="pupmodal"
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              footer={false}
              width={400}
            >
              <ForgotPassword onClickPop={(e) => setPage(e)} />
            </Modal>
          ) : page === 3 ? (
            <Modal
              centered
              className="pupmodal"
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              footer={false}
              width={400}
            >
              <SignUpWithPhone
                backLink=""
                nextLink=""
                onClickPop={(e) => setPage(e)}
              ></SignUpWithPhone>
            </Modal>
          ) : page === 4 ? (
            <Modal
              centered
              className="pupmodal"
              closable={false}
              visible={visible}
              footer={false}
              width={400}
              confirm={true}
            >
              <SetPassword
                backLink=""
                nextLink=""
                header="Đặt lại mật khẩu"
                submit="Đặt lại mật khẩu"
                onClickPop={(e) => {
                  setPage(e);
                }}
              ></SetPassword>
            </Modal>
          ) : page === 5 ? (
            <Modal
              centered
              className="pupmodal"
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              footer={false}
              width={400}
            >
              <SignUp onClickSignUp={(e) => setPage(e)}></SignUp>
            </Modal>
          ) : page === 6 ? (
            <Modal
              centered
              className="pupmodal"
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              footer={false}
              width={400}
            >
              <SignUpWithPhone
                backLink=""
                nextLink=""
                onClickSignUp={(e) => setPage(e)}
              ></SignUpWithPhone>
            </Modal>
          ) : page === 7 ? (
            <Modal
              centered
              className="pupmodal"
              closable={false}
              visible={visible}
              header={false}
              footer={false}
              width={400}
              confirm={true}
            >
              <SetPassword
                backLink=""
                nextLink=""
                header="Thiết lập mật khẩu"
                submit="Đăng ký"
                onClickSignUp={(e) => {
                  setPage(e);
                }}
              ></SetPassword>
            </Modal>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default PopUpSignIn;
