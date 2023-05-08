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
  WarningOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Grid, Popover, Rate, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import imgPost from "../../assets/dao/Frame 163.jpg";
import svgLocation from "../../assets/svg/location.svg";
import CommentRating from "../../components/CommentRating";
import ImagePost from "../../components/imagePost/ImagePost";
import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";
import ReadMoreDesc from "../../components/ReadMoreDesc";
import Table from "../../components/Table";
import toastMessage from "../../components/ToastMessage";
import { chooseServiceAction } from "../../stores/actions/OrderAction";
import {
  getLikeStudioPostAction,
  getStudioSimilarAction,
  studioDetailAction,
} from "../../stores/actions/studioPostAction";
import { SHOW_MODAL } from "../../stores/types/modalTypes";
import { convertPrice } from "../../utils/convert";
import { convertImage } from "../../utils/convertImage";
import PopUpSignIn from "../Auth/PopUpSignIn/PopUpSignIn";
import { SlideCard } from "../StudioDetail/SlideCard";
import "./clothesDetails.scss";
import styles from "./Detail.module.scss";
import {
  SET_PROMOTION_CODE,
  SET_STUDIO_DETAIL,
} from "../../stores/types/studioPostType";
import PromotionList from "../../components/PromotionList/PromotionList";
import { Report } from "../StudioDetail/Report";
import SelectTimeOptionService from "../../components/SelectTimeOptionService/SelectTimeOptionService";
import ReactStickyBox from "react-sticky-box";
import classNames from "classnames/bind";
import BackNav from "../../components/BackNav/BackNav";
import images from "../../assets/images";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Autoplay, Pagination } from "swiper";
import Paragraph from "antd/lib/skeleton/Paragraph";
import { calDate, calTime } from "../../utils/calculate";
import { DELETE_CHOOSE_SERVICE } from "../../stores/types/OrderType";

const cx = classNames.bind(styles);
const SIZE = [
  { id: "S", label: "S" },
  { id: "M", label: "M" },
  { id: "L", label: "L" },
];
const COLOR = [
  { id: "Trắng", label: "Trắng" },
  { id: "Đen", label: "Đen" },
  { id: "Đỏ", label: "Đỏ" },
];

const QUANTITY = [
  { id: 1, label: "1" },
  { id: 2, label: "2" },
  { id: 3, label: "3" },
];

const COLUMN = [
  { title: "Loại sản phẩm", size: 7 },
  { title: "Chọn Size, Màu, Số lượng, Thời gian", size: 10 },
  { title: "Chọn trang phục", size: 7 },
];

const { useBreakpoint } = Grid;

