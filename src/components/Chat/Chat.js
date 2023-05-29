import React, { useEffect, useState } from "react";
import { Drawer } from "antd";
import ChatIcon from "../../assets/Chat/ChatIcon.png";
import ChatIconNoti from "../../assets/Chat/ChatIconNoti.png";
import "./Chat.scss";
import { ChatBody } from "./ChatBody/ChatBody"; /* 
import PopUpSignIn from "../../pages/Auth/PopUpSignIn/PopUpSignIn"; */
import {
  getOnlinePartner,
  getOfflinePartner,
  getOnlineAdmin,
  getOfflineAdmin,
} from "../../stores/actions/OnlineAction";
import { socket } from "../ConnectSocket/ConnectSocket";
import { useDispatch, useSelector } from "react-redux";
import { closeConversationSelector } from "../../stores/selector/ChatSelector";
import { SHOW_CHAT } from "../../stores/types/messType";
import Draggable from "react-draggable";

const Chat = () => {
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);
  const { showChat } = useSelector((state) => state.chatReducer);
  const closeConversation = useSelector(closeConversationSelector);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [notiMessage, setNotiMessage] = useState(0);
  // const showLargeDrawer = () => {
  //   setVisible(true);
  // };
  // const onClose = () => {
  //   setVisible(false);
  // };

  useEffect(() => {
    const socketListenerEvent = (typeOfUser, receivedMessage, status) => {
      switch (typeOfUser) {
        case "partner":
          if (status === "online") {
            dispatch(getOnlinePartner(receivedMessage));
          } else {
            dispatch(getOfflinePartner(receivedMessage));
          }
          break;
        case "admin":
          if (status === "online") {
            dispatch(getOnlineAdmin(receivedMessage));
          } else {
            dispatch(getOfflineAdmin(receivedMessage));
          }
          break;
      }
    };

    socket.emit("login_user", {
      userId: UserMe.id,
    });

    socket.on("online_partner", (partner) =>
      socketListenerEvent("partner", partner, "online")
    );
    socket.on("offline_partner", (partner) =>
      socketListenerEvent("partner", partner, "offline")
    );
    socket.on("online_admin", (admin) =>
      socketListenerEvent("admin", admin, "online")
    );
    socket.on("offline_admin", (admin) =>
      socketListenerEvent("admin", admin, "offline")
    );

    return () => {
      socket.off("online_partner", (partner) =>
        socketListenerEvent("partner", partner, "online")
      );
      socket.off("offline_partner", (partner) =>
        socketListenerEvent("partner", partner, "offline")
      );
      socket.off("online_admin", (admin) =>
        socketListenerEvent("admin", admin, "online")
      );
      socket.off("offline_admin", (admin) =>
        socketListenerEvent("admin", admin, "offline")
      );
    };
  }, [socket]);
  useEffect(() => {
    setVisible(false);
  }, [closeConversation]);

  return (
    <div>
      <Draggable axis="y">
        <div
          onClick={() => dispatch({ type: SHOW_CHAT })}
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
      </Draggable>
      <Drawer
        placement="right"
        width={750}
        onClose={() => dispatch({ type: SHOW_CHAT })}
        open={showChat}
      >
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
