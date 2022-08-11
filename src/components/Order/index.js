import { CheckCircleOutlined, RightOutlined } from "@ant-design/icons";
import {
  Col,
  DatePicker,
  Row,
  TimePicker,
  TextArea,
  Input,
  Dropdown,
  Space,
  Menu,
  Button,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";

import "./order.scss";

import { SHOW_MODAL } from "../../stores/types/modalTypes";
import TextInput from "../../components/TextInput/TextInput";
import Voucher from "../../pages/CostumeDetails/page/OrderCostume/components/Voucher";

import imgStudio from "../../assets/dao/Frame 163.jpg";
import { handleSendOtp } from "../../stores/actions/autheticateAction";
const Index = ({ onClickModal, linkTo = "" }) => {
  const [chooseVoucher, setChooseVoucher] = useState([]);
  const user = useSelector((state) => state.authenticateReducer.currentUser);
  const [phoneNumber, setPhoneNumber] = useState("");
  // console.log(chooseVoucher);
  const dispatch = useDispatch();

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleOnClickOrder = () => {
    try {
      if (user === null) {
        handleSendOtp(phoneNumber, Navigate, "", {}, null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className=""
      style={{
        margin: "auto",
        backgroundColor: "rgb(245, 245, 245)",
        padding: "2rem 0",
      }}
    >
      <Row
        style={{
          maxWidth: "1300px",
          margin: "auto",
        }}
      >
        <Col lg={9} sm={24}>
          <div
            style={{
              padding: "20px 25px 30px",
              marginBottom: "0.5rem",
              backgroundColor: "#FFFFFF",
            }}
          >
            <div className="text-title" style={{ marginBottom: "1rem" }}>
              Bạn đã chọn
            </div>
            <div className="border-bottom">
              <div
                className="text-description"
                style={{ color: "#222222", marginBottom: "14px" }}
              >
                Cho thuê trang phục Flux
                <CheckCircleOutlined
                  style={{
                    height: "100%",
                    color: "green",
                    marginLeft: "0.25rem",
                  }}
                />
              </div>
              <div
                className="d-flex"
                style={{ height: "88px", marginRight: "0.5rem" }}
              >
                <img
                  src={imgStudio}
                  style={{ height: "100%", marginRight: "20px" }}
                />
                <div>
                  <span className="text-middle">Váy cưới mã 01</span>
                  <div
                    className="text-description"
                    style={{ color: "#3F3F3F", margin: "6px 0 8px" }}
                  >
                    Trắng, size S, Số lượng 1
                  </div>
                  <span className="text-middle" style={{ color: "#3F3F3F" }}>
                    1.500.000
                  </span>
                </div>
              </div>
            </div>
            <div className="border-bottom">
              <div className="text-title" style={{ marginBottom: "16px" }}>
                Khung giờ bạn muốn đặt
              </div>
              <div
                className="text-description d-flex align-items-center"
                style={{ marginBottom: "12px" }}
              >
                <div style={{ color: "#616161", width: "50px" }}>Ngày</div>
                <DatePicker onChange={onChange} style={{ color: "#3F3F3F" }} />
              </div>
              <div className="text-description d-flex align-items-center">
                <div style={{ color: "#616161", width: "50px" }}>Giờ</div>
                <TimePicker.RangePicker style={{ color: "#3F3F3F" }} />
              </div>
            </div>
            <div className="border-bottom">
              <div className="text-title" style={{ marginBottom: "8px" }}>
                Phương thức thanh toán
              </div>
              <p className="text-description" style={{ color: "#222222" }}>
                Thanh toán trực tiếp cho shop
              </p>
            </div>
            <div className="border-bottom">
              <div className="text-title" style={{ marginBottom: "8px" }}>
                Gửi lời nhắn
              </div>
              <Input.TextArea
                showCount
                maxLength={100}
                onChange={onChange}
                placeholder="Gửi lời nhắn cho shop"
                className="text-area"
              />
            </div>
            <div
              style={{
                marginBottom: "0.5rem",
                backgroundColor: "#FFFFFF",
              }}
            >
              <div
                className="d-flex justify-content-between"
                style={{ marginBottom: "28px" }}
              >
                <div>Chọn mã khuyến mãi</div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => onClickModal()}
                >
                  Mã khuyến mãi
                </div>
              </div>
              <div style={{ backgroundColor: "#E3FAF4", padding: "16px 15px" }}>
                <div className="d-flex justify-content-between">
                  <div className="text-middle" style={{ color: "#222222" }}>
                    Đã chọn 2 dịch vụ
                  </div>
                  <div
                    className="text-description "
                    style={{
                      textDecoration: "line-through",
                      color: "#828282",
                      marginBottom: "12px",
                    }}
                  >
                    1.800.000
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div
                    className="text-description"
                    style={{ color: "#616161" }}
                  >
                    Bao gồm 50.000đ thuế và phí
                  </div>
                  <div
                    className=""
                    style={{
                      color: "#E22828",
                      fontSize: "20px",
                      lineHeight: "28px",
                      fontWeight: "700",
                    }}
                  >
                    1.500.000
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={15} sm={24} style={{ padding: "0 1rem" }}>
          <div
            style={{
              padding: "25px 25px",
              marginBottom: "0.5rem",
              backgroundColor: "#FFFFFF",
            }}
          >
            <div
              className="text-title"
              style={{
                fontSize: "22px",
                lineHeight: "30px",
                marginBottom: "0.25rem",
              }}
            >
              Vui lòng điền thông tin của bạn
            </div>
            <TextInput
              placeholder="Tên khách hàng"
              styleContainer={{ width: "100%" }}
            />
            <TextInput
              name="SDT"
              placeholder="Số điện thoại"
              styleContainer={{ width: "100%" }}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextInput placeholder="Email" styleContainer={{ width: "100%" }} />
          </div>
          <div
            className="d-flex justify-content-end"
            style={{ marginTop: "35px" }}
          >
            <Button
              type="primary"
              style={{ borderRadius: "8px", height: "45px", width: "270px" }}
              onClick={() => handleOnClickOrder}
            >
              {/* <Link to={linkTo}>Hoàn tất đặt</Link> */}
              Hoàn tất đặt
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
