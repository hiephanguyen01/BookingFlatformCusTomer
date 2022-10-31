import {
  CheckCircleOutlined,
  HeartFilled,
  HeartOutlined,
  LoadingOutlined,
  MoreOutlined,
  ShoppingCartOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Button, Popover, Rate } from "antd";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import "react-lightbox-pack/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import images from "../../assets/images";
import CommentRating from "../../components/CommentRating";
import ImagePost from "../../components/imagePost/ImagePost";
import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";
import { VerifyOtp } from "../../components/Modal/verifyOtp/VerifyOtp";
import PromotionList from "../../components/PromotionList/PromotionList";
import ReadMoreDesc from "../../components/ReadMoreDesc";
import SelectTimeOptionService from "../../components/SelectTimeOptionService/SelectTimeOptionService";
import Table from "../../components/Table";
import toastMessage from "../../components/ToastMessage";
import {
  addOrder,
  chooseServiceAction,
} from "../../stores/actions/OrderAction";
import { getPromotionCodeUserSave } from "../../stores/actions/promoCodeAction";
import { getDetailRoomAction } from "../../stores/actions/roomAction";
import {
  getLikeStudioPostAction,
  getPromotionByTenantId,
  getStudioSimilarAction,
  studioDetailAction,
} from "../../stores/actions/studioPostAction";
import { SHOW_MODAL } from "../../stores/types/modalTypes";
import { SET_PROMOTION_CODE } from "../../stores/types/studioPostType";
import { calDate, calTime, calTimeMinus } from "../../utils/calculate";
import { convertPrice } from "../../utils/convert";
import { convertImage } from "../../utils/convertImage";
import { openNotification } from "../../utils/Notification";
import { REACT_APP_DB_BASE_URL_IMG } from "../../utils/REACT_APP_DB_BASE_URL_IMG";
import PopUpSignIn from "../Auth/PopUpSignIn/PopUpSignIn";
import styles from "./Detail.module.scss";
import { Report } from "./Report";
import { SlideCard } from "./SlideCard";

const COLUMN = [
  { title: "Loại phòng", size: 6 },
  { title: "Mô tả", size: 7 },
  { title: "Giá cho thời gian bạn đã chọn ", size: 7 },
  { title: "Chọn dịch vụ", size: 4 },
];
const cx = classNames.bind(styles);