const Index = () => {
  const screens = useBreakpoint();
  const {
    studioDetail,
    filter,
    listStudioSimilar,
    promotionCode,
    filterService,
    listTimeSelected,
  } = useSelector((state) => state.studioPostReducer);
  const { chooseServiceList } = useSelector((state) => state.OrderReducer);
  const { promoCodeUserSave } = useSelector((state) => state.promoCodeReducer);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const cate =
    location.pathname.split("/").filter((item) => item !== "")[1] === "clothes"
      ? 3
      : undefined;

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

  const [chooseService, setChooseService] = useState([]);
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.authenticateReducer);
  const dispatch = useDispatch();

  const { Option } = Select;

  useEffect(() => {
    if (currentUser !== null) {
      dispatch(studioDetailAction(id, cate, currentUser?.id));
    } else {
      dispatch(studioDetailAction(id, cate));
    }
    dispatch(getStudioSimilarAction(id, cate));
  }, [currentUser, id, cate, dispatch]);

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
    return () => {
      dispatch({ type: SET_PROMOTION_CODE, data: [] });
      dispatch({ type: SET_STUDIO_DETAIL, payload: {} });
      // clearTimeout(timeOut);
    };
  }, [dispatch]);
  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, [id]);

  const handleChange = (value) => {};

  const handleChooseService = (data) => {
    if (chooseService.filter((item) => item.id === data.id).length > 0) {
      setChooseService([]);
    } else {
      setChooseService([{ ...data }]);
    }
  };
  const handleChangeLike = (e) => {
    // if (!currentUser) navigate("/auth/sign-in");
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

  const ROW = (dataSource = []) => {
    if (dataSource?.length > 0) {
      return dataSource?.map((data, index) => [
        {
          key: "title",
          render: () => (
            <div style={{}}>
              <img
                alt=""
                style={{ width: "100%", borderRadius: " 6px" }}
                src={
                  data?.Image?.length > 0 ? convertImage(data?.Image[0]) : ""
                }
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
                  color: "#616161",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                {data.Description}
              </div>
            </div>
          ),
        },
        {
          key: "desc",
          render: () => {
            return (
              <>
                <div className="d-flex align-items-center mb-10">
                  <div
                    className=""
                    style={{
                      minWidth: "30%",
                    }}
                  >
                    Size
                  </div>
                  <Select
                    defaultValue={SIZE[0]}
                    style={{
                      width: "30%",
                    }}
                    onChange={handleChange}
                  >
                    {SIZE.map((item) => (
                      <Option value={item.id}>{item.label}</Option>
                    ))}
                  </Select>
                </div>
                <div className="d-flex align-items-center mb-10">
                  <div
                    className=""
                    style={{
                      minWidth: "30%",
                    }}
                  >
                    Màu sắc
                  </div>
                  <Select
                    defaultValue={COLOR[0]}
                    style={{
                      width: "30%",
                    }}
                    onChange={handleChange}
                  >
                    {COLOR.map((item) => (
                      <Option value={item.id}>{item.label}</Option>
                    ))}
                  </Select>
                </div>
                <div className="d-flex align-items-center mb-10">
                  <div
                    className=""
                    style={{
                      minWidth: "30%",
                    }}
                  >
                    Số lượng
                  </div>
                  <Select
                    defaultValue={QUANTITY[0]}
                    style={{
                      width: "30%",
                    }}
                    onChange={handleChange}
                  >
                    {QUANTITY.map((item) => (
                      <Option value={item.id}>{item.label}</Option>
                    ))}
                  </Select>
                </div>
                <div className="mt-20">
                  <div
                    className="mb-10"
                    style={{
                      fontWeight: "bolder",
                    }}
                  >
                    Khung giờ bạn muốn đặt
                  </div>
                  <SelectTimeOptionService service={data} />
                </div>
              </>
            );
          },
        },
        {
          key: "currency",
          render: () => (
            <>
              {filterService.OrderByTime !== -1 && (
                <div className="mb-20">
                  <div
                    style={{
                      display: "flex",
                      gap: "5px",
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
                      {filterService.OrderByTime === 1 &&
                        data?.PriceByHour?.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      {filterService.OrderByTime === 0 &&
                        data?.PriceByDate?.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                    </span>
                    <span
                      style={{
                        color: "#828282",
                        textDecoration: "line-through",
                        fontSize: "14px",
                        fontWeight: "400",
                      }}
                    >
                      {filterService.OrderByTime === 1 &&
                        data?.PriceByHour?.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      {filterService.OrderByTime === 0 &&
                        data?.PriceByDate?.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                    </span>
                  </div>
                  <p
                    style={{
                      color: "#828282",
                      fontSize: "14px",
                      fontWeight: "400",
                    }}
                  >
                    {data.PriceNote}
                  </p>
                  {/* <button
                    style={{
                      padding: "3px 21px",
                      background: "#E22828",
                      color: "#ffff",
                      border: " 1px solid #E22828",
                      borderRadius: " 8px",
                    }}
                  >
                    Giảm 50%{" "}
                  </button> */}
                </div>
              )}
              <div className="">
                {chooseService.filter((item) => item.id === data.id).length >
                0 ? (
                  <div
                    onClick={() => handleChooseService(data)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "13px 25px",

                      backgroundColor: "#E7E7E7",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "700",
                      fontSize: "13px",
                      lineHeight: "19px",
                      textTransform: "uppercase",
                    }}
                  >
                    Bỏ chọn
                  </div>
                ) : (
                  <div
                    onClick={() => handleChooseService(data)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "13px 25px",

                      border: "1px solid #E22828",
                      color: "#E22828",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "700",
                      fontSize: "13px",
                      lineHeight: "19px",
                      textTransform: "uppercase",
                    }}
                  >
                    Chọn
                  </div>
                )}
              </div>
            </>
          ),
        },
      ]);
    }
  };

  const handleBook = () => {
    if (chooseService.length > 0 && filter.OrderByTime !== -1) {
      dispatch(chooseServiceAction(chooseService));
      navigate("order");
    } else {
      if (filter.OrderByTime === -1) {
        toastMessage("Bạn cần chọn thời gian!", "warn");
      } else if (chooseService.length <= 0) {
        toastMessage("Bạn cần chọn dịch vụ!", "warn");
      }
    }
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
      {Object.keys(studioDetail).length > 0 ? (
        <div
          className="container_detail"
          style={{
            margin: "auto",
            backgroundColor: "rgb(245, 245, 245)",
            padding: `${screens?.xs ? 0 : "2rem 0"}`,
          }}
        >
          {screens?.xs && (
            <BackNav
              to={location?.state?.pathname}
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
          <div className="costume_container">
            {screens?.xs ? (
              <div className={cx("wrapper-clothes-header")}>
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
                <div className={cx("clothes-info")}>
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
              <div className="wrapper_banner">
                <div
                  className="d-flex justify-content-between align-items-center header"
                  style={{ marginBottom: "11px" }}
                >
                  <div className="header_title">
                    {studioDetail?.data?.Name}
                    <CheckCircleOutlined className="icon_check_circle" />
                  </div>
                  <div className="d-flex align-items-center">
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
                      {/* <HeartOutlined className="icon_heart" /> */}
                    </PopUpSignIn>
                    {/* <Dropdown overlay={menu} trigger={["click"]}>
                    <a onClick={(e) => e.preventDefault()}>
                      <Space>
                        <MoreOutlined
                          style={{
                            fontSize: "26px",
                          }}
                          className="mt-5 h-100"
                        />
                      </Space>
                    </a>
                  </Dropdown> */}
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
                              style={{ fontSize: "18px", fontWeight: "bold" }}
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
                <div className="location">
                  <img
                    alt=""
                    src={svgLocation}
                    style={{ marginRight: "0.5rem" }}
                  />
                  {studioDetail?.data?.Address}
                </div>
                <div className="d-flex align-items-center mb-15">
                  <Rate
                    disabled
                    allowHalf
                    value={studioDetail?.data?.TotalRate}
                    className="rating d-flex align-items-center"
                  />

                  <span className="reserve">
                    {studioDetail?.data?.TotalRate}
                  </span>
                  <span className="reserve">
                    Đã đặt {studioDetail?.data?.BookingCount}
                  </span>
                </div>
                <ImagePost data={studioDetail?.data?.Image} />
              </div>
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
                <Col lg={0} md={0} sm={0} xs={24} className={cx("map-mobile")}>
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
                {screens?.xs ? (
                  <Row className="w-100" gutter={[0, 15]}>
                    {studioDetail?.service?.map((data) => (
                      <Col span={24} className={cx("wrapper-service-mobile")}>
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
                          {data?.Image?.map((item) => (
                            <SwiperSlide>
                              <img
                                src={convertImage(item)}
                                alt=""
                                className="w-100 h-100"
                              />
                            </SwiperSlide>
                          ))}
                        </Swiper>

                        <Row align="middle" className={cx("wrap")}>
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
                        </Row>
                        <Divider style={{ margin: "10px 0" }} />
                        <Row>
                          <Col span={12}>
                            <h5>Chọn thời gian</h5>
                          </Col>
                          <Col span={24}>
                            <SelectTimeOptionService service={data} />
                          </Col>
                        </Row>
                        <Divider style={{ margin: "0 0 20px" }} />
                        <Row justify="end">
                          {chooseServiceList.find(
                            (item) => item?.id === data?.id
                          ) ? (
                            <>
                              <Col span={24} style={{ textAlign: "end" }}>
                                <div>Giá cho thời gian bạn đã chọn</div>
                              </Col>{" "}
                              <Col span={24} className="mb-10">
                                <Row align="middle" justify="end">
                                  <div
                                    className="me-10"
                                    style={{ textAlign: "end" }}
                                  >
                                    {chooseServiceList?.length > 0 && (
                                      <span
                                        style={{
                                          textDecoration: "line-through",
                                          fontSize: " 16px",
                                          color: "#828282",
                                        }}
                                      >
                                        {filterService?.OrderByTime === 1 &&
                                          `${convertPrice(
                                            chooseServiceList?.reduce(
                                              (total, item) =>
                                                total +
                                                item.PriceByHour *
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
                                              (total, item) =>
                                                total +
                                                item.PriceByDate *
                                                  calDate(
                                                    filterService?.OrderByDateFrom,
                                                    filterService?.OrderByDateTo
                                                  ),
                                              0
                                            )
                                          )}đ`}
                                      </span>
                                    )}
                                  </div>
                                  <div
                                    style={{
                                      color: "#E22828",
                                      fontSize: "20px",
                                      fontWeight: "700",
                                    }}
                                  >
                                    {filterService?.OrderByTime === 1 &&
                                      `${convertPrice(
                                        chooseServiceList?.reduce(
                                          (total, item) =>
                                            total +
                                            item.PriceByHour *
                                              calTime(
                                                filterService.OrderByTimeFrom,
                                                filterService.OrderByTimeTo
                                              ),
                                          0
                                        )
                                      )}đ`}
                                    {filterService?.OrderByTime === 0 &&
                                      `${convertPrice(
                                        chooseServiceList?.reduce(
                                          (total, item) =>
                                            total +
                                            item.PriceByDate *
                                              calDate(
                                                filterService.OrderByDateFrom,
                                                filterService.OrderByDateTo
                                              ),
                                          0
                                        )
                                      )}đ`}
                                  </div>
                                  <span>Bao gồm 50.000đ thuế và phí</span>
                                </Row>
                              </Col>
                            </>
                          ) : (
                            <>
                              {listTimeSelected.length > 0 &&
                                listTimeSelected?.find(
                                  (item) => item.id === data?.id
                                ) && (
                                  <>
                                    <Col span={24} style={{ textAlign: "end" }}>
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
                                          )?.OrderByTime === 1 &&
                                            convertPrice(
                                              data?.PriceByHour *
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
                                            )}
                                          {listTimeSelected?.find(
                                            (item) => item.id === data?.id
                                          )?.OrderByTime === 0 &&
                                            convertPrice(
                                              data?.PriceByDate *
                                                calDate(
                                                  listTimeSelected?.find(
                                                    (item) =>
                                                      item.id === data?.id
                                                  )?.OrderByDateFrom,
                                                  listTimeSelected?.find(
                                                    (item) =>
                                                      item.id === data?.id
                                                  )?.OrderByDateTo
                                                )
                                            )}
                                          đ
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
                                          )?.OrderByTime === 1 &&
                                            convertPrice(
                                              data?.PriceByHour *
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
                                            )}
                                          {listTimeSelected?.find(
                                            (item) => item.id === data?.id
                                          )?.OrderByTime === 0 &&
                                            convertPrice(
                                              data?.PriceByDate *
                                                calDate(
                                                  listTimeSelected?.find(
                                                    (item) =>
                                                      item.id === data?.id
                                                  )?.OrderByDateFrom,
                                                  listTimeSelected?.find(
                                                    (item) =>
                                                      item.id === data?.id
                                                  )?.OrderByDateTo
                                                )
                                            )}
                                          đ
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
                  <Table column={COLUMN} row={ROW(studioDetail?.service)} />
                )}
                <div className={cx("rating")}>
                  <CommentRating data={studioDetail} className="mb-43 mt-12" />
                </div>
              </div>
              {screens?.xs ? (
                <>
                  {chooseServiceList.length > 0 && (
                    <div className={cx("right")}>
                      <ReactStickyBox offsetTop={20} offsetBottom={20}>
                        <div
                          style={{
                            padding: "24px 26px",
                            backgroundColor: "#ffffff",
                            // height: "100%",
                          }}
                        >
                          <div className="d-flex justify-content-between mb-12">
                            <div
                              className=""
                              style={{
                                fontWeight: "600",
                                fontSize: "18px",
                                lineHeight: "25px",
                                /* Neutral/Grey 700 */
                                color: "#222222",
                              }}
                            >
                              Đã chọn {chooseService.length} sản phẩm
                            </div>
                            {chooseService.length > 0 && (
                              <div
                                style={{
                                  fontWeight: "400",
                                  fontSize: "16px",
                                  lineHeight: "22px",
                                  textDecorationLine: "line-through",
                                  /* Neutral/Grey 400 */
                                  color: "#828282",
                                }}
                              >
                                {`${convertPrice(
                                  chooseService?.reduce(
                                    (total, item) => total + item.Price,
                                    0
                                  )
                                )}`}
                                đ
                              </div>
                            )}
                          </div>
                          <div className="d-flex justify-content-between mb-26">
                            <div className="text-medium-re">
                              Bao gồm 50.000đ thuế và phí
                            </div>
                            <div
                              style={{
                                fontWeight: "700",
                                fontSize: "20px",
                                lineHeight: "27px",
                                /* Primary/Red 700 */
                                color: "#E22828",
                              }}
                            >
                              {`${convertPrice(
                                chooseService?.reduce(
                                  (total, item) => total + item.Sales,
                                  0
                                )
                              )}`}
                              đ
                            </div>
                          </div>
                          <div className="w-100 d-flex justify-content-between">
                            <Button
                              className="w-60 h-48px d-flex justify-content-center align-items-center btn_add"
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
                            >
                              Đặt ngay
                            </Button>
                          </div>
                        </div>
                      </ReactStickyBox>
                    </div>
                  )}
                </>
              ) : (
                <div className={cx("right")}>
                  <div className={cx("desc_col_right")}>
                    <div className="d-flex mb-30">
                      <img src={imgPost} className={cx("avatar")} alt="" />
                      <div>
                        <div className={cx("desc_col_right_title")}>
                          {studioDetail?.shop?.Name}
                          <CheckCircleOutlined
                            className={cx("icon_check_circle")}
                          />
                        </div>
                        <div
                          className={cx("text-medium-re")}
                          style={{ marginBottom: "15px" }}
                        >
                          <img
                            src={svgLocation}
                            style={{ marginRight: "6px" }}
                            alt=""
                          />
                          {studioDetail?.shop?.Address}
                        </div>
                      </div>
                    </div>
                    <Button className={cx("btn_see")}>
                      <Link to="shop">Xem shop</Link>
                      {/* <iframe
                      style={{ width: "100%", height: "100%", border: "0" }}
                      src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d251637.95196238213!2d105.6189045!3d9.779349!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1659429407556!5m2!1svi!2s"
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe> */}
                    </Button>
                  </div>
                  <ReactStickyBox offsetTop={20} offsetBottom={20}>
                    <div
                      style={{
                        padding: "24px 26px",
                        backgroundColor: "#ffffff",
                        // height: "100%",
                      }}
                    >
                      <div className="d-flex justify-content-between mb-12">
                        <div
                          className=""
                          style={{
                            fontWeight: "600",
                            fontSize: "18px",
                            lineHeight: "25px",
                            /* Neutral/Grey 700 */
                            color: "#222222",
                          }}
                        >
                          Đã chọn {chooseService.length} sản phẩm
                        </div>
                        {chooseService.length > 0 && (
                          <div
                            style={{
                              fontWeight: "400",
                              fontSize: "16px",
                              lineHeight: "22px",
                              textDecorationLine: "line-through",
                              /* Neutral/Grey 400 */
                              color: "#828282",
                            }}
                          >
                            {`${convertPrice(
                              chooseService?.reduce(
                                (total, item) => total + item.Price,
                                0
                              )
                            )}`}
                            đ
                          </div>
                        )}
                      </div>
                      <div className="d-flex justify-content-between mb-26">
                        <div className="text-medium-re">
                          Bao gồm 50.000đ thuế và phí
                        </div>
                        <div
                          style={{
                            fontWeight: "700",
                            fontSize: "20px",
                            lineHeight: "27px",
                            /* Primary/Red 700 */
                            color: "#E22828",
                          }}
                        >
                          {`${convertPrice(
                            chooseService?.reduce(
                              (total, item) => total + item.Sales,
                              0
                            )
                          )}`}
                          đ
                        </div>
                      </div>
                      <div className="w-100 d-flex justify-content-between">
                        <Button
                          className="w-60 h-48px d-flex justify-content-center align-items-center btn_add"
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
                        >
                          Đặt ngay
                        </Button>
                      </div>
                    </div>
                  </ReactStickyBox>
                </div>
              )}
            </div>

            {listStudioSimilar.length > 0 ? (
              <SlideCard
                data={listStudioSimilar}
                category={{ name: "clothes", id: 3 }}
                title="Trang phục tương tự"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Index;
