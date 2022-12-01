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
} from "@ant-design/icons";
import "./photographerDetail.scss";

import Table from "../../components/Table";
import ReadMoreDesc from "../../components/ReadMoreDesc";
import { ReactComponent as Check } from "../../assets/PhotographerDetail/check 2.svg";
import { Rate, Row, Col, Button, Popover } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SlideAlbum from "../MakeupDetails/components/SlideAlbum";
import CommentRating from "../../components/CommentRating";
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
import {
  // addOrder,
  chooseServiceAction,
} from "../../stores/actions/OrderAction";
import PopUpSignIn from "../Auth/PopUpSignIn/PopUpSignIn";
import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";
import { convertImage } from "../../utils/convertImage";
import { SlideCard } from "../StudioDetail/SlideCard";
import PromotionList from "../../components/PromotionList/PromotionList";
import { calDate, calTime } from "../../utils/calculate";
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
import { SET_CHOOSE_SERVICE } from "../../stores/types/OrderType";

const COLUMN = [
  { title: "Dịch vụ", size: 7 },
  { title: "Chọn thời gian", size: 10 },
  { title: "Chọn dịch vụ", size: 7 },
];
const cx = classNames.bind(styles);
const PhotographerDetail = () => {
  const {
    studioDetail,
    listStudioSimilar,
    promotionCode,
    filterService,
    serviceSelected,
  } = useSelector((state) => state.studioPostReducer);
  const { chooseServiceList } = useSelector((state) => state.OrderReducer);
  const { promoCodeUserSave } = useSelector((state) => state.promoCodeReducer);
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const cate =
    location.pathname.split("/").filter((item) => item !== "")[1] ===
    "photographer"
      ? 2
      : undefined;
  const [chooseService, setChooseService] = useState([]);
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
    window.scrollTo({ behavior: "smooth", top: 0 });
    dispatch({ type: "SET_SELECT_TIME_ORDER" });
    dispatch({ type: "SET_SERVICE_SELECT", payload: null });
    dispatch({ type: SET_CHOOSE_SERVICE, payload: [] });
  }, [id]);
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
              <SelectTimeOptionService
                // disabled={
                // serviceSelected === null
                //   ? false
                //   : data.id === serviceSelected
                //   ? false
                //   : true
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
              {filterService.OrderByTime !== -1 && (
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
                  <button
                    style={{
                      padding: "3px 21px",
                      background: "#E22828",
                      color: "#ffff",
                      border: " 1px solid #E22828",
                      borderRadius: " 8px",
                    }}
                  >
                    Giảm 50%{" "}
                  </button>
                </div>
              )}
              <div className="">
                {filterService.id === data.id ? (
                  <div
                    onClick={() => {
                      dispatch({ type: "REMOVE_SELECT_TIME"});
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
    // if (data.id !== serviceSelected) {
    //   toastMessage("Vui lòng chọn cho đúng đêeeee!", "warn", 2);
    //   return;
    // } else {
    // }
    dispatch(handlerSelectServiceAction(data));

    // if (
    //   (filterService.OrderByTime === 0 &&
    //     filterService.OrderByDateFrom !== "" &&
    //     filterService.OrderByDateTo !== "") ||
    //   (filterService.OrderByTime === 1 &&
    //     filterService.OrderByTimeFrom !== "" &&
    //     filterService.OrderByTimeTo !== "")
    // ) {
    //   if (chooseService.filter((item) => item.id === data.id).length > 0) {
    //     setChooseService([]);
    //   } else {
    //     setChooseService([{ ...data }]);
    //   }
    // } else {
    //   toastMessage("Vui lòng chọn giá theo giờ hoặc theo ngày!", "warn", 2);
    // }
  };
  console.log(chooseServiceList.length > 0 && filterService?.id > 0);
  const handleBook = () => {
    if (chooseServiceList.length > 0) {
      dispatch(chooseServiceAction(chooseServiceList));
      navigate("order");
    } else {
      toastMessage("Bạn cần chọn dịch vụ!", "warn");
    }
    // if (chooseService.length > 0 && filterService.OrderByTime !== -1) {
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
    // e.stopPropagation();
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
        <div
          className="container-detail"
          style={{
            margin: "auto",
            backgroundColor: "rgb(245, 245, 245)",
            padding: "2rem 0",
          }}
        >
          <section className="photographer-detail">
            <div className="photographer-detail__container">
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
                          defaultValue={5}
                        />
                        <div className="star-number">{5}</div>
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
                <div className="photographer-detail__container__header__image">
                  <ImagePost data={studioDetail?.data?.Image} />
                </div>
              </header>

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
                    <CommentRating
                      data={studioDetail}
                      className="mb-43 mt-12"
                    />
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
                      <div className="gmap_canvas">
                        {/* <iframe
                          title="map"
                          className="gmap_iframe"
                          width="100%"
                          frameBorder={0}
                          scrolling="no"
                          marginHeight={0}
                          marginWidth={0}
                          // src={`https://www.google.com/maps?q=${studioDetail1?.Latitude},${studioDetail1?.Longtitude}&t=&z=13&ie=UTF8&iwloc=B&output=embed`}
                        /> */}
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
                        <span className="mt-3">
                          Bao gồm 50.000đ thuế và phí{" "}
                        </span>
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
                          <div
                            className="btn_see_more"
                            onClick={() => setToggleSeeMore(true)}
                          >
                            Xem thêm <DownOutlined className="icon" />
                          </div>
                        </>
                      )}
                    </div>
                  </Col>
                </Row>
              )}
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
      )}
    </>
  );
};

export default PhotographerDetail;
