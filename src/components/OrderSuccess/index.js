import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
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

moment().format();
const Index = () => {
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  // const getAllNewConversation = async () => {
  //   const res = await chatService.getConversation(8, 1, UserMe.id, 1);
  //   // initMountStateUser.current = res?.data?.data;
  //   // setConversation(res?.data?.data);
  //   dispatch({ type: TOGGLE_STATE, payload: res?.data?.data[0]?.id });
  // };

  const makeConversationWithPartner = () => {
    (async () => {
      try {
        const { data } = await chatService.createConversation(
          id, //partnerID
          UserMe.id
        );
        // console.log(data);
        socket.emit("send_message", {
          id: Math.random(),
          ConversationId: data.payload.id,
          createdAt: moment().toISOString(),
          Content: "Xin chào chúng tôi có thể giúp được gì cho bạn !",
          Chatting: {
            id: data.payload.Partner.id,
            PartnerName: data.payload.Partner.PartnerName,
            Phone: data.payload.Partner.Phone ? data.payload.Partner.Phone : "",
            Email: data.payload.Partner.Email ? data.payload.Partner.Email : "",
          },
          Type: "text",
        });
        dispatch(createConverAction(data.payload.id));
        // if (data.success) {
        //   await getAllNewConversation();
        // }
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
