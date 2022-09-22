import React from "react";
import "./ChatContent.scss";
import { useState } from "react";
import uploadLogo from "../../../../assets/Chat/Upload.png";
import { useSelector } from "react-redux";
import { updateMSelector } from "../../../../stores/selector/ChatSelector";
import { useEffect, useRef } from "react";
import { chatService } from "../../../../services/ChatService";
import { socket } from "../../../ConnectSocket/ConnectSocket";
import { UserMe } from "./ChatContent";
import adminLogo from "../../../../assets/Chat/AdminUser.png";
import moment from "moment";
import UploadImage from "../../../../components/UploadImage";
import { PictureOutlined, CloseCircleOutlined } from "@ant-design/icons";
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
  const [files, setFiles] = useState([]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
  const onChangeFile = (e) => {
    const newFiles = [...files];
    const fileList = e.target.files;
    for (let file of fileList) {
      if (
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "video/mp4" ||
        file.type === "video/x-m4v"
      ) {
        file.preview = URL.createObjectURL(file);
        newFiles.push(file);
      }
    }
    setFiles([...newFiles]);
    scrollToBottom();
    console.log(newFiles);
  };
  const handleRemoveImage = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles([...newFiles]);
  };
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
        <div className="d-flex">
          <img alt="user" src={adminLogo} width={35} height={35}></img>
          <div className="ChatContent__header__user">Booking Studio</div>
        </div>
      </div>
      <div
        className="ChatContent__conversation"
        style={{ height: files.length === 0 ? "320px" : "250px" }}
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
      <div
        className="ChatContent__container"
        style={{ height: files.length === 0 ? "70px" : "140px" }}
      >
        <div className="ChatContent__container__upload">
          <UploadImage
            onChangeFile={onChangeFile}
            style={{
              width: "30px",
              height: "30px",
              
            }}
            multiple={true}
          >
            <PictureOutlined style={{ color: "#1FCBA2", fontSize: "30px" }} />
          </UploadImage>
        </div>
        <div className="ChatContent__container__send">
          <div className="pic-review">
            {files &&
              files.map((item, index) => (
                <div
                  key={index}
                  style={{
                    position: "relative",
                    width: "40px",
                    marginLeft: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    alt=""
                    src={item.preview}
                    className="w-40px h-40px"
                    style={{
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                  <CloseCircleOutlined
                    className="btn_close"
                    style={{ color: "#fff" }}
                    onClick={() => handleRemoveImage(index)}
                  />
                </div>
              ))}
          </div>
          <textarea
            className="ChatContent__container__send__current-message"
            rows={1}
            cols={3}
            data-kt-element="input"
            placeholder="Nhập..."
            value={message}
            onKeyDown={onEnterPress}
            onChange={onInputChange}
            maxLength={2000}
          ></textarea>
        </div>
      </div>
    </div>
  );
});
