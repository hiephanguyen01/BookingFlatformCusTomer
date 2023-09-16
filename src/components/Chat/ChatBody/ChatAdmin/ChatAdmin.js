import React from "react";
import "./ChatAdmin.scss";
import moment from "moment";
import adminLogo from "../../../../assets/Chat/AdminUser.png";
import { useState, useEffect } from "react";
import { socket } from "../../../ConnectSocket/ConnectSocket";
import { chatService } from "../../../../services/ChatService";
import { useDispatch, useSelector } from "react-redux";
import { createConverAction } from "../../../../stores/actions/ChatAction";

moment().format();

export const ChatAdmin = ({
  toggleState,
  toggleClick,
  info,
  // setInfoChatAdmin,
  retrieveConversationMessages,
}) => {
  const UserMe = useSelector((state) => state.authenticateReducer?.currentUser);
  const [isRead, setIsRead] = useState(false);
  const [lastMessage, setLastMessage] = useState();
  const { notiMessage } = useSelector((state) => state.chatReducer);
  const dispatch = useDispatch();

  const createConversationIfNoneWereFound = async () => {
    const { data } = await chatService.createConversation(
      null,
      UserMe.id,
      true
    );
    socket.emit("joinChatRoom", {
      roomId: data?.payload?.id,
      memberId: UserMe?.id,
    });

    if (data.payload.appropriateResponseType === "create") {
      socket.emit("send_message_admin", {
        messageContent: {
          id: Math.random(),
          ConversationId: data.payload.id,
          createdAt: moment().toISOString(),
          Content: "Xin chào chúng tôi có thể giúp được gì cho bạn !",
          Chatting: UserMe,
          Type: "text",
        },
        From: "user",
        With: "admin",
      });
    }
    // retrieveConversationMessages(setInfoChatAdmin);
    retrieveConversationMessages();

    // Remove this ConversationId out of notiMessage in Redux
    dispatch({ type: "REMOVE_NOTIFY_MESS", payload: data.payload.id });
    await chatService.readMessage(data.payload.id);

    //*******************************************************

    dispatch(createConverAction(data?.payload?.id));
  };

  useEffect(() => {
    if (info?.newestMessage) {
      if (info?.newestMessage.UserId !== -1) {
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
            UserId: -1,
            PartnerId: -1,
            AdminId: data.messageContent.AdminId,
            IsRead: false,
            createdAt: data.messageContent.createdAt,
            id: data.messageContent.id,
            updatedAt: data.messageContent.createdAt,
            Type: data.messageContent.Type,
          });
        } else {
          setLastMessage({
            Content: data.messageContent.Content,
            ConversationId: data.messageContent.ConversationId,
            UserId: info.Chatter.id,
            PartnerId: -1,
            AdminId: data.messageContent.AdminId,
            IsRead: false,
            createdAt: data.messageContent.createdAt,
            id: data.messageContent.id,
            updatedAt: data.messageContent.createdAt,
            Type: data.messageContent.Type,
          });
        }
      } else {
        return false;
      }
    });
  }, [info]);

  return (
    <div
      className={toggleState === 1000000 ? "User  User__current " : "User "}
      onClick={async () => {
        //Create conversation in ConversationUser table
        if (socket) {
          createConversationIfNoneWereFound();
        }
        //**************************** */

        toggleClick(1000000);
        setIsRead(true);
        if (lastMessage?.UserId === -1 && lastMessage?.IsRead === false) {
          (async () => {
            await chatService.readMessageAdmin(lastMessage.id);
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
            (lastMessage.UserId !== -1 ? (
              <div
                className="w-100 d-flex justify-content-between"
                style={{
                  color: notiMessage.includes(info.id) ? "#828282" : "#000",
                  fontSize: "13px",
                  fontWeight: isRead ? 500 : 700,
                }}
              >
                <div>
                  Bạn:{" "}
                  {lastMessage?.Type === "text" ? (
                    <>
                      {lastMessage.Content.toString().length <= 9
                        ? lastMessage.Content
                        : `${lastMessage.Content.toString().slice(0, 9)}...`}
                    </>
                  ) : (
                    <>Ảnh</>
                  )}
                </div>
                <div>{moment(lastMessage?.createdAt).format("HH:mm")}</div>
              </div>
            ) : (
              <div
                className="w-100 d-flex justify-content-between"
                style={{
                  color: notiMessage.includes(info.id) ? "#828282" : "#000",
                  fontSize: "13px",
                  fontWeight: isRead ? 500 : 700,
                }}
              >
                <div>
                  Admin:{" "}
                  {lastMessage?.Type === "text" ? (
                    <>
                      {lastMessage.Content.toString().length <= 12
                        ? lastMessage.Content
                        : `${lastMessage.Content.toString().slice(0, 12)}...`}
                    </>
                  ) : (
                    <>Ảnh</>
                  )}
                </div>
                <div>{moment(lastMessage?.createdAt).format("HH:mm")}</div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
