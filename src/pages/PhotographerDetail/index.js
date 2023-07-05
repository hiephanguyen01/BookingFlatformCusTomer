import { useNavigate, useParams, useLocation } from "react-router-dom";
import {
  EnvironmentOutlined,
  HeartOutlined,
  MoreOutlined,
  ShoppingCartOutlined,
  DownOutlined,
  LoadingOutlined,
  HeartFilled,
  WarningOutlined,
  CameraOutlined,
  PictureOutlined,
  StopOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ShareAltOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import "./photographerDetail.scss";

import Table from "../../components/Table";
import ReadMoreDesc from "../../components/ReadMoreDesc";
import { ReactComponent as Check } from "../../assets/PhotographerDetail/check 2.svg";
import {
  Rate,
  Row,
  Col,
  Button,
  Popover,
  Grid,
  Typography,
  Divider,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentRating from "../../components/CommentRating";
import SlideAlbum from "../../components/SlideAlbum";
import ImagePost from "../../components/imagePost/ImagePost";
import {
  getLikeStudioPostAction,
  getStudioSimilarAction,
  getPromotionByTenantId,
  studioDetailAction,
  handlerSelectServiceAction,
} from "../../stores/actions/studioPostAction";
import { convertPrice } from "../../utils/convert";
import toastMessage from "../../components/ToastMessage";
import { addCart, chooseServiceAction } from "../../stores/actions/CartAction";
import PopUpSignIn from "../Auth/PopUpSignIn/PopUpSignIn";
import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";
import { convertImage } from "../../utils/convertImage";
import SlideCard from "../StudioDetail/SlideCard";
import PromotionList from "../../components/PromotionList/PromotionList";
import { calDate, calTime, priceService } from "../../utils/calculate";
import { getPromotionCodeUserSave } from "../../stores/actions/promoCodeAction";
import { Report } from "../StudioDetail/Report";
import { SHOW_MODAL } from "../../stores/types/modalTypes";
import SelectTimeOptionService from "../../components/SelectTimeOptionService/SelectTimeOptionService";
import {
  SET_PROMOTION_CODE,
  SET_STUDIO_DETAIL,
} from "../../stores/types/studioPostType";
import classNames from "classnames/bind";
import ReactStickyBox from "react-sticky-box";
import styles from "./Detail.module.scss";
import images from "../../assets/images";
import jiwery from "../../assets/svg/jiwery.svg";
import different from "../../assets/svg/diffrent.svg";
import {
  DELETE_CHOOSE_SERVICE,
  SET_CHOOSE_SERVICE_LIST,
} from "../../stores/types/CartType";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination } from "swiper";
import BackNav from "../../components/BackNav/BackNav";

const COLUMN = [
  { title: "Dịch vụ", size: 7 },
  { title: "Chọn thời gian", size: 10 },
  { title: "Chọn dịch vụ", size: 7 },
];
const cx = classNames.bind(styles);

const { useBreakpoint } = Grid;
const { Paragraph } = Typography;

const PhotographerDetail = () => {
  const screens = useBreakpoint();
  const {
    studioDetail,
    listStudioSimilar,
    promotionCode,
    chooseService,
    listTimeSelected,
  } = useSelector((state) => state.studioPostReducer);
  const { chooseServiceList } = useSelector((state) => state.CartReducer);
  const { promoCodeUserSave } = useSelector((state) => state.promoCodeReducer);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const cate =
    location.pathname.split("/").filter((item) => item !== "")[1] ===
    "photographer"
      ? 2
      : undefined;
  const [toggleSeeMore, setToggleSeeMore] = useState(false);
  const { currentUser } = useSelector((state) => state.authenticateReducer);
  const filter_promo = promotionCode
    ?.filter((item) => item.SaleCode.DateTimeExpire > new Date().toISOString())
    ?.reduce((arr, item) => {
      if (
        promoCodeUserSave.filter((itm) => itm.id === item.SaleCode.id).length >
        0
      ) {
        return [...arr];
      }
      return [...arr, item];
    }, []);

  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (currentUser !== null) {
      dispatch(studioDetailAction(id, cate, currentUser?.id));
    } else {
      dispatch(studioDetailAction(id, cate));
    }
    dispatch(getStudioSimilarAction(id, cate));
  }, [currentUser, id, cate, dispatch]);

  useEffect(() => {
    dispatch(getPromotionCodeUserSave());
    dispatch(getPromotionByTenantId(studioDetail?.data?.TenantId));
  }, [studioDetail, dispatch]);

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
    return () => {
      dispatch({ type: SET_PROMOTION_CODE, data: [] });
      dispatch({ type: SET_STUDIO_DETAIL, payload: {} });
      dispatch({ type: "SET_SERVICE_SELECT", payload: null });
    };
  }, [dispatch]);
  useEffect(() => {
    // window.scrollTo({ behavior: "smooth", top: 0 });
    dispatch({ type: "SET_SELECT_TIME_ORDER" });
    dispatch({ type: "SET_SERVICE_SELECT", payload: null });
    dispatch({ type: SET_CHOOSE_SERVICE_LIST, payload: [] });
  }, [dispatch]);
  const ROW = (dataSource = []) => {
    if (dataSource.length > 0) {
      return dataSource?.map((data, index) => [
        {
          key: "title",
          render: () => (
            <div style={{}}>
              <img
                alt="as"
                style={{ width: "100%", borderRadius: " 6px" }}
                src={`${
                  data?.Image?.length > 0 ? convertImage(data?.Image[0]) : ""
                }`}
              />
              <div
                style={{
                  marginTop: "10px",
                  color: "#3F3F3F",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                {data.Name}
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
                  <CameraOutlined style={{ marginRight: "10px" }} />
                  Ekip
                </div>
                <ul className="ekip">
                  <li>2 Thợ chụp ảnh</li>
                  <li>1 Thợ trang điểm</li>
                  <li>1 Stylist</li>
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
                  <img src={jiwery} className="me-10 mb-5" alt="" />
                  Trang phục, phụ kiện
                </div>
                <ul className="ekip">
                  <li>02 váy, 02 vest, 01 đồ tự chọn</li>
                  <li>Hoa cầm tay </li>
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
                  <img src={different} className="me-10 mb-5" alt="" />
                  Khác
                </div>
                <div className="ekip">
                  <p>Bối cảnh: Ngoài trời</p>
                </div>
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
                  <PictureOutlined
                    className="me-10 mb-2"
                    style={{ fontSize: "15px" }}
                  />
                  Sản phẩm nhận được
                </div>
                <ul className="ekip">
                  <li>01 Album photobook cao cấp 20 x 30 (20 trang)</li>
                  <li>01 Hình cổng laminate 60 x 90</li>
                  <li>10 ảnh trang trí 12 x 16 ép lụa</li>
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
                <div className="d-flex align-items-center">
                  <StopOutlined
                    className="me-10 mb-2"
                    style={{ fontSize: "12px" }}
                  />
                  Dịch vụ CHƯA bao gồm:
                </div>
                <div className="ekip">
                  <p>Di chuyển</p>
                </div>
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
                  <EnvironmentOutlined
                    className="me-10 mb-2"
                    style={{ fontSize: "12px" }}
                  />
                  Địa điểm
                </div>
                <div className="ekip">
                  <p>26 Nguyễn Ái Quốc, Biên Hòa, Đồng Nai</p>
                </div>
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
                  <ClockCircleOutlined
                    className="me-10 mb-2"
                    style={{ fontSize: "12px" }}
                  />
                  Thời gian thực hiện
                </div>
                <div className="ekip">
                  <p>2 giờ (ước lượng)</p>
                </div>
              </div>
              <div style={{ marginTop: "5px" }}>
                <h5 style={{ margin: "0px" }}>Mô tả phòng</h5>
                <p
                  style={{
                    fontWeight: 400,
                    fontSize: "16px",
                    color: "#222222",
                  }}
                >
                  {data?.Description}
                </p>
              </div>
              {/* <div
                className="mt-10"
                style={{
                  color: "#616161",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                {data.Description}
              </div> */}
            </div>
          ),
        },
        {
          key: "desc",
          render: () => {
            return (
              <SelectTimeOptionService service={{ ...data, category: cate }} />
            );
          },
        },
        {
          key: "currency",
          render: () => (
            <>
              {listTimeSelected?.find((item) => item.id === data?.id)
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
    }
  };

  const handleChooseService = (data) => {
    const findSelectTime = listTimeSelected.find((item) => item.id === data.id);
    if (findSelectTime) {
      if (
        findSelectTime.OrderByTime === 1 &&
        findSelectTime.OrderByTimeFrom !== undefined &&
        findSelectTime.OrderByTimeFrom !== "" &&
        findSelectTime.OrderByTimeTo !== undefined &&
        findSelectTime.OrderByTimeTo !== "" &&
        findSelectTime.OrderByTimeTo !== findSelectTime.OrderByTimeFrom
      ) {
        dispatch(handlerSelectServiceAction(data, findSelectTime));
      } else if (
        findSelectTime.OrderByTime === 0 &&
        findSelectTime.OrderByDateFrom !== undefined &&
        findSelectTime.OrderByDateFrom !== "" &&
        findSelectTime.OrderByDateTo !== undefined &&
        findSelectTime.OrderByDateTo !== ""
      ) {
        dispatch(handlerSelectServiceAction(data, findSelectTime));
      } else {
        return toastMessage("Vui lòng chọn thời gian để xem giá!", "warning");
      }
    } else {
      return toastMessage("Vui lòng chọn thời gian để xem giá!", "warning");
    }
  };
  const handleBook = () => {
    if (chooseServiceList.length > 0) {
      dispatch(chooseServiceAction(chooseServiceList));
      navigate("order");
    } else {
      toastMessage("Bạn cần chọn dịch vụ!", "warn");
    }
  };

  const handleChangeLike = (e) => {
    if (currentUser) {
      dispatch(getLikeStudioPostAction(id, cate, currentUser?.id));
    }
  };
  const handleReport = () => {
    dispatch({
      type: SHOW_MODAL,
      Component: <Report category={cate} postId={id} />,
    });
  };

  return (
    <>
      <MetaDecorator
        title={studioDetail?.data?.Name}
        description={studioDetail?.data?.Description}
        imgUrl={studioDetail?.data?.Image[0]}
        type="article"
        imgAlt="Booking Studio Details"
      />
      {
        // Object.keys(studioDetail).length <= 0
        false ? (
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
          <div
            className={cx("container-detail")}
            style={{
              margin: "auto",
              backgroundColor: "rgb(245, 245, 245)",
              padding: `${screens?.xs ? 0 : "2rem 0"}`,
            }}
          >
            {screens?.xs && (
              <BackNav
                to={location?.state?.pathname || "/home/filter?category=2"}
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
            <section className="photographer-detail">
              <div className="photographer-detail__container">
                {screens?.xs ? (
                  <div className={cx("wrapper-photo-header")}>
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
                        <h4 style={{ marginBottom: 0, marginRight: "10px" }}>
                          {studioDetail?.data?.Name}{" "}
                        </h4>
                        <CheckCircleOutlined
                          style={{ fontSize: "20px", color: "#03AC84" }}
                        />
                      </div>
                      <div className={cx("address")}>
                        <img src={images.address} alt="sa" />
                        <span>{studioDetail?.data?.Address}</span>
                      </div>
                      <Row justify="space-between" align="middle">
                        <div className={cx("rate")}>
                          <Rate
                            className="me-5"
                            disabled
                            allowHalf
                            value={studioDetail?.data?.TotalRate}
                          ></Rate>
                          <span className="ms-5">
                            {studioDetail?.data?.TotalRate}
                          </span>
                          <div className={cx("line-col")}></div>
                          <span
                            className={cx("number-order")}
                            style={{ fontSize: "15px" }}
                          >
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
                  <header className="photographer-detail__container__header">
                    <div className="photographer-detail__container__header__info d-flex justify-content-between">
                      <div className="photographer-detail__container__header__info__right-side d-flex flex-column">
                        <div className="photographer-detail__container__header__info__right-side__name d-flex align-items-center">
                          <p>{studioDetail?.data?.Name}</p> <Check />
                        </div>
                        <div className="photographer-detail__container__header__info__right-side__locate d-flex align-items-center">
                          <EnvironmentOutlined
                            style={{
                              height: "fit-content",
                              fontSize: "16px",
                              color: "#828282",
                            }}
                          />

                          <p>{studioDetail?.data?.Address}</p>
                        </div>
                        <div className="photographer-detail__container__header__info__right-side__rating d-flex align-items-center">
                          <div className="stars d-flex align-items-center">
                            <Rate
                              style={{ fontSize: "13px" }}
                              disabled
                              allowHalf
                              value={studioDetail?.data?.TotalRate}
                            />
                            <div className="star-number">
                              {studioDetail?.data?.TotalRate}
                            </div>
                          </div>
                          <div className="has-booked">
                            <p>Đã đặt {studioDetail?.data?.BookingCount}</p>
                          </div>
                        </div>
                      </div>
                      <div className="photographer-detail__container__header__info__left-side d-flex align-items-start">
                        <PopUpSignIn
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          {studioDetail?.data?.UsersLiked ? (
                            <HeartFilled
                              style={{
                                fontSize: "25px",
                                color: "#E22828",
                                marginRight: "10px",
                              }}
                              onClick={handleChangeLike}
                            />
                          ) : (
                            <HeartOutlined
                              style={{
                                fontSize: "25px",
                                color: "#E22828",
                                marginRight: "10px",
                              }}
                              onClick={handleChangeLike}
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
                          <MoreOutlined
                            style={{
                              fontSize: "25px",
                            }}
                          />
                        </Popover>
                      </div>
                    </div>
                    <div className="photographer-detail__container__header__image">
                      <ImagePost data={studioDetail?.data?.Image} />
                    </div>
                  </header>
                )}

                <div className={cx("box2")}>
                  <div className={cx("left")}>
                    <div className={cx("description")}>
                      <ReadMoreDesc title="Chi tiết sản phẩm">
                        {studioDetail?.data?.Description}
                      </ReadMoreDesc>
                    </div>
                    <div className={cx("sale")}>
                      <PromotionList data={filter_promo} />
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
                          <img src={images.address} alt="" className="me-10" />
                          <span>{studioDetail?.data?.Address}</span>
                        </div>
                        <div className={cx("mapouter", "mt-10")}>
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

                              <div
                                className="mt-10"
                                style={{
                                  color: "#222222",
                                  fontSize: "16px",
                                  fontWeight: "700",
                                }}
                              >
                                <div>
                                  <CameraOutlined
                                    style={{ marginRight: "10px" }}
                                  />
                                  Ekip
                                </div>
                                <ul className="ekip">
                                  <li>2 Thợ chụp ảnh</li>
                                  <li>1 Thợ trang điểm</li>
                                  <li>1 Stylist</li>
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
                                    src={jiwery}
                                    className="me-10 mb-5"
                                    alt=""
                                  />
                                  Trang phục, phụ kiện
                                </div>
                                <ul className="ekip">
                                  <li>02 váy, 02 vest, 01 đồ tự chọn</li>
                                  <li>Hoa cầm tay </li>
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
                                    src={different}
                                    className="me-10 mb-5"
                                    alt=""
                                  />
                                  Khác
                                </div>
                                <div className="ekip">
                                  <p>Bối cảnh: Ngoài trời</p>
                                </div>
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
                                  <PictureOutlined
                                    className="me-10 mb-2"
                                    style={{ fontSize: "15px" }}
                                  />
                                  Sản phẩm nhận được
                                </div>
                                <ul className="ekip">
                                  <li>
                                    01 Album photobook cao cấp 20 x 30 (20
                                    trang)
                                  </li>
                                  <li>01 Hình cổng laminate 60 x 90</li>
                                  <li>10 ảnh trang trí 12 x 16 ép lụa</li>
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
                                <div className="d-flex align-items-center">
                                  <StopOutlined
                                    className="me-10 mb-2"
                                    style={{ fontSize: "12px" }}
                                  />
                                  Dịch vụ CHƯA bao gồm:
                                </div>
                                <div className="ekip">
                                  <p>Di chuyển</p>
                                </div>
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
                                  <EnvironmentOutlined
                                    className="me-10 mb-2"
                                    style={{ fontSize: "12px" }}
                                  />
                                  Địa điểm
                                </div>
                                <div className="ekip">
                                  <p>26 Nguyễn Ái Quốc, Biên Hòa, Đồng Nai</p>
                                </div>
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
                                  <ClockCircleOutlined
                                    className="me-10 mb-2"
                                    style={{ fontSize: "12px" }}
                                  />
                                  Thời gian thực hiện
                                </div>
                                <div className="ekip">
                                  <p>2 giờ (ước lượng)</p>
                                </div>
                              </div>
                              {/* <Row align="middle" className={cx("wrap")}>
                                <Col span={8}>
                                  <div className={cx("label")}>Mô tả</div>
                                </Col>
                                <Col span={24}>
                                  <Paragraph
                                    style={{
                                      fontSize: "16px",
                                      marginBottom: 0,
                                    }}
                                    ellipsis={{
                                      rows: 4,
                                      expandable: true,
                                      suffix: "",
                                      symbol: "Xem thêm",
                                      onEllipsis: (ellipsis) => {},
                                    }}
                                    // title={`${article}--William Shakespeare`}
                                  >
                                    {data?.Description}
                                  </Paragraph>
                                </Col>
                              </Row> */}

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
                                              marginLeft: "10px",
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
                            row={ROW(studioDetail?.service)}
                            rowNumber={3}
                          />
                        </div>
                      ))}
                  </div>
                  <div className={cx("right")}>
                    <div className={cx("map")}>
                      <h3>Xem trên bản đồ</h3>
                      <div
                        className={cx(
                          "address d-flex align-items-center mb-10"
                        )}
                      >
                        <img
                          src={images.address}
                          className="me-10 w-13px h-15px"
                          alt=""
                          style={{ fontSize: "5px" }}
                        />
                        <span>{studioDetail?.data?.Address}</span>
                      </div>
                      <div className="mapouter">
                        <div className="gmap_canvas">
                          <iframe
                            title="map"
                            className="gmap_iframe"
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
                    <ReactStickyBox offsetTop={20} offsetBottom={20}>
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
                                  chooseService?.pricesByHour[0]?.PriceByHour *
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
                                  chooseService?.pricesByHour[0]?.PriceByHour *
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
                        <div className="w-100 d-flex justify-content-between mt-20">
                          <Button
                            className="w-60 h-48px d-flex justify-content-center align-items-center btn_add"
                            disabled={true}
                            onClick={() =>
                              toastMessage(
                                "Chức năng này đang phát triển!",
                                "info",
                                1,
                                "",
                                {}
                              )
                            }
                          >
                            <ShoppingCartOutlined />
                            Thêm vào giỏ hàng
                          </Button>
                          <Button
                            className="w-38 h-48px d-flex justify-content-center align-items-center btn_order"
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
                    </ReactStickyBox>
                  </div>
                </div>
                {studioDetail?.album?.length > 0 && (
                  <Row gutter={[20]}>
                    <Col md={16}>
                      <div className="album_container">
                        <h3>Các album</h3>
                        {toggleSeeMore ? (
                          studioDetail?.album
                            ?.sort((a, b) => a.id - b.id)
                            .map((item, index) => (
                              <SlideAlbum key={index} data={item} />
                            ))
                        ) : (
                          <>
                            {studioDetail?.album
                              ?.sort((a, b) => a.id - b.id)
                              .slice(0, 3)
                              .map((item, index) => (
                                <SlideAlbum key={index} data={item} />
                              ))}
                            {studioDetail?.album?.length > 3 && (
                              <div
                                className="btn_see_more"
                                onClick={() => setToggleSeeMore(true)}
                              >
                                Xem thêm <DownOutlined className="icon" />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </Col>
                  </Row>
                )}
                <div className={cx("rating")}>
                  <CommentRating data={studioDetail} className="mb-43 mt-12" />
                </div>
                {listStudioSimilar.length > 0 ? (
                  <SlideCard
                    data={listStudioSimilar}
                    category={{ name: "photographer", id: 2 }}
                    title="Photographer tương tự"
                  />
                ) : (
                  <></>
                )}
              </div>
            </section>
          </div>
        )
      }
    </>
  );
};

export default PhotographerDetail;
