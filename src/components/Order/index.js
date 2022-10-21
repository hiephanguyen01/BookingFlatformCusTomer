import { CheckCircleOutlined } from "@ant-design/icons";
import { Col, Row, Input, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import "./order.scss";

import TextInput from "../../components/TextInput/TextInput";
import Promotion from "../../components/Promotion";

import { SHOW_MODAL } from "../../stores/types/modalTypes";
import { setStudioPostIdAction } from "../../stores/actions/promoCodeAction";
import { studioDetailAction } from "../../stores/actions/studioPostAction";
import {
  convertDateSendToDB,
  convertPrice,
  convertTimeSendDB,
} from "../../utils/convert";
import { orderService } from "../../services/OrderService";
import toastMessage from "../ToastMessage";
import SelectTimeOption from "../SelectTimeOption/SelectTimeOption";
import PopUpSignIn from "../../pages/Auth/PopUpSignIn/PopUpSignIn";
import { convertImage } from "../../utils/convertImage";
import { calDate, calTime } from "../../utils/calculate";
import { SET_CHOOSE_PROMOTION_USER } from "../../stores/types/promoCodeType";
const Index = ({ linkTo = "" }) => {
  const user = useSelector((state) => state.authenticateReducer.currentUser);
  const { chooseServiceList } = useSelector((state) => state.OrderReducer);
  const { choosePromotionUser } = useSelector(
    (state) => state.promoCodeReducer
  );
  const { studioDetail, filter } = useSelector(
    (state) => state.studioPostReducer
  );
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
    case "device":
      cate = 5;
      break;
    case "model":
      cate = 6;
      break;

    default:
      break;
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setStudioPostIdAction(id));
    dispatch(studioDetailAction(id, cate));

    return () => {
      dispatch({ type: SET_CHOOSE_PROMOTION_USER, data: {} });
    };
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

  const calculatePrice = () => {
    switch (filter.OrderByTime) {
      case 0:
        const priceByHour = chooseServiceList?.reduce(
          (total, service) =>
            total +
            (service?.Sales || service?.Price || service?.PriceByHour) *
              calTime(filter?.OrderByTimeFrom, filter?.OrderByTimeTo),
          0
        );
        if (choosePromotionUser?.TypeReduce === 1) {
          return priceByHour - (choosePromotionUser?.ReduceValue || 0);
        } else {
          return (
            priceByHour -
            ((priceByHour * choosePromotionUser?.ReduceValue) / 100 >=
            choosePromotionUser?.MaxReduce
              ? choosePromotionUser?.MaxReduce
              : (priceByHour / 100) * (choosePromotionUser?.ReduceValue || 0))
          );
        }
      case 1:
        const priceByDate =
          chooseServiceList?.reduce(
            (total, service) =>
              total +
              (service.Sales || service.Price || service.PriceByDate) *
                calDate(filter.OrderByDateFrom, filter.OrderByDateTo),
            0
          ) || 0;
        if (choosePromotionUser?.TypeReduce === 1) {
          return priceByDate - (choosePromotionUser?.ReduceValue || 0);
        } else {
          return (
            priceByDate -
            ((priceByDate * choosePromotionUser?.ReduceValue) / 100 >=
            choosePromotionUser?.MaxReduce
              ? choosePromotionUser?.MaxReduce
              : (priceByDate / 100) * (choosePromotionUser?.ReduceValue || 0))
          );
        }

      default:
        break;
    }
  };
  console.log(calculatePrice());
  const handleOnClickOrder = async () => {
    try {
      if (user === null) {
        // handleSendOtp(phoneNumber, Navigate, "", null, null);
        return;
      }
      if (Boolean(isEmpty())) {
        let IdentifyCode = [],
          TenantId;

        //Handle date time section *************
        const timeFromTemp = convertTimeSendDB(
          filter.OrderByTimeFrom.slice(11, 19)
        );
        let prevDayFromflagTemp = parseInt(timeFromTemp.split("#")[1]);
        const dateFromTemp = convertDateSendToDB(
          filter.OrderByTimeFrom,
          Boolean(prevDayFromflagTemp)
        ).slice(0, 11);
        const timeFromOfficial = timeFromTemp.split("#")[0];

        const timeToTemp = convertTimeSendDB(
          filter.OrderByTimeTo.slice(11, 19)
        );
        let prevDayToflagTemp = parseInt(timeToTemp.split("#")[1]);
        const dateToTemp = convertDateSendToDB(
          filter.OrderByTimeTo,
          Boolean(prevDayToflagTemp)
        ).slice(0, 11);
        const timeToOfficial = timeToTemp.split("#")[0];

        //Check coi có bị trùng cái thời gian đặt room này trên database ko

        //**************************************

        if (filter.OrderByTime === 0) {
          for (let i = 0; i < chooseServiceList.length; i++) {
            console.log("Đang trong này");
            const newData = {
              OrderByTime: 1,
              OrderByTimeFrom:
                // convertDateSendToDB(filter.OrderByTimeFrom).slice(0, 11) +
                // convertTimeSendDB(filter.OrderByTimeFrom.slice(11, 19)) +
                // ":00.000Z",
                dateFromTemp + timeFromOfficial + ":00.000Z",
              OrderByTimeTo:
                // convertDateSendToDB(filter.OrderByTimeTo).slice(0, 11) +
                // convertTimeSendDB(filter.OrderByTimeTo.slice(11, 19)) +
                // ":00.000Z",
                dateToTemp + timeToOfficial + ":00.000Z",
              PaymentType: 0,
              OrderNote: infoUser.message,
              BookingUserName: infoUser.name,
              BookingPhone: infoUser.phoneNumber,
              BookingEmail: infoUser.email,
              BookingUserId: user.id,
              CreatorUserId: user.id,
              ProductId: chooseServiceList[i].id,
              Category: cate,
              IsPayDeposit: 1,
              BookingValue:
                (chooseServiceList[i].Sales ||
                  chooseServiceList[i].PriceByHour) *
                calTime(filter.OrderByTimeFrom, filter.OrderByTimeTo),
            };
            const response = await orderService.addOrder(newData);
            IdentifyCode = [...IdentifyCode, response.data.IdentifyCode];
            TenantId = response.data.TenantId;
          }
        } else if (filter.OrderByTime === 1) {
          for (let i = 0; i < chooseServiceList.length; i++) {
            const newData = {
              OrderByTime: 0,
              OrderByDateFrom:
                convertDateSendToDB(filter.OrderByDateFrom).slice(0, 11) +
                "00:00:00.000Z",
              OrderByDateTo:
                convertDateSendToDB(filter.OrderByDateTo).slice(0, 11) +
                "00:00:00.000Z",
              PaymentType: 0,
              OrderNote: infoUser.message,
              BookingUserName: infoUser.name,
              BookingPhone: infoUser.phoneNumber,
              BookingEmail: infoUser.email,
              BookingUserId: user.id,
              CreatorUserId: user.id,
              ProductId: chooseServiceList[i].id,
              Category: cate,
              IsPayDeposit: 1,
              BookingValue:
                (chooseServiceList[i].Sales ||
                  chooseServiceList[i].PriceByDate) *
                calDate(filter.OrderByDateFrom, filter.OrderByDateTo),
            };
            const response = await orderService.addOrder(newData);
            IdentifyCode = [...IdentifyCode, response.data.IdentifyCode];
            TenantId = response.data.TenantId;
          }
        }
        navigate("confirm", {
          state: { IdentifyCode, TenantId },
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
              chooseServiceList?.map((item) => (
                <>
                  <div className="border-bottom">
                    <div
                      className="d-flex"
                      style={{ height: "88px", marginRight: "0.5rem" }}
                    >
                      <img
                        src={`${
                          item?.Image?.length > 0
                            ? convertImage(item?.Image[0])
                            : ""
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
                        {/* <div
                          className="text-description mt-6 "
                          style={{ color: "#3F3F3F" }}
                        >
                          Trắng, size S, Số lượng 1
                        </div> */}
                        <div className="text-middle mt-8">
                          {filter.OrderByTime === 0 &&
                            convertPrice(item.Sales || item.PriceByHour)}
                          {filter.OrderByTime === 1 &&
                            convertPrice(item.Sales || item.PriceByDate)}
                          đ
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
                    <SelectTimeOption disabled="true" />
                    {/* <div
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
                    </div> */}
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
                    {filter.OrderByTime === 0 &&
                      `${convertPrice(
                        chooseServiceList?.reduce(
                          (total, service) =>
                            total +
                            (service.Price || service.PriceByHour) *
                              calTime(
                                filter.OrderByTimeFrom,
                                filter.OrderByTimeTo
                              ),
                          0
                        )
                      )}`}
                    {filter.OrderByTime === 1 &&
                      `${convertPrice(
                        chooseServiceList?.reduce(
                          (total, service) =>
                            total +
                            (service.Price || service.PriceByDate) *
                              calDate(
                                filter.OrderByDateFrom,
                                filter.OrderByDateTo
                              ),
                          0
                        )
                      )}`}
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
                    {/* {filter.OrderByTime === 0 &&
                      `${convertPrice(
                        choosePromotionUser?.TypeReduce === 1
                          ? `${
                              chooseServiceList?.reduce(
                                (total, service) =>
                                  total +
                                  (service.Sales || service.PriceByHour) *
                                    calTime(
                                      filter.OrderByTimeFrom,
                                      filter.OrderByTimeTo
                                    ),
                                0
                              ) - (choosePromotionUser?.ReduceValue || 0)
                            }`
                          : `${
                              chooseServiceList?.reduce(
                                (total, service) =>
                                  total +
                                  (service.Sales || service.PriceByHour) *
                                    calTime(
                                      filter.OrderByTimeFrom,
                                      filter.OrderByTimeTo
                                    ),
                                0
                              ) -
                              (chooseServiceList?.reduce(
                                (total, service) =>
                                  total +
                                  (service.Sales || service.PriceByHour) *
                                    calTime(
                                      filter.OrderByTimeFrom,
                                      filter.OrderByTimeTo
                                    ),
                                0
                              ) /
                                100) *
                                (choosePromotionUser?.ReduceValue || 0)
                            }`
                      )}`}
                    {filter.OrderByTime === 1 &&
                      `${convertPrice(
                        choosePromotionUser?.TypeReduce === 1
                          ? `${
                              chooseServiceList?.reduce(
                                (total, service) =>
                                  total +
                                  (service.Sales || service.PriceByDate) *
                                    calDate(
                                      filter.OrderByDateFrom,
                                      filter.OrderByDateTo
                                    ),
                                0
                              ) - (choosePromotionUser?.ReduceValue || 0)
                            }`
                          : `${
                              chooseServiceList?.reduce(
                                (total, service) =>
                                  total +
                                  (service.Sales || service.PriceByDate) *
                                    calDate(
                                      filter.OrderByDateFrom,
                                      filter.OrderByDateTo
                                    ),
                                0
                              ) -
                              (chooseServiceList?.reduce(
                                (total, service) =>
                                  total +
                                  (service.Sales || service.PriceByDate) *
                                    calDate(
                                      filter.OrderByDateFrom,
                                      filter.OrderByDateTo
                                    ),
                                0
                              ) /
                                100) *
                                (choosePromotionUser?.ReduceValue || 0)
                            }`
                        // chooseServiceList?.reduce(
                        //   (total, service) =>
                        //     total +
                        //     (service.Sales || service.PriceByDate) *
                        //       calDate(
                        //         filter.OrderByDateFrom,
                        //         filter.OrderByDateTo
                        //       ),
                        //   0
                        // )
                      )}`} */}
                    {convertPrice(calculatePrice())}đ
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
            <PopUpSignIn
              onClick={(e) => {
                handleOnClickOrder();
              }}
            >
              <Button
                type="primary"
                style={{ borderRadius: "8px", height: "45px", width: "270px" }}
              >
                Hoàn tất đặt
              </Button>
            </PopUpSignIn>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
