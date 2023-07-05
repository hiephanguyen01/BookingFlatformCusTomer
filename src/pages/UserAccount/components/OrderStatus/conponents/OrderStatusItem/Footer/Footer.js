import { InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { Divider, Input, Modal } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toastMessage from "../../../../../../../components/ToastMessage";
import { chatService } from "../../../../../../../services/ChatService";
import { orderService } from "../../../../../../../services/OrderService";
import {
  createConverAction,
  findConverAction,
  updateMAction,
} from "../../../../../../../stores/actions/ChatAction";
import {
  SHOW_CHAT,
  TOGGLE_STATE,
} from "../../../../../../../stores/types/messType";
import { FooterRating } from "./FooterRating";
import "./FooterStatus.scss";
import { RateModal } from "./RateModal/RateModal";
import CancelIcon from "../../../Icon/CancelIcon";
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
  booking,
}) => {
  const socket = useSelector((state) => state.userReducer.socket);
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  // const [data, setDate] = useState([]);
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);
  const checkOrderByDateFrom =
    (booking?.OrderByTime
      ? booking?.OrderByTimeFrom
      : booking?.OrderByDateFrom) > moment().format();

  const dispatch = useDispatch();
  const CancleFreeDate = moment(
    booking?.OrderByTime ? booking?.OrderByTimeFrom : booking?.OrderByDateFrom
  )
    .subtract(
      booking?.OrderByTime
        ? booking?.FreeCancelByHour?.match(/\d+/g)[0]
        : booking?.FreeCancelByDate?.match(/\d+/g)[0],
      `${booking?.OrderByTime ? "hours" : "days"}`
    )
    .utc()
    .format("DD/MM/YYYY HH:mm A");

  const depositPercent = booking?.OrderByTime
    ? booking?.CancelPriceByHour
    : booking?.CancelPriceByDate;
  const handleCancelOrder = async () => {
    try {
      if (cancelReason === "") {
        return toastMessage("Vui lòng nhập lý do hủy đơn!");
      }
      const formData = new FormData();
      formData.append("BookingStatus", 2);
      formData.append("Category", Category);
      formData.append("DeletionTime", new Date());
      formData.append("DeletedNote", cancelReason);

      await orderService.updateCart(formData, IdentifyCode);
      const newPageBooking = pageBooking.filter(
        (item) => item.IdentifyCode !== IdentifyCode
      );
      setPageBooking(newPageBooking);
      socket?.emit("cancelBooking", { IdentifyCode });
      setShowModal(false);
      toastMessage("Hủy đơn thành công!", "success");
    } catch (error) {
      toastMessage("Hủy đơn thất bại!", "error");
    }
  };
  const handleOpenChatPartner = async () => {
    try {
      const create = await chatService.createConversation(TenantId, UserMe.id);
      socket.emit("send_message", {
        id: Math.random(),
        ConversationId: create.data.payload.id,
        createdAt: moment().toISOString(),
        Content: "Xin chào chúng tôi có thể giúp được gì cho bạn !",
        Chatting: {
          id: create.data.payload.Partner.id,
          PartnerName: create.data.payload.Partner.PartnerName,
          Phone: create.data.payload.Partner.Phone
            ? create.data.payload.Partner.Phone
            : "",
          Email: create.data.payload.Partner.Email
            ? create.data.payload.Partner.Email
            : "",
        },
        Type: "text",
      });
      dispatch(createConverAction(create.data.id));

      //Pop up the right chat room
      dispatch({ type: TOGGLE_STATE, payload: create.data.payload.id });
      dispatch(updateMAction());
    } catch (error) {
      dispatch(findConverAction(error.response?.data.message.id));
      dispatch({
        type: TOGGLE_STATE,
        payload: error.response?.data.message.id,
      });
    }
  };
  switch (+status) {
    case 1:
      return (
        <div className="FooterStatus__wait">
          <div className="FooterStatus__wait__prove">
            <InfoCircleOutlined />
            <div>Thanh toán và cập nhật minh chứng trong 15 phút</div>
          </div>
          <div
            className="FooterStatus__wait__button"
            style={{
              cursor:
                moment().diff(booking?.CreationTime, "minutes") > 15
                  ? "not-allowed"
                  : "",
            }}>
            <Link
              to={`/home/confirm-order/${id}`}
              state={{
                IdentifyCode: [IdentifyCode],
                TenantId,
                EvidenceImage,
                updatePay: true,
                Category: Category,
              }}
              //
              className="FooterStatus__wait__button__1">
              <UploadOutlined /> Đã thanh toán
            </Link>
            <Link
              to={`/home/confirm-order/${id}`}
              state={{
                IdentifyCode: [IdentifyCode],
                TenantId,
                EvidenceImage,
                updatePay: true,
                Category: Category,
              }}
              className="FooterStatus__wait__button__2"
              style={{
                pointerEvents:
                  moment().diff(booking.CreationTime, "minutes") > 15
                    ? "none"
                    : "auto",
              }}>
              Thanh toán cọc
            </Link>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="FooterStatus__comming">
          {checkOrderByDateFrom && (
            <button
              className="FooterStatus__comming__cancel"
              onClick={() => setShowModal(true)}>
              Hủy đơn
            </button>
          )}
          <button
            className="FooterStatus__comming__contact"
            onClick={() => {
              dispatch({ type: SHOW_CHAT });
              handleOpenChatPartner();
            }}>
            Liên hệ
          </button>
          <Modal
            title={"Huỷ đơn có thế bị mất phí"}
            open={showModal}
            okText="Đồng ý"
            cancelText="Thoát"
            onCancel={() => setShowModal(false)}
            onOk={() => handleCancelOrder()}>
            <>
              <div>
                Quý khách có thể huỷ đơn đặt cho đến{" "}
                <p style={{ color: "#009874", display: "inline-block" }}>
                  {CancleFreeDate}
                </p>{" "}
                mà không mất phí gì và được hoàn tiền cọc 100% (nếu có thanh
                toán trước đó).Quý khách sẽ không được hoàn tiền nếu vắng mặt
                vào ngày thưc hiện đơn đặt.
              </div>
              <Divider style={{ margin: "14px 0" }} />
              <h5 className="">Bạn có chắc muốn hủy đơn hàng này không?</h5>
              <div className="mt-3">Vui lòng nhập lý do hủy đơn:</div>
              <Input.TextArea
                className="mt-3"
                rows={4}
                style={{ resize: "none" }}
                onChange={(e) =>
                  setCancelReason(e.target.value)
                }></Input.TextArea>
              <Divider />
              <section className="chile">
                <div className="df">
                  <CancelIcon />
                  <div className="sub_title">CHÍNH SÁCH HỦY</div>
                </div>
                <div className="df" style={{ justifyContent: "space-between" }}>
                  <div className="boxxx">
                    <div className="fi b_green"></div>
                    <div className="text">
                      <div className="text_title t_green">Hủy miễn phí</div>
                      <div className="text_title_2">
                        Cho đến {CancleFreeDate}
                      </div>
                    </div>
                  </div>
                  <div className="boxxx">
                    <div className="fi b_red"></div>
                    <div className="text">
                      <div className="text_title t_red">
                        Hủy mất {depositPercent}% cọc
                      </div>
                      <div className="text_title_2">Từ {CancleFreeDate}</div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          </Modal>
        </div>
      );
    case 3:
      return (
        <div className="FooterStatus__complete">
          <FooterRating
            id={id}
            visible={visible}
            setVisible={setVisible}
            category={Category}
          />
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
            open={visible}
            footer={false}
            width={600}
            closable={false}
            className="FooterStatus__complete__modal">
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
