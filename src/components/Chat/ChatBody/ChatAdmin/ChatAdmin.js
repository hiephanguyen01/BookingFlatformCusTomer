import React from "react";
import "./ChatAdmin.scss";
import moment from "moment";
import adminLogo from "../../../../assets/Chat/AdminUser.png";
import { useState, useEffect } from "react";
import { socket } from "../../../ConnectSocket/ConnectSocket";
import { chatService } from "../../../../services/ChatService";
export const ChatAdmin = React.memo(({ toggleState, toggleClick, info }) => {
  const [isRead, setIsRead] = useState(false);
  const [lastMessage, setLastMessage] = useState();
  useEffect(() => {
    if (info?.newestMessage) {
      if (info?.newestMessage.CustomerId !== -1) {
        setIsRead(true);
      } else {
        setIsRead(info?.newestMessage.IsRead);
      }
      setLastMessage(info?.newestMessage);
    }
  }, [info]);
  useEffect(() => {
    socket.on("receive_message_admin", (data) => {
      if (data.messageContent.ConversationId === info?.id) {
        if (data.messageContent.Chatting === "Admin") {
          setIsRead(false);
          setLastMessage({
            Content: data.messageContent.Content,
            ConversationId: data.messageContent.ConversationId,
            CustomerId: -1,
            PartnerId: -1,
            IsRead: false,
            createdAt: data.messageContent.createdAt,
            id: data.messageContent.id,
            updatedAt: data.messageContent.createdAt,
          });
        } else {
          setLastMessage({
            Content: data.messageContent.Content,
            ConversationId: data.messageContent.ConversationId,
            CustomerId: info.Chatter.id,
            PartnerId: -1,
            IsRead: false,
            createdAt: data.messageContent.createdAt,
            id: data.messageContent.id,
            updatedAt: data.messageContent.createdAt,
          });
        }
      } else {
        return false;
      }
    });
  }, [socket, info]);
  return (
    <div
      className={toggleState === 1000000 ? "User  User__current " : "User "}
      onClick={() => {
        toggleClick(1000000);
        setIsRead(true);
        if (lastMessage.CustomerId === -1 && lastMessage.IsRead === false) {
          (async () => {
            const res = await chatService.readMessageAdmin(lastMessage.id);
            console.log("res", res);
          })();
        }
      }}
    >
      <div className="d-flex flex-row w-100 px-6 align-items-center h-100">
        <div className="d-flex align-items-center h-100">
          <img
            src={adminLogo}
            alt="avatar"
            className="d-flex align-self-center me-10"
            width={40}
          />
        </div>
        <div className="py-2 h-100 w-100 d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-between align-items-center h-100">
            <p className="User__name">Booking Studio</p>
          </div>
          {lastMessage &&
            (lastMessage.CustomerId !== -1 ? (
              <div
                className="w-100 d-flex justify-content-between"
                style={{ color: "#828282", fontSize: "13px" }}
              >
                <div>
                  Bạn:{" "}
                  {lastMessage.Content.toString().length <= 9
                    ? lastMessage.Content
                    : `${lastMessage.Content.toString().slice(0, 9)}...`}
                </div>
                <div>{moment(lastMessage.createdAt).format("HH:mm")}</div>
              </div>
            ) : (
              <div
                className="w-100 d-flex justify-content-between"
                style={{
                  color: isRead ? "#828282" : "#000",
                  fontSize: "13px",
                  fontWeight: isRead ? 500 : 700,
                }}
              >
                <div>
                  {lastMessage.Content.toString().length <= 12
                    ? lastMessage.Content
                    : `${lastMessage.Content.toString().slice(0, 12)}...`}
                </div>
                <div>{moment(lastMessage.createdAt).format("HH:mm")}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
});
