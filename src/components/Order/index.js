import { CheckCircleOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Promotion from "../../components/Promotion";
import TextInput from "../../components/TextInput/TextInput";
import PopUpSignIn from "../../pages/Auth/PopUpSignIn/PopUpSignIn";
import { orderService } from "../../services/OrderService";
import { studioPostService } from "../../services/StudioPostService";
import { setStudioPostIdAction } from "../../stores/actions/promoCodeAction";
import { studioDetailAction } from "../../stores/actions/studioPostAction";
import { SHOW_MODAL } from "../../stores/types/modalTypes";
import { SET_CHOOSE_PROMOTION_USER } from "../../stores/types/promoCodeType";
import { calDate, calTime } from "../../utils/calculate";
import { convertPrice, convertTimeSendDB } from "../../utils/convert";
import { convertImage } from "../../utils/convertImage";
import { VerifyOtp } from "../Modal/verifyOtp/VerifyOtp";
import SelectTimeOption from "../SelectTimeOption/SelectTimeOption";
import { getPartnerDetail } from "../../stores/actions/RegisterPartnerAction";
import toastMessage from "../ToastMessage";
import "./order.scss";

const Index = ({ linkTo = "" }) => {
  const user = useSelector((state) => state.authenticateReducer.currentUser);
  const { chooseServiceList } = useSelector((state) => state.OrderReducer);
  const { partnerDetail } = useSelector(
    (state) => state.registerPartnerReducer
  );
  const { choosePromotionUser } = useSelector(
    (state) => state.promoCodeReducer
  );
  console.log("first,", chooseServiceList);
  const { studioDetail, filterService } = useSelector(
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
    setInfoUser(user);
    dispatch(setStudioPostIdAction(id));
    dispatch(studioDetailAction(id, cate));

    //Get Register Partner Detail of this StudioPost in order to retrieve the value of PaymentTypeOnline column ****
    dispatch(getPartnerDetail(studioDetail?.data?.TenantId));
    // *************************************************************************************************************
    window.scrollTo({ behavior: "smooth", top: 0 });
    return () => {
      dispatch({ type: SET_CHOOSE_PROMOTION_USER, data: {} });
    };
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
    switch (filterService?.OrderByTime) {
      case 1:
        const priceByHour = chooseServiceList?.reduce(
          (total, service) =>
            total +
            (service?.Sales || service?.Price || service?.PriceByHour) *
              calTime(
                filterService?.OrderByTimeFrom,
                filterService?.OrderByTimeTo
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
            (total, service) =>
              total +
              (service.Sales || service.Price || service.PriceByDate) *
                calDate(
                  filterService?.OrderByDateFrom,
                  filterService?.OrderByDateTo
                ),
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
    try {
      if (user === null) {
        // handleSendOtp(phoneNumber, Navigate, "", null, null);
        return;
      }
      if (isEmpty()) {
        let IdentifyCode = [],
          TenantId;

        //Check coi có bị trùng cái thời gian đặt room này trên database ko

        //**************************************

        if (filterService?.OrderByTime === 0) {
          for (let i = 0; i < chooseServiceList.length; i++) {
            const newData = {
              OrderByTime: 0,
              OrderByDateFrom: convertTimeSendDB(
                filterService?.OrderByDateFrom
              ),
              OrderByDateTo: convertTimeSendDB(filterService?.OrderByDateTo),
              PaymentType: 0,
              OrderNote: infoUser.Message,
              BookingUserName: infoUser.Fullname,
              BookingPhone: infoUser.Phone,
              BookingEmail: infoUser.Email,
              BookingUserId: user.id,
              CreatorUserId: user.id,
              ProductId: chooseServiceList[i].id,
              Category: cate,
              IsPayDeposit: 1,
              BookingValue: calculatePrice(),
            };
            const response = await orderService.addOrder({
              ...newData,
              numberOfTime: `${calDate(
                filterService?.OrderByDateFrom,
                filterService?.OrderByDateTo
              )} ngày`,
              initValue:
                (chooseServiceList[i].Sales ||
                  chooseServiceList[i].PriceByDate) *
                calDate(
                  filterService?.OrderByDateFrom,
                  filterService?.OrderByDateTo
                ),
            });
            IdentifyCode = [...IdentifyCode, response.data.IdentifyCode];
            TenantId = response.data.TenantId;
          }
        } else if (filterService?.OrderByTime === 1) {
          for (let i = 0; i < chooseServiceList.length; i++) {
            const newData = {
              OrderByTime: 1,
              OrderByTimeFrom: convertTimeSendDB(
                filterService?.OrderByTimeFrom
              ),
              OrderByTimeTo: convertTimeSendDB(filterService?.OrderByTimeTo),
              PaymentType: 0,
              OrderNote: infoUser.Message,
              BookingUserName: infoUser.Fullname,
              BookingPhone: infoUser.Phone,
              BookingEmail: infoUser.Email,
              BookingUserId: user.id,
              CreatorUserId: user.id,
              ProductId: chooseServiceList[i].id,
              Category: cate,
              IsPayDeposit: 1,
              BookingValue: calculatePrice(),
            };
            const response = await orderService.addOrder({
              ...newData,
              numberOfTime: `${calTime(
                filterService?.OrderByTimeFrom,
                filterService?.OrderByTimeTo
              )} giờ`,
              initValue:
                (chooseServiceList[i].Sales ||
                  chooseServiceList[i].PriceByHour) *
                calTime(
                  filterService?.OrderByTimeFrom,
                  filterService?.OrderByTimeTo
                ),
            });
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
    setInfoUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="order_container">
      <Row
        style={{
          maxWidth: "1300px",
          margin: "auto",
        }}>
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
                      style={{ height: "88px", marginRight: "0.5rem" }}>
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
                          {filterService?.OrderByTime === 1 &&
                            convertPrice(item.Sales || item.PriceByHour)}
                          {filterService?.OrderByTime === 0 &&
                            convertPrice(item.Sales || item.PriceByDate)}
                          đ
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-bottom">
                    <div
                      className="text-title"
                      style={{ marginBottom: "16px" }}>
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
                name="Message"
                value={infoUser?.message}
                onResize={false}
              />
            </div>
            <div
              style={{
                marginBottom: "0.5rem",
                backgroundColor: "#FFFFFF",
              }}>
              <div
                className="d-flex justify-content-between"
                style={{ marginBottom: "28px" }}>
                <div>Chọn mã khuyến mãi</div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => onClickModal()}>
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
                    }}>
                    {filterService?.OrderByTime === 1 &&
                      `${convertPrice(
                        chooseServiceList?.reduce(
                          (total, service) =>
                            total +
                            (service.Price || service.PriceByHour) *
                              calTime(
                                filterService?.OrderByTimeFrom,
                                filterService?.OrderByTimeTo
                              ),
                          0
                        )
                      )}đ`}
                    {filterService?.OrderByTime === 0 &&
                      `${convertPrice(
                        chooseServiceList?.reduce(
                          (total, service) =>
                            total +
                            (service.Price || service.PriceByDate) *
                              calDate(
                                filterService?.OrderByDateFrom,
                                filterService?.OrderByDateTo
                              ),
                          0
                        )
                      )}đ`}
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div
                    className="text-description"
                    style={{ color: "#616161" }}>
                    Bao gồm 50.000đ thuế và phí
                  </div>
                  <div
                    className=""
                    style={{
                      color: "#E22828",
                      fontSize: "20px",
                      lineHeight: "28px",
                      fontWeight: "700",
                    }}>
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
            }}>
            <div
              className="text-title"
              style={{
                fontSize: "22px",
                lineHeight: "30px",
                marginBottom: "0.25rem",
              }}>
              Vui lòng điền thông tin của bạn
            </div>
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
                    });
                  } catch (error) {
                    console.log(error);
                  }
                }}>
                Verify Email
              </Button>
            )}
          </div>

          <div
            className="d-flex justify-content-end"
            style={{ marginTop: "35px" }}>
            {infoUser?.IsActiveEmail &&
            infoUser?.Email?.trim() === user?.Email?.trim() ? (
              <PopUpSignIn
                onClick={(e) => {
                  handleOnClickOrder();
                }}>
                <Button
                  type="primary"
                  // disabled={Valid ? false : true}
                  style={{
                    borderRadius: "8px",
                    height: "45px",
                    width: "270px",
                  }}>
                  Hoàn tất đặt
                </Button>
              </PopUpSignIn>
            ) : Valid ? (
              <PopUpSignIn
                onClick={(e) => {
                  handleOnClickOrder();
                }}>
                <Button
                  type="primary"
                  style={{
                    borderRadius: "8px",
                    height: "45px",
                    width: "270px",
                  }}>
                  Hoàn tất đặt
                </Button>
              </PopUpSignIn>
            ) : (
              <Button
                type="primary"
                disabled={true}
                style={{
                  borderRadius: "8px",
                  height: "45px",
                  width: "270px",
                }}>
                Hoàn tất đặt
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
