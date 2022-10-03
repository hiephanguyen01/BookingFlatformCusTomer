import React from "react";
import "./FooterStatus.scss";
import { InfoCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Modal } from "antd";
import { RateModal } from "./RateModal/RateModal";
import { Link } from "react-router-dom";
export const Footer = ({ status }) => {
  const [visible, setVisible] = useState(false);
  switch (status) {
    case 1:
      return (
        <div className="FooterStatus__wait">
          <div className="FooterStatus__wait__prove">
            <InfoCircleOutlined />
            <div>Thanh toán và cập nhật minh chứng trong 15 phút</div>
          </div>
          <div className="FooterStatus__wait__button">
            <Link
              to="/home/confirm-order"
              className="FooterStatus__wait__button__1">
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
          <button className="FooterStatus__comming__cancel">Hủy đơn</button>
          <button className="FooterStatus__comming__contact">Liên hệ</button>
        </div>
      );
    case 3:
      return (
        <div className="FooterStatus__complete">
          <button
            className="FooterStatus__complete__rating"
            onClick={() => setVisible(true)}>
            Đánh giá
          </button>
          <button className="FooterStatus__complete__order">Đặt lại</button>
          <Modal
            centered
            visible={visible}
            footer={false}
            width={600}
            closable={false}
            className="FooterStatus__complete__modal">
            <RateModal
              onOk={() => setVisible(false)}
              onCancel={() => setVisible(false)}
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
