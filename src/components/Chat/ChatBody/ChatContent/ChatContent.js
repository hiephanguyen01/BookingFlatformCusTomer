import React from "react";
import "./ChatContent.scss";
import { useState } from "react";
import uploadLogo from "../../../../assets/Chat/Upload.png";
import ScrollToBottom, {useAnimatingToEnd} from "react-scroll-to-bottom";
const messageList1 = [
  {
    id: 1,
    Content: "Hello moi nguoi",
    Chatting: {
      id: 15,
      Name: "Quan1",
    },
    createdAt: "2022-07-21T09:35:31.820Z",
  },
  {
    id: 2,
    Content: "Hello moi nguoi lai la quan day ok chua 121234243434",
    Chatting: {
      id: 23,
      Name: "Quan7",
    },
    createdAt: "2022-07-21T09:35:31.820Z",
  },
  {
    id: 3,
    Content: "Hello moi nguoi",
    Chatting: {
      id: 23,
      Name: "Quan7",
    },
    createdAt: "2022-07-21T09:35:31.820Z",
  },
  {
    id: 4,
    Content: "Hello moi nguoi lai la quan day 12283445675643",
    Chatting: {
      id: 15,
      Name: "Quan",
    },
    createdAt: "2022-07-21T09:35:31.820Z",
  },
  {
    id: 5,
    Content: "Hello moi nguoi",
    Chatting: {
      id: 23,
      Name: "Quan7",
    },
    createdAt: "2022-07-21T09:35:31.820Z",
  },
  {
    id: 6,
    Content: "Hello moi nguoi",
    Chatting: {
      id: 15,
      Name: "Quan1",
    },
    createdAt: "2022-07-21T09:35:31.820Z",
  },
  {
    id: 7,
    Content: "Hello moi nguoi",
    Chatting: {
      id: 15,
      Name: "Quan1",
    },
    createdAt: "2022-07-21T09:35:31.820Z",
  },
  {
    id: 8,
    Content: "Hello moi nguoi lai la quan day 12283445675643",
    Chatting: {
      id: 23,
      Name: "Quan7",
    },
    createdAt: "2022-07-21T09:35:31.820Z",
  },
  {
    id: 9,
    Content: "Hello moi nguoi",
    Chatting: {
      id: 23,
      Name: "Quan7",
    },
    createdAt: "2022-07-21T09:35:31.820Z",
  },
];
export const ChatContent = ({ chatInfo }) => {
  const { id, Chatter1 } = chatInfo;
  const [messageList, setMessageList] = useState(messageList1);
  const [message, setMessage] = useState("");
  const onInputChange = (event) => {
    setMessage(event.target.value);
    console.log(event.target.value);
  };
  const onEnterPress = async (e) => {
    if (e.keyCode === 13 && e.shiftKey === false && message.trim() !== "") {
      e.preventDefault();
      console.log(message);
    }
  };
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
          <div>{chatInfo.Chatter1.Name}</div>
        </div>
      </div>
      <ScrollToBottom
        className="ChatContent__conversation scroll-smooth "
        followButtonClassName="ChatContent__conversation__downbtn"
        initialScrollBehavior="smooth"
        
        
      >
        {messageList.map((itm, index) => (
          <div key={index} className={itm.Chatting.id !== 15 ? "ChatContent__conversation__other" :"ChatContent__conversation__you"}>
            <div className={itm.Chatting.id !== 15 ? "ChatContent__conversation__other__content" :"ChatContent__conversation__you__content"}>
            {itm.Content}
            </div>
            
          </div>
        ))}
        
      </ScrollToBottom>
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
};
