import { CheckCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Grid, Input, Row } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
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
import { SET_CHOOSE_SERVICE } from "../../stores/types/OrderType";
import { SET_CHOOSE_PROMOTION_USER } from "../../stores/types/promoCodeType";
import { SET_FILTER_SERVICE } from "../../stores/types/studioPostType";
import { calDate, calTime } from "../../utils/calculate";
import { convertPrice } from "../../utils/convert";
import { convertImage } from "../../utils/convertImage";
import { VerifyOtp } from "../Modal/verifyOtp/VerifyOtp";
import SelectTimeOption from "../SelectTimeOption/SelectTimeOption";
import toastMessage from "../ToastMessage";
import "./order.scss";

const { useBreakpoint } = Grid;

const Index = ({ linkTo = "" }) => {
  const screens = useBreakpoint();
  const socket = useSelector((state) => state.userReducer.socket);
  const user = useSelector((state) => state.authenticateReducer.currentUser);
  const { chooseServiceList } = useSelector((state) => state.OrderReducer);
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
    // if (chooseServiceList.length <= 0) {
    //   navigate(`${location.pathname.split("/order")[0]}`);
    // }
    setInfoUser(user);
    dispatch(setStudioPostIdAction(id));
    dispatch(studioDetailAction(id, cate));
    dispatch(getPartnerDetail(studioDetail?.data?.TenantId));
    return () => {
      // dispatch({ type: SET_CHOOSE_PROMOTION_USER, data: {} });
      // dispatch({ type: SET_CHOOSE_SERVICE, payload: [] });
      // dispatch({ type: SET_FILTER_SERVICE, payload: {} });
    };
  }, [cate, dispatch, id, user]);
  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, []);

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
    switch (chooseService?.OrderByTime) {
      case 1:
        return chooseServiceList?.reduce(
          (total, service) =>
            total +
            service?.PriceByHour *
              calTime(
                chooseService?.OrderByTimeFrom,
                chooseService?.OrderByTimeTo
              ),
          0
        );
      case 0:
        return chooseServiceList?.reduce(
          (total, service) =>
            total +
            service.PriceByDate *
              calDate(
                chooseService?.OrderByDateFrom,
                chooseService?.OrderByDateTo
              ),
          0
        );

      default:
        break;
    }
  };
  const calculateCommisionAffiliate = (price) => {
    return (price / 1.1) * 0.05;
  };

  const calculatePriceUsePromo = () => {
    switch (chooseService?.OrderByTime) {
      case 1:
        const priceByHour = chooseServiceList?.reduce(
          (total, item) =>
            total +
            item.prices[0].PriceByHour *
              calTime(
                chooseService.OrderByTimeFrom,
                chooseService.OrderByTimeTo
              ),
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
      case 0:
        const priceByDate =
          chooseServiceList?.reduce(
            (total, item) =>
              total +
              item.prices.reduce((sum, cur) => sum + cur.PriceByDate, 0),
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

  const handleOnClickOrder = async () => {
    const AffiliateUserId = localStorage.getItem("qs");

    try {
      // if (user === null) {
      //   // handleSendOtp(phoneNumber, Navigate, "", null, null);
      //   return;
      // }
      if (isEmpty()) {
        let IdentifyCode = [],
          TenantId;

        //Check coi có bị trùng cái thời gian đặt room này trên database ko

        //**************************************
        let response;
        if (chooseService?.OrderByTime === 0) {
          for (let i = 0; i < chooseServiceList.length; i++) {
            const newData = {
              OrderByTime: 0,
              OrderByDateFrom: moment(new Date(chooseService?.OrderByDateFrom))
                .add(studioDetail?.data?.HourOpenDefault, "h")
                .add(studioDetail?.data?.MinutesOpenDefault, "m"),
              OrderByDateTo: moment(new Date(chooseService?.OrderByDateTo))
                .add(studioDetail?.data?.HourCloseDefault, "h")
                .add(studioDetail?.data?.MinutesCloseDefault, "m"),
              PaymentType: 0,
              OrderNote: infoUser.Message,
              BookingUserName: infoUser.Fullname,
              BookingPhone: infoUser.Phone,
              BookingEmail: infoUser.Email,
              BookingUserId: user?.id || undefined,
              CreatorUserId: user?.id || undefined,
              ProductId: chooseServiceList[i].id,
              Category: cate,
              IsPayDeposit: 1,
              BookingValueBeforeDiscount: calculatePrice(),
              BookingValue: calculatePriceUsePromo(),
              DepositValue: (calculatePriceUsePromo() * 15) / 100,
              AffiliateCommission: calculateCommisionAffiliate(
                calculatePriceUsePromo()
              ),
              PromoCodeId: choosePromotionUser.id,
              AffiliateUserId: Number(AffiliateUserId),
            };
            response = await orderService.addOrder({
              ...newData,
              numberOfTime: `${calDate(
                chooseService?.OrderByDateFrom,
                chooseService?.OrderByDateTo
              )} ngày`,
              initValue:
                (chooseServiceList[i].Sales ||
                  chooseServiceList[i].PriceByDate) *
                calDate(
                  chooseService?.OrderByDateFrom,
                  chooseService?.OrderByDateTo
                ),
            });
            if (AffiliateUserId != null) {
              localStorage.removeItem("qs");
            }
            IdentifyCode = [...IdentifyCode, response.data.IdentifyCode];
            TenantId = response.data.TenantId;
          }
        } else if (chooseService?.OrderByTime === 1) {
          for (let i = 0; i < chooseServiceList.length; i++) {
            const newData = {
              OrderByTime: 1,
              OrderByTimeFrom: moment(chooseService?.OrderByTimeFrom),
              OrderByTimeTo: moment(chooseService?.OrderByTimeTo),
              PaymentType: 0,
              OrderNote: infoUser.Message,
              BookingUserName: infoUser.Fullname,
              BookingPhone: infoUser.Phone,
              BookingEmail: infoUser.Email,
              BookingUserId: user?.id || undefined,
              CreatorUserId: user?.id || undefined,
              ProductId: chooseServiceList[i].id,
              Category: cate,
              IsPayDeposit: 1,
              BookingValueBeforeDiscount: calculatePrice(),
              BookingValue: calculatePriceUsePromo(),
              DepositValue: (calculatePriceUsePromo() * 15) / 100,
              AffiliateCommission: calculateCommisionAffiliate(
                calculatePriceUsePromo()
              ),
              PromoCodeId: choosePromotionUser.id,
              AffiliateUserId: Number(AffiliateUserId),
            };
            response = await orderService.addOrder({
              ...newData,
              numberOfTime: `${calTime(
                chooseService?.OrderByTimeFrom,
                chooseService?.OrderByTimeTo
              )} giờ`,
              initValue:
                (chooseServiceList[i].Sales ||
                  chooseServiceList[i].PriceByHour) *
                calTime(
                  chooseService?.OrderByTimeFrom,
                  chooseService?.OrderByTimeTo
                ),
            });
            if (AffiliateUserId != null) {
              localStorage.removeItem("qs");
            }
            IdentifyCode = [...IdentifyCode, response.data.IdentifyCode];
            TenantId = response.data.TenantId;
          }
        }
        socket?.emit("newBooking", response.data);
        dispatch(getCurrentUser());
        navigate("confirm", {
          state: { IdentifyCode, TenantId, Category: cate },
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
    setInfoUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="order_container">
      <Row
        gutter={[10, 0]}
        style={{
          margin: "auto",
          maxWidth: "1300px",
        }}
      >
        <Col lg={9} sm={24} className="col">
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
                          {item?.Name.length > 30
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
                          {chooseService?.OrderByTime === 1 &&
                            convertPrice(item.PriceByHour)}
                          {chooseService?.OrderByTime === 0 &&
                            convertPrice(item.PriceByDate)}
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
                    <SelectTimeOption disabled={true} />
                  </div>
                </>
              ))}
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
            <div className={`${!screens?.xs && "border-bottom"}`}>
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
            {!screens?.xs && (
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
                      {chooseService?.OrderByTime === 1 &&
                        `${convertPrice(
                          chooseService?.pricesByHour[0].PriceByHour *
                            calTime(
                              chooseService.OrderByTimeFrom,
                              chooseService.OrderByTimeTo
                            )
                        )}đ`}
                      {chooseService?.OrderByTime === 0 &&
                        `${convertPrice(
                          chooseService?.pricesByDate.reduce(
                            (total, item) => total + item?.priceByDate
                          ),
                          0
                        )}đ`}
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
                      {convertPrice(calculatePriceUsePromo())}đ
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Col>
        <Col lg={15} sm={24} xs={24} className="col">
          <div
            style={{
              padding: "25px 25px",
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
                  } catch (error) {
                    console.log(error);
                  }
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
                  {chooseService?.OrderByTime === 1 &&
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
                    )}đ`}
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
