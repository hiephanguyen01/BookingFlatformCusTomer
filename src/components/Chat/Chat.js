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
import { chatService } from "../../services/ChatService";
import { getConversationIdForChat } from "../../stores/actions/ChatAction";

const Chat = () => {
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);
  const { showChat, notiMessage } = useSelector((state) => state.chatReducer);
  const closeConversation = useSelector(closeConversationSelector);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [conversationIds, setConversationIds] = useState([]);

  useEffect(() => {
    const getAllConversationId = async () => {
      if (UserMe) {
        const { data } = await chatService.getConversation(
          null,
          1,
          UserMe.id,
          1
        );
        if (data) {
          const uniq = [
            ...new Set([
              ...conversationIds,
              ...data.data.filter((val) => val !== null).map((item) => item.id),
            ]),
          ];
          setConversationIds([...uniq]);
        }
      }
    };
    const getTotalAmountOfConversationHasNewMess = async () => {
      const { data } = await chatService.getTotalAmountOfConversationHasNewMess(
        UserMe.id,
        "User"
      );
      data.payload.forEach((val) => {
        dispatch({
          type: "ADD_NOTIFY_MESS",
          payload: val,
        });
      });
    };
    getAllConversationId();
    getTotalAmountOfConversationHasNewMess();
  }, []);

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

    if (socket) {
      socket.emit("login_user", {
        userId: UserMe.id,
      });

      // *** Check for online user features ***
      //Will available in future
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
      // *** *** *** *** *** *** *** *** *** ***
    }
    return () => {
      if (socket) {
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
        socket.off("receive_message_admin", (message) => {
          const { ConversationId } = message.messageContent;
          if (ConversationId) {
            dispatch({ type: "ADD_NOTIFY_MESS", payload: ConversationId });
          }
        });
        socket.off("receive_message", (message) => {
          const { ConversationId } = message.messageContent;
          if (ConversationId) {
            dispatch({ type: "ADD_NOTIFY_MESS", payload: ConversationId });
          }
        });
      }
    };
  }, [socket]);
  useEffect(() => {
    // Listen to event which request this user to join room from admin every time an order's payment status was changed into "Đã cọc"
    // or "Đã thanh toán"
    socket.on(
      "requestUserAndPartnerJoinRoom",
      ({ roomId, userId, partnerId }) => {
        if (userId === UserMe?.id) {
          socket.emit("joinChatRoom", { roomId, userId, partnerId: null });
        }
      }
    );

    socket.on("receive_message_admin", (message) => {
      const { ConversationId, Chatting } = message?.messageContent;
      if (
        // conversationIds?.length > 0 &&
        ConversationId &&
        conversationIds.includes(ConversationId) &&
        Chatting.id !== UserMe.id
      ) {
        dispatch({
          type: "ADD_NOTIFY_MESS",
          payload: ConversationId,
        });
      }
    });
    socket.on("receive_message", (message) => {
      const { ConversationId, Chatting } = message;
      if (
        ConversationId &&
        conversationIds.includes(ConversationId) &&
        Chatting.id !== UserMe.id
      ) {
        dispatch({
          type: "ADD_NOTIFY_MESS",
          payload: ConversationId,
        });
      }
    });
  });
  useEffect(() => {
    setVisible(false);
  }, [closeConversation]);

  return (
    <div>
      <Draggable axis="y">
        <div
          onClick={() => dispatch({ type: SHOW_CHAT })}
          className={
            notiMessage.length > 0 ? "Chat__noti-message Chat" : "Chat"
          }
        >
          {notiMessage.length > 0 ? (
            <div className="Chat__noti-message__count">
              {notiMessage.length > 0 && notiMessage.length <= 10
                ? notiMessage.length
                : "10+"}
            </div>
          ) : (
            <div></div>
          )}
          <img
            alt="chatIcon"
            src={notiMessage.length > 0 ? ChatIconNoti : ChatIcon}
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
