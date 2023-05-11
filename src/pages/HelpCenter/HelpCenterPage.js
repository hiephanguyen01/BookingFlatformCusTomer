import React, { useEffect, useRef, useState } from "react";
import { MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Col, Row, Button, Modal } from "antd";
import Aside from "./components/HelpCenterAside/HelpCenterAside";

import "./helpCenter.scss";
import HelpCenterContent from "./components/HelpCenterContent/HelpCenterContent";
import BackNav from "../../components/BackNav/BackNav";

const HelpCenterPage = () => {
  const [modal1Open, setModal1Open] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const ref = useRef(null);
  useEffect(() => {}, [ref]);
  return (
    <>
      <BackNav
        title="Trung tâm trợ giúp"
        to="/home/user"
        className="header-nav-help"
      />
      <div className="divider-top"></div>
      <div className="help-center-container">
        <div className="header">
          <h3>CHÀO MỪNG BẠN ĐẾN VỚI TRUNG TÂM TRỢ GIÚP</h3>
          <div className="wrap-btn">
            <Button
              danger
              className="btn-danger"
              onClick={() => setModal1Open(true)}
            >
              <MailOutlined />
              Gửi yêu cầu hỗ trợ
            </Button>
            <Button
              danger
              className="btn-danger "
              onClick={() => setModal2Open(true)}
            >
              <PhoneOutlined />
              Hotline 028.6.68.68.869
            </Button>
          </div>
        </div>
        <div className="container">
          <Row>
            <Col lg={6} md={6} sm={6} xs={24}>
              <Aside ref={ref} />
            </Col>
            <Col lg={18} md={18} sm={18} xs={24} className="col-right">
              <HelpCenterContent ref={ref} />
            </Col>
          </Row>
        </div>
        <Modal
          title="Gửi yêu cầu hỗ trợ cho chúng tôi"
          centered
          visible={modal1Open}
          onOk={() => setModal1Open(false)}
          onCancel={() => setModal1Open(false)}
          footer={[
            <Button
              key="submit"
              type="primary"
              onClick={() => setModal1Open(false)}
              style={{ borderRadius: "5px" }}
            >
              OK, Tôi hiểu rồi
            </Button>,
          ]}
        >
          <p>
            Liên hệ với nhân viên của chúng tôi về đơn đặt của bạn và chúng tôi
            sẽ phản hồi ngay khi có thể.
            <br /> Bằng cách:
            <br /> + Đăng nhập để gửi tin nhắn cho chúng tôi
            <br /> + Gửi mail cho Chúng tôi tới địa chỉ Email:
            bookingstudio@vnplus.vn
          </p>
        </Modal>
        <Modal
          title="Gọi cho chúng tôi"
          centered
          visible={modal2Open}
          onOk={() => setModal2Open(false)}
          onCancel={() => setModal2Open(false)}
          footer={[
            <Button
              key="submit"
              type="primary"
              onClick={() => setModal2Open(false)}
              style={{ borderRadius: "5px" }}
            >
              OK, Tôi hiểu rồi
            </Button>,
          ]}
        >
          <p>
            Trong trường hợp khẩn cấp, bạn có thể gọi cho chúng tôi tới số điện
            thoại 028.6.68.68.869
          </p>
        </Modal>
      </div>
    </>
  );
};

export default HelpCenterPage;
