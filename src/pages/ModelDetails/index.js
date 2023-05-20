import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeploymentUnitOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  HeartFilled,
  HeartOutlined,
  HomeOutlined,
  LoadingOutlined,
  MoreOutlined,
  ShareAltOutlined,
  ShoppingCartOutlined,
  SkinOutlined,
  StarOutlined,
  StopOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Grid, Popover, Rate, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import "./modelDetails.scss";
import styles from "./Detail.module.scss";

import Table from "../../components/Table";
import CommentRating from "../../components/CommentRating";

import svgLocation from "../../assets/svg/location.svg";
import ImagePost from "../../components/imagePost/ImagePost";
import { SHOW_MODAL } from "../../stores/types/modalTypes";
import {
  getLikeStudioPostAction,
  getStudioSimilarAction,
  handlerSelectServiceAction,
  studioDetailAction,
} from "../../stores/actions/studioPostAction";
import { convertPrice } from "../../utils/convert";
import { chooseServiceAction } from "../../stores/actions/OrderAction";
import toastMessage from "../../components/ToastMessage";
// import SelectTimeOption from "../../components/SelectTimeOption/SelectTimeOption";
import PopUpSignIn from "../Auth/PopUpSignIn/PopUpSignIn";
import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";
import SlideAlbum from "../../components/SlideAlbum";
import { convertImage } from "../../utils/convertImage";
import { SlideCard } from "../StudioDetail/SlideCard";
import { calDate, calTime } from "../../utils/calculate";
// import { SET_PROMOTION_CODE_USER_SAVE } from "../../stores/types/promoCodeType";
import {
  SET_PROMOTION_CODE,
  SET_STUDIO_DETAIL,
} from "../../stores/types/studioPostType";
import PromotionList from "../../components/PromotionList/PromotionList";
import { Report } from "../StudioDetail/Report";
import SelectTimeOptionService from "../../components/SelectTimeOptionService/SelectTimeOptionService";
import ReactStickyBox from "react-sticky-box";
import images from "../../assets/images";
import classNames from "classnames/bind";
import {
  DELETE_CHOOSE_SERVICE,
  SET_CHOOSE_SERVICE,
} from "../../stores/types/OrderType";

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

