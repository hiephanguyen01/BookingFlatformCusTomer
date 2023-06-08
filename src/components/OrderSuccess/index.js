import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteChooseServiceAction } from "../../stores/actions/OrderAction";
import "./orderSuccess.scss";
import { socket } from "../ConnectSocket/ConnectSocket";
import { TOGGLE_STATE } from "../../stores/types/messType";
import {
  createConverAction,
  findConverAction,
  getAllNewConversation,
} from "../../stores/actions/ChatAction";
import { chatService } from "../../services/ChatService";
import moment from "moment";
import { useState } from "react";
import { studioPostService } from "../../services/StudioPostService";

moment().format();
const Index = () => {
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { pathname } = useLocation();
  const enum_post = {
    studio: 1,
    photographer: 2,
    clothes: 3,
    makeup: 4,
    device: 5,
    model: 6,
  };

  // const getAllNewConversation = async () => {
  //   const res = await chatService.getConversation(8, 1, UserMe.id, 1);
  //   // initMountStateUser.current = res?.data?.data;
  //   // setConversation(res?.data?.data);
  //   dispatch({ type: TOGGLE_STATE, payload: res?.data?.data[0]?.id });
  // };

  const makeConversationWithPartner = () => {
    const type = pathname.split("/")[2];
    (async () => {
      try {
        const studioPost = await studioPostService.getDetailStudio(
          id,
          enum_post[type]
        );
        const { data } = await chatService.createConversation(
          studioPost.data.data?.TenantId, //partnerID
          UserMe.id
        );
        if (data && studioPost) {
          socket.emit("send_message", {
            id: Math.random(),
            ConversationId: data.payload.id,
            createdAt: moment().toISOString(),
            Content: "Xin chào chúng tôi có thể giúp được gì cho bạn !",
            Chatting: {
              id: studioPost.data.data?.TenantId,
              PartnerName: studioPost.data.data?.Name,
              Phone: data.payload.Partner.Phone
                ? data.payload.Partner.Phone
                : "",
              Email: data.payload.Partner.Email
                ? data.payload.Partner.Email
                : "",
            },
            Type: "text",
          });
          dispatch(createConverAction(data.payload.id));
        }
      } catch (error) {
        dispatch(findConverAction(error.response.data.message.id));
      }
    })();
  };

  useEffect(() => {
    dispatch(deleteChooseServiceAction());
    makeConversationWithPartner();
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "40vh" }}
    >
      <div className="success-container">
        <div className="success-checkmark">
          <div className="check-icon">
            <span className="icon-line line-tip"></span>
            <span className="icon-line line-long"></span>
            <div className="icon-circle"></div>
            <div className="icon-fix"></div>
          </div>
        </div>
        <div className="text">Đặt thành công</div>
        <div className="btn-home" onClick={() => navigate("/home")}>
          Quay về trang chủ
        </div>
      </div>
    </div>
  );
};

export default Index;
