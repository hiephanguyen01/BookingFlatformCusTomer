/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import "./ChatUser.scss";
import moment from "moment";
import { useState, useEffect /* , useRef */ } from "react";
import { useSelector } from "react-redux";
import {
  onlinePartnerSelector,
  offlinePartnerSelector,
} from "../../../../stores/selector/OnlineSelector";
import { chatService } from "../../../../services/ChatService";
import { HandleImg } from "../../../HandleImg/HandleImg";
export const ChatUser = React.memo(({ userInfo, toggleState, toggleClick }) => {
  const onlinePartnerList = useSelector(onlinePartnerSelector);
  const offlinePartnerList = useSelector(offlinePartnerSelector);
  const [isRead, setIsRead] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const [lastMessage, setLastMessage] = useState(
    userInfo.newestMessage ? userInfo.newestMessage : null
  );
  useEffect(() => {
    if (userInfo.newestMessage) {
      if (userInfo.newestMessage.UserId !== -1) {
        setIsRead(true);
      } else {
        setIsRead(userInfo.newestMessage.IsRead);
      }
      setLastMessage(userInfo.newestMessage);
    }
  }, [userInfo]);
  useEffect(() => {
    setIsOnline(onlinePartnerList.includes(userInfo.PartnerId.id));
  }, [onlinePartnerList]);
  useEffect(() => {
    setIsOnline(offlinePartnerList.includes(userInfo.PartnerId.id));
  }, [offlinePartnerList]);
  return (
    <div
      className={toggleState === userInfo.id ? "User  User__current " : "User "}
      onClick={() => {
        toggleClick(userInfo.id);
        setIsRead(true);
        if (
          userInfo.newestMessage.UserId === -1 &&
          userInfo.newestMessage.IsRead === false
        ) {
          (async () => {
            await chatService.readMessage(userInfo.newestMessage.id);
          })();
        }
      }}
    >
      <div className="d-flex flex-row w-100 px-6 align-items-center h-100">
        <div className="d-flex align-items-center h-100">
          <HandleImg
            Name={userInfo.PartnerId.PartnerName}
            src={""}
            width={34}
            className="d-flex align-self-center me-10"
          />
        </div>
        <div className="py-2 h-100 w-100 d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-between align-items-center h-100">
            <p className="User__name">
              {userInfo.PartnerId.PartnerName.toString().length <= 15
                ? userInfo.PartnerId.PartnerName
                : `${userInfo.PartnerId.PartnerName.toString().slice(
                    0,
                    15
                  )}...`}
            </p>
            {isOnline ? (
              <span className="User__isOnline"></span>
            ) : (
              <span className="User__isOffline"></span>
            )}
          </div>
          {lastMessage ? (
            lastMessage.UserId === userInfo.UserId.id ? (
              <div
                className="w-100 d-flex justify-content-between"
                style={{ color: "#828282", fontSize: "13px" }}
              >
                <div>
                  Bạn:{" "}
                  {lastMessage.Content.toString().length <= 9
                    ? lastMessage.Content
                    : `${lastMessage.Content.toString().slice(0, 9)}...`}
                </div>
                <div>{moment(lastMessage.createdAt).format("HH:mm")}</div>
              </div>
            ) : (
              <div
                className="w-100 d-flex justify-content-between"
                style={{
                  color: isRead ? "#828282" : "#000",
                  fontSize: "13px",
                  fontWeight: isRead ? 500 : 700,
                }}
              >
                <div>
                  {lastMessage.Content.toString().length <= 12
                    ? lastMessage.Content
                    : `${lastMessage.Content.toString().slice(0, 12)}...`}
                </div>
                <div>{moment(lastMessage.createdAt).format("HH:mm")}</div>
              </div>
            )
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
});