const Index = () => {
  const screens = useBreakpoint();
  const {
    studioDetail,
    listStudioSimilar,
    promotionCode,
    chooseService,
    listTimeSelected,
  } = useSelector((state) => state.studioPostReducer);
  const { promoCodeUserSave } = useSelector((state) => state.promoCodeReducer);
  const { chooseServiceList } = useSelector((state) => state.OrderReducer);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const cate =
    location.pathname.split("/").filter((item) => item !== "")[1] === "model"
      ? 6
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

  const [open, setOpen] = useState(false);
  // const [chooseService, setChooseService] = useState([]);
  const [toggleSeeMore, setToggleSeeMore] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.authenticateReducer);
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
      dispatch({ type: SET_STUDIO_DETAIL, payload: {} });
      dispatch({ type: SET_PROMOTION_CODE, data: [] });
      dispatch({ type: "SET_STUDIO_DETAIL", payload: {} });
    };
  }, [dispatch]);
  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
    dispatch({ type: "SET_SELECT_TIME_ORDER" });
    dispatch({ type: "SET_SERVICE_SELECT", payload: null });
    dispatch({ type: SET_CHOOSE_SERVICE, payload: [] });
  }, [id]);

  const handleChangeLike = (e) => {
    if (currentUser) {
      dispatch(getLikeStudioPostAction(id, cate, currentUser?.id));
    }
  };

  const ROW = (dataSource = []) => {
    if (dataSource.length > 0) {
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
                  color: "#222222",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                <div>
                  <ClockCircleOutlined
                    className="me-10 mb-2"
                    style={{ fontSize: "15px" }}
                  />
                  Thời gian thực hiện tối đa
                </div>
                <div className="detail-description">
                  <p>2 giờ</p>
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
                  <SkinOutlined
                    className="me-10 mb-2"
                    style={{ fontSize: "15px" }}
                  />
                  Số sản phẩm tối đa
                </div>
                <div className="detail-description">
                  <p>3 sản phẩm</p>
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
                  <StopOutlined
                    className="me-10 mb-2"
                    style={{ fontSize: "15px" }}
                  />
                  Dịch vụ CHƯA bao gồm:
                </div>
                <ul className="detail-description">
                  <li>Phí đi theo để dặm phấn, chỉnh tóc, thay trang phục</li>
                </ul>
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
            </div>
          ),
        },
        {
          key: "desc",
          render: () => {
            return (
              <SelectTimeOptionService
                // disabled={
                //   serviceSelected === null
                //     ? false
                //     : data.id === serviceSelected
                //     ? false
                //     : true
                // }
                service={data}
              />
            );
          },
        },
        {
          key: "currency",
          render: () => (
            <>
              {chooseService.OrderByTime !== -1 && (
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
                      {chooseService.OrderByTime === 1 &&
                        data?.PriceByHour?.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      {chooseService.OrderByTime === 0 &&
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
                      {chooseService.OrderByTime === 1 &&
                        data?.PriceByHour?.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      {chooseService.OrderByTime === 0 &&
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
                {chooseService.id === data.id ? (
                  <div
                    onClick={() => dispatch({ type: "REMOVE_SELECT_TIME" })}
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
          <div className="model_container">
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
                      <div className="mt-3">
                        {studioDetail?.data?.TotalRate}
                      </div>
                      <div className={cx("line-col")}></div>
                      <div
                        className={cx("number-order")}
                        style={{ fontSize: "15px", marginTop: "3px" }}
                      >
                        {studioDetail?.data?.BookingCount} đã đặt{" "}
                      </div>
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
                  {/* <Row justify="space-between" align="middle">
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
                  </Row> */}
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
                    {/* <Dropdown overlay={menu_report} trigger={["click"]}>
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
                    src={svgLocation}
                    style={{ marginRight: "0.5rem" }}
                    alt=""
                  />
                  {studioDetail?.data?.Address}
                </div>
                <div className="d-flex align-items-center mb-15">
                  <Rate
                    disabled
                    allowHalf
                    value={studioDetail?.data?.TotalRate}
                    // className="rating d-flex align-items-center"
                  />

                  <span className="reserve">
                    {studioDetail?.data?.TotalRate}
                  </span>
                  <span className="reserve">
                    Đã đặt {studioDetail?.data?.BookingCount}
                  </span>
                </div>
                <div style={{ height: "" }}>
                  <ImagePost data={studioDetail?.data?.Image} />
                </div>
              </div>
            )}

            {/* <div className="wrapper_description">
              <Row style={{ height: "100%" }}>
                <Col
                  lg={16}
                  sm={24}
                  style={{ paddingRight: "0.25rem", height: "100%" }}
                  className="mb-12"
                >
                  <div className="desc_col_left mb-12">
                    <ReadMoreDesc title="Mô tả">
                      {studioDetail?.data?.Description}
                    </ReadMoreDesc>
                  </div>
                  <div
                    className="py-26 px-18"
                    style={{
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <PromotionList data={filter_promo} />
                  </div>
                </Col>
                <Col
                  lg={8}
                  sm={24}
                  style={{ paddingLeft: "0.25rem", height: "100%" }}
                  className="mb-12"
                >
                  <div className="desc_col_right">
                    <div className="">
                      <div className="desc_col_right_title">
                        Xem trên bản đồ
                      </div>
                      <div
                        className="text-medium-re"
                        style={{ marginBottom: "15px" }}
                      >
                        <img
                          src={svgLocation}
                          style={{ marginRight: "6px" }}
                          alt=""
                        />
                        {studioDetail?.data?.Address}
                      </div>
                    </div>
                    <iframe
                      style={{ width: "100%", height: "220px", border: "0" }}
                      src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d251637.95196238213!2d105.6189045!3d9.779349!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1659429407556!5m2!1svi!2s"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="map"
                    ></iframe>
                  </div>
                </Col>
              </Row>
            </div>
            <div className="w-100 mb-12 wrapper_list_costume">
              <Row>
                <Col
                  lg={16}
                  sm={24}
                  style={{ paddingRight: "0.25rem" }}
                  className="col_left"
                >
                  <div
                    className=" py-22 mb-12 h-100"
                    style={{
                      backgroundColor: "#ffffff",
                    }}
                  >
                    <Table column={COLUMN} row={ROW(studioDetail?.service)} />
                  </div>
                </Col>
                <Col lg={8} sm={24} style={{ paddingLeft: "0.25rem" }}>
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
                          color: "#222222",
                        }}
                      >
                        Đã chọn {chooseService.length} sản phẩm
                      </div>
                      {chooseService.length > 0 && (
                        <span
                          style={{
                            textDecoration: "line-through",
                            fontSize: " 16px",
                            color: "#828282",
                          }}
                        >
                          {chooseService.OrderByTime === 1 &&
                            `${convertPrice(
                              chooseService?.reduce(
                                (total, item) =>
                                  total +
                                  item.PriceByHour *
                                    calTime(
                                      chooseService.OrderByTimeFrom,
                                      chooseService.OrderByTimeTo
                                    ),
                                0
                              )
                            )}`}
                          {chooseService.OrderByTime === 0 &&
                            `${convertPrice(
                              chooseService?.reduce(
                                (total, item) =>
                                  total +
                                  item.PriceByDate *
                                    calDate(
                                      chooseService.OrderByDateFrom,
                                      chooseService.OrderByDateTo
                                    ),
                                0
                              )
                            )}`}
                          đ
                        </span>
                      )}
                    </div>
                    <div className="d-flex justify-content-between mb-26">
                      <div className="text-medium-re">
                        Bao gồm 50.000đ thuế và phí
                      </div>
                      {chooseService.length > 0 && (
                        <div
                          style={{
                            fontWeight: "700",
                            fontSize: "20px",
                            lineHeight: "27px",
                            color: "#E22828",
                          }}
                        >
                          {chooseService.OrderByTime === 1 &&
                            `${convertPrice(
                              chooseService?.reduce(
                                (total, item) =>
                                  total +
                                  item.PriceByHour *
                                    calTime(
                                      chooseService.OrderByTimeFrom,
                                      chooseService.OrderByTimeTo
                                    ),
                                0
                              )
                            )}`}
                          {chooseService.OrderByTime === 0 &&
                            `${convertPrice(
                              chooseService?.reduce(
                                (total, item) =>
                                  total +
                                  item.PriceByDate *
                                    calDate(
                                      chooseService.OrderByDateFrom,
                                      chooseService.OrderByDateTo
                                    ),
                                0
                              )
                            )}`}
                          đ
                        </div>
                      )}
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
                </Col>
              </Row>
            </div> */}

            <div className={cx("box2")}>
              <div className={cx("left")}>
                <div className={cx("description")}>
                  <Row>
                    <Col lg={12} md={12} sm={12} xs={24}>
                      <div
                        className="mt-10"
                        style={{
                          color: "#222222",
                          fontSize: "16px",
                          fontWeight: "700",
                        }}
                      >
                        <div>
                          <UserOutlined
                            className="me-10 mb-2"
                            style={{ fontSize: "15px" }}
                          />
                          Ngoại hình
                        </div>
                        <ul className="detail-description">
                          <li>Nữ</li>
                          <li>22 tuổi</li>
                          <li>Cao 165cm</li>
                          <li>Số do ba vòng: 84 - 63 - 92</li>
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
                          <DeploymentUnitOutlined
                            className="me-10 mb-2"
                            style={{ fontSize: "15px" }}
                          />
                          Mạng xã hội
                        </div>
                        <ul className="detail-description">
                          <li>Instagram 25.000 lượt theo dõi</li>
                          <li>Youtube 5.000 lượt đăng ký</li>
                        </ul>
                      </div>
                    </Col>
                    <Col lg={12} md={12} sm={12} xs={24}>
                      <div
                        className="mt-10"
                        style={{
                          color: "#222222",
                          fontSize: "16px",
                          fontWeight: "700",
                        }}
                      >
                        <div>
                          <StarOutlined
                            className="me-10 mb-2"
                            style={{ fontSize: "15px" }}
                          />
                          Ưu điểm
                        </div>
                        <div className="detail-description">
                          <p>
                            Có 3 năm kinh nghiệm trong lĩnh vực làm người mẫu
                          </p>
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
                          <StarOutlined
                            className="me-10 mb-2"
                            style={{ fontSize: "15px" }}
                          />
                          Giải thưởng
                        </div>
                        <div className="detail-description">
                          <p>Á hậu 2 Miss Grand Vietnam 2022</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className={cx("sale")}>
                  <PromotionList data={filter_promo} />
                </div>

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
                            <ClockCircleOutlined
                              className="me-10 mb-2"
                              style={{ fontSize: "15px" }}
                            />
                            Thời gian thực hiện tối đa
                          </div>
                          <div className="detail-description">
                            <p>2 giờ</p>
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
                            <SkinOutlined
                              className="me-10 mb-2"
                              style={{ fontSize: "15px" }}
                            />
                            Số sản phẩm tối đa
                          </div>
                          <div className="detail-description">
                            <p>3 sản phẩm</p>
                          </div>
                        </div>
                        <Divider className="my-10" />
                        <div
                          className="mt-10"
                          style={{
                            color: "#222222",
                            fontSize: "16px",
                            fontWeight: "700",
                          }}
                        >
                          <div>
                            <StopOutlined
                              className="me-10 mb-2"
                              style={{ fontSize: "15px" }}
                            />
                            Dịch vụ CHƯA bao gồm:
                          </div>
                          <ul className="detail-description">
                            <li>
                              Phí đi theo để dặm phấn, chỉnh tóc, thay trang
                              phục
                            </li>
                          </ul>
                        </div>
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
                                        {chooseService?.OrderByTime === 1 &&
                                          `${convertPrice(
                                            chooseServiceList?.reduce(
                                              (total, item) =>
                                                total +
                                                item.PriceByHour *
                                                  calTime(
                                                    chooseService?.OrderByTimeFrom,
                                                    chooseService?.OrderByTimeTo
                                                  ),
                                              0
                                            )
                                          )}đ`}
                                        {chooseService?.OrderByTime === 0 &&
                                          `${convertPrice(
                                            chooseServiceList?.reduce(
                                              (total, item) =>
                                                total +
                                                item.PriceByDate *
                                                  calDate(
                                                    chooseService?.OrderByDateFrom,
                                                    chooseService?.OrderByDateTo
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
                                    {chooseService?.OrderByTime === 1 &&
                                      `${convertPrice(
                                        chooseServiceList?.reduce(
                                          (total, item) =>
                                            total +
                                            item.PriceByHour *
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
                                            item.PriceByDate *
                                              calDate(
                                                chooseService.OrderByDateFrom,
                                                chooseService.OrderByDateTo
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
                  <div className={cx("")}>
                    <Table column={COLUMN} row={ROW(studioDetail?.service)} />
                  </div>
                )}

                <div className={cx("rating")}>
                  <CommentRating data={studioDetail} className="mb-43 mt-12" />
                </div>
              </div>
              <div className={cx("right")}>
                <div className={cx("map")}>
                  <h3 className="mb-5">Xem trên bản đồ</h3>
                  <div
                    className={cx("address d-flex align-items-center mb-10")}
                  >
                    <img src={images.address} alt="" className="me-10" />
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
                          {chooseServiceList?.OrderByTime === 1 &&
                            `${convertPrice(
                              chooseServiceList?.reduce(
                                (total, item) =>
                                  total +
                                  item.PriceByHour *
                                    calTime(
                                      chooseService.OrderByTimeFrom,
                                      chooseService.OrderByTimeTo
                                    ),
                                0
                              )
                            )}đ`}
                          {chooseService.OrderByTime === 0 &&
                            `${convertPrice(
                              chooseServiceList?.reduce(
                                (total, item) =>
                                  total +
                                  item.PriceByDate *
                                    calDate(
                                      chooseService.OrderByDateFrom,
                                      chooseService.OrderByDateTo
                                    ),
                                0
                              )
                            )}đ`}
                        </span>
                      )}
                    </div>
                    <div className={cx("item")}>
                      <span className="mt-3">Bao gồm 50.000đ thuế và phí </span>
                      <span
                        style={{
                          color: "#E22828",
                          fontSize: "20px",
                          fontWeight: "700",
                        }}
                      >
                        {chooseService.OrderByTime === 1 &&
                          `${convertPrice(
                            chooseServiceList?.reduce(
                              (total, item) =>
                                total +
                                item.PriceByHour *
                                  calTime(
                                    chooseService.OrderByTimeFrom,
                                    chooseService.OrderByTimeTo
                                  ),
                              0
                            )
                          )}đ`}
                        {chooseService.OrderByTime === 0 &&
                          `${convertPrice(
                            chooseServiceList?.reduce(
                              (total, item) =>
                                total +
                                item.PriceByDate *
                                  calDate(
                                    chooseService.OrderByDateFrom,
                                    chooseService.OrderByDateTo
                                  ),
                              0
                            )
                          )}đ`}
                      </span>
                    </div>
                    <div className="w-100 d-flex justify-content-between mt-20">
                      <Button
                        className="w-60 h-48px d-flex justify-content-center align-items-center btn_add"
                        disabled={chooseService.length > 0 ? false : true}
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
                          chooseServiceList.length > 0 && chooseService.id > 0
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
                          .sort((a, b) => a.id - b.id)
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
            {listStudioSimilar.length > 0 ? (
              <SlideCard
                data={listStudioSimilar}
                category={{ name: "model", id: 6 }}
                title="Model tương tự"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
