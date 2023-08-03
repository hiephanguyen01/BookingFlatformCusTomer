import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  HeartFilled,
  HeartOutlined,
  HomeOutlined,
  LoadingOutlined,
  MoreOutlined,
  ShareAltOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Grid, Popover, Rate, Row, message } from "antd";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import "react-lightbox-pack/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import images from "../../assets/images";
import CommentRating from "../../components/CommentRating";
import ImagePost from "../../components/imagePost/ImagePost";
import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";
import PromotionList from "../../components/PromotionList/PromotionList";
import ReadMoreDesc from "../../components/ReadMoreDesc";
import SelectTimeOptionService from "../../components/SelectTimeOptionService/SelectTimeOptionService";
import Table from "../../components/Table";
import toastMessage from "../../components/ToastMessage";
// import { addCart, chooseServiceAction } from "../../stores/actions/OrderAction";
import { addCart, chooseServiceAction } from "../../stores/actions/CartAction";
import { getPromotionCodeUserSave } from "../../stores/actions/promoCodeAction";
import { getDetailRoomAction } from "../../stores/actions/roomAction";
import {
  getLikeStudioPostAction,
  getPromotionByTenantId,
  getStudioSimilarAction,
  handlerSelectServiceAction,
  studioDetailAction,
} from "../../stores/actions/studioPostAction";
import { SHOW_MODAL } from "../../stores/types/modalTypes";
import {
  DELETE_CHOOSE_SERVICE,
  SET_CHOOSE_SERVICE_LIST,
} from "../../stores/types/CartType";
import { SET_PROMOTION_CODE } from "../../stores/types/studioPostType";
import { calTime, priceService } from "../../utils/calculate";
import { convertPrice } from "../../utils/convert";
import { convertImage } from "../../utils/convertImage";
// import { openNotification } from "../../utils/Notification";
import chair from "../../assets/svg/chair.svg";
import conditional from "../../assets/svg/conditional.svg";
import expand from "../../assets/svg/expand.svg";
import { IMG } from "../../utils/REACT_APP_DB_BASE_URL_IMG";
import PopUpSignIn from "../Auth/PopUpSignIn/PopUpSignIn";
import styles from "./Detail.module.scss";
import { Report } from "./Report";
import SlideCard from "./SlideCard";
import BackNav from "../../components/BackNav/BackNav";
import { ReactComponent as LocationIcon } from "../../assets/svg/location.svg";
import queryString from "query-string";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination } from "swiper";

import { StickyContainer, Sticky } from "react-sticky";
import InfoServiceDesk from "./components/InfoServiceDesk/InfoServiceDesk.js";
import { cartService } from "../../services/CartService";

const COLUMN = [
  { title: "Loại phòng", size: 7 },
  { title: "Chọn thời gian", size: 10 },
  { title: "Chọn phòng ", size: 7 },
];
const cx = classNames.bind(styles);

const { useBreakpoint } = Grid;

