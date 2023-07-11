import { CheckCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Grid, Input, Row, message } from "antd";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Promotion from "../../components/Promotion";
import TextInput from "../../components/TextInput/TextInput";
import { orderService } from "../../services/OrderService";
import { studioPostService } from "../../services/StudioPostService";
import { getCurrentUser } from "../../stores/actions/autheticateAction";
import { setStudioPostIdAction } from "../../stores/actions/promoCodeAction";
import { getPartnerDetail } from "../../stores/actions/RegisterPartnerAction";
import { studioDetailAction } from "../../stores/actions/studioPostAction";
import { SHOW_MODAL } from "../../stores/types/modalTypes";
import { SET_CHOOSE_SERVICE_LIST } from "../../stores/types/CartType";
import { SET_CHOOSE_PROMOTION_USER } from "../../stores/types/promoCodeType";
import { SET_CHOOSE_SERVICE } from "../../stores/types/studioPostType";
import {
  calDate,
  calTime,
  calculatePriceServiceUsePromo,
  priceService,
} from "../../utils/calculate";
import { convertPrice, isJsonString } from "../../utils/convert";
import { convertImage } from "../../utils/convertImage";
import { VerifyOtp } from "../Modal/verifyOtp/VerifyOtp";
import SelectTimeOption from "../SelectTimeOption/SelectTimeOption";
import toastMessage from "../ToastMessage";
import queryString from "query-string";
import "./order.scss";
import { getCartItemCheckout } from "../../stores/actions/CartAction";

const { useBreakpoint } = Grid;

