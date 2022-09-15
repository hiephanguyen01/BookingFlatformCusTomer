import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import ChatIcon from "../../assets/Chat/ChatIcon.png";
import ChatIconNoti from "../../assets/Chat/ChatIconNoti.png";
import "./Chat.scss";
import { ChatBody } from "./ChatBody/ChatBody";/* 
import PopUpSignIn from "../../pages/Auth/PopUpSignIn/PopUpSignIn"; */
import { getOnlinePartner,getOfflinePartner } from "../../stores/actions/OnlineAction";
import { socket } from "../ConnectSocket/ConnectSocket";
import { useDispatch, useSelector } from "react-redux";
import { UserMe } from "./ChatBody/ChatContent/ChatContent";
import { closeConversationSelector } from "../../stores/selector/ChatSelector";
const Chat = () => {
  const closeConversation = useSelector(closeConversationSelector)
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false);
  const [notiMessage /* , setNotiMessage */] = useState(0);
  const showLargeDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  useEffect(() => {
    socket.emit("login_user", {
      userId: UserMe.id,
    });
    socket.on('online_partner', (partner) => {
      dispatch(getOnlinePartner(partner))
    })
    socket.on('offline_partner', (partner) => {
      dispatch(getOfflinePartner(partner))
    })
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket])
  useEffect(()=>{
    setVisible(false);
  },[closeConversation])
  return (
    <div>
      <div
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
      </div>
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
