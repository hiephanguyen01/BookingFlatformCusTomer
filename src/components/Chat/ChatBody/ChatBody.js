import React, { useState, useRef, useEffect } from "react";
import { ChatUser } from "../ChatBody/ChatUser/ChatUser";
import { ChatContent } from "./ChatContent/ChatContent";
import { ChatUserFilter } from "./ChatUserFilter/ChatUserFilter";
import { chatService } from "../../../services/ChatService";
import { socket } from "../../ConnectSocket/ConnectSocket";
import { ChatAdmin } from "./ChatAdmin/ChatAdmin";
import { UserMe } from "./ChatContent/ChatContent";
import { ChatContentAdmin } from "./ChatContent/ChatContentAdmin";
import { useDispatch, useSelector } from "react-redux";
import {
  createConverFlagSelector,
  findConverSelector,
} from "../redux/selector/FindConverSelector";
import { updateMAction } from "../redux/action/updateMAction";
export const ChatBody = React.memo(() => {
  const updateConversation = useSelector(findConverSelector);
  const flagCreateConver = useSelector(createConverFlagSelector);
  const dispatch = useDispatch();
  const [toggleState, setToggleState] = useState(1);
  const initMountStateUser = useRef([]);
  const [infoChatAdmin, setInfoChatAdmin] = useState();
  const [conversation, setConversation] = useState(initMountStateUser.current);
  useEffect(() => {
    (async () => {
      const res = await chatService.getConversation(8, 1, UserMe.id, 1);
      initMountStateUser.current = res.data.data;
      setConversation(res.data.data);
      setToggleState(res.data.data[0].id);
    })();
  }, []);
  const userChat = () => {
    return conversation.map((chat) => (
      <ChatUser
        key={chat.id}
        userInfo={chat}
        toggleState={toggleState}
        toggleClick={(e) => {
          setToggleState(e);
          dispatch(updateMAction());
        }}
      />
    ));
  };
  useEffect(() => {
    if (flagCreateConver) setToggleState(flagCreateConver);
  }, [flagCreateConver]);
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
  useEffect(() => {
    (async () => {
      const res = await chatService.getConversationVsAdmin(UserMe.id, 0);
      setInfoChatAdmin(res.data.data);
    })();
  }, []);
  useEffect(() => {
    if (updateConversation) {
      (async () => {
        try {
          const { data } = await chatService.getConversationById(
            updateConversation
          );
          let newConversationUser = [...initMountStateUser.current];
          if (
            newConversationUser.findIndex((i) => i.id === data.data.id) !== -1
          ) {
            var indexOf = newConversationUser.findIndex(
              (i) => i.id === data.data.id
            );
            newConversationUser.splice(indexOf, 1);
            initMountStateUser.current = [data.data, ...newConversationUser];
            setConversation(initMountStateUser.current);
            setToggleState(data.data.id);
          } else {
            initMountStateUser.current = [data.data, ...newConversationUser];
            setConversation(initMountStateUser.current);
            setToggleState(data.data.id);
          }
        } catch (error) {
          console.log("ko ton tai ", error);
        }
      })();
    }
  }, [updateConversation]);
  useEffect(() => {
    socket.on("receive_message", () => {
      (async () => {
        const { data } = await chatService.getConversation(1, 1, UserMe.id, 1);
        let newConversationUser = [...initMountStateUser.current];
        if (
          newConversationUser.findIndex((i) => i.id === data.data[0].id) !== -1
        ) {
          var indexofff = newConversationUser.reduce(function (a, e, i) {
            if (e.id === data.data[0].id) a.push(i);
            return a;
          }, []);
          for (const itm of indexofff) {
            newConversationUser.splice(itm, 1);
          }
          initMountStateUser.current = [data.data[0], ...newConversationUser];
          setConversation(initMountStateUser.current);
        } else {
          initMountStateUser.current = [data.data[0], ...newConversationUser];
          setConversation(initMountStateUser.current);
        }
      })();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="Chat__body">
      <div className="Chat__body__user">
        <ChatUserFilter />
        <ChatAdmin
          info={infoChatAdmin}
          toggleState={toggleState}
          toggleClick={(e) => {
            setToggleState(e);
            dispatch(updateMAction());
          }}
        />
        <div className="Chat__body__userlist">{userChat()}</div>
      </div>
      <div className="Chat__body__divider"></div>
      <div
        className={toggleState === 1000000 ? "Chat__body__content" : "d-none"}
        key={1000000}
      >
        <ChatContentAdmin info={infoChatAdmin} />
      </div>
      {contentChat()}
    </div>
  );
});
