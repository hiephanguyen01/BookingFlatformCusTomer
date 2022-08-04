import { Modal } from "antd";
import React, { useState } from "react";
import { UserAuth } from "../AuthContext/AuthContext";
import { SignIn } from "../SignIn/SignIn";
import "./PopUpSignIn.scss";
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
  const { user } = UserAuth();
  return (
    <div className="PopUpSignIn">
      <span
        onClick={user ? () => onClick() : () => setVisible(true)}
        className={className ? className : "pop-up-sign-in-button"}
        style={style}
      >
        {children}
      </span>
      {!user && (
        <Modal
          centered
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          footer={false}
          width={500}
        >
          <div className="warning">Bạn cần phải đăng nhập !</div>
          <SignIn header={false} shouldRedirect={true}></SignIn>
        </Modal>
      )}
    </div>
  );
};

export default PopUpSignIn;