export const StudioDetail = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  // State
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.authenticateReducer);
  const {
    studioDetail1,
    studioDetail,
    studioNear,
    studioPostList,
    filter,
    loading,
    listStudioSimilar,
    promotionCode,
    filterService,
  } = useSelector((state) => state.studioPostReducer);
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);
  const { ratingStudioPostDetail, numberRating } = useSelector(
    (state) => state.ratingReducer
  );
  const { promoCodeUserSave } = useSelector((state) => state.promoCodeReducer);
  const cate =
    pathname.split("/").filter((item) => item !== "")[1] === "studio"
      ? 1
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
  useEffect(() => {
    // let timeOut;

    // timeOut = setTimeout(() => {
    //   dispatch({ type: SHOW_MODAL, Component: <Voucher /> });
    // }, 2000);
    // dispatch({ type: SHOW_MODAL, Component: <Voucher /> });
    // if (
    //   promotionCode
    //     ?.filter(
    //       (item) => item.SaleCode.DateTimeExpire > new Date().toISOString()
    //     )
    //     ?.reduce((arr, item) => {
    //       if (
    //         promoCodeUserSave.filter((itm) => itm.id === item.SaleCode.id)
    //           .length > 0
    //       ) {
    //         return [...arr];
    //       }
    //       return [...arr, item];
    //     }, []).length > 0
    // ) {
    //   timeOut = setTimeout(() => {
    //     dispatch({ type: SHOW_MODAL, Component: <Voucher /> });
    //   }, 2000);
    // }
    return () => {
      dispatch({ type: SET_PROMOTION_CODE, data: [] });
      // clearTimeout(timeOut);
    };
  }, []);

  useEffect(() => {
    dispatch(getPromotionCodeUserSave());
    dispatch(getPromotionByTenantId(studioDetail?.data?.TenantId));
  }, [studioDetail]);

  useEffect(() => {
    if (currentUser !== null) {
      dispatch(studioDetailAction(id, cate, currentUser?.id));
    } else {
      dispatch(studioDetailAction(id, cate));
    }
    dispatch(getDetailRoomAction(id));
    dispatch(getStudioSimilarAction(id, cate));
  }, [id, dispatch, cate, currentUser]);

  useEffect(() => {
    return () => {
      dispatch({ type: "SET_STUDIO_DETAIL", payload: {} });
    };
  }, []);

  const handleReport = () => {
    dispatch({
      type: SHOW_MODAL,
      Component: <Report category={cate} postId={id} />,
      
    });
  };

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
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <span
                  style={{
                    color: "#616161",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                >
                  Phòng
                </span>
                <span
                  style={{
                    color: "#3F3F3F",
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  {data.Name}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <span
                  style={{
                    color: "#616161",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                >
                  Diện tích
                </span>
                <span
                  style={{
                    color: "#3F3F3F",
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  {data.Area}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "10px",
                }}
              >
                <span
                  style={{
                    color: "#616161",
                    fontSize: "16px",
                    fontWeight: "400",
                  }}
                >
                  Phong cách
                </span>
                <span
                  style={{
                    color: "#3F3F3F",
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  {data.Style}
                </span>
              </div>
              <div
                className="mt-15"
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
            return <SelectTimeOptionService service={data} />;
          },
        },
        {
          key: "currency",
          render: () => (
            <>
              <div>
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
                    {filter.OrderByTime === 0 &&
                      data?.PriceByHour?.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    {filter.OrderByTime === 1 &&
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
                    {filter.OrderByTime === 0 &&
                      data?.PriceByHour?.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    {filter.OrderByTime === 1 &&
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
            </>
          ),
        },
        {
          key: "choose",
          render: () => (
            <>
              {chooseService.filter((item) => item.id === data.id).length >
              0 ? (
                <span
                  onClick={() => handleChooseService(data)}
                  style={{
                    backgroundColor: "#E7E7E7",
                    padding: "15px 15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "13px",
                    lineHeight: "19px",
                    textTransform: "uppercase",
                  }}
                >
                  Bỏ chọn
                </span>
              ) : (
                <span
                  onClick={() => handleChooseService(data)}
                  style={{
                    border: "1px solid #E22828",
                    color: "#E22828",
                    padding: "13px 25px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "700",
                    fontSize: "13px",
                    lineHeight: "19px",
                    textTransform: "uppercase",
                  }}
                >
                  Chọn
                </span>
              )}
            </>
          ),
        },
      ]);
    }
  };

  const [chooseService, setChooseService] = useState([]);

  const handleChooseService = (data) => {
    if (
      (filterService.OrderByTime === 0 &&
        filterService.OrderByTimeFrom !== "" &&
        filterService.OrderByTimeTo !== "") ||
      (filter.OrderByTime === 1 &&
        filterService.OrderByDateFrom !== "" &&
        filterService.OrderByDateTo !== "")
    ) {
      if (chooseService.filter((item) => item.id === data.id).length > 0) {
        setChooseService([]);
      } else {
        setChooseService([{ ...data }]);
      }
    } else {
      toastMessage("Vui lòng chọn giá theo giờ hoặc theo ngày!", "warn", 2);
    }
  };

  const handleBook = () => {
    
    if (chooseService.length > 0 && filter.OrderByTime !== -1) {
      if (filter.OrderByTime === 0) {
        if (calTimeMinus(filter.OrderByTimeFrom, filter.OrderByTimeTo) >= 60) {
          dispatch(chooseServiceAction(chooseService));
          navigate("order");
        } else {
          toastMessage("Thời gian đặt tối thiểu là 60 phút!", "warn");
        }
      } else {
        dispatch(chooseServiceAction(chooseService));
        navigate("order");
      }
    } else {
      if (filter.OrderByTime === -1) {
        toastMessage("Bạn cần chọn thời gian!", "warn");
      } else if (chooseService.length <= 0) {
        toastMessage("Bạn cần chọn dịch vụ!", "warn");
      }
    }
  };
  const handleAddCart = () => {
    if (chooseService.length > 0) {
      dispatch(addOrder(cate, chooseService));
      toastMessage("Đã thêm vào giỏ hàng!", "success");
    } else {
      toastMessage("Bạn cần chọn dịch vụ!", "warn");
    }
  };
  const handleChangeLike = (e) => {
    e.stopPropagation();
    if (!currentUser) navigate("/auth/sign-in");
    dispatch(getLikeStudioPostAction(id, cate, currentUser?.id));
  };
  return (
    <>
      <MetaDecorator
        description={studioDetail?.data?.Description}
        imgAlt={studioDetail?.data?.Image[0]}
        imgUrl={
          window.location.origin +
          REACT_APP_DB_BASE_URL_IMG +
          "/" +
          studioDetail?.data?.Image[0]
        }
        title={studioDetail?.data?.Name}
      />
      {false ? (
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
          <div className={cx("wrapper")}>
            <div className={cx("studioDetail")}>
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
                              style={{ fontSize: "18px", fontWeight: "bold" }}
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
                  <img src={images.address} alt="sa" />
                  <span>{studioDetail?.data?.Address}</span>
                </div>
                <div className={cx("rate")}>
                  <Rate
                    disabled
                    allowHalf
                    value={studioDetail?.data?.TotalRate}
                  ></Rate>
                  <span>{studioDetail?.data?.TotalRate}</span>
                  <span
                    className={cx("number-order")}
                    style={{ fontSize: "15px" }}
                  >
                    {studioDetail?.data?.BookingCount} đã đặt{" "}
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

                  {/* <div className={cx("sale")}>
                    <h3>4 Mã khuyến mãi</h3>
                    <div className={cx("listSale")}>
                      <span>GIẢM 50K</span>
                      <span>GIẢM 500K</span>
                    </div>
                  </div> */}
                  <div className={cx("table")}>
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
                        <iframe
                          className="gmap_iframe"
                          width="100%"
                          frameBorder={0}
                          scrolling="no"
                          marginHeight={0}
                          marginWidth={0}
                          src={`https://www.google.com/maps?q=${studioDetail1?.Latitude},${studioDetail1?.Longtitude}&t=&z=13&ie=UTF8&iwloc=B&output=embed`}
                        />
                        <a href="https://embedmapgenerator.com/">
                          embed google maps in website
                        </a>
                      </div>
                      <style
                        dangerouslySetInnerHTML={{
                          __html:
                            ".mapouter{position:relative;text-align:right;width:100%;height:255px;}.gmap_canvas {overflow:hidden;background:none!important;width:100%;height:255px;}.gmap_iframe {height:255px!important;}",
                        }}
                      />
                    </div>
                  </div>
                  <div className={cx("order")}>
                    <h3>Đã chọn {chooseService.length} phòng</h3>
                    <div className={cx("item")}>
                      <span>Giá gốc</span>
                      {chooseService.length > 0 && (
                        <span
                          style={{
                            textDecoration: "line-through",
                            fontSize: " 16px",
                            color: "#828282",
                          }}
                        >
                          {filter.OrderByTime === 0 &&
                            `${convertPrice(
                              chooseService?.reduce(
                                (total, item) =>
                                  total +
                                  item.PriceByHour *
                                    calTime(
                                      filter.OrderByTimeFrom,
                                      filter.OrderByTimeTo
                                    ),
                                0
                              )
                            )}`}
                          {filter.OrderByTime === 1 &&
                            `${convertPrice(
                              chooseService?.reduce(
                                (total, item) =>
                                  total +
                                  item.PriceByDate *
                                    calDate(
                                      filter.OrderByDateFrom,
                                      filter.OrderByDateTo
                                    ),
                                0
                              )
                            )}`}
                          đ
                        </span>
                      )}
                    </div>
                    <div className={cx("item")}>
                      <span>Bao gồm 50.000đ thuế và phí </span>
                      <span
                        style={{
                          color: "#E22828",
                          fontSize: "20px",
                          fontWeight: "700",
                        }}
                      >
                        {filter.OrderByTime === 0 &&
                          `${convertPrice(
                            chooseService?.reduce(
                              (total, item) =>
                                total +
                                item.PriceByHour *
                                  calTime(
                                    filter.OrderByTimeFrom,
                                    filter.OrderByTimeTo
                                  ),
                              0
                            )
                          )}`}
                        {filter.OrderByTime === 1 &&
                          `${convertPrice(
                            chooseService?.reduce(
                              (total, item) =>
                                total +
                                item.PriceByDate *
                                  calDate(
                                    filter.OrderByDateFrom,
                                    filter.OrderByDateTo
                                  ),
                              0
                            )
                          )}`}
                        đ
                      </span>
                    </div>
                    <div className="w-100 d-flex justify-content-between mt-20">
                      <Button
                        className="w-60 h-48px d-flex justify-content-center align-items-center btn_add"
                        disabled={chooseService.length > 0 ? false : true}
                      >
                        <ShoppingCartOutlined />
                        Thêm vào giỏ hàng
                      </Button>
                      <Button
                        className="w-38 h-48px d-flex justify-content-center align-items-center btn_order"
                        onClick={handleBook}
                        disabled={chooseService.length > 0 ? false : true}
                      >
                        Đặt ngay
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <SlideCard
                data={listStudioSimilar ?? listStudioSimilar}
                category={{ name: "studio", id: 1 }}
                title="Studio tương tự"
              />
              <SlideCard
                data={studioNear ?? studioNear}
                category={{ name: "studio", id: 1 }}
                title="Gần bạn"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
