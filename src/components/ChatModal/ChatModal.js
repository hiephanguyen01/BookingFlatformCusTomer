import { Col, Divider, Input, Row } from "antd";
import React from "react";
import { ReactComponent as BackArrow } from "../../assets/svg/BackArrow.svg";

import "./chatModal.scss";
import { SearchOutlined } from "@ant-design/icons";
import { useState } from "react";
import image from "../../assets/dao/Frame 164.jpg";
import { ReactComponent as Damage } from "../../assets/damage 1.svg";
import ConversationDetail from "./components/ConversationDetail/ConversationDetail";

const CONVERSATIONS = [
  {
    id: 1,
    name: "Mina Mina",
    preMesssage:
      "Chào bạn! phòng này có thể dùng để chụp hình cho em bé ạ! giá này là chưa bao gôm nhưng",
    sendingTime: "15:30 28/06/21",
    status: true,
  },
  {
    id: 2,
    name: "Mina Mina",
    preMesssage:
      "Chào bạn! phòng này có thể dùng để chụp hình cho em bé ạ! giá này là chưa bao gôm nhưng",
    sendingTime: "15:30 28/06/21",
    status: true,
  },
  {
    id: 3,
    name: "Mina Mina",
    preMesssage:
      "Chào bạn! phòng này có thể dùng để chụp hình cho em bé ạ! giá này là chưa bao gôm nhưng",
    sendingTime: "15:30 28/06/21",
    status: false,
  },
  {
    id: 4,
    name: "Mina Mina",
    preMesssage:
      "Chào bạn! phòng này có thể dùng để chụp hình cho em bé ạ! giá này là chưa bao gôm nhưng",
    sendingTime: "15:30 28/06/21",
    status: false,
  },
  {
    id: 5,
    name: "Mina Mina",
    preMesssage:
      "Chào bạn! phòng này có thể dùng để chụp hình cho em bé ạ! giá này là chưa bao gôm nhưng",
    sendingTime: "15:30 28/06/21",
    status: true,
  },
];

const ChatModal = ({ handleCancel = () => {} }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [chooseConversation, setChooseConversation] = useState();
  return (
    <div className="chat-modal">
      <Row align="middle" className="mb-15 px-15">
        <BackArrow className="arrow" onClick={handleCancel} />
        <div className="title">Chat</div>
      </Row>
      <div className="px-15 w-100">
        <Input
          placeholder="Tìm kiếm"
          prefix={<SearchOutlined />}
          className="input-search"
        />
      </div>
      <Row className="tab-header-container" align="middle">
        <Col span={12} className="h-100">
          <div
            className={`tab-header ${tabIndex === 0 && "active"}`}
            onClick={() => setTabIndex(0)}
          >
            Tất cả
          </div>
        </Col>
        <Col span={12} className="h-100">
          <div
            className={`tab-header ${tabIndex === 1 && "active"}`}
            onClick={() => setTabIndex(1)}
          >
            Chưa đọc
          </div>
        </Col>
      </Row>
      <div className="divider"></div>
      <Col className="px-15 conversation-container">
        {tabIndex === 0 ? (
          <>
            {CONVERSATIONS.length > 0 ? (
              CONVERSATIONS.map((item, index) => (
                <div key={index} onClick={() => setChooseConversation(item)}>
                  <Row
                    className="pre-conversation"
                    gutter={[10, 0]}
                    align="middle"
                  >
                    <Col span={5}>
                      <img src={image} alt="" className="avatar" />
                    </Col>
                    <Col span={18}>
                      <div className="name">{item.name}</div>
                      <div className="pre-message">{item.preMesssage}</div>
                      <div className="sending-time">{item.sendingTime}</div>
                    </Col>
                    <Col span={1}>
                      {item.status && <div className="status"></div>}
                    </Col>
                  </Row>{" "}
                  <Divider className="my-10" />
                </div>
              ))
            ) : (
              <Row className="mt-70 px-30" gutter={[0, 10]}>
                <Col span={24} style={{ textAlign: "center" }}>
                  <Damage style={{ width: "80px" }} />
                </Col>
                <Col span={24} style={{ textAlign: "center" }}>
                  <span className="text-medium-se">
                    Bạn chưa có cuộc trò chuyện nào
                  </span>
                </Col>
                <Col span={24} style={{ textAlign: "center" }}>
                  <span>
                    Đi đến phần Đơn đã đặt để có thể liên hệ với bên cung cấp
                    dịch vụ
                  </span>
                </Col>
              </Row>
            )}
          </>
        ) : (
          <>
            {false ? (
              CONVERSATIONS.map((item, index) => (
                <div key={index} onClick={() => setChooseConversation(item)}>
                  <Row
                    className="pre-conversation"
                    gutter={[10, 0]}
                    align="middle"
                  >
                    <Col span={5}>
                      <img src={image} alt="" className="avatar" />
                    </Col>
                    <Col span={18}>
                      <div className="name">{item.name}</div>
                      <div className="pre-message">{item.preMesssage}</div>
                      <div className="sending-time">{item.sendingTime}</div>
                    </Col>
                    <Col span={1}>
                      {item.status && <div className="status"></div>}
                    </Col>
                  </Row>{" "}
                  <Divider className="my-10" />
                </div>
              ))
            ) : (
              <Row className="mt-70 px-30" gutter={[0, 10]}>
                <Col span={24} style={{ textAlign: "center" }}>
                  <Damage style={{ width: "80px" }} />
                </Col>
                <Col span={24} style={{ textAlign: "center" }}>
                  <span className="text-medium-se">
                    Bạn chưa có cuộc trò chuyện nào
                  </span>
                </Col>
                <Col span={24} style={{ textAlign: "center" }}>
                  <span>
                    Đi đến phần Đơn đã đặt để có thể liên hệ với bên cung cấp
                    dịch vụ
                  </span>
                </Col>
              </Row>
            )}
          </>
        )}
      </Col>
      {chooseConversation?.id && (
        <ConversationDetail handleCancel={() => setChooseConversation({})} />
      )}
    </div>
  );
};

export default ChatModal;
