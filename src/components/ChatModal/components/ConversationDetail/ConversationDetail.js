import React from "react";
import { ReactComponent as BackArrow } from "../../../../assets/svg/BackArrow.svg";
import { ReactComponent as UploadImage } from "../../../../assets/svg/uploadImage.svg";
import { ReactComponent as SendMess } from "../../../../assets/svg/sendMess.svg";

import "./conversationDetail.scss";
import { Col, Input, Row } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import image from "../../../../assets/dao/Frame 164.jpg";

const ConversationDetail = ({ conversationId, handleCancel }) => {
  return (
    <div className="conversation-detail">
      <Row align="middle" className="mb-15 px-15">
        <Col span={22}>
          <Row align="middle">
            {" "}
            <BackArrow className="arrow" onClick={handleCancel} />
            <div className="title">
              Wisteria Studio - Cho thuê Studio đủ thể loại{" "}
            </div>
          </Row>
        </Col>
        <Col span={2}>
          <ExclamationCircleOutlined />
        </Col>
      </Row>
      <div className="divider"></div>
      <Row className="order" gutter={[10, 0]} align="middle">
        <Col span={5}>
          <img src={image} alt="" className="avatar" />
        </Col>
        <Col span={19}>
          <div className="desc">Cho thuê áo dài trăng gấm, kèm quần trắng</div>
          <div className="price">100.000đ</div>
        </Col>
      </Row>{" "}
      <Col span={24} className="conversation">
        <div className="sending-time">Hôm nay 09:00</div>
        <div className="message-me">
          cho mình hỏi là phòng này có cho thuê để chụp hình cho em bé không
          bạn? với giá này là bao gồm những gì vậy{" "}
        </div>
        <div className="sending-time">Hôm nay 10:00</div>
        <div className="message-you">chào bạn</div>
        <div className="message-you">
          Chào bạn! phòng này có thể dùng để chụp hình cho em bé ạ! giá này là
          chưa bao gôm nhưng
        </div>
        <div className="message-me">
          cho mình hỏi là phòng này có cho thuê để chụp hình cho em bé không
          bạn? với giá này là bao gồm những gì vậy
        </div>
        <div className="message-you">
          Chào bạn! phòng này có thể dùng để chụp hình cho em bé ạ! giá này là
          chưa bao gôm nhưng
        </div>
        <div className="message-you">
          Chào bạn! phòng này có thể dùng để chụp hình cho em bé ạ! giá này là
          chưa bao gôm nhưng
        </div>
      </Col>
      <div className="bottom"></div>
      <div className="box-send-mess">
        <Row align="middle">
          <Col span={4}>
            <UploadImage />
          </Col>
          <Col span={20}>
            <Row align="middle" gutter={[10, 0]} className="input-container">
              <Col span={21} style={{ paddingLeft: 0 }}>
                <Input className="input-message" />
              </Col>
              <Col span={3}>
                <SendMess className="w-100 h-100 mt-5" />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ConversationDetail;
