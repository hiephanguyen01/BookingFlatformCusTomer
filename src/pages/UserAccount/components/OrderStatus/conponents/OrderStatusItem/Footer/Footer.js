import {
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Modal } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { socket } from "../../../../../../../components/ConnectSocket/ConnectSocket";
import { chatService } from "../../../../../../../services/ChatService";
import { orderService } from "../../../../../../../services/OrderService";
import {
  createConverAction,
  findConverAction,
} from "../../../../../../../stores/actions/ChatAction";
import {
  SHOW_CHAT,
  TOGGLE_STATE,
} from "../../../../../../../stores/types/messType";
import { FooterRating } from "./FooterRating";
import "./FooterStatus.scss";
import { RateModal } from "./RateModal/RateModal";
export const Footer = ({
  id,
  status,
  IdentifyCode,
  TenantId,
  EvidenceImage,
  Category,
  pageBooking,
  setPageBooking,
  Item,
  post,
}) => {
  const [visible, setVisible] = useState(false);
  // const [data, setDate] = useState([]);
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);

  const dispatch = useDispatch();

  const handleCancelOrder = async () => {
    try {
      const formData = new FormData();
      formData.append("BookingStatus", 2);
      formData.append("Category", Category);
      const response = await orderService.updateOrder(formData, IdentifyCode);
      const newPageBooking = pageBooking.filter(
        (item) => item.IdentifyCode !== IdentifyCode
      );
      setPageBooking(newPageBooking);
    } catch (error) {
      console.log(error);
    }
  };

  const confirm = () => {
    Modal.confirm({
      title: "Xác nhận hủy đơn hàng",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc muốn hủy đơn hàng này không?",
      okText: "Đồng ý",
      cancelText: "Thoát",
      onOk: () => handleCancelOrder(),
    });
  };

  const handleOpenChatPartner = async () => {
    try {
      const create = await chatService.createConversation(TenantId, UserMe.id);
      socket.emit("send_message", {
        id: Math.random(),
        ConversationId: create.data.id,
        createdAt: moment().toISOString(),
        Content: "Xin chào chúng tôi có thể giúp được gì cho bạn !",
        Chatting: {
          id: create.data.Partner.id,
          PartnerName: create.data.Partner.PartnerName,
          Phone: create.data.Partner.Phone ? create.data.Partner.Phone : "",
          Email: create.data.Partner.Email ? create.data.Partner.Email : "",
        },
        Type: "text",
      });
      dispatch(createConverAction(create.data.id));
    } catch (error) {
      dispatch(findConverAction(error.response.data.message.id));
      dispatch({ type: TOGGLE_STATE, payload: error.response.data.message.id });
    }
  };
  console.log(+status);
  switch (+status) {
    case 1:
      return (
        <div className="FooterStatus__wait">
          <div className="FooterStatus__wait__prove">
            <InfoCircleOutlined />
            <div>Thanh toán và cập nhật minh chứng trong 15 phút</div>
          </div>
          <div className="FooterStatus__wait__button">
            <Link
              to={`/home/confirm-order/${id}`}
              state={{
                IdentifyCode: [IdentifyCode],
                TenantId,
                EvidenceImage,
                updatePay: true,
                Category: Category,
              }}
              className="FooterStatus__wait__button__1"
            >
              <UploadOutlined /> Đã thanh toán
            </Link>
            <button className="FooterStatus__wait__button__2">
              Thanh toán cọc
            </button>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="FooterStatus__comming">
          <button className="FooterStatus__comming__cancel" onClick={confirm}>
            Hủy đơn
          </button>
          <button
            className="FooterStatus__comming__contact"
            onClick={() => {
              dispatch({ type: SHOW_CHAT });
              handleOpenChatPartner();
            }}
          >
            Liên hệ
          </button>
        </div>
      );
    case 3:
      return (
        <div className="FooterStatus__complete">
          <FooterRating id={id} visible={visible} setVisible={setVisible} />
          {/* {data.findIndex(
            (item) =>
              item.StudioBookingId === id ||
              item.PhotographerBookingId === id ||
              item.ModelBookingId === id ||
              item.MakeupBookingId === id ||
              item.DeviceBookingId === id ||
              item.ClothesBookingId === id
          ) > -1 ? (
            <></>
          ) : (
            <button
              className="FooterStatus__complete__rating"
              onClick={() => setVisible(true)}
            >
              Đánh giá
            </button>
          )}

          <button className="FooterStatus__complete__order">Đặt lại</button> */}
          <Modal
            centered
            visible={visible}
            footer={false}
            width={600}
            closable={false}
            className="FooterStatus__complete__modal"
          >
            <RateModal
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
              Category={Category}
              id={id}
              Item={Item}
              post={post}
            />
          </Modal>
        </div>
      );
    case 4:
      return (
        <div className="FooterStatus__cancel">
          <button className="FooterStatus__cancel__order">Đặt lại</button>
        </div>
      );
    default:
      break;
  }
};
