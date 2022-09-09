import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import ChatIcon from "../../assets/Chat/ChatIcon.png";
import ChatIconNoti from "../../assets/Chat/ChatIconNoti.png";
import "./Chat.scss";
import { ChatBody } from "./ChatBody/ChatBody";
import PopUpSignIn from "../../pages/Auth/PopUpSignIn/PopUpSignIn";/* 
import userEvent from "@testing-library/user-event";
import { socket } from "../ConnectSocket/ConnectSocket"; */
const Chat = () => {
  const [visible, setVisible] = useState(false);
  const [notiMessage /* , setNotiMessage */] = useState(0);
  const showLargeDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <div>
      <PopUpSignIn
        onClick={showLargeDrawer}
        className={notiMessage ? "Chat__noti-message Chat" : "Chat"}
      >
        {notiMessage ? (
          <div className="Chat__noti-message__count">
            {notiMessage > 0 && notiMessage <= 10 ? notiMessage : "10+"}
          </div>
        ) : (
          <div></div>
        )}
        <img
          alt="chatIcon"
          src={notiMessage ? ChatIconNoti : ChatIcon}
          className="Chat__icon"
        ></img>
        Chat
      </PopUpSignIn>
      <Drawer placement="right" width={750} onClose={onClose} visible={visible}>
        <div className="Chat__container__header">
          <div className="Chat__container__header__left">
            <img alt="chatIcon" src={ChatIcon} className="Chat__icon"></img>
            Chat
          </div>
        </div>
        <div className="Chat__container__body">
          <ChatBody />
        </div>
      </Drawer>
    </div>
  );
};
export default Chat;