const Index = ({ linkTo = "" }) => {
  const screens = useBreakpoint();
  const socket = useSelector((state) => state.userReducer.socket);
  const user = useSelector((state) => state.authenticateReducer.currentUser);
  const { chooseServiceList } = useSelector((state) => state.CartReducer);
  const { partnerDetail } = useSelector(
    (state) => state.registerPartnerReducer
  );
  const { choosePromotionUser, promoCodeUserSave } = useSelector(
    (state) => state.promoCodeReducer
  );
  const { studioDetail, chooseService } = useSelector(
    (state) => state.studioPostReducer
  );
  const [infoUser, setInfoUser] = useState();
  const [Valid, setValid] = useState(false);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  let cate;
  const cartItems = useMemo(
    () => queryString.parse(location?.search)?.cartItems,
    [location?.search]
  );
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

  // useEffect(() => {
  //   setInfoUser(user);
  //   // dispatch(setStudioPostIdAction(id));
  //   if (id) {
  //     dispatch(studioDetailAction(id, cate));
  //   }
  //   dispatch(getPartnerDetail(studioDetail?.data?.TenantId));
  //   return () => {
  //     dispatch({ type: SET_CHOOSE_PROMOTION_USER, data: {} });
  //     dispatch({ type: SET_CHOOSE_SERVICE_LIST, payload: [] });
  //     dispatch({ type: SET_CHOOSE_SERVICE, payload: {} });
  //   };
  // }, [cate, dispatch, id, user]);

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, []);

  useEffect(() => {
    // if (cartItems?.length && chooseServiceList?.length === 0) {
    if (isJsonString(cartItems)) {
      dispatch(getCartItemCheckout(cartItems));
    } else {
      navigate(-1);
    }
    // }
  }, [cartItems, dispatch, navigate]);

  const isEmpty = () => {
    if (
      infoUser.Fullname === "" ||
      infoUser.Phone === "" ||
      infoUser.Email === ""
    ) {
      return 0;
    }
    return 1;
  };

  const calculatePrice = () => {
    return chooseServiceList.reduce((total, item) => {
      switch (item?.OrderByTime) {
        case 1:
          return (
            total +
            item?.pricesByHour[0].PriceByHour *
              calTime(item?.OrderByTimeFrom, item?.OrderByTimeTo) *
              (item?.amount || 1)
          );
        case 0:
          return (
            total +
            item?.pricesByDate?.reduce((sum, cur) => sum + cur.PriceByDate, 0) *
              (item?.amount || 1)
          );

        default:
          break;
      }
      return total;
    }, 0);
  };
  // const calculateCommisionAffiliate = useMemo(
  //   () => (price, service) => {
  //     return (
  //       (price *
  //         ((service?.OrderByTime
  //           ? service?.AffiliateCommissionByHour
  //           : service?.AffiliateCommissionByDate) || 5)) /
  //       100
  //     );
  //   },
  //   []
  // );

  const calculatePriceUsePromo = () => {
    return chooseServiceList.reduce((total, item) => {
      switch (item?.OrderByTime) {
        case 1:
          const priceByHour =
            item?.pricesByHour[0].PriceByHour *
            calTime(item?.OrderByTimeFrom, item?.OrderByTimeTo) *
            (item?.amount || 1);
          if (choosePromotionUser?.TypeReduce === 1) {
            return (
              total + priceByHour - (choosePromotionUser?.ReduceValue || 0)
            );
          } else {
            return (
              total +
              (priceByHour -
                ((priceByHour * choosePromotionUser?.ReduceValue) / 100 >=
                choosePromotionUser?.MaxReduce
                  ? choosePromotionUser?.MaxReduce
                  : (priceByHour / 100) *
                    (choosePromotionUser?.ReduceValue || 0)))
            );
          }
        case 0:
          const priceByDate =
            item?.pricesByDate?.reduce((sum, cur) => sum + cur.PriceByDate, 0) *
              (item?.amount || 1) || 0;
          if (choosePromotionUser?.TypeReduce === 1) {
            return (
              total + priceByDate - (choosePromotionUser?.ReduceValue || 0)
            );
          } else {
            return (
              total +
              (priceByDate -
                ((priceByDate * choosePromotionUser?.ReduceValue) / 100 >=
                choosePromotionUser?.MaxReduce
                  ? choosePromotionUser?.MaxReduce
                  : (priceByDate / 100) *
                    (choosePromotionUser?.ReduceValue || 0)))
            );
          }

        default:
          break;
      }
      return total;
    }, 0);
  };

  const calculateTotalOrder = useMemo(
    () => () => chooseServiceList.reduce((acc, item) => acc + item?.price, 0),
    [chooseServiceList]
  );

  const calculateTotalOrderUsePromo = useMemo(
    () => () => {
      return chooseServiceList.reduce((total, item) => {
        if (item?.promotion?.TypeReduce === 1) {
          return total + item?.price - (item?.promotion?.ReduceValue || 0);
        } else {
          return (
            total +
            (item?.price -
              ((item?.price * item?.promotion?.ReduceValue) / 100 >=
              item?.promotion?.MaxReduce
                ? item?.promotion?.MaxReduce
                : (item?.price / 100) * (item?.promotion?.ReduceValue || 0)))
          );
        }

        // switch (item?.OrderByTime) {
        //   case 1:
        //     if (choosePromotionUser?.TypeReduce === 1) {
        //       return (
        //         total +
        //         calculateTotalOrder() -
        //         (choosePromotionUser?.ReduceValue || 0)
        //       );
        //     } else {
        //       return (
        //         total +
        //         (calculateTotalOrder() -
        //           ((calculateTotalOrder() * choosePromotionUser?.ReduceValue) /
        //             100 >=
        //           choosePromotionUser?.MaxReduce
        //             ? choosePromotionUser?.MaxReduce
        //             : (calculateTotalOrder() / 100) *
        //               (choosePromotionUser?.ReduceValue || 0)))
        //       );
        //     }
        //   case 0:
        //     if (choosePromotionUser?.TypeReduce === 1) {
        //       return (
        //         total +
        //         calculateTotalOrder() -
        //         (choosePromotionUser?.ReduceValue || 0)
        //       );
        //     } else {
        //       return (
        //         total +
        //         (calculateTotalOrder() -
        //           ((calculateTotalOrder() * choosePromotionUser?.ReduceValue) /
        //             100 >=
        //           choosePromotionUser?.MaxReduce
        //             ? choosePromotionUser?.MaxReduce
        //             : (calculateTotalOrder() / 100) *
        //               (choosePromotionUser?.ReduceValue || 0)))
        //       );
        //     }

        //   default:
        //     break;
        // }
        // return total;
      }, 0);
    },
    [chooseServiceList]
  );

  const handleOnClickOrder = async () => {
    const AffiliateUserId = localStorage.getItem("qs");

    try {
      // if (user === null) {
      //   // handleSendOtp(phoneNumber, Navigate, "", null, null);
      //   return;
      // }
      if (isEmpty()) {
        const response = await Promise.all(
          chooseServiceList?.map(async (item) => {
            const res = await orderService.addOrder({
              CartItemId: item?.id,
              Price: item?.price,
              PromoCodeId: item?.promotion?.id,
              OrderNote: infoUser.Message,
              BookingUserName: infoUser.Fullname,
              BookingPhone: infoUser.Phone,
              BookingEmail: infoUser.Email,
              BookingUserId: user?.id || undefined,
              CreatorUserId: user?.id || undefined,
              BookingValueBeforeDiscount: item?.price,
              BookingValue: calculatePriceServiceUsePromo(item),
              // DepositValue: (calculatePriceUsePromo() * 15) / 100,
              PaymentType: 0,
              IsPayDeposit: 1,
              AffiliateUserId: Number(AffiliateUserId),
              numberOfTime: `${
                moment(item?.OrderByDateTo).diff(
                  moment(item?.OrderByDateFrom),
                  "days"
                ) + 1
              } ngày`,
              //     size: chooseService?.size,
              //     color: chooseService?.color,
              //     amount: chooseService?.amount,
            });
            return res.data;
          })
        );
        if (AffiliateUserId != null) {
          localStorage.removeItem("qs");
        }
        for (let i = 0; i < response.length; i++) {
          socket?.emit("newBooking", response[i]);
        }
        dispatch(getCurrentUser());
        navigate("confirm", {
          state: {
            IdentifyCode: response?.map((item) => item?.IdentifyCode),
            TenantId:
              response?.length > 0
                ? response[0]?.TenantId
                : response?.TenantId || null,
            Category:
              cate || response?.length > 0
                ? response[0]?.Category
                : response?.Category || null,
          },
        });
      } else {
        toastMessage("Vui lòng điền đầy đủ thông tin!", "warn");
      }
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
  };

  const onClickModal = () => {
    dispatch({
      type: SHOW_MODAL,
      Component: <Promotion />,
    });
  };

  const handleOnChangeText = (e) => {
    setInfoUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const CancelFreeDate = moment(
    chooseService?.OrderByTime
      ? chooseService?.OrderByTimeFrom
      : chooseService?.OrderByDateFrom
  )
    .subtract(
      chooseService?.OrderByTime
        ? chooseService?.FreeCancelByHour?.match(/\d+/g)[0]
        : chooseService?.FreeCancelByDate?.match(/\d+/g)[0],
      `${
        chooseService?.OrderByTime
          ? /ngày/.test(chooseService?.FreeCancelByHour)
            ? "days"
            : "hours"
          : /ngày/.test(chooseService?.FreeCancelByDate)
          ? "days"
          : "hours"
      }`

  const CancelFreeDate = (service) =>
    moment(
      service?.OrderByTime ? service?.OrderByTimeFrom : service?.OrderByDateFrom

    )
      .subtract(
        service?.OrderByTime
          ? service?.FreeCancelByHour?.match(/\d+/g)[0] ||
              service?.StudioRoom?.FreeCancelByHour?.match(/\d+/g)[0]
          : service?.FreeCancelByDate?.match(/\d+/g)[0] ||
              service?.StudioRoom?.FreeCancelByDate?.match(/\d+/g)[0],
        `${service?.OrderByTime ? "hours" : "days"}`
      )
      .utc()
      .format("DD/MM/YYYY HH:mm A");

  return (
    <div className="order_container">
      <Row
        gutter={[10, 0]}
        style={{
          margin: "auto",
          maxWidth: "1300px",
        }}
      >
        <Col lg={9} sm={24} xs={24} className="col">
          {chooseServiceList?.map((item, index) => (
            <div className="right_col">
              {index === 0 && <div className="text-title">Bạn đã chọn</div>}
              <div className="text-description">
                {studioDetail?.data?.Name ||
                  item?.StudioPost?.Name ||
                  item?.postName}
                <CheckCircleOutlined
                  style={{
                    height: "100%",
                    color: "green",
                    marginLeft: "0.25rem",
                  }}
                />
              </div>
              <div className="border-bottom">
                <div
                  className="d-flex"
                  style={{ height: "88px", marginRight: "0.5rem" }}
                >
                  <img
                    src={`${
                      item?.Image?.length > 0
                        ? convertImage(item?.Image[0])
                        : convertImage(item?.StudioRoom?.Image1) || ""
                    }`}
                    className="img_service"
                    alt=""
                  />
                  <div>
                    <span className="text-middle">
                      {item?.Name?.length > 30
                        ? `${item?.Name.slice(0, 30)}...`
                        : item?.Name}
                      {item?.StudioRoom?.Name?.length > 30
                        ? `${item?.StudioRoom?.Name.slice(0, 30)}...`
                        : item?.StudioRoom?.Name}
                    </span>
                    {/* <div
                          className="text-description mt-6 "
                          style={{ color: "#3F3F3F" }}
                        >
                          Trắng, size S, Số lượng 1
                        </div> */}
                    <div className="text-middle mt-8">
                      {Number(item?.OrderByTime) === 1 &&
                        `${convertPrice(
                          item?.pricesByHour?.length > 0
                            ? item?.pricesByHour[0].PriceByHour
                            : item?.price
                        )} đ`}
                      {Number(item?.OrderByTime) === 0 &&
                        (priceService(item?.pricesByDate, false) ||
                          `${convertPrice(item?.price)} đ`)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-bottom">
                <div className="text-title" style={{ marginBottom: "16px" }}>
                  Khung giờ bạn muốn đặt
                </div>
                <SelectTimeOption disabled={true} service={item} />
              </div>
              <div className="border-bottom">
                <div className="text-title" style={{ marginBottom: "8px" }}>
                  Phương thức thanh toán
                </div>
                {partnerDetail?.PaymentTypeOnline ? (
                  <p className="text-description" style={{ color: "#222222" }}>
                    Thanh toán online (E-banking, Visa, Mastercard)
                  </p>
                ) : (
                  <p className="text-description" style={{ color: "#222222" }}>
                    Thanh toán trực tiếp cho shop
                  </p>
                )}
              </div>
              <div className="border-bottom">
                <Row
                  align={"middle"}
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    lineHeight: "22px",
                    color: "#009874",
                  }}
                >
                  <CheckCircleOutlined className="me-6 mb-3" /> Miễn phí hủy
                  trước ngày {CancelFreeDate(item)}
                </Row>
              </div>
              <div
                className={`${
                  !screens?.xs &&
                  chooseServiceList.length <= 1 &&
                  "border-bottom"
                }`}
              >
                <div className="text-title" style={{ marginBottom: "8px" }}>
                  Gửi lời nhắn
                </div>
                <Input.TextArea
                  showCount
                  maxLength={100}
                  onChange={handleOnChangeText}
                  placeholder="Gửi lời nhắn cho shop"
                  className="text-area"
                  name="Message"
                  value={infoUser?.message}
                  onResize={false}
                />
              </div>
              {!screens?.xs && chooseServiceList.length <= 1 && (
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
                      {/* {promoCodeUserSave.length}  */}
                      Mã khuyến mãi{" "}
                      <RightOutlined style={{ fontSize: "10px" }} />
                    </div>
                  </div>
                  <div
                    style={{ backgroundColor: "#E3FAF4", padding: "16px 15px" }}
                  >
                    <div className="d-flex justify-content-between">
                      <div className="text-middle" style={{ color: "#222222" }}>
                        Đã chọn {chooseServiceList?.length} dịch vụ
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
                          calculatePrice() || calculateTotalOrder()
                        )}
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
                          calculatePriceUsePromo() |
                            calculateTotalOrderUsePromo()
                        )}
                        đ
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </Col>
        <Col lg={15} sm={24} xs={24} className="col">
          {chooseServiceList.length > 1 && (
            <div
              style={{
                padding: "25px",
                marginBottom: "0.5rem",
                backgroundColor: "#FFFFFF",
              }}
            >
              <div
                className="d-flex justify-content-between"
                style={{ marginBottom: "25px" }}
              >
                <div>Chọn mã khuyến mãi</div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => onClickModal()}
                >
                  {/* {promoCodeUserSave.length} */}
                  Mã khuyến mãi <RightOutlined style={{ fontSize: "10px" }} />
                </div>
              </div>
              <div style={{ backgroundColor: "#E3FAF4", padding: "16px 15px" }}>
                <div className="d-flex justify-content-between">
                  <div className="text-middle" style={{ color: "#222222" }}>
                    Đã chọn {chooseServiceList?.length} dịch vụ
                  </div>
                  <div
                    className="text-description "
                    style={{
                      textDecoration: "line-through",
                      color: "#828282",
                      marginBottom: "12px",
                    }}
                  >
                    {convertPrice(calculatePrice() || calculateTotalOrder())}
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
                      calculatePriceUsePromo() || calculateTotalOrderUsePromo()
                    )}
                    đ
                  </div>
                </div>
              </div>
            </div>
          )}
          <div
            style={{
              padding: "25px",
              marginBottom: "0.5rem",
              backgroundColor: "#FFFFFF",
            }}
          >
            {screens?.xs ? (
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "400",
                  marginBottom: "0.25rem",
                }}
              >
                Thông tin liên hệ *
              </div>
            ) : (
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
            )}
            <TextInput
              placeholder="Tên khách hàng"
              styleContainer={{ width: "100%" }}
              name="Fullname"
              onChange={(e) => handleOnChangeText(e)}
              value={infoUser?.Fullname}
            />
            <TextInput
              name="Phone"
              placeholder="Số điện thoại"
              styleContainer={{ width: "100%" }}
              onChange={(e) => handleOnChangeText(e)}
              value={infoUser?.Phone}
            />
            <div>
              <TextInput
                value={infoUser?.Email}
                required
                name="Email"
                placeholder="Email"
                styleContainer={{ width: "100%", marginBottom: "10px" }}
                onChange={(e) => handleOnChangeText(e)}
              />
            </div>
            {infoUser?.IsActiveEmail &&
            infoUser?.Email?.trim() === user?.Email?.trim() ? (
              <div style={{ color: "green" }}>
                <span>Đã được xác thực </span>
                <CheckCircleOutlined color="green" />
              </div>
            ) : Valid ? (
              <div style={{ color: "green" }}>
                <span>Đã được xác thực </span>
                <CheckCircleOutlined color="green" />
              </div>
            ) : (
              <Button
                disabled={infoUser?.Email ? false : true}
                type="primary"
                onClick={async () => {
                  try {
                    dispatch({
                      type: SHOW_MODAL,
                      Component: (
                        <VerifyOtp email={infoUser.Email} setValid={setValid} />
                      ),
                    });
                    await studioPostService.sendCodeEmail({
                      Email: infoUser.Email,
                      UserId: user?.id || undefined,
                    });
                  } catch (error) {}
                }}
                className={`${screens?.xs && "ms-5"}`}
              >
                Verify Email
              </Button>
            )}
          </div>

          {!screens?.xs ? (
            <div
              className="d-flex justify-content-end"
              style={{ marginTop: "35px" }}
            >
              {infoUser?.IsActiveEmail &&
              infoUser?.Email?.trim() === user?.Email?.trim() ? (
                <Button
                  onClick={(e) => {
                    handleOnClickOrder();
                  }}
                  type="primary"
                  // disabled={Valid ? false : true}
                  style={{
                    borderRadius: "8px",
                    height: "45px",
                    width: "270px",
                  }}
                >
                  Hoàn tất đặt
                </Button>
              ) : Valid ? (
                <Button
                  onClick={(e) => {
                    handleOnClickOrder();
                  }}
                  type="primary"
                  style={{
                    borderRadius: "8px",
                    height: "45px",
                    width: "270px",
                  }}
                >
                  Hoàn tất đặt
                </Button>
              ) : (
                <Button
                  type="primary"
                  disabled={true}
                  style={{
                    borderRadius: "8px",
                    height: "45px",
                    width: "270px",
                  }}
                >
                  Hoàn tất đặt
                </Button>
              )}
            </div>
          ) : (
            <div className="order-bottom">
              <Row align="middle" justify="space-between">
                <div className="text-medium-re" style={{ color: "#222222" }}>
                  Mã khuyến mãi
                </div>
                <Row
                  align="middle"
                  className="text-medium-re"
                  style={{ fontSize: "14px" }}
                  onClick={() => onClickModal()}
                >
                  {promoCodeUserSave.length} mã khuyến mãi{" "}
                  <RightOutlined
                    className="ms-5"
                    style={{ fontSize: "10px" }}
                  />
                </Row>
              </Row>
              <Divider className="my-12" />
              <Row align="middle" justify="space-between" className="mb-8">
                <div className="text-medium-se">
                  Đã chọn {chooseServiceList?.length} phòng
                </div>
                <div
                  className="text-medium-re"
                  style={{ textDecoration: "line-through" }}
                >
                  {/* {chooseService?.OrderByTime === 1 &&
                    `${convertPrice(
                      chooseServiceList?.reduce(
                        (total, item) =>
                          total +
                          item?.prices[0].PriceByHour *
                            calTime(
                              chooseService.OrderByTimeFrom,
                              chooseService.OrderByTimeTo
                            ),
                        0
                      )
                    )}đ`}
                  {chooseService?.OrderByTime === 0 &&
                    `${convertPrice(
                      chooseServiceList?.reduce(
                        (total, item) =>
                          total +
                          item.prices.reduce(
                            (sum, cur) => sum + cur.PriceByDate,
                            0
                          ),
                        0
                      )
                    )}đ`} */}
                  {convertPrice(calculatePrice() || calculateTotalOrder())}
                </div>
              </Row>
              <Row align="middle" justify="space-between" className="mb-10">
                <div>Bao gồm 50.000 thuế và phí</div>
                <h4 style={{ color: "#E22828" }}>
                  {convertPrice(calculatePriceUsePromo())}đ
                </h4>
              </Row>
              <Row>
                {infoUser?.IsActiveEmail &&
                infoUser?.Email?.trim() === user?.Email?.trim() ? (
                  <Button
                    onClick={(e) => {
                      handleOnClickOrder();
                    }}
                    type="primary"
                    // disabled={Valid ? false : true}
                    className="w-100 h-40px"
                    style={{ borderRadius: "8px" }}
                  >
                    Hoàn tất đặt
                  </Button>
                ) : Valid ? (
                  <Button
                    onClick={(e) => {
                      handleOnClickOrder();
                    }}
                    type="primary"
                    className="w-100 h-40px"
                    style={{ borderRadius: "8px" }}
                  >
                    Hoàn tất đặt
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    disabled={true}
                    className="w-100 h-40px"
                    style={{ borderRadius: "8px" }}
                  >
                    Hoàn tất đặt
                  </Button>
                )}
              </Row>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Index;
