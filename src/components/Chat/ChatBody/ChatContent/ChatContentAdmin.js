import { CloseCircleOutlined, PictureOutlined } from "@ant-design/icons";
import moment from "moment";
import { Button, Popover } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import adminLogo from "../../../../assets/Chat/AdminUser.png";
import UploadImage from "../../../../components/UploadImage";
import { chatService } from "../../../../services/ChatService";
import { updateMSelector } from "../../../../stores/selector/ChatSelector";
import { IMG } from "../../../../utils/REACT_APP_DB_BASE_URL_IMG";
import { socket } from "../../../ConnectSocket/ConnectSocket";
import "./ChatContent.scss";

export const ChatContentAdmin = ({ info }) => {
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);
  const updateScroll = useSelector(updateMSelector);
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const [renderMessageList, setRenderMessageList] = useState([]);
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
    const messText = {
      messageContent: {
        id: Math.random(),
        ConversationId: info.id,
        createdAt: moment().toISOString(),
        Content: message,
        Chatting: UserMe,
        Type: "text",
      },
      From: "user",
      With: "admin",
    };

    // *** Send text only ***
    if (
      e.keyCode === 13 &&
      e.shiftKey === false &&
      message.trim() !== "" &&
      files.length === 0
    ) {
      e.preventDefault();
      setMessage("");
      socket.emit("send_message_admin", messText);

      // *** Send image only ***
    } else if (
      e.keyCode === 13 &&
      e.shiftKey === false &&
      message.trim() === "" &&
      files.length !== 0
    ) {
      e.preventDefault();
      for (let file of files) {
        delete file.preview;
        socket.emit("send_message_admin", {
          messageContent: {
            id: Math.random(),
            ConversationId: info.id,
            createdAt: moment().toISOString(),
            Content: file,
            Chatting: UserMe,
            Type: "file",
            mineType: file.type,
            fileName: file.name,
          },
          From: "user",
          With: "admin",
        });
      }
      setFiles([]);

      // *** Send both text and image ***
    } else if (
      e.keyCode === 13 &&
      e.shiftKey === false &&
      message.trim() !== "" &&
      files.length !== 0
    ) {
      e.preventDefault();
      setMessage("");
      socket.emit("send_message_admin", messText);
      for (let file of files) {
        delete file.preview;
        socket.emit("send_message_admin", {
          messageContent: {
            id: Math.random(),
            ConversationId: info.id,
            createdAt: moment().toISOString(),
            Content: file,
            Chatting: UserMe,
            Type: "file",
            mineType: file.type,
            fileName: file.name,
          },
          From: "user",
          With: "admin",
        });
      }
      setFiles([]);
    }
  };

  const onChangeFile = (e) => {
    const newFiles = [...files];
    const fileList = e.target.files;
    for (let file of fileList) {
      if (
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg"
      ) {
        file.preview = URL.createObjectURL(file);
        newFiles.push(file);
      }
    }
    setFiles([...newFiles]);
    scrollToBottom();
  };

  const handleRemoveImage = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles([...newFiles]);
  };

  const onInputChange = async (event) => {
    setMessage(event.target.value);
    // socket.emit("typing_admin", {
    //   ConversationId: id,
    //   typing: true,
    // });
    // if (typingTimeOutRef.current) {
    //   clearTimeout(typingTimeOutRef.current);
    // }
    // typingTimeOutRef.current = setTimeout(() => {
    //   socket.emit("typing_admin", {
    //     ConversationId: id,
    //     typing: false,
    //   });
    // }, 1000);
  };

  const renderMess = (itm) => {
    if (itm.Type !== "text") {
      return (
        <img
          onLoad={() => scrollToBottom()}
          style={{
            maxWidth: "200px",
            height: "auto",
            borderRadius: "10px",
            color: "#fff !important",
          }}
          src={IMG(itm.Content)}
          alt={itm.fileName}
        />
      );
    } else {
      return <>{itm.Content}</>;
    }
  };

  const deleteMessForBoth = async (messageId) => {
    const { data } = await chatService.deleteMessageForAllUserInRoom(messageId);
    if (data.success) {
      setMessageList((list) => [...list.filter((el) => el.id !== messageId)]);
      setRenderMessageList((list) => [
        ...list.filter((el) => el.id !== messageId),
      ]);
    }
  };

  const deleteMessForMyself = () => {};

  const moreActionChatContent = (sender, messageId) =>
    sender === "admin" ? (
      <div className="ChatContent__conversation__moreaction">
        <button onClick={deleteMessForMyself}>Xóa tin nhắn cho bạn</button>
      </div>
    ) : (
      <div className="ChatContent__conversation__moreaction">
        <button onClick={() => deleteMessForBoth(messageId)}>
          Xóa tin nhắn cho cả 2 người
        </button>
        <button onClick={deleteMessForMyself} style={{ marginTop: "10px" }}>
          Xóa tin nhắn cho bạn
        </button>
      </div>
    );

  // *** UseEffect to retrieve conversation message list ***
  useEffect(() => {
    if (info) {
      (async () => {
        const res = await chatService.getMesVsAdmin(10, 1, info.id);
        setMessageList(res.data.data);
        setRenderMessageList(res.data.data);
        setLoading(true);
        setFlag(true);
      })();
    }
  }, [info]);
  // ********************************************************

  // *** UseEffect to scroll to bottom ***
  useEffect(() => {
    scrollToBottom();
  }, [renderMessageList, messageList, updateScroll, flag]);
  //**************************************

  // *** UseEffect to listen to socket ***
  useEffect(() => {
    socket.on("receive_message_admin", (data) => {
      setMessageList((list) => [...list, data.messageContent]);
      setFlag(true);
    });
  });
  // *************************************

  // *** UseEffect to cleanup, filter duplicate item in messagelist ***
  useEffect(() => {
    setRenderMessageList(() => {
      const uniqueIds = [];
      const unique = messageList.filter((element) => {
        const isDuplicate = uniqueIds.includes(element.id);

        if (!isDuplicate) {
          uniqueIds.push(element.id);

          return true;
        }

        return false;
      });

      return [...unique];
    });
  }, [messageList]);
  // *************************************

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
            {renderMessageList
              .sort((a, b) => {
                const a1 = /* new Date(a.createdAt) */ a.id;
                const b1 = /* new Date(b.createdAt) */ b.id;
                return a1 - b1;
              })
              .map((itm, index) => (
                <div
                  key={index}
                  className={
                    itm["sender"] === "admin"
                      ? "ChatContent__conversation__other"
                      : "ChatContent__conversation__you"
                  }
                >
                  <div
                    className={
                      itm["sender"] === "admin" && itm.Type === "text"
                        ? "ChatContent__conversation__other__content"
                        : itm["sender"] === "admin" && itm.Type !== "text"
                        ? "ChatContent__conversation__other__img"
                        : itm["sender"] !== "admin" && itm.Type === "text"
                        ? "ChatContent__conversation__you__content"
                        : "ChatContent__conversation__you__img"
                    }
                  >
                    <Popover
                      placement="right"
                      content={() =>
                        moreActionChatContent(itm["sender"], itm["id"])
                      }
                      trigger="contextMenu"
                      style={{
                        padding: 0,
                      }}
                    >
                      {renderMess(itm)}
                    </Popover>
                    <p
                      style={{
                        fontSize: "9px",
                        color: "#808080",
                        width: "100%",
                        textAlign: itm["sender"] === "admin" ? "left" : "right",
                      }}
                    >
                      {moment(itm.createdAt).format("hh:mm DD/MM/YY")}
                    </p>
                  </div>
                </div>
              ))}
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
};
