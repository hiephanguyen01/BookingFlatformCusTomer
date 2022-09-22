import { CheckCircleOutlined } from "@ant-design/icons";
import { Col, DatePicker, Row, TimePicker, Input, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import "./order.scss";

import TextInput from "../../components/TextInput/TextInput";
import Promotion from "../../components/Promotion";

import { SHOW_MODAL } from "../../stores/types/modalTypes";
import { setStudioPostIdAction } from "../../stores/actions/promoCodeAction";
import { studioDetailAction } from "../../stores/actions/studioPostAction";
import { REACT_APP_DB_BASE_URL_IMG } from "../../utils/REACT_APP_DB_BASE_URL_IMG";
import { convertDateSendToDB, convertPrice } from "../../utils/convert";
import { chooseServiceAction } from "../../stores/actions/OrderAction";
import { orderService } from "../../services/OrderService";
import toastMessage from "../ToastMessage";
const Index = ({ linkTo = "" }) => {
  const user = useSelector((state) => state.authenticateReducer.currentUser);
  const { chooseServiceList } = useSelector((state) => state.OrderReducer);
  const { studioDetail } = useSelector((state) => state.studioPostReducer);
  const [infoUser, setInfoUser] = useState({
    name: "ok",
    phoneNumber: "0987654321",
    email: "ok",
    message: "ok",
  });
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  let cate;

  const nameCategory = location.pathname
    .split("/")
    .filter((item) => item !== "")[1];
  switch (nameCategory) {
    case "studio":
      cate = 1;
      break;
    case "photographer":
      cate = 2;
      break;
    case "clothes":
      cate = 3;
      break;
    case "makeup":
      cate = 4;
      break;
    case "model":
      cate = 5;
      break;
    case "device":
      cate = 6;
      break;

    default:
      break;
  }
  console.log(cate);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setStudioPostIdAction(id));
    dispatch(studioDetailAction(id, cate));
  }, []);

  const isEmpty = () => {
    if (
      infoUser.name === "" ||
      infoUser.phoneNumber === "" ||
      infoUser.email === "" ||
      infoUser.message === ""
    ) {
      return 0;
    }
    return 1;
  };

  const onChangeDate = (date, dateString, serviceId) => {
    const newListService = chooseServiceList.map((item) => {
      if (item.id === Number(serviceId)) {
        return { ...item, orderDate: dateString };
      }
      return item;
    });
    dispatch(chooseServiceAction(newListService));
  };

  const onChangeHour = (times, timeString, serviceId) => {
    const newListService = chooseServiceList.map((item) => {
      if (item.id === Number(serviceId)) {
        return { ...item, orderHours: timeString };
      }
      return item;
    });
    dispatch(chooseServiceAction(newListService));
  };

  const handleOnClickOrder = () => {
    try {
      if (user === null) {
        // handleSendOtp(phoneNumber, Navigate, "", null, null);
      }
      if (isEmpty() === 1) {
        chooseServiceList.map(async (item) => {
          if (
            (item.orderDate !== "" && item.orderDate !== undefined) ||
            (item.orderHours !== "" && item.orderHours !== undefined)
          ) {
            const newData = {
              OrderByTime: 1,
              OrderByTimeFrom:
                convertDateSendToDB(item.orderDate).slice(0, 11) +
                item.orderHours[0] +
                ".000Z",
              OrderByTimeTo:
                convertDateSendToDB(item.orderDate).slice(0, 11) +
                item.orderHours[1] +
                ".000Z",
              PaymentType: 0,
              OrderNote: infoUser.message,
              BookingUserName: infoUser.name,
              BookingPhone: infoUser.phoneNumber,
              BookingEmail: infoUser.email,
              BookingUserId: 1,
              CreatorUserId: 1,
              ProductId: item.id,
              Category: cate,
              IsPayDeposit: 1,
              BookingValue: item.Sales,
            };
            const response = await orderService.addOrder(newData);
            navigate("confirm", {
              state: response.data,
            });
          } else {
            toastMessage("Vui lòng chọn ngày, giờ!", "warn");
          }
        });
      } else {
        toastMessage("Vui lòng điền đầy đủ thông tin!", "warn");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickModal = () => {
    dispatch({
      type: SHOW_MODAL,
      Component: <Promotion />,
    });
  };

  const handleOnChangeText = (e) => {
    setInfoUser({ ...infoUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="order_container">
      <Row
        style={{
          maxWidth: "1300px",
          margin: "auto",
        }}
      >
        <Col lg={9} sm={24}>
          <div className="right_col">
            <div className="text-title">Bạn đã chọn</div>
            <div className="text-description">
              {studioDetail?.data?.Name}
              <CheckCircleOutlined
                style={{
                  height: "100%",
                  color: "green",
                  marginLeft: "0.25rem",
                }}
              />
            </div>
            {chooseServiceList.length > 0 &&
              chooseServiceList.map((item) => (
                <>
                  <div className="border-bottom">
                    <div
                      className="d-flex"
                      style={{ height: "88px", marginRight: "0.5rem" }}
                    >
                      <img
                        src={`${
                          item.Image.length > 0 &&
                          item.Image[0].includes("https://drive.google.com/")
                            ? item.Image[0]
                            : REACT_APP_DB_BASE_URL_IMG + "/" + item.Image[0]
                        }`}
                        className="img_service"
                        alt=""
                      />
                      <div>
                        <span className="text-middle">
                          {item.Name.length > 30
                            ? `${item.Name.slice(0, 30)}...`
                            : item.Name}
                        </span>
                        <div
                          className="text-description mt-6 mb-8"
                          style={{ color: "#3F3F3F" }}
                        >
                          Trắng, size S, Số lượng 1
                        </div>
                        <div className="text-middle">
                          {convertPrice(item.Sales)}đ
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-bottom">
                    <div
                      className="text-title"
                      style={{ marginBottom: "16px" }}
                    >
                      Khung giờ bạn muốn đặt
                    </div>
                    <div
                      className="text-description d-flex align-items-center"
                      style={{ marginBottom: "12px" }}
                    >
                      <div style={{ color: "#616161", width: "50px" }}>
                        Ngày
                      </div>
                      <DatePicker
                        onChange={(date, dateString) =>
                          onChangeDate(date, dateString, item.id)
                        }
                        style={{ color: "#3F3F3F" }}
                        format="YYYY-MM-DD"
                      />
                    </div>
                    <div className="text-description d-flex align-items-center">
                      <div style={{ color: "#616161", width: "50px" }}>Giờ</div>
                      <TimePicker.RangePicker
                        style={{ color: "#3F3F3F" }}
                        onChange={(time, timeString) =>
                          onChangeHour(time, timeString, item.id)
                        }
                      />
                    </div>
                  </div>
                </>
              ))}
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
                onChange={handleOnChangeText}
                placeholder="Gửi lời nhắn cho shop"
                className="text-area"
                name="message"
                value={infoUser.message}
                onResize={false}
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
                    Đã chọn {chooseServiceList.length} dịch vụ
                  </div>
                  <div
                    className="text-description "
                    style={{
                      textDecoration: "line-through",
                      color: "#828282",
                      marginBottom: "12px",
                    }}
                  >
                    {convertPrice(
                      chooseServiceList.reduce(
                        (total, service) => total + service.Price,
                        0
                      )
                    )}
                    đ
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
                    {convertPrice(
                      chooseServiceList.reduce(
                        (total, service) => total + service.Sales,
                        0
                      )
                    )}
                    đ
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
              name="name"
              onChange={(e) => handleOnChangeText(e)}
              value={infoUser.name}
            />
            <TextInput
              name="phoneNumber"
              placeholder="Số điện thoại"
              styleContainer={{ width: "100%" }}
              onChange={(e) => handleOnChangeText(e)}
              value={infoUser.phoneNumber}
            />
            <TextInput
              name="email"
              placeholder="Email"
              styleContainer={{ width: "100%" }}
              onChange={(e) => handleOnChangeText(e)}
              value={infoUser.email}
            />
          </div>
          <div
            className="d-flex justify-content-end"
            style={{ marginTop: "35px" }}
          >
            <Button
              type="primary"
              style={{ borderRadius: "8px", height: "45px", width: "270px" }}
              onClick={() => handleOnClickOrder()}
            >
              Hoàn tất đặt
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
