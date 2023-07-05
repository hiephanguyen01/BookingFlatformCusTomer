import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  HeartFilled,
  HeartOutlined,
  HomeOutlined,
  LoadingOutlined,
  MinusOutlined,
  MoreOutlined,
  PlusOutlined,
  ShareAltOutlined,
  ShoppingCartOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Grid,
  InputNumber,
  Popover,
  Rate,
  Row,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import imgPost from "../../assets/dao/Frame 163.jpg";
import svgLocation from "../../assets/svg/location.svg";
import CommentRating from "../../components/CommentRating";
import ImagePost from "../../components/imagePost/ImagePost";
import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";
import ReadMoreDesc from "../../components/ReadMoreDesc";
import toastMessage from "../../components/ToastMessage";
import { chooseServiceAction } from "../../stores/actions/OrderAction";
import {
  getLikeStudioPostAction,
  getStudioSimilarAction,
  handlerSelectServiceAction,
  studioDetailAction,
} from "../../stores/actions/studioPostAction";
import { SHOW_MODAL } from "../../stores/types/modalTypes";
import { convertImage } from "../../utils/convertImage";
import PopUpSignIn from "../Auth/PopUpSignIn/PopUpSignIn";
import SlideCard from "../StudioDetail/SlideCard";
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
import { Pagination } from "swiper";
import { convertPrice } from "../../utils/convert";
import { calTime } from "../../utils/calculate";

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

  const [amount, setAmount] = useState(1);
  const [size, setSize] = useState("S");
  const [color, setColor] = useState("Trắng");
  // const [chooseService, setChooseService] = useState([]);
  const [open, setOpen] = useState(false);
  const { currentUser } = useSelector((state) => state.authenticateReducer);
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
    window.scrollTo({ behavior: "smooth", top: 0 });
    return () => {
      dispatch({ type: SET_PROMOTION_CODE, data: [] });
      dispatch({ type: SET_STUDIO_DETAIL, payload: {} });
    };
  }, [dispatch]);
  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, [id]);

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

  const handleBook = () => {
    const findSelectTime = listTimeSelected.find(
      (item) => item.id === studioDetail?.data.id
    );
    if (findSelectTime) {
      if (
        findSelectTime.OrderByTime === 1 &&
        findSelectTime.OrderByTimeFrom !== undefined &&
        findSelectTime.OrderByTimeFrom !== "" &&
        findSelectTime.OrderByTimeTo !== undefined &&
        findSelectTime.OrderByTimeTo !== "" &&
        findSelectTime.OrderByTimeTo !== findSelectTime.OrderByTimeFrom
      ) {
        dispatch(
          handlerSelectServiceAction(studioDetail?.data, {
            ...findSelectTime,
            size,
            color,
            amount,
          })
        );
      } else if (
        findSelectTime.OrderByTime === 0 &&
        findSelectTime.OrderByDateFrom !== undefined &&
        findSelectTime.OrderByDateFrom !== "" &&
        findSelectTime.OrderByDateTo !== undefined &&
        findSelectTime.OrderByDateTo !== ""
      ) {
        dispatch(
          handlerSelectServiceAction(studioDetail?.data, {
            ...findSelectTime,
            size,
            color,
            amount,
          })
        );
      } else {
        return toastMessage("Vui lòng chọn thời gian để xem giá!", "warning");
      }
    } else {
      return toastMessage("Vui lòng chọn thời gian để xem giá!", "warning");
    }
    navigate("order");
    // if (chooseServiceList.length > 0) {
    //   dispatch(chooseServiceAction(chooseServiceList));
    // } else {
    //   toastMessage("Bạn cần chọn dịch vụ!", "warn");
    // }
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
          }}>
          {screens?.xs && (
            <BackNav
              to={location?.state?.pathname || "/home/filter?category=3"}
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
                      }}>
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
                          }}>
                          <HomeOutlined style={{ fontSize: "20px" }} />
                          <span
                            style={{ fontSize: "18px", fontWeight: "bold" }}>
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
                          }}>
                          <ExclamationCircleOutlined
                            style={{ fontSize: "20px" }}
                          />
                          <span
                            style={{ fontSize: "18px", fontWeight: "bold" }}>
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
                          onClick={() => setOpen(false)}>
                          <ShareAltOutlined style={{ fontSize: "20px" }} />
                          <span
                            style={{ fontSize: "18px", fontWeight: "bold" }}>
                            Chia sẻ
                          </span>
                        </div>
                      </Col>
                    </Row>
                  }
                  trigger="click"
                  visible={open}
                  onVisibleChange={(value) => setOpen(value)}>
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
                  className={cx("swiper-slide-detail")}>
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
                    )}>
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
                        value={studioDetail?.data?.TotalRate}></Rate>
                      <span className="ms-5">
                        {studioDetail?.data?.TotalRate}
                      </span>
                      <div className={cx("line-col")}></div>
                      <span
                        className={cx("number-order")}
                        style={{ fontSize: "15px" }}>
                        {studioDetail?.data?.BookingCount} đã đặt{" "}
                      </span>
                    </div>
                    <PopUpSignIn
                      onClick={(e) => {
                        e.stopPropagation();
                      }}>
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
                  style={{ marginBottom: "11px" }}>
                  <div className="header_title">
                    {studioDetail?.data?.Name}
                    <CheckCircleOutlined className="icon_check_circle" />
                  </div>
                  <div className="d-flex align-items-center">
                    <PopUpSignIn
                      onClick={(e) => {
                        e.stopPropagation();
                      }}>
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
                          }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              cursor: "pointer",
                            }}>
                            <WarningOutlined style={{ fontSize: "20px" }} />
                            <span
                              style={{ fontSize: "18px", fontWeight: "bold" }}>
                              Báo cáo
                            </span>
                          </div>
                        </div>
                      }
                      trigger="click">
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
                  <div className="reserve">{studioDetail?.data?.TotalRate}</div>
                  <span className="reserve_count">
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
                <div>
                  <div
                    className=" py-22 mb-12 h-100 px-22"
                    style={{
                      backgroundColor: "#ffffff",
                    }}>
                    {chooseService.OrderByTime === -1 && (
                      <div className={cx("warning-choose-time")}>
                        <ExclamationCircleOutlined className="me-5" />
                        Chọn khung giờ và số lượng bạn muốn đặt để xem giá cho
                        từng sản phẩm
                      </div>
                    )}
                    <Row align="middle">
                      <Col span={4}>
                        <span>Size</span>
                      </Col>
                      <Select
                        value={size}
                        style={{
                          width: 120,
                        }}
                        onChange={(value) => setSize(value)}
                        options={[
                          {
                            value: "S",
                            label: "S",
                          },
                          {
                            value: "M",
                            label: "M",
                          },
                          {
                            value: "L",
                            label: "L",
                          },
                        ]}
                      />
                    </Row>
                    <Row align="middle" className="mt-20">
                      <Col span={4}>
                        <span>Màu sắc</span>
                      </Col>
                      <Select
                        value={color}
                        style={{
                          width: 120,
                        }}
                        onChange={(value) => setColor(value)}
                        options={[
                          {
                            value: "Trắng",
                            label: "Trắng",
                          },
                          {
                            value: "Đen",
                            label: "Đen",
                          },
                          {
                            value: "Đỏ",
                            label: "Đỏ",
                          },
                        ]}
                      />
                    </Row>
                    <Row align="middle" className="mt-10">
                      <Col span={4}>
                        <p className={cx("amount-label")}>Số lượng</p>
                      </Col>
                      <div className="d-flex amount-wrapper my-15">
                        <MinusOutlined
                          className={cx("btn-amount")}
                          onClick={() => {
                            if (amount > 1) {
                              setAmount(amount - 1);
                            }
                          }}
                        />
                        <InputNumber
                          min={1}
                          max={100}
                          value={amount}
                          onChange={(value) => setAmount(value)}
                          className={cx("amount-value")}
                          controls={false}
                        />
                        <PlusOutlined
                          className={cx("btn-amount")}
                          onClick={() => setAmount(amount + 1)}
                        />
                      </div>
                    </Row>
                    <p className={cx("amount-label")}>Khung giờ bạn muốn đặt</p>
                    <br />
                    <SelectTimeOptionService
                      service={{ ...studioDetail?.data, category: cate }}
                      className=""
                    />
                  </div>
                </div>
                <div
                  style={{ backgroundColor: "#fff" }}
                  className={cx("shop-info-mobile")}>
                  <Row justify="space-between" align="middle" className="p-18">
                    <Col span={4}>
                      <img
                        src={imgPost}
                        style={{
                          borderRadius: "50%",
                          width: "40px",
                          height: "40px",
                        }}
                        alt=""
                      />
                    </Col>
                    <Col span={13}>
                      <div>
                        <Row>
                          {/* {studioDetail?.shop?.Name} */}
                          <div className={cx("shop-name")}>
                            Thuê thiết bị quay phim xịn xò
                          </div>
                          <CheckCircleOutlined
                            className={cx("icon_check_circle")}
                          />
                        </Row>
                        <div style={{ fontSize: "12px", color: "#828282" }}>
                          <img
                            src={svgLocation}
                            style={{ marginRight: "6px" }}
                            alt=""
                          />
                          {/* {studioDetail?.shop?.Address} */}
                          Quận 1, TPHCM
                        </div>
                      </div>
                    </Col>
                    <Col span={7}>
                      {" "}
                      <Button className={cx("btn-see-shop")}>
                        <Link
                          to={`shop/${studioDetail?.shop?.id}`}
                          state={{
                            pathname: `/home/clothes/${studioDetail?.data?.id}`,
                            pathnameFilter: `${location?.state?.pathname}`,
                          }}>
                          Xem shop
                        </Link>
                        {/* <iframe
                      style={{ width: "100%", height: "100%", border: "0" }}
                      src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d251637.95196238213!2d105.6189045!3d9.779349!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1659429407556!5m2!1svi!2s"
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                    ></iframe> */}
                      </Button>
                    </Col>
                  </Row>
                </div>
                <div className={cx("rating")}>
                  <CommentRating data={studioDetail} className="mb-43 mt-12" />
                </div>
              </div>
              {screens?.xs ? (
                <div className={cx("right")}>
                  <ReactStickyBox offsetTop={20} offsetBottom={20}>
                    <div
                      style={{
                        padding: "24px 26px",
                        backgroundColor: "#ffffff",
                        // height: "100%",
                      }}>
                      <div className="d-flex justify-content-between mb-12">
                        <div
                          className=""
                          style={{
                            fontWeight: "600",
                            fontSize: "18px",
                            lineHeight: "25px",
                            /* Neutral/Grey 700 */
                            color: "#222222",
                          }}>
                          Giá trọn gói
                        </div>
                        <div
                          style={{
                            fontWeight: "400",
                            fontSize: "16px",
                            lineHeight: "22px",
                            textDecorationLine: "line-through",
                            color: "#828282",
                          }}>
                          {listTimeSelected?.find(
                            (item) => item?.id === studioDetail?.data?.id
                          )?.OrderByTime === 1 && (
                            <>
                              {listTimeSelected?.find(
                                (item) => item.id === studioDetail?.data?.id
                              )?.pricesByHour?.length > 0 ? (
                                <>
                                  {convertPrice(
                                    listTimeSelected?.find(
                                      (item) =>
                                        item?.id === studioDetail?.data?.id
                                    ).pricesByHour[0]?.PriceByHour *
                                      calTime(
                                        listTimeSelected?.find(
                                          (item) =>
                                            item?.id === studioDetail?.data?.id
                                        )?.OrderByTimeFrom,
                                        listTimeSelected?.find(
                                          (item) =>
                                            item?.id === studioDetail?.data?.id
                                        )?.OrderByTimeTo
                                      ) *
                                      amount
                                  )}
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          )}
                          {listTimeSelected?.find(
                            (item) => item?.id === studioDetail?.data?.id
                          )?.OrderByTime === 0 &&
                            convertPrice(
                              listTimeSelected
                                ?.find(
                                  (item) => item?.id === studioDetail?.data?.id
                                )
                                ?.pricesByDate?.reduce(
                                  (totalPrice, item) =>
                                    totalPrice + item?.PriceByDate,
                                  0
                                ) * amount
                            )}
                          đ
                        </div>
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
                          }}>
                          {listTimeSelected?.find(
                            (item) => item?.id === studioDetail?.data?.id
                          )?.OrderByTime === 1 && (
                            <>
                              {listTimeSelected?.find(
                                (item) => item.id === studioDetail?.data?.id
                              )?.pricesByHour?.length > 0 ? (
                                <>
                                  {convertPrice(
                                    listTimeSelected?.find(
                                      (item) =>
                                        item?.id === studioDetail?.data?.id
                                    ).pricesByHour[0]?.PriceByHour *
                                      calTime(
                                        listTimeSelected?.find(
                                          (item) =>
                                            item?.id === studioDetail?.data?.id
                                        )?.OrderByTimeFrom,
                                        listTimeSelected?.find(
                                          (item) =>
                                            item?.id === studioDetail?.data?.id
                                        )?.OrderByTimeTo
                                      ) *
                                      amount
                                  )}
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          )}
                          {listTimeSelected?.find(
                            (item) => item?.id === studioDetail?.data?.id
                          )?.OrderByTime === 0 &&
                            convertPrice(
                              listTimeSelected
                                ?.find(
                                  (item) => item?.id === studioDetail?.data?.id
                                )
                                ?.pricesByDate?.reduce(
                                  (totalPrice, item) =>
                                    totalPrice + item?.PriceByDate,
                                  0
                                ) * amount
                            )}
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
                          }>
                          <ShoppingCartOutlined />
                          Thêm vào giỏ hàng
                        </Button>
                        <Button
                          className="w-38 h-48px d-flex justify-content-center align-items-center btn_order"
                          onClick={handleBook}>
                          Đặt ngay
                        </Button>
                      </div>
                    </div>
                  </ReactStickyBox>
                </div>
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
                          style={{ marginBottom: "15px" }}>
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
                      <Link
                        to={`shop/${studioDetail?.shop?.id}`}
                        state={{
                          pathname: `/home/clothes/${studioDetail?.data?.id}`,
                          pathnameFilter: `${location?.state?.pathname}`,
                        }}>
                        Xem shop
                      </Link>
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
                      }}>
                      <div className="d-flex justify-content-between mb-12">
                        <div
                          className=""
                          style={{
                            fontWeight: "600",
                            fontSize: "18px",
                            lineHeight: "25px",
                            /* Neutral/Grey 700 */
                            color: "#222222",
                          }}>
                          Đã chọn {chooseServiceList.length} sản phẩm
                        </div>
                        {1 > 0 && (
                          <div
                            style={{
                              fontWeight: "400",
                              fontSize: "16px",
                              lineHeight: "22px",
                              textDecorationLine: "line-through",
                              /* Neutral/Grey 400 */
                              color: "#828282",
                            }}>
                            {listTimeSelected?.find(
                              (item) => item?.id === studioDetail?.data?.id
                            )?.OrderByTime === 1 && (
                              <>
                                {listTimeSelected?.find(
                                  (item) => item.id === studioDetail?.data?.id
                                )?.pricesByHour?.length > 0 ? (
                                  <>
                                    {convertPrice(
                                      listTimeSelected?.find(
                                        (item) =>
                                          item?.id === studioDetail?.data?.id
                                      ).pricesByHour[0]?.PriceByHour *
                                        calTime(
                                          listTimeSelected?.find(
                                            (item) =>
                                              item?.id ===
                                              studioDetail?.data?.id
                                          )?.OrderByTimeFrom,
                                          listTimeSelected?.find(
                                            (item) =>
                                              item?.id ===
                                              studioDetail?.data?.id
                                          )?.OrderByTimeTo
                                        ) *
                                        amount
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </>
                            )}
                            {listTimeSelected?.find(
                              (item) => item?.id === studioDetail?.data?.id
                            )?.OrderByTime === 0 &&
                              convertPrice(
                                listTimeSelected
                                  ?.find(
                                    (item) =>
                                      item?.id === studioDetail?.data?.id
                                  )
                                  ?.pricesByDate?.reduce(
                                    (totalPrice, item) =>
                                      totalPrice + item?.PriceByDate,
                                    0
                                  ) * amount
                              )}
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
                          }}>
                          {listTimeSelected?.find(
                            (item) => item?.id === studioDetail?.data?.id
                          )?.OrderByTime === 1 && (
                            <>
                              {listTimeSelected?.find(
                                (item) => item.id === studioDetail?.data?.id
                              )?.pricesByHour?.length > 0 ? (
                                <>
                                  {convertPrice(
                                    listTimeSelected?.find(
                                      (item) =>
                                        item?.id === studioDetail?.data?.id
                                    ).pricesByHour[0]?.PriceByHour *
                                      calTime(
                                        listTimeSelected?.find(
                                          (item) =>
                                            item?.id === studioDetail?.data?.id
                                        )?.OrderByTimeFrom,
                                        listTimeSelected?.find(
                                          (item) =>
                                            item?.id === studioDetail?.data?.id
                                        )?.OrderByTimeTo
                                      ) *
                                      amount
                                  )}
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          )}
                          {listTimeSelected?.find(
                            (item) => item?.id === studioDetail?.data?.id
                          )?.OrderByTime === 0 &&
                            convertPrice(
                              listTimeSelected
                                ?.find(
                                  (item) => item?.id === studioDetail?.data?.id
                                )
                                ?.pricesByDate?.reduce(
                                  (totalPrice, item) =>
                                    totalPrice + item?.PriceByDate,
                                  0
                                ) * amount
                            )}
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
                          }>
                          <ShoppingCartOutlined />
                          Thêm vào giỏ hàng
                        </Button>
                        <Button
                          className="w-38 h-48px d-flex justify-content-center align-items-center btn_order"
                          onClick={handleBook}>
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
          }}>
          <div
            style={{
              background: "white",
              width: "fit-content",
              borderRadius: "50%",
              padding: "10px",
              margin: "10px",
            }}>
            <LoadingOutlined style={{ fontSize: "40px" }} />
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
