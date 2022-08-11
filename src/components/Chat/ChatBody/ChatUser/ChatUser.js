import React from "react";
import "./ChatUser.scss";
import moment from 'moment'
import { useState } from "react";
export const ChatUser = ({ userInfo, toggleState, toggleClick ,hideLastMess}) => {
  const [isRead, setIsRead] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [lastMessage, setLastMessage] = useState(
    userInfo.newestMessage
      ? {
          id: userInfo.newestMessage.id,
          Content: userInfo.newestMessage.Content,
          Chatting: {
            id: userInfo.newestMessage.Chatting.id,
            Name: userInfo.newestMessage.Chatting.Name,
          },
          createdAt:userInfo.newestMessage.Chatting.createdAt
        }
      : null
  );
  return (
    <div
      className={toggleState === userInfo.id ? "User  User__current " : "User "}
      onClick={() => {
        toggleClick(userInfo.id);
        /* setIsRead(true); */
      }}
     
    >
      <div className="d-flex flex-row w-100 px-6 align-items-center h-100">
        <div className="d-flex align-items-center h-100">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
            alt="avatar"
            className="d-flex align-self-center me-10"
            width={40}
          />
        </div>
        <div className="py-2 h-100 w-100 d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-between align-items-center h-100">
            <p className="User__name">
              {userInfo.Chatter1.Name}
            </p>
            {isOnline ? (
              <span className='User__isOnline'></span>
            ) : (
              <span className='User__isOffline'></span>
            )}
          </div>
         {hideLastMess ? null:<>{lastMessage ? (
          lastMessage.Chatting.id === userInfo.Chatter2.id ? (
            <div
              className='w-100 d-flex justify-content-between'
              style={{color: '#828282', fontSize: '13px'}}
            >
              <div>
                Bạn:{' '}
                {lastMessage.Content.toString().length <= 15
                  ? lastMessage.Content
                  : `${lastMessage.Content.toString().slice(0, 16)}...`}
              </div>
              <div>{moment(lastMessage.createdAt).format('HH:mm')}</div>
            </div>
          ) : (
            <div
              className='w-100 d-flex justify-content-between'
              style={{
                color: isRead ? '#828282' : '#000',
                fontSize: '13px',
                fontWeight: isRead ? 500 : 700,
              }}
            >
              <div>
                {lastMessage.Content.toString().length <= 15
                  ? lastMessage.Content
                  : `${lastMessage.Content.toString().slice(0, 21)}...`}
              </div>
              <div>{moment(lastMessage.createdAt).format('HH:mm')}</div>
            </div>
          )
        ) : (
          ''
        )} </>}
        </div>
      </div>
    </div>
  );
};
