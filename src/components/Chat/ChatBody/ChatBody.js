import React from "react";
import { useState } from "react";
import { ChatUser } from "../ChatBody/ChatUser/ChatUser";
import { ChatContent } from "./ChatContent/ChatContent";
import { ChatUserFilter } from "./ChatUserFilter/ChatUserFilter";
export const Conversation = [
  {
    id: 1,
    Chatter1: {
      id: 10,
      Name: "Quan",
    },
    Chatter2: {
      id: 15,
      Name: "Quan1",
    },
    newestMessage: {
      id: 1,
      Content: "Hello moi nguoi",
      Chatting: {
        id: 15,
        Name: "Quan1",
      },
      createdAt: "2022-07-21T09:35:31.820Z",
    },
  },
  {
    id: 2,
    Chatter1: {
      id: 20,
      Name: "Quan4",
    },
    Chatter2: {
      id: 15,
      Name: "Quan1",
    },
    newestMessage: {
      id: 2,
      Content: "Hello moi nguoi lai la Quan day",
      Chatting: {
        id: 12,
        Name: "Quan2",
      },
      createdAt: "2022-07-21T09:35:31.820Z",
    },
  },
  {
    id: 3,
    Chatter1: {
      id: 21,
      Name: "Quan5",
    },
    Chatter2: {
      id: 15,
      Name: "Quan1",
    },
    newestMessage: {
      id: 2,
      Content: "Hello moi nguoi lai la Quan day",
      Chatting: {
        id: 15,
        Name: "Quan1",
      },
      createdAt: "2022-07-21T09:35:31.820Z",
    },
  },
  {
    id: 4,
    Chatter1: {
      id: 22,
      Name: "Quan6",
    },
    Chatter2: {
      id: 15,
      Name: "Quan1",
    },
    newestMessage: {
      id: 2,
      Content: "Hello moi nguoi lai la Quan day",
      Chatting: {
        id: 15,
        Name: "Quan1",
      },
      createdAt: "2022-07-21T09:35:31.820Z",
    },
  },
  {
    id: 5,
    Chatter1: {
      id: 23,
      Name: "Quan7",
    },
    Chatter2: {
      id: 15,
      Name: "Quan1",
    },
    newestMessage: {
      id: 2,
      Content: "Hello moi nguoi lai la Quan day",
      Chatting: {
        id: 23,
        Name: "Quan7",
      },
      createdAt: "2022-07-21T09:35:31.820Z",
    },
  },
  {
    id: 6,
    Chatter1: {
      id: 24,
      Name: "Quan8",
    },
    Chatter2: {
      id: 15,
      Name: "Quan1",
    },
    newestMessage: {
      id: 2,
      Content: "Hello moi nguoi lai la Quan day",
      Chatting: {
        id: 15,
        Name: "Quan1",
      },
      createdAt: "2022-07-21T09:35:31.820Z",
    },
  },
  {
    id: 7,
    Chatter1: {
      id: 25,
      Name: "Quan9",
    },
    Chatter2: {
      id: 15,
      Name: "Quan1",
    },
    newestMessage: {
      id: 2,
      Content: "Hello moi nguoi lai la Quan day",
      Chatting: {
        id: 25,
        Name: "Quan9",
      },
      createdAt: "2022-07-21T09:35:31.820Z",
    },
  },
  {
    id: 8,
    Chatter1: {
      id: 26,
      Name: "Quan10",
    },
    Chatter2: {
      id: 26,
      Name: "Quan10",
    },
    newestMessage: {
      id: 2,
      Content: "Hello moi nguoi lai la Quan day",
      Chatting: {
        id: 15,
        Name: "Quan1",
      },
      createdAt: "2022-07-21T09:35:31.820Z",
    },
  },
];
export const ChatBody = () => {
  const [toggleState, setToggleState] = useState(1);
 
  const [conversation/* , setConversation */] = useState(Conversation);
  const userChat = () => {
    return conversation.map((chat) => (
      <ChatUser
        key={chat.id}
        userInfo={chat}
        toggleState={toggleState}
        toggleClick={(e) => setToggleState(e)}
      />
    ));
  };
  const contentChat = () => {
    return conversation.map((chat) => (
      <div
        className={toggleState === chat.id ? "Chat__body__content" : "d-none"}
        key={chat.id}
      >
        <ChatContent chatInfo={chat} />
      </div>
    ));
  };
  return (
    <div className="Chat__body">
      <div className="Chat__body__user">
        <ChatUserFilter />
        <div className="Chat__body__userlist">{userChat()}</div>
      </div>
      <div className="Chat__body__divider"></div>
      {contentChat()}
    </div>
  );
};
