import React from "react";
import "./ChatUser.scss";
import moment from "moment";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  onlinePartnerSelector,
  offlinePartnerSelector,
} from "../../../../stores/selector/OnlineSelector";
import { chatService } from "../../../../services/ChatService";
import { HandleImg } from "../../../HandleImg/HandleImg";
import { orderService } from "../../../../services/OrderService";

export const ChatUser = ({
  id,
  userInfo,
  toggleState,
  toggleClick,
  setToggleState,
  setLatestBookingOfUser,
}) => {
  const { notiMessage } = useSelector((state) => state.chatReducer);
  const [isRead, setIsRead] = useState(false);
  const [lastMessage, setLastMessage] = useState(
    userInfo?.newestMessage ? userInfo?.newestMessage : null
  );
  const dispatch = useDispatch();

  const readMessage = async () => {
    await chatService.readMessage(id);
  };

  const getLatestBookingByUserId = async () => {
    const { data } = await orderService.getLatestOrderByUserId(
      userInfo.UserId.id,
      userInfo.PartnerId.id
    );
    if (data.payload) setLatestBookingOfUser(data.payload);
  };

  useEffect(() => {
    if (userInfo?.newestMessage) {
      if (userInfo.newestMessage?.UserId !== -1) {
        setIsRead(true);
      } else {
        setIsRead(userInfo.newestMessage.IsRead);
      }
      setLastMessage(userInfo.newestMessage);
    }
  }, [userInfo]);
  return (
    <div
      className={
        toggleState === userInfo?.id ? "User  User__current " : "User "
      }
      onClick={async () => {
        toggleClick(userInfo?.id);
        dispatch({ type: "REMOVE_NOTIFY_MESS", payload: id });
        await readMessage();
        setIsRead(true);

        await getLatestBookingByUserId();

        if (
          userInfo?.newestMessage.UserId.id === -1 &&
          userInfo?.newestMessage.IsRead === false
        ) {
          (async () => {
            await chatService.readMessage(userInfo?.newestMessage.id);
          })();
        }
      }}
    >
      <div className="d-flex flex-row w-100 px-6 align-items-center h-100">
        <div className="d-flex align-items-center h-100">
          <HandleImg
            Name={userInfo?.PartnerId?.PartnerName}
            src={""}
            width={34}
            className="d-flex align-self-center me-10"
          />
        </div>
        <div className="py-2 h-100 w-100 d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-between align-items-center h-100">
            <p className="User__name">
              {userInfo?.PartnerId?.PartnerName.toString().length <= 15
                ? userInfo?.PartnerId?.PartnerName
                : `${userInfo?.PartnerId?.PartnerName.toString().slice(
                    0,
                    15
                  )}...`}
            </p>
          </div>
          <div
            className="w-100 d-flex justify-content-between"
            style={{
              color: isRead ? "#828282" : "#000",
              fontSize: "13px",
              fontWeight: isRead ? 500 : 700,
            }}
          >
            <div>
              {lastMessage?.Type === "text" ? (
                <>
                  {lastMessage.Content.toString().length <= 12
                    ? lastMessage.Content
                    : `${lastMessage.Content.toString().slice(0, 12)}...`}
                </>
              ) : (
                <>Ảnh</>
              )}
            </div>
            <div>{moment(lastMessage?.createdAt).format("HH:mm")}</div>
          </div>
          {/* {notiMessage.includes(id) ? (
              lastMessage.UserId === userInfo.UserId.id ? (
                <div
                  className="w-100 d-flex justify-content-between"
                  style={{ color: "#828282", fontSize: "13px" }}
                >
                  <div>
                    Bạn:{" "}
                    {lastMessage?.Type === "text" ? (
                      <>
                        {lastMessage.Content.toString().length <= 9
                          ? lastMessage.Content
                          : `${lastMessage.Content.toString().slice(0, 9)}...`}
                      </>
                    ) : (
                      <>Ảnh</>
                    )}
                  </div>
                  <div>{moment(lastMessage?.createdAt).format("HH:mm")}</div>
                </div>
              ) : (
                
              )
            ) : (
              ""
            )} */}
        </div>
      </div>
    </div>
  );
};
