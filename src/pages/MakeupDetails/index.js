import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DownOutlined,
  EnvironmentOutlined,
  HeartFilled,
  HeartOutlined,
  LoadingOutlined,
  MoreOutlined,
  ShoppingCartOutlined,
  StopOutlined,
  TeamOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Button, Col, Popover, Rate, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import svgLocation from "../../assets/svg/location.svg";
import CommentRating from "../../components/CommentRating";
import ImagePost from "../../components/imagePost/ImagePost";
import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";
import ReadMoreDesc from "../../components/ReadMoreDesc";
import SlideAlbum from "../../components/SlideAlbum";
// import SelectTimeOption from "../../components/SelectTimeOption/SelectTimeOption";
import Table from "../../components/Table";
import toastMessage from "../../components/ToastMessage";
import { chooseServiceAction } from "../../stores/actions/OrderAction";
import {
  getLikeStudioPostAction,
  getStudioSimilarAction,
  handlerSelectServiceAction,
  studioDetailAction,
} from "../../stores/actions/studioPostAction";
import { SHOW_MODAL } from "../../stores/types/modalTypes";
import { calDate, calTime } from "../../utils/calculate";
import { convertPrice } from "../../utils/convert";
import { convertImage } from "../../utils/convertImage";
import PopUpSignIn from "../Auth/PopUpSignIn/PopUpSignIn";
import { SlideCard } from "../StudioDetail/SlideCard";
import "./makeupDetails.scss";
import {
  SET_PROMOTION_CODE,
  SET_STUDIO_DETAIL,
} from "../../stores/types/studioPostType";
// import { SET_PROMOTION_CODE_USER_SAVE } from "../../stores/types/promoCodeType";
import PromotionList from "../../components/PromotionList/PromotionList";
import { Report } from "../StudioDetail/Report";
import SelectTimeOptionService from "../../components/SelectTimeOptionService/SelectTimeOptionService";
import ReactStickyBox from "react-sticky-box";
import styles from "./Detail.module.scss";
import images from "../../assets/images";
import cost from "../../assets/svg/cost.svg";
import classNames from "classnames/bind";
import {
  DELETE_CHOOSE_SERVICE,
  SET_CHOOSE_SERVICE,
} from "../../stores/types/OrderType";
const COLUMN = [
  { title: "Dịch vụ", size: 7 },
  { title: "Chọn thời gian", size: 10 },
  { title: "Chọn dịch vụ", size: 7 },
];
const cx = classNames.bind(styles);

