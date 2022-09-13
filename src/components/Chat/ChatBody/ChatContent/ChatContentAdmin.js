import React from "react";
import "./ChatContent.scss";
import { useState } from "react";
import uploadLogo from "../../../../assets/Chat/Upload.png";
import { useSelector } from "react-redux";
import { updateMSelector } from "../../redux/selector/ChatSelector";
import { useEffect, useRef } from "react";
import { chatService } from "../../../../services/ChatService";
import { socket } from "../../../ConnectSocket/ConnectSocket";
import { UserMe } from "./ChatContent";
import moment from "moment";
export const ChatContentAdmin = React.memo(({ info }) => {
  const updateScroll = useSelector(updateMSelector);
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const typingTimeOutRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [flag, setFlag] = useState(true);
  const [id, setId] = useState(0);
  useEffect(() => {
    if (info) {
      (async () => {
        const res = await chatService.getMesVsAdmin(10, 1, info.id);
        setMessageList(res.data.data);
        setFlag(true);
      })();
      setId(info.id);
    }
  }, [info]);
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (flag) {
      scrollToBottom();
    }
  }, [messageList, updateScroll, flag]);
  const onInputChange = async (event) => {
    setMessage(event.target.value);
    socket.emit("typing_admin", {
      ConversationId: id,
      typing: true,
    });
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      socket.emit("typing_admin", {
        ConversationId: id,
        typing: false,
      });
    }, 1000);
  };
  const onEnterPress = async (e) => {
    if (e.keyCode === 13 && e.shiftKey === false && message.trim() !== "") {
      e.preventDefault();
      setMessage("");

      socket.emit("send_message_admin", {
        messageContent: {
          id: Math.random(),
          ConversationId: id,
          createdAt: moment().toISOString(),
          Content: message,
          Chatting: UserMe,
        },
        with: "user",
      });
    }
  };
  useEffect(() => {
    (async () => {
      const res = await chatService.getMessByConversationId(10, 1, id);
      setMessageList(res.data.data);
      setLoading(true);
      setFlag(true);
    })();
  }, []);
  useEffect(() => {
    socket.on("receive_message_admin", (data) => {
      if (data.messageContent.ConversationId === id) {
        setMessageList((list) => [...list, data.messageContent]);
        setFlag(true);
      } else {
        return false;
      }
    });

    socket.on("isTyping_admin", (data) => {
      if (data.ConversationId === id && data.typing === true) {
        scrollToBottom();
        setIsTyping(true);
      } else {
        setIsTyping(false);
      }
    });
  }, [socket, id]);
  return (
    <div className="ChatContent">
      <div className="ChatContent__header">
        <img
          alt="user"
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
          width={35}
          height={35}
        ></img>
        <div className="ChatContent__header__user">
          {/* <div>{chatInfo.PartnerId.PartnerName}</div> */}
        </div>
      </div>
      <div
        className="ChatContent__conversation "
        onScroll={async (e) => {
          if (e.target.scrollTop === 0 && hasMore) {
            setLoadMore(true);
            let { data } = await chatService.getMessByConversationId(
              10,
              Math.floor(messageList.length / 10) + 1,
              id
            );
            if (data.data.length !== 0) {
              let newMessageList = [...messageList];
              for (let i = 0; i < data.data.length; i++) {
                let filterMessageList = [...messageList];
                if (
                  filterMessageList.filter((itm) => itm.id === data.data[i].id)
                    .length === 0
                ) {
                  newMessageList.push(data.data[i]);
                }
              }
              setMessageList(newMessageList);
              setLoadMore(false);
              if (data.pagination.hasNextPage === false) {
                setHasMore(false);
                setLoadMore(false);
              }
            } else {
              setHasMore(false);
              setLoadMore(false);
            }
          }
        }}
      >
        {loading ? (
          <>
            {!hasMore && (
              <div className="ChatContent__conversation__no-more">
                Không còn tin nhắn nào nữa !
              </div>
            )}
            {loadMore && (
              <div className="ChatContent__conversation__loadmore">
                <div className="stage">
                  <div className="dot-pulse" />
                </div>
              </div>
            )}
            {messageList
              .sort((a, b) => {
                const a1 = /* new Date(a.createdAt) */ a.id;
                const b1 = /* new Date(b.createdAt) */ b.id;
                return a1 - b1;
              })
              .map((itm, index) => (
                <div
                  key={index}
                  className={
                    itm.Chatting === "Admin"
                      ? "ChatContent__conversation__other"
                      : "ChatContent__conversation__you"
                  }
                >
                  <div
                    className={
                      itm.Chatting === "Admin"
                        ? "ChatContent__conversation__other__content"
                        : "ChatContent__conversation__you__content"
                    }
                  >
                    {itm.Content}
                  </div>
                </div>
              ))}
            {isTyping && (
              <div>
                <div className="ChatContent__conversation__typing">
                  <div className="ChatContent__conversation__typing__content">
                    Booking Studio
                  </div>{" "}
                  <div className="dot-typing" />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <div className="ChatContent__conversation__loadmore">
              <div className="stage">
                <div className="dot-pulse" />
              </div>
            </div>
          </div>
        )}
        <div ref={messageEndRef}></div>
      </div>
      <div className="ChatContent__container">
        <div className="ChatContent__container__upload">
          <img alt="logochat" src={uploadLogo} width={30} height={30}></img>
        </div>
        <textarea
          className="ChatContent__container__current-message"
          rows={1}
          cols={3}
          data-kt-element="input"
          placeholder="Nhập..."
          value={message}
          onKeyDown={onEnterPress}
          onChange={onInputChange}
        ></textarea>
      </div>
    </div>
  );
});