const StudioDetail = () => {
  const screens = useBreakpoint();

  const { id } = useParams();
  const { pathname, state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.authenticateReducer);
  const { chooseServiceList } = useSelector((state) => state.CartReducer);
  const {
    studioDetail,
    studioNear,
    listStudioSimilar,
    chooseService,
    listTimeSelected,
  } = useSelector((state) => state.studioPostReducer);
  const cate =
    pathname.split("/").filter((item) => item !== "")[1] === "studio"
      ? 1
      : undefined;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
    dispatch({ type: "SET_SELECT_TIME_ORDER" });
    dispatch({ type: SET_CHOOSE_SERVICE_LIST, payload: [] });
    return () => {
      dispatch({ type: SET_PROMOTION_CODE, data: [] });
      dispatch({ type: "SET_SERVICE_SELECT", payload: null });
      dispatch({ type: "SET_STUDIO_DETAIL", payload: {} });
      dispatch({ type: "SET_TIME_ORDER", data: [] });
    };
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(getPromotionCodeUserSave());
    dispatch(getPromotionByTenantId(studioDetail?.data?.TenantId));
  }, [studioDetail, dispatch]);

  useEffect(() => {
    if (currentUser !== null) {
      dispatch(studioDetailAction(id, cate, currentUser?.id));
    } else {
      dispatch(studioDetailAction(id, cate));
    }
  }, [id, dispatch, cate, currentUser]);

  useEffect(() => {
    dispatch(getDetailRoomAction(id));
    dispatch(getStudioSimilarAction(id, cate));
  }, [cate, id, dispatch]);

  const handleReport = () => {
    dispatch({
      type: SHOW_MODAL,
      Component: <Report category={cate} postId={id} />,
    });
  };

  const ROW = (dataSource) => {
    return dataSource?.map((data, index) => [
      {
        key: "title",
        render: () => <InfoServiceDesk data={data} />,
      },
      {
        key: "desc",
        render: (item) => {
          return (
            <SelectTimeOptionService service={{ ...data, category: cate }} />
          );
        },
      },
      {
        key: "currency",
        render: () => (
          <>
            {listTimeSelected?.find((item) => item?.id === data?.id)
              ?.OrderByTime !== -1 && (
              <div className="mb-20">
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      color: "#E22828",
                      fontSize: "20px",
                      fontWeight: "700",
                    }}
                  >
                    {listTimeSelected?.find((item) => item.id === data?.id)
                      ?.OrderByTime === 1 &&
                      priceService(data?.pricesByHour, true)}
                    {listTimeSelected?.find((item) => item.id === data?.id)
                      ?.OrderByTime === 0 &&
                      priceService(data?.pricesByDate, false)}
                  </span>
                  <span
                    style={{
                      color: "#828282",
                      textDecoration: "line-through",
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                  >
                    {listTimeSelected?.find((item) => item.id === data?.id)
                      ?.OrderByTime === 1 &&
                      priceService(data?.pricesByHour, true)}
                    {listTimeSelected?.find((item) => item.id === data?.id)
                      ?.OrderByTime === 0 &&
                      priceService(data?.pricesByDate, false)}
                  </span>
                </div>
                <p
                  style={{
                    color: "#828282",
                    fontSize: "14px",
                    fontWeight: "400",
                  }}
                >
                  {data?.PriceNote}
                </p>
              </div>
            )}
            <div className="">
              {chooseServiceList?.find((item) => item.id === data?.id) ? (
                <Button
                  type="default"
                  size="large"
                  onClick={() => {
                    dispatch({ type: DELETE_CHOOSE_SERVICE });
                    dispatch({ type: "SET_SELECT_TIME_ORDER" });
                  }}
                  style={{
                    width: "100%",
                    color: "#000",
                    backgroundColor: "#E7E7E7",
                    border: "none",

                    borderRadius: "8px",
                    fontWeight: "700",
                    fontSize: "13px",
                    lineHeight: "19px",

                    textTransform: "uppercase",
                  }}
                >
                  Bỏ chọn
                </Button>
              ) : (
                <Button
                  onClick={() => handleChooseService(data)}
                  style={{
                    width: "100%",
                    borderRadius: "8px",
                    fontWeight: "700",
                    fontSize: "13px",

                    lineHeight: "19px",
                    textTransform: "uppercase",
                  }}
                  size="large"
                >
                  Chọn
                </Button>
              )}
            </div>
          </>
        ),
      },
    ]);
  };

  const handleChooseService = (data) => {
    const findSelectTime = listTimeSelected.find((item) => item.id === data.id);
    if (findSelectTime) {
      if (
        findSelectTime?.OrderByTime === 1 &&
        findSelectTime?.OrderByTimeFrom !== undefined &&
        findSelectTime?.OrderByTimeFrom !== "" &&
        findSelectTime?.OrderByTimeTo !== undefined &&
        findSelectTime?.OrderByTimeTo !== "" &&
        findSelectTime?.OrderByTimeTo !== findSelectTime?.OrderByTimeFrom
      ) {
        dispatch(
          handlerSelectServiceAction(
            { ...data, nameService: studioDetail?.data?.Name },
            findSelectTime
          )
        );
      } else if (
        findSelectTime?.OrderByTime === 0 &&
        findSelectTime?.OrderByDateFrom !== undefined &&
        findSelectTime?.OrderByDateFrom !== "" &&
        findSelectTime?.OrderByDateTo !== undefined &&
        findSelectTime?.OrderByDateTo !== ""
      ) {
        dispatch(
          handlerSelectServiceAction(
            { ...data, nameService: studioDetail?.data?.Name },
            findSelectTime
          )
        );
      } else {
        return toastMessage("Vui lòng chọn thời gian để xem giá!", "warning");
      }
    } else {
      return toastMessage("Vui lòng chọn thời gian để xem giá!", "warning");
    }
  };

  const handleBook = async () => {
    if (chooseService) {
      if (currentUser) {
        const res = await cartService.addToCart({
          category: 1,
          CategoryPostId: studioDetail?.data?.id,
          serviceId: chooseService?.id,
          OrderByTime: chooseService?.OrderByTime,
          OrderByTimeFrom: chooseService?.OrderByTimeFrom,
          OrderByTimeTo: chooseService?.OrderByTimeTo,
          OrderByDateFrom: chooseService?.OrderByDateFrom,
          OrderByDateTo: chooseService?.OrderByDateTo,
        });
        const arr = [
          {
            id: res?.data?.data?.cartItemId,
            category: 1,
          },
        ];
        const createQuery = queryString.stringify({
          cartItems: JSON.stringify(arr),
        });
        navigate(`order?${createQuery}`);
      } else {
        navigate(`order`);
      }
    } else {
      toastMessage("Bạn cần chọn dịch vụ!", "warn");
    }
  };

  // const handleAddOrder = (data) => {
  //   const findSelectTime = listTimeSelected.find((item) => item.id === data.id);
  //   if (findSelectTime) {
  //     if (
  //       findSelectTime?.OrderByTime === 1 &&
  //       findSelectTime?.OrderByTimeFrom !== undefined &&
  //       findSelectTime?.OrderByTimeFrom !== "" &&
  //       findSelectTime?.OrderByTimeTo !== undefined &&
  //       findSelectTime?.OrderByTimeTo !== "" &&
  //       findSelectTime?.OrderByTimeTo !== findSelectTime?.OrderByTimeFrom
  //     ) {
  //       dispatch(handlerSelectServiceAction(data, findSelectTime));
  //     } else if (
  //       findSelectTime?.OrderByTime === 0 &&
  //       findSelectTime?.OrderByDateFrom !== undefined &&
  //       findSelectTime?.OrderByDateFrom !== "" &&
  //       findSelectTime?.OrderByDateTo !== undefined &&
  //       findSelectTime?.OrderByDateTo !== ""
  //     ) {
  //       dispatch(handlerSelectServiceAction(data, findSelectTime));
  //     } else {
  //       return toastMessage("Vui lòng chọn thời gian để xem giá!", "warning");
  //     }
  //   } else {
  //     return toastMessage("Vui lòng chọn thời gian để xem giá!", "warning");
  //   }
  // };

  const handleChangeLike = (e) => {
    if (currentUser) {
      dispatch(getLikeStudioPostAction(id, cate, currentUser?.id));
    }
  };

  return (
    <>
      <MetaDecorator
        description={studioDetail?.data?.Description}
        imgAlt={studioDetail?.data?.Image[0]}
        imgUrl={IMG(studioDetail?.data?.Image[0])}
        title={studioDetail?.data?.Name}
      />
      {Object.keys(studioDetail).length <= 0 ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "white",
              width: "fit-content",
              borderRadius: "50%",
              padding: "10px",
              margin: "10px",
            }}
          >
            <LoadingOutlined style={{ fontSize: "40px" }} />
          </div>
        </div>
      ) : (
        <div className="container_detail">
          {screens?.xs && (
            <BackNav
              to={state?.pathname || "/home/filter?category=1"}
              icon={
                <Popover
                  placement="bottomRight"
                  content={
                    <Row
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        padding: "10px",
                      }}
                    >
                      <Col span={24}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            navigate("/home");
                          }}
                        >
                          <HomeOutlined style={{ fontSize: "20px" }} />
                          <span
                            style={{ fontSize: "18px", fontWeight: "bold" }}
                          >
                            Trở về trang chủ
                          </span>
                        </div>
                      </Col>{" "}
                      <Col span={24}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            handleReport();
                            setOpen(false);
                          }}
                        >
                          <ExclamationCircleOutlined
                            style={{ fontSize: "20px" }}
                          />
                          <span
                            style={{ fontSize: "18px", fontWeight: "bold" }}
                          >
                            Báo cáo
                          </span>
                        </div>
                      </Col>{" "}
                      <Col span={24}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            cursor: "pointer",
                          }}
                          onClick={() => setOpen(false)}
                        >
                          <ShareAltOutlined style={{ fontSize: "20px" }} />
                          <span
                            style={{ fontSize: "18px", fontWeight: "bold" }}
                          >
                            Chia sẻ
                          </span>
                        </div>
                      </Col>
                    </Row>
                  }
                  trigger="click"
                  visible={open}
                  onVisibleChange={(value) => setOpen(value)}
                >
                  <MoreOutlined className={cx("item")} />
                </Popover>
              }
            />
          )}
          <div className={cx("wrapper")}>
            <div className={cx("studioDetail")}>
              {screens?.xs ? (
                <div>
                  <Swiper
                    pagination={{
                      dynamicBullets: true,
                    }}
                    modules={[Pagination]}
                    className={cx("swiper-slide-detail")}
                  >
                    {studioDetail?.data?.Image.map((item) => (
                      <SwiperSlide>
                        <img src={convertImage(item)} alt="" />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className={cx("box1")}>
                    <div
                      className={cx(
                        "title",
                        "d-flex justify-content-start align-items-center"
                      )}
                    >
                      <h4>{studioDetail?.data?.Name} </h4>
                      <CheckCircleOutlined
                        style={{ fontSize: "20px", color: "#03AC84" }}
                      />
                    </div>
                    <div className={cx("address")}>
                      <img src={images.address} alt="sa" />
                      <span>{studioDetail?.data?.Address}</span>
                    </div>
                    <Row justify="space-between" className="w-100">
                      <div className={cx("rate")}>
                        <Rate
                          disabled
                          allowHalf
                          value={studioDetail?.data?.TotalRate}
                        ></Rate>
                        <span>{studioDetail?.data?.TotalRate}</span>
                        <span className={cx("number-order")}></span>
                        <span style={{ fontSize: "15px" }}>
                          {studioDetail?.data?.BookingCount} đã đặt{" "}
                        </span>
                      </div>
                      <PopUpSignIn
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        {studioDetail?.data?.UsersLiked ? (
                          <HeartFilled
                            onClick={handleChangeLike}
                            className={cx("item")}
                          />
                        ) : (
                          <HeartOutlined
                            onClick={handleChangeLike}
                            className={cx("item")}
                          />
                        )}
                      </PopUpSignIn>
                    </Row>
                  </div>
                </div>
              ) : (
                <div className={cx("box1")}>
                  <div className={cx("top")}>
                    <div className={cx("title")}>
                      <h3>{studioDetail?.data?.Name} </h3>
                      <CheckCircleOutlined
                        style={{ fontSize: "20px", color: "#03AC84" }}
                      />
                    </div>
                    <div className={cx("icons")}>
                      <PopUpSignIn
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        {studioDetail?.data?.UsersLiked ? (
                          <HeartFilled
                            onClick={handleChangeLike}
                            className={cx("item")}
                          />
                        ) : (
                          <HeartOutlined
                            onClick={handleChangeLike}
                            className={cx("item")}
                          />
                        )}
                      </PopUpSignIn>
                      <Popover
                        placement="bottomRight"
                        content={
                          <div
                            onClick={() => handleReport()}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                              padding: "10px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px",
                                cursor: "pointer",
                              }}
                            >
                              <WarningOutlined style={{ fontSize: "20px" }} />
                              <span
                                style={{
                                  fontSize: "18px",
                                  fontWeight: "bold",
                                }}
                              >
                                Báo cáo
                              </span>
                            </div>
                          </div>
                        }
                        trigger="click"
                      >
                        <MoreOutlined className={cx("item")} />
                      </Popover>
                    </div>
                  </div>
                  <div className={cx("address")}>
                    <LocationIcon />
                    <span>{studioDetail?.data?.Address}</span>
                  </div>
                  <div className={cx("rate")}>
                    <Rate
                      disabled
                      allowHalf
                      value={studioDetail?.data?.TotalRate}
                    ></Rate>
                    <div className="mt-2">{studioDetail?.data?.TotalRate}</div>
                    <div className={cx("number-order")}></div>
                    <div style={{ fontSize: "15px" }} className="mt-2">
                      {studioDetail?.data?.BookingCount} đã đặt{" "}
                    </div>
                  </div>

                  <ImagePost data={studioDetail?.data?.Image} />
                </div>
              )}
              <Row className={cx("box2")} gutter={[12, 0]}>
                <Col lg={16} md={16} sm={16} xs={24}>
                  <div className={cx("left")}>
                    <div className={cx("description")}>
                      <ReadMoreDesc title="Mô tả">
                        {studioDetail?.data?.Description}
                      </ReadMoreDesc>
                    </div>
                    <div className={cx("sale")}>
                      <PromotionList />
                    </div>
                    <Col
                      lg={0}
                      md={0}
                      sm={0}
                      xs={24}
                      className={cx("map-mobile")}
                    >
                      <div className={cx("map")}>
                        <h3>Xem trên bản đồ</h3>
                        <div className={cx("address")}>
                          <LocationIcon className="me-5" />
                          <span>{studioDetail?.data?.Address}</span>
                        </div>
                        <div className={cx("mapouter")}>
                          <div className={cx("gmap_canvas")}>
                            <iframe
                              title="map"
                              className={cx("gmap_iframe")}
                              width="100%"
                              frameBorder={0}
                              scrolling="no"
                              marginHeight={0}
                              marginWidth={0}
                              src={`https://www.google.com/maps?q=${studioDetail?.data?.Latitude},${studioDetail?.data?.Longtitude}&t=&z=13&ie=UTF8&iwloc=B&output=embed`}
                            />
                          </div>
                        </div>
                      </div>
                    </Col>
                  </div>
                </Col>
                <Col lg={8} md={8} sm={8} xs={0}>
                  <div className={cx("right")}>
                    <div className={cx("map")}>
                      <h3>Xem trên bản đồ</h3>
                      <div className={cx("address")}>
                        <LocationIcon className="me-5" />
                        <span>{studioDetail?.data?.Address}</span>
                      </div>
                      <div className={cx("mapouter")}>
                        <div className={cx("gmap_canvas")}>
                          <iframe
                            title="map"
                            className={cx("gmap_iframe")}
                            width="100%"
                            frameBorder={0}
                            scrolling="no"
                            marginHeight={0}
                            marginWidth={0}
                            src={`https://www.google.com/maps?q=${studioDetail?.data?.Latitude},${studioDetail?.data?.Longtitude}&t=&z=13&ie=UTF8&iwloc=B&output=embed`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <StickyContainer>
                <Row className={cx("box2")} gutter={[12, 0]}>
                  <Col lg={16} md={16} sm={16} xs={24}>
                    {studioDetail &&
                      (screens?.xs ? (
                        <Row className="w-100" gutter={[0, 15]}>
                          {studioDetail?.service?.map((data) => (
                            <Col
                              span={24}
                              className={cx("wrapper-service-mobile")}
                            >
                              <Swiper
                                pagination={{
                                  dynamicBullets: true,
                                }}
                                modules={[Autoplay, Pagination]}
                                className={cx("service-image-swiper")}
                                autoplay={{
                                  delay: 2500,
                                  disableOnInteraction: false,
                                }}
                              >
                                {data?.Image.map((item) => (
                                  <SwiperSlide>
                                    <img
                                      src={convertImage(item)}
                                      alt=""
                                      className="w-100 h-100"
                                    />
                                  </SwiperSlide>
                                ))}
                              </Swiper>
                              <div className={cx("service_name")}>
                                {data?.Name}
                              </div>
                              <div
                                className="mt-10"
                                style={{
                                  color: "#222222",
                                  fontSize: "16px",
                                  fontWeight: "700",
                                }}
                              >
                                <div>
                                  <img
                                    alt=""
                                    src={expand}
                                    className="me-10 mb-2"
                                    style={{ fontSize: "15px" }}
                                  />
                                  Kích thước
                                </div>
                                <ul className={cx("detail-description")}>
                                  <li>Diện tích {data?.Area}m2</li>
                                  <li>Chiều rộng {data?.Width}m</li>
                                  <li>Chiều dài {data?.Length}m</li>
                                  <li>Chiều cao trần {data?.Height}m</li>
                                </ul>
                              </div>
                              <div
                                className="mt-10"
                                style={{
                                  color: "#222222",
                                  fontSize: "16px",
                                  fontWeight: "700",
                                }}
                              >
                                <div>
                                  <img
                                    alt=""
                                    src={chair}
                                    className="me-10 mb-2"
                                    style={{ fontSize: "15px" }}
                                  />
                                  Thiết bị có sẵn
                                </div>
                                <ul className={cx("detail-description")}>
                                  {data?.HasBackground && (
                                    <li>{data?.BackgroundDescription}</li>
                                  )}
                                  {data?.HasLamp && (
                                    <li>{data?.LampDescription}</li>
                                  )}
                                  {data?.HasTable && <li>Bàn</li>}
                                  {data?.HasChair && <li>Ghế</li>}
                                  {data?.HasSofa && <li>Sofa</li>}
                                  {data?.HasFlower && <li>Hoa</li>}
                                  {data?.HasOtherDevice && (
                                    <li>{data?.OtherDeviceDescription}</li>
                                  )}
                                </ul>
                              </div>
                              <div
                                className="mt-10"
                                style={{
                                  color: "#222222",
                                  fontSize: "16px",
                                  fontWeight: "700",
                                }}
                              >
                                <div>
                                  <img
                                    alt=""
                                    src={conditional}
                                    className="me-10 mb-2"
                                    style={{ fontSize: "15px" }}
                                  />
                                  Tiện ích đi kèm
                                </div>
                                <ul className={cx("detail-description")}>
                                  {data?.HasAirConditioner && <li>Máy lạnh</li>}
                                  {data?.HasFan && <li>Quạt</li>}
                                  {data?.HasDressingRoom && (
                                    <li>Phòng thay đồ riêng</li>
                                  )}
                                  {data?.HasWC && <li>Nhà vệ sinh</li>}
                                  {data?.HasCamera && <li>Camera</li>}
                                  {data?.HasWifi && <li>Wifi</li>}
                                  {data?.HasMotorBikeParking && (
                                    <li>Chổ để xe máy</li>
                                  )}
                                  {data?.HasCarParking && (
                                    <li>Chổ để xe ô tô</li>
                                  )}
                                  {data?.HasSupporter && <li>Người hỗ trợ</li>}
                                </ul>
                              </div>
                              <div
                                className="mt-10"
                                style={{
                                  color: "#222222",
                                  fontSize: "16px",
                                  fontWeight: "700",
                                }}
                              >
                                <div>
                                  <TeamOutlined
                                    className="me-10 mb-2"
                                    style={{ fontSize: "15px" }}
                                  />
                                  Số lượng khách
                                </div>
                                <ul className={cx("detail-description")}>
                                  <li>
                                    Số lượng khách tối đa:{" "}
                                    {data?.MaximumCustomer} người
                                  </li>
                                  <li>
                                    Phụ thu: {convertPrice(data?.Surcharge)}{" "}
                                    VND/người
                                  </li>
                                </ul>
                              </div>
                              <Divider style={{ margin: "10px 0" }} />
                              <Row>
                                <Col span={12}>
                                  <h5>Chọn thời gian</h5>
                                </Col>
                                <Col span={24}>
                                  <SelectTimeOptionService
                                    service={{ ...data, category: cate }}
                                  />
                                </Col>
                              </Row>
                              <Divider style={{ margin: "0 0 20px" }} />
                              <Row justify="end">
                                {listTimeSelected.length > 0 &&
                                  listTimeSelected?.find(
                                    (item) => item.id === data?.id
                                  ) && (
                                    <>
                                      <Col
                                        span={24}
                                        style={{ textAlign: "end" }}
                                      >
                                        <div>Giá cho thời gian bạn đã chọn</div>
                                      </Col>{" "}
                                      <div
                                        className="mb-20"
                                        style={{ textAlign: "end" }}
                                      >
                                        <div
                                          style={{
                                            display: "flex",
                                            gap: "10px",
                                            alignItems: "center",
                                            flexWrap: "wrap",
                                            justifyContent: "end",
                                          }}
                                        >
                                          <span
                                            style={{
                                              color: "#828282",
                                              textDecoration: "line-through",
                                              fontSize: "16px",
                                              fontWeight: "400",
                                            }}
                                          >
                                            {listTimeSelected?.find(
                                              (item) => item.id === data?.id
                                            )?.OrderByTime === 1 && (
                                              <>
                                                {listTimeSelected?.find(
                                                  (item) => item.id === data?.id
                                                )?.pricesByHour?.length > 0 ? (
                                                  <>
                                                    {(
                                                      listTimeSelected?.find(
                                                        (item) =>
                                                          item.id === data?.id
                                                      )?.pricesByHour[0]
                                                        ?.PriceByHour *
                                                      calTime(
                                                        listTimeSelected?.find(
                                                          (item) =>
                                                            item.id === data?.id
                                                        )?.OrderByTimeFrom,
                                                        listTimeSelected?.find(
                                                          (item) =>
                                                            item.id === data?.id
                                                        )?.OrderByTimeTo
                                                      )
                                                    )
                                                      .toLocaleString("vi", {
                                                        style: "currency",
                                                        currency: "VND",
                                                      })
                                                      .replace("₫", "đ")}
                                                  </>
                                                ) : (
                                                  <></>
                                                )}
                                              </>
                                            )}
                                            {listTimeSelected?.find(
                                              (item) => item.id === data?.id
                                            )?.OrderByTime === 0 &&
                                              priceService(
                                                listTimeSelected?.find(
                                                  (item) => item.id === data?.id
                                                )?.pricesByDate,
                                                false
                                              )}
                                          </span>
                                          <span
                                            style={{
                                              color: "#E22828",
                                              fontSize: "20px",
                                              fontWeight: "700",
                                            }}
                                          >
                                            {listTimeSelected?.find(
                                              (item) => item.id === data?.id
                                            )?.OrderByTime === 1 && (
                                              <>
                                                {listTimeSelected?.find(
                                                  (item) => item.id === data?.id
                                                )?.pricesByHour?.length > 0 ? (
                                                  <>
                                                    {(
                                                      listTimeSelected?.find(
                                                        (item) =>
                                                          item.id === data?.id
                                                      )?.pricesByHour[0]
                                                        ?.PriceByHour *
                                                      calTime(
                                                        listTimeSelected?.find(
                                                          (item) =>
                                                            item.id === data?.id
                                                        )?.OrderByTimeFrom,
                                                        listTimeSelected?.find(
                                                          (item) =>
                                                            item.id === data?.id
                                                        )?.OrderByTimeTo
                                                      )
                                                    )
                                                      .toLocaleString("vi", {
                                                        style: "currency",
                                                        currency: "VND",
                                                      })
                                                      .replace("₫", "đ")}
                                                  </>
                                                ) : (
                                                  <></>
                                                )}
                                              </>
                                            )}
                                            {listTimeSelected?.find(
                                              (item) => item.id === data?.id
                                            )?.OrderByTime === 0 &&
                                              priceService(
                                                listTimeSelected?.find(
                                                  (item) => item.id === data?.id
                                                )?.pricesByDate,
                                                false
                                              )}
                                          </span>
                                        </div>
                                        <p
                                          style={{
                                            color: "#828282",
                                            fontSize: "14px",
                                            fontWeight: "400",
                                          }}
                                        >
                                          {data?.PriceNote}
                                        </p>
                                        <span>Bao gồm 50.000đ thuế và phí</span>
                                      </div>
                                    </>
                                  )}
                              </Row>
                              <Row>
                                <Col span={24}>
                                  {chooseServiceList?.find(
                                    (item) => item.id === data?.id
                                  ) ? (
                                    <Button
                                      type="default"
                                      size="large"
                                      onClick={() => {
                                        dispatch({
                                          type: DELETE_CHOOSE_SERVICE,
                                        });
                                        dispatch({
                                          type: "SET_SELECT_TIME_ORDER",
                                        });
                                      }}
                                      style={{
                                        width: "100%",
                                        color: "#000",
                                        backgroundColor: "#E7E7E7",
                                        border: "none",

                                        borderRadius: "8px",
                                        fontWeight: "700",
                                        fontSize: "13px",
                                        lineHeight: "19px",

                                        textTransform: "uppercase",
                                      }}
                                    >
                                      Bỏ chọn
                                    </Button>
                                  ) : (
                                    <Button
                                      onClick={() => handleChooseService(data)}
                                      style={{
                                        width: "100%",
                                        borderRadius: "8px",
                                        fontWeight: "700",
                                        fontSize: "13px",

                                        lineHeight: "19px",
                                        textTransform: "uppercase",
                                      }}
                                      size="large"
                                    >
                                      Chọn
                                    </Button>
                                  )}
                                </Col>
                              </Row>
                            </Col>
                          ))}
                        </Row>
                      ) : (
                        <div className={cx("")}>
                          <Table
                            column={COLUMN}
                            row={ROW(studioDetail.service)}
                          />
                        </div>
                      ))}
                  </Col>
                  <Col lg={8} md={8} sm={8}>
                    <div className={cx("right")}>
                      {screens?.xs ? (
                        <>
                          <div className={cx("order")}>
                            <div className={cx("item")}>
                              <h3>Đã chọn {chooseServiceList?.length} phòng</h3>
                              {chooseServiceList?.length > 0 && (
                                <span
                                  style={{
                                    textDecoration: "line-through",
                                    fontSize: " 16px",
                                    color: "#828282",
                                  }}
                                >
                                  {chooseService?.OrderByTime === 1 &&
                                    convertPrice(
                                      chooseService?.pricesByHour[0]
                                        ?.PriceByHour *
                                        calTime(
                                          chooseService?.OrderByTimeFrom,
                                          chooseService?.OrderByTimeTo
                                        )
                                    )}
                                  {chooseService?.OrderByTime === 0 &&
                                    convertPrice(
                                      chooseService?.pricesByDate?.reduce(
                                        (totalPrice, item) =>
                                          totalPrice + item?.PriceByDate,
                                        0
                                      )
                                    )}
                                  đ
                                </span>
                              )}
                            </div>
                            <div className={cx("item")}>
                              <span className="mt-3">
                                Bao gồm 50.000đ thuế và phí{" "}
                              </span>

                              {Object.keys(chooseService)?.length > 0 && (
                                <span
                                  style={{
                                    color: "#E22828",
                                    fontSize: "20px",
                                    fontWeight: "700",
                                  }}
                                >
                                  {chooseService?.OrderByTime === 1 &&
                                    convertPrice(
                                      chooseService?.pricesByHour[0]
                                        ?.PriceByHour *
                                        calTime(
                                          chooseService?.OrderByTimeFrom,
                                          chooseService?.OrderByTimeTo
                                        )
                                    )}
                                  {chooseService?.OrderByTime === 0 &&
                                    convertPrice(
                                      chooseService?.pricesByDate?.reduce(
                                        (totalPrice, item) =>
                                          totalPrice + item?.PriceByDate,
                                        0
                                      )
                                    )}
                                  đ
                                </span>
                              )}
                            </div>
                            <div
                              className={`${cx(
                                "wrap_btn"
                              )} w-100 d-flex justify-content-between mt-20 `}
                            >
                              <Button
                                className={`${cx(
                                  "btn_add"
                                )} d-flex justify-content-center align-items-center`}
                                disabled={
                                  chooseServiceList?.length > 0 ? false : true
                                }
                                onClick={() => {
                                  if (currentUser) {
                                    dispatch(
                                      addCart(
                                        1,
                                        studioDetail?.data,
                                        chooseService
                                      )
                                    );
                                  } else {
                                    message.warning("Vui lòng đăng nhập!");
                                  }
                                }}
                              >
                                <ShoppingCartOutlined />
                                Thêm vào giỏ hàng
                              </Button>
                              <Button
                                className={`${cx(
                                  "btn_order"
                                )} d-flex justify-content-center align-items-center`}
                                onClick={handleBook}
                                disabled={
                                  chooseServiceList.length > 0 &&
                                  chooseService.id > 0
                                    ? false
                                    : true
                                }
                              >
                                Đặt ngay
                              </Button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <Sticky topOffset={10} className="mt-10">
                          {({ style }) => (
                            <div
                              className={cx("order")}
                              style={{ ...style, top: 10, height: "auto" }}
                            >
                              <div className={cx("item")}>
                                <h3>
                                  Đã chọn {chooseServiceList?.length} phòng
                                </h3>
                                {chooseServiceList?.length > 0 && (
                                  <span
                                    style={{
                                      textDecoration: "line-through",
                                      fontSize: " 16px",
                                      color: "#828282",
                                    }}
                                  >
                                    {chooseService?.OrderByTime === 1 &&
                                      convertPrice(
                                        chooseService?.pricesByHour[0]
                                          ?.PriceByHour *
                                          calTime(
                                            chooseService?.OrderByTimeFrom,
                                            chooseService?.OrderByTimeTo
                                          )
                                      )}
                                    {chooseService?.OrderByTime === 0 &&
                                      convertPrice(
                                        chooseService?.pricesByDate?.reduce(
                                          (totalPrice, item) =>
                                            totalPrice + item?.PriceByDate,
                                          0
                                        )
                                      )}
                                    đ
                                  </span>
                                )}
                              </div>
                              <div className={cx("item")}>
                                <span className="mt-3">
                                  Bao gồm 50.000đ thuế và phí{" "}
                                </span>

                                {Object.keys(chooseService)?.length > 0 && (
                                  <span
                                    style={{
                                      color: "#E22828",
                                      fontSize: "20px",
                                      fontWeight: "700",
                                    }}
                                  >
                                    {chooseService?.OrderByTime === 1 &&
                                      convertPrice(
                                        chooseService?.pricesByHour[0]
                                          ?.PriceByHour *
                                          calTime(
                                            chooseService?.OrderByTimeFrom,
                                            chooseService?.OrderByTimeTo
                                          )
                                      )}
                                    {chooseService?.OrderByTime === 0 &&
                                      convertPrice(
                                        chooseService?.pricesByDate?.reduce(
                                          (totalPrice, item) =>
                                            totalPrice + item?.PriceByDate,
                                          0
                                        )
                                      )}
                                    đ
                                  </span>
                                )}
                              </div>
                              <div
                                className={`${cx(
                                  "wrap_btn"
                                )} w-100 d-flex justify-content-between mt-20 `}
                              >
                                <Button
                                  className={`${cx(
                                    "btn_add"
                                  )} d-flex justify-content-center align-items-center`}
                                  disabled={
                                    chooseServiceList?.length > 0 ? false : true
                                  }
                                  onClick={() => {
                                    if (currentUser) {
                                      dispatch(
                                        addCart(
                                          1,
                                          studioDetail?.data,
                                          chooseService
                                        )
                                      );
                                    } else {
                                      message.warning("Vui lòng đăng nhập!");
                                    }
                                  }}
                                >
                                  <ShoppingCartOutlined />
                                  Thêm vào giỏ hàng
                                </Button>
                                <Button
                                  className={`${cx(
                                    "btn_order"
                                  )} d-flex justify-content-center align-items-center`}
                                  onClick={handleBook}
                                  disabled={
                                    chooseServiceList.length > 0 &&
                                    chooseService.id > 0
                                      ? false
                                      : true
                                  }
                                >
                                  Đặt ngay
                                </Button>
                              </div>
                            </div>
                          )}
                        </Sticky>
                      )}
                    </div>
                  </Col>
                </Row>
              </StickyContainer>
              <Row className={cx("box2")} gutter={[12, 0]}>
                <Col lg={16} md={16} sm={16} xs={24}>
                  <div className={cx("left")}>
                    <div className={cx("rating")}>
                      <CommentRating data={studioDetail} className="mb-43" />
                    </div>
                  </div>
                </Col>
              </Row>
              {listStudioSimilar?.length > 0 && (
                <SlideCard
                  data={listStudioSimilar}
                  category={{ name: "studio", id: 1 }}
                  title="Studio tương tự"
                />
              )}
              {studioNear?.length > 0 && (
                <SlideCard
                  data={studioNear}
                  category={{ name: "studio", id: 1 }}
                  title="Gần bạn"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudioDetail;
