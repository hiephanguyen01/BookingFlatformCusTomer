import React from "react";
import "./ChatContent.scss";
import { useState } from "react";
import uploadLogo from "../../../../assets/Chat/Upload.png";
import { useSelector } from "react-redux";
import { updateMSelector } from "../../redux/selector/ChatSelector";
import { useEffect, useRef } from "react";
import { chatService } from "../../../../services/ChatService";
import { socket } from "../../../ConnectSocket/ConnectSocket";
import moment from "moment";
export const UserMe = {
  id: 5,
  Username: "3871952632888744",
  Image: "b953bcbb-96f8-4dc2-8b5d-9f9b895d0def",
  Email: "anhsaobanga21@gmail.com",
  Fullname: "Toàn Nguyễn",
  Phone: "0909005001",
};
/* export const UserMe = {
  id: 6,
  Username: "hoanganhnguyen96kt@gmail.com",
  Image: "15bc1346-7c8b-4844-b9b6-9d39cba1a7f4",
  Email: "anhsaobanga21@gmail.com",
  Fullname: "Nguyeh Hoanganh",
  Phone: "",
}; */
export const ChatContent = React.memo(({ chatInfo }) => {
  const updateScroll = useSelector(updateMSelector);
  const { id } = chatInfo;
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const typingTimeOutRef = useRef(null);
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadMore, setLoadMore] = useState(false);
  const [flag, setFlag] = useState(true);
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
    socket.emit("typing", {
      ConversationId: id,
      typing: true,
    });
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current);
    }
    typingTimeOutRef.current = setTimeout(() => {
      socket.emit("typing", {
        ConversationId: id,
        typing: false,
      });
    }, 1000);
  };
  const onEnterPress = async (e) => {
    if (e.keyCode === 13 && e.shiftKey === false && message.trim() !== "") {
      e.preventDefault();
      setMessage("");
      socket.emit("send_message", {
        id: Math.random(),
        ConversationId: id,
        createdAt: moment().toISOString(),
        Content: message,
        Chatting: UserMe,
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
    socket.on("receive_message", (data) => {
      if (data.ConversationId === id) {
        setMessageList((list) => [...list, data]);
        setFlag(true);
      } else {
        return false;
      }
    });
    socket.on("isTyping", (data) => {
      if (data.ConversationId === id && data.typing === true) {
        setIsTyping(true);
        scrollToBottom();
      } else {
        setIsTyping(false);
      }
    });
  }, [socket]);
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
          <div>{chatInfo.PartnerId.PartnerName}</div>
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
              setFlag(false);
              if (data.pagination.hasNextPage === false) {
                setHasMore(false);
                setLoadMore(false);
                setFlag(false);
              }
            } else {
              setHasMore(false);
              setLoadMore(false);
              setFlag(false);
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
                    itm.Chatting.PartnerName !== undefined
                      ? "ChatContent__conversation__other"
                      : "ChatContent__conversation__you"
                  }
                >
                  <div
                    className={
                      itm.Chatting.PartnerName !== undefined
                        ? "ChatContent__conversation__other__content"
                        : "ChatContent__conversation__you__content"
                    }
                  >
                    {itm.Content}
                  </div>
                </div>
              ))}
            {isTyping && (
              <div className="ChatContent__conversation__typing">
                <div className="stage1">
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