const Index = () => {
  const {
    studioDetail,
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
    location.pathname.split("/").filter((item) => item !== "")[1] === "makeup"
      ? 4
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
      dispatch({ type: SET_PROMOTION_CODE, data: [] });
      dispatch({ type: SET_STUDIO_DETAIL, payload: {} });
      dispatch({ type: "SET_SERVICE_SELECT", payload: null });
    };
  }, [dispatch]);
  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
    dispatch({ type: "SET_SELECT_TIME_ORDER" });
    dispatch({ type: "SET_SERVICE_SELECT", payload: null });
    dispatch({ type: SET_CHOOSE_SERVICE, payload: [] });
  }, [id, dispatch]);

  const handleReport = () => {
    dispatch({
      type: SHOW_MODAL,
      Component: <Report category={cate} postId={id} />,
    });
  };

  // const menu_report = (
  //   <Menu
  //     items={[
  //       {
  //         label: (
  //           <div
  //             onClick={() =>
  //               dispatch({ type: SHOW_MODAL, Component: <Report /> })
  //             }
  //           >
  //             <ExclamationCircleOutlined className="me-10" />
  //             Báo cáo
  //           </div>
  //         ),
  //         key: "0",
  //       },
  //     ]}
  //   />
  // );

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
                  <CheckCircleOutlined
                    className="me-10 mb-2"
                    style={{ fontSize: "15px" }}
                  />
                  Dịch vụ ĐÃ bao gồm:
                </div>
                <ul className="detail-description">
                  <li>Làm tóc</li>
                  <li>Trang điểm</li>
                  <li>Mỹ phẩm cao cấp</li>
                  <li>Số lượng kiểu trang điểm: 2</li>
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
                  <StopOutlined
                    className="me-10 mb-2"
                    style={{ fontSize: "15px" }}
                  />
                  Dịch vụ CHƯA bao gồm:
                </div>
                <ul className="detail-description">
                  <p>Phí đi theo để dặm phấn, chỉnh tóc, thay trang phục</p>
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
                  <EnvironmentOutlined
                    className="me-10 mb-2"
                    style={{ fontSize: "12px" }}
                  />
                  Địa điểm
                </div>
                <div className="detail-description">
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
                  Thời gian trang điểm
                </div>
                <div className="detail-description">
                  <p>2 giờ (ước lượng)</p>
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
                  <UserOutlined
                    className="me-10 mb-2"
                    style={{ fontSize: "12px" }}
                  />
                  Số khách tối thiểu
                </div>
                <div className="detail-description">
                  <p>2 khách</p>
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
                  <TeamOutlined
                    className="me-10 mb-2"
                    style={{ fontSize: "12px" }}
                  />
                  Số khách tối đa
                </div>
                <div className="detail-description">
                  <p>10 khách</p>
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
                  <img
                    alt=""
                    src={cost}
                    className="me-10 mb-2"
                    style={{ fontSize: "12px" }}
                  />
                  Phụ thu
                </div>
                <div className="detail-description">
                  <p>Phụ thu phát sinh 200.000 VND/khách</p>
                </div>
              </div>
            </div>
          ),
        },
        {
          key: "desc",
          render: () => {
            return <SelectTimeOptionService service={data} />;
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
                </div>
              )}
              <div className="">
                {filterService.id === data.id ? (
                  <div
                    onClick={() => {
                      dispatch({ type: "REMOVE_SELECT_TIME" });
                      dispatch({ type: DELETE_CHOOSE_SERVICE });
                    }}
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
    // if (chooseService.length > 0) {
    //   dispatch(chooseServiceAction(chooseService));
    //   navigate("order");
    // } else {
    //   if (filterService.OrderByTime === -1) {
    //     toastMessage("Bạn cần chọn thời gian!", "warn");
    //   } else if (chooseService.length <= 0) {
    //     toastMessage("Bạn cần chọn dịch vụ!", "warn");
    //   }
    // }
  };

  // const handleAddCart = () => {
  //   if (chooseService.length > 0) {
  //     dispatch(addOrder(cate, chooseService));
  //     toastMessage("Đã thêm vào giỏ hàng!", "success");
  //   } else {
  //     toastMessage("Bạn cần chọn dịch vụ!", "warn");
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
        title={studioDetail?.data?.Name}
        description={studioDetail?.data?.Description}
        imgUrl={studioDetail?.data?.Image[0]}
        type="article"
        imgAlt="Booking Studio Details"
      />
      {Object.keys(studioDetail).length > 0 ? (
        <div className="container_detail">
          <div className="costume_container">
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
                    <a onClick={(e) => e.preventDefault()} href="#">
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
                  className="rating d-flex align-items-center"
                />

                <span className="reserve">{studioDetail?.data?.TotalRate}</span>
                <span className="reserve">
                  Đã đặt {studioDetail?.data?.BookingCount}
                </span>
              </div>
              <ImagePost data={studioDetail?.data?.Image} />
            </div>
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

                <div className={cx("")}>
                  <Table column={COLUMN} row={ROW(studioDetail?.service)} />
                </div>

                <div className={cx("rating")}>
                  <CommentRating data={studioDetail} className="mb-43 mt-12" />
                </div>
              </div>
              <div className={cx("right")}>
                <div className={cx("map")}>
                  <h3>Xem trên bản đồ</h3>
                  <div className={cx("address")}>
                    <img src={images.address} alt="" />
                    <span>{studioDetail?.data?.Address}</span>
                  </div>
                  <div className="mapouter">
                    {/* <div className="gmap_canvas">
                      <iframe
                        title="map"
                        className="gmap_iframe"
                        width="100%"
                        frameBorder={0}
                        scrolling="no"
                        marginHeight={0}
                        marginWidth={0}
                        src={`https://www.google.com/maps?q=${studioDetail1?.Latitude},${studioDetail1?.Longtitude}&t=&z=13&ie=UTF8&iwloc=B&output=embed`}
                      />
                    </div> */}
                  </div>
                </div>
                <ReactStickyBox offsetTop={20} offsetBottom={20}>
                  <div className={cx("order")}>
                    <div className={cx("item")}>
                      <h3>Đã chọn {chooseServiceList.length} phòng</h3>
                      {chooseServiceList.length > 0 && (
                        <span
                          style={{
                            textDecoration: "line-through",
                            fontSize: " 16px",
                            color: "#828282",
                          }}
                        >
                          {filterService.OrderByTime === 1 &&
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
                          {filterService.OrderByTime === 0 &&
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
                        {filterService.OrderByTime === 1 &&
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
                        {filterService.OrderByTime === 0 &&
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
                      </span>
                    </div>
                    <div className="w-100 d-flex justify-content-between mt-20">
                      <Button
                        className="w-60 h-48px d-flex justify-content-center align-items-center btn_add"
                        disabled={chooseServiceList?.length > 0 ? false : true}
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
                          chooseServiceList.length > 0 && filterService.id > 0
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
                        .sort((a, b) => a.id - b.id)
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
                category={{ name: "makeup", id: 4 }}
                title="Trang điểm tương tự"
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
