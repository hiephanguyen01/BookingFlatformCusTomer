import { Modal } from "antd";
import React, { useState} from "react";
import { UserAuth } from "../AuthContext/AuthContext";
import { ForgotPassword } from "../SignIn/FogotPassword/ForgotPassword";
import { SignIn } from "../SignIn/SignIn";
import { SignUp } from "../SignUp/SignUp";
import { SetPassword } from "../SignUp/SetPassword/SetPassword";
import { SignUpWithPhone } from "../SignUp/SignUpWithPhone/SignUpWithPhone";
import "./PopUpSignIn.scss";
import { useSelector } from "react-redux/es/exports";
import { confirmPassSelector } from "../../../stores/selectors/PhoneNumberSelector";
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
  const selector = useSelector(confirmPassSelector);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);
  const { user } = UserAuth();
  return (
    <div className="PopUpSignIn">
      <span
        onClick={user && selector ? () => onClick() : () => setVisible(true)}
        className={className ? className : "pop-up-sign-in-button"}
        style={style}
      >
        {children}
      </span>

      {user && selector ? (
        <div></div>
      ) : (
        <div>
          {page === 1 ? (
            <Modal
              centered
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              footer={false}
              width={500}
            >
              <SignIn
                shouldRedirect={true}
                onClickPop={(e) => setPage(e)}
              ></SignIn>
            </Modal>
          ) : page === 2 ? (
            <Modal
              centered
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              footer={false}
              width={500}
            >
              <ForgotPassword onClickPop={(e) => setPage(e)} />
            </Modal>
          ) : page === 3 ? (
            <Modal
              centered
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              footer={false}
              width={500}
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
              closable={false}
              visible={visible}
              footer={false}
              width={500}
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
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              footer={false}
              width={500}
            >
              <SignUp
                shouldRedirect={true}
                onClickSignUp={(e) => setPage(e)}
              ></SignUp>
            </Modal>
          ) : page === 6 ? (
            <Modal
              centered
              visible={visible}
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              footer={false}
              width={500}
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
              closable={false}
              visible={visible}
              header={false}
              footer={false}
              width={500}
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
