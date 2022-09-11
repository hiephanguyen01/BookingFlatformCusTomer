import React ,{ useState,useRef,useEffect  } from "react";
import { ChatUser } from "../ChatBody/ChatUser/ChatUser";
import { ChatContent } from "./ChatContent/ChatContent";
import { ChatUserFilter } from "./ChatUserFilter/ChatUserFilter";
import { chatService } from "../../../services/ChatService";
import { socket } from "../../ConnectSocket/ConnectSocket";
import { ChatAdmin } from "./ChatAdmin/ChatAdmin";
import { UserMe } from "./ChatContent/ChatContent";
import { ChatContentAdmin } from "./ChatContent/ChatContentAdmin";
import { useDispatch } from "react-redux";
import { updateMAction } from "../redux/action/updateMAction";
export const ChatBody =React.memo( () => {
  const dispatch = useDispatch()
  const [toggleState, setToggleState] = useState(1);
  const [id] = useState(5);
  const initMountStateUser = useRef([])
  const [infoChatAdmin,setInfoChatAdmin] = useState()
  const [conversation, setConversation] = useState(initMountStateUser.current);
  useEffect(() => {
    (async () => {
      const res = await chatService.getConversation(10, 1,id, 1);
      initMountStateUser.current = res.data.data;
      setConversation(res.data.data);
      console.log("ressssss",res.data);
      setToggleState(res.data.data[0].id)
    })();
  }, []);
  const userChat = () => {
    return conversation.map((chat) => (
      <ChatUser
        key={chat.id}
        userInfo={chat}
        toggleState={toggleState}
        toggleClick={(e) => {
          setToggleState(e)
          dispatch(updateMAction())
        }}
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
  useEffect(() => {
    (async () => {
      const res = await chatService.getConversationVsAdmin(UserMe.id, 0);
    setInfoChatAdmin(res.data.data)
    })();
  }, []);
  
  useEffect(() => {
    socket.on('receive_message', (data) => {
       (async ()=> {
        const {data} = await chatService.getConversation(1,1,5,1)
        let newConversationUser = [...initMountStateUser.current]
        if (newConversationUser.findIndex((i) => i.id === data.data[0].id) !== -1) {
          var indexOf = newConversationUser.findIndex((i) => i.id === data.data[0].id)
          newConversationUser.splice(indexOf, 1)
          initMountStateUser.current = [data.data[0], ...newConversationUser]
          setConversation(initMountStateUser.current)
        } else {
          initMountStateUser.current = [data.data[0], ...newConversationUser]
          setConversation(initMountStateUser.current)
        }
       })()
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="Chat__body">
      <div className="Chat__body__user">
        <ChatUserFilter />
        <div className="Chat__body__userlist">
          <ChatAdmin info = {infoChatAdmin}
          toggleState={toggleState}
          toggleClick={(e) => {
            setToggleState(e)
            dispatch(updateMAction())
          }}/>
          {userChat()}
        </div>
      </div>
      <div className="Chat__body__divider"></div>
      <div
        className={toggleState === 1000000 ? "Chat__body__content" : "d-none"}
        key={1000000}
      >
        <ChatContentAdmin info = {infoChatAdmin}/>
      </div>
      {contentChat()}
    </div>
  );
});
