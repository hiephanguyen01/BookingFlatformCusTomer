import React from "react";
import AsideMobile from "../asideMobile/AsideMobile";
import { Avatar, Badge, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { RightOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { ReactComponent as WaitPayment } from "../../../../../assets/infoUser/waitPayment.svg";
import { ReactComponent as UpComing } from "../../../../../assets/infoUser/upcoming.svg";
import { ReactComponent as CancelOrder } from "../../../../../assets/infoUser/cancelOrder.svg";
import { ReactComponent as RatingOrder } from "../../../../../assets/infoUser/rating.svg";
import "./account.scss";

const Account = () => {
  const { currentUser } = useSelector((state) => state.authenticateReducer);
  return (
    <Col className="layout-mobile">
      <Row className="header" gutter={[10, 0]} align="middle">
        <Col span={6} align={"middle"}>
          <Avatar
            size={"large"}
            src={currentUser?.Image}
            icon={<UserOutlined />}
            className="avatar-circle"
          />
        </Col>
        <Col span={18}>
          <p className="user-name">{currentUser?.Fullname}</p>
          <Link to={"/home/user/accountInfo"} className="info">
            Thông tin cá nhân <RightOutlined className="arrow-right" />
          </Link>
        </Col>
      </Row>
      <Row className="my-order">
        <Col span={24} className="mb-15">
          <h4>Đơn hàng của tôi</h4>
        </Col>{" "}
        <Row className="w-100" align="middle" justify="space-around">
          <Col span={6} align={"middle"} className="h-100">
            <Link to={"/home/user/orderStatus?orderStatus=1"}>
              <Badge count={2}>
                <WaitPayment className="icon-item" />
              </Badge>
            </Link>
            <p>Chờ thanh toán</p>
          </Col>
          <Col span={6} align={"middle"} className="h-100">
            <Link to={"/home/user/orderStatus?orderStatus=2"}>
              <Badge count={1}>
                <UpComing className="icon-item" />
              </Badge>
            </Link>
            <p>Sắp tới</p>
          </Col>
          <Col span={6} align={"middle"} className="h-100">
            <Link to={"/home/user/orderStatus?orderStatus=3"}>
              <Badge count={0}>
                <CancelOrder className="icon-item" />
              </Badge>
            </Link>
            <p>Đã hủy</p>
          </Col>
          <Col span={6} align={"middle"} className="h-100">
            <Link to={"/home/user/orderStatus?orderStatus=4"}>
              <Badge count={2}>
                <RatingOrder className="icon-item" />
              </Badge>
            </Link>
            <p>Chờ đánh giá</p>
          </Col>
        </Row>
      </Row>
      <AsideMobile />
    </Col>
  );
};

export default Account;
