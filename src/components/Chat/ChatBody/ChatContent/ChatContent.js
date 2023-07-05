/* eslint-disable react-hooks/exhaustive-deps */
import { CloseCircleOutlined, PictureOutlined } from "@ant-design/icons";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import demopic1 from "../../../../assets/Chat/demo1.png";
import UploadImage from "../../../../components/UploadImage";
import { chatService } from "../../../../services/ChatService";
import { orderService } from "../../../../services/OrderService";
import { closeConversationAction } from "../../../../stores/actions/ChatAction";
import { updateMSelector } from "../../../../stores/selector/ChatSelector";
import { IMG } from "../../../../utils/REACT_APP_DB_BASE_URL_IMG";
import { socket } from "../../../ConnectSocket/ConnectSocket";
import "./ChatContent.scss";

/* export const UserMe = {
  id: 5,
  Username: "3871952632888744",
  Image: "b953bcbb-96f8-4dc2-8b5d-9f9b895d0def",
  Email: "anhsaobanga21@gmail.com",
  Fullname: "Toàn Nguyễn",
  Phone: "0909005001",
}; */
/* export const UserMe = {
  id: 6,
  Username: "hoanganhnguyen96kt@gmail.com",
  Image: "15bc1346-7c8b-4844-b9b6-9d39cba1a7f4",
  Email: "anhsaobanga21@gmail.com",
  Fullname: "Nguyeh Hoanganh",
  Phone: "",
}; */
export const ChatContent = React.memo(({ chatInfo }) => {
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);

  const navigate = useNavigate();
  const dispatch = useDispatch();
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
  const [booking, setBooking] = useState([]);
  const [files, setFiles] = useState([]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
    // socket.emit("typing", {
    //   ConversationId: id,
    //   typing: true,
    // });
    // if (typingTimeOutRef.current) {
    //   clearTimeout(typingTimeOutRef.current);
    // }
    // typingTimeOutRef.current = setTimeout(() => {
    //   socket.emit("typing", {
    //     ConversationId: id,
    //     typing: false,
    //   });
    // }, 1000);
  };
  const onEnterPress = async (e) => {
    const messText = {
      id: Math.random(),
      ConversationId: id,
      createdAt: moment().toISOString(),
      Content: message,
      Chatting: UserMe,
      Type: "text",
    };
    if (
      e.keyCode === 13 &&
      e.shiftKey === false &&
      message.trim() !== "" &&
      files.length === 0
    ) {
      e.preventDefault();
      setMessage("");
      socket.emit("send_message", messText);
    } else if (
      e.keyCode === 13 &&
      e.shiftKey === false &&
      message.trim() === "" &&
      files.length !== 0
    ) {
      e.preventDefault();
      for (let file of files) {
        delete file.preview;
        socket.emit("send_message", {
          id: Math.random(),
          ConversationId: id,
          createdAt: moment().toISOString(),
          Type: "file",
          mineType: file.type,
          fileName: file.name,
          Content: file,
          Chatting: UserMe,
        });
      }
      setFiles([]);
    } else if (
      e.keyCode === 13 &&
      e.shiftKey === false &&
      message.trim() !== "" &&
      files.length !== 0
    ) {
      e.preventDefault();
      setMessage("");
      socket.emit("send_message", messText);
      for (let file of files) {
        delete file.preview;
        socket.emit("send_message", {
          id: Math.random(),
          ConversationId: id,
          createdAt: moment().toISOString(),
          Type: "file",
          mineType: file.type,
          fileName: file.name,
          Content: file,
          Chatting: UserMe,
        });
      }
      setFiles([]);
    }
  };
  const renderMess = (itm) => {
    if (itm.Type !== "text") {
      return (
        <img
          onLoad={() => scrollToBottom()}
          style={{
            width: 200,
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

  useEffect(() => {
    (async () => {
      try {
        const { data } = await orderService.getAllOrderByUserId({});
        const filterBooking = data.data.filter(
          (item) => item.TenantId === chatInfo.PartnerId?.id
        );
        setBooking(filterBooking);
      } catch (error) {}
    })();
  }, []);
  useEffect(() => {
    if (flag) {
      scrollToBottom();
    }
  }, [messageList, updateScroll, flag]);
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
  }, [socket, id]);

  return (
    <div className="ChatContent">
      <div className="ChatContent__header">
        <div className="d-flex align-items-center">
          <img
            alt="user"
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
            width={35}
            height={35}></img>
          <div className="ChatContent__header__user">
            <div>{chatInfo?.PartnerId?.PartnerName}</div>
          </div>
        </div>
        {booking.length > 0 && (
          <button
            onClick={() => {
              navigate("user/orderStatus");
              dispatch(closeConversationAction());
            }}
            className="ChatContent__header__order">
            <div className="d-flex flex-column align-items-center">
              <div style={{ fontSize: "14px", fontWeight: "600" }}>
                Bạn đang có {booking.length} đơn đặt hàng
              </div>
              <div style={{ fontSize: "10px", fontWeight: "900" }}>
                XEM CHI TIẾT
              </div>
            </div>
            <img
              src={demopic1}
              alt=""
              className="ChatContent__header__order__pic"
            />
          </button>
        )}
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
        }}>
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
                  }>
                  <div
                    className={
                      itm.Chatting.PartnerName !== undefined &&
                      itm.Type === "text"
                        ? "ChatContent__conversation__other__content"
                        : itm.Chatting.PartnerName !== undefined &&
                          itm.Type !== "text"
                        ? "ChatContent__conversation__other__img"
                        : itm.Chatting.PartnerName === undefined &&
                          itm.Type === "text"
                        ? "ChatContent__conversation__you__content"
                        : "ChatContent__conversation__you__img"
                    }>
                    {renderMess(itm)}
                  </div>
                </div>
              ))}
            {isTyping && (
              <div className="ChatContent__conversation__typing">
                <div className="ChatContent__conversation__typing__content">
                  {chatInfo.PartnerId.PartnerName}
                </div>{" "}
                <div className="dot-typing" />
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
        style={{ height: files.length === 0 ? "70px" : "140px" }}>
        <div className="ChatContent__container__upload">
          <UploadImage
            onChangeFile={onChangeFile}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "10px",
            }}
            multiple={true}>
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
                  }}>
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
            cols={1}
            data-kt-element="input"
            placeholder="Nhập..."
            value={message}
            onKeyDown={onEnterPress}
            onChange={onInputChange}
            maxLength={2000}></textarea>
        </div>
      </div>
    </div>
  );
});
