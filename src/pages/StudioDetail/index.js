import {
  CheckCircleOutlined,
  HeartFilled,
  HeartOutlined,
  LoadingOutlined,
  MoreOutlined,
  ShoppingCartOutlined,
  SkinOutlined,
  TeamOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { Button, Carousel, Image, Popover, Rate } from "antd";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import "react-lightbox-pack/dist/index.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReactStickyBox from "react-sticky-box";
import images from "../../assets/images";
import CommentRating from "../../components/CommentRating";
import ImagePost from "../../components/imagePost/ImagePost";
import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";
// import { VerifyOtp } from "../../components/Modal/verifyOtp/VerifyOtp";
import PromotionList from "../../components/PromotionList/PromotionList";
import ReadMoreDesc from "../../components/ReadMoreDesc";
import SelectTimeOptionService from "../../components/SelectTimeOptionService/SelectTimeOptionService";
import Table from "../../components/Table";
import toastMessage from "../../components/ToastMessage";
import { chooseServiceAction } from "../../stores/actions/OrderAction";
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
  SET_CHOOSE_SERVICE,
} from "../../stores/types/OrderType";
import { SET_PROMOTION_CODE } from "../../stores/types/studioPostType";
import { calDate, calTime } from "../../utils/calculate";
import { convertPrice } from "../../utils/convert";
import { convertImage } from "../../utils/convertImage";
// import { openNotification } from "../../utils/Notification";
import { REACT_APP_DB_BASE_URL_IMG } from "../../utils/REACT_APP_DB_BASE_URL_IMG";
import PopUpSignIn from "../Auth/PopUpSignIn/PopUpSignIn";
import styles from "./Detail.module.scss";
import { Report } from "./Report";
import { SlideCard } from "./SlideCard";
import expand from "../../assets/svg/expand.svg";
import chair from "../../assets/svg/chair.svg";
import conditional from "../../assets/svg/conditional.svg";

const COLUMN = [
  { title: "Loại phòng", size: 7 },
  { title: "Chọn thời gian", size: 10 },
  { title: "Chọn phòng ", size: 7 },
];
const cx = classNames.bind(styles);

export const StudioDetail = () => {
  const [visible, setVisible] = useState(false);

  const { id } = useParams();
  const { pathname } = useLocation();
  // State
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.authenticateReducer);
  const { chooseServiceList } = useSelector((state) => state.OrderReducer);
  const {
    studioDetail,
    studioNear,
    listStudioSimilar,
    filterService,
    listTimeSelected,
  } = useSelector((state) => state.studioPostReducer);
  const { promoCodeUserSave } = useSelector((state) => state.promoCodeReducer);
  const cate =
    pathname.split("/").filter((item) => item !== "")[1] === "studio"
      ? 1
      : undefined;

  // const filter_promo = promotionCode
  //   ?.filter((item) => item.SaleCode.DateTimeExpire > new Date().toISOString())
  //   ?.reduce((arr, item) => {
  //     if (
  //       promoCodeUserSave.filter((itm) => itm.id === item.SaleCode.id).length >
  //       0
  //     ) {
  //       return [...arr];
  //     }
  //     return [...arr, item];
  //   }, []);

  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
    dispatch({ type: "SET_SELECT_TIME_ORDER" });
    dispatch({ type: SET_CHOOSE_SERVICE, payload: [] });
    return () => {
      dispatch({ type: SET_PROMOTION_CODE, data: [] });
      dispatch({ type: "SET_SERVICE_SELECT", payload: null });
      dispatch({ type: "SET_STUDIO_DETAIL", payload: {} });
      dispatch({ type: "SET_TIME_ORDER", data: [] });
    };
  }, [dispatch]);
  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
    dispatch({ type: "SET_SELECT_TIME_ORDER" });
    // dispatch({ type: "SET_SERVICE_SELECT", payload: null });
    dispatch({ type: SET_CHOOSE_SERVICE, payload: [] });
  }, [id, dispatch]);

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
    dispatch(getDetailRoomAction(id));
    dispatch(getStudioSimilarAction(id, cate));
  }, [id, dispatch, cate, currentUser]);

  // useEffect(() => {
  //   return () => {
  //     dispatch({ type: "SET_STUDIO_DETAIL", payload: {} });
  //   };
  // }, [dispatch]);

  const handleReport = () => {
    dispatch({
      type: SHOW_MODAL,
      Component: <Report category={cate} postId={id} />,
    });
  };
  // const handlerServiceSelect = (data) => {
  //   console.log(data.id);
  //   // dispatch({ type: SET_SERVICE_SELECT, payload: data.id });
  // };
<<<<<<< HEAD
  console.log("seveice phong", studioDetail?.service);
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
=======

  const ROW = (dataSource) => {
    return dataSource?.map((data, index) => [
      {
        key: "title",
        render: () => (
          <div style={{ maxWidth: "300px" }}>
            <Carousel autoplay style={{ width: "100%" }}>
              {data.Image.map((val) => (
                <Image
                  key={val}
                  preview={{ visible: false }}
                  src={convertImage(val)}
                  onClick={() => setVisible(data.id)}
                />
              ))}
            </Carousel>
            <div style={{ display: "none" }}>
              <Image.PreviewGroup
                preview={{
                  visible: Boolean(visible === data.id),
                  onVisibleChange: (vis) => setVisible(vis),
>>>>>>> c92509d6d397f8ee8dbaecd95b7de9c0006b8abf
                }}
              >
                {data.Image.map((val) => (
                  <Image src={convertImage(val)} />
                ))}
              </Image.PreviewGroup>
            </div>
            <div
              className="mt-10"
              style={{
                color: "#222222",
                fontSize: "16px",
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
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
                <li>Diện tích {data?.Area}</li>
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
                {data?.HasBackground && <li>{data?.BackgroundDescription}</li>}
                {data?.HasLamp && <li>{data?.LampDescription}</li>}
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
                {data?.HasDressingRoom && <li>Phòng thay đồ riêng</li>}
                {data?.HasWC && <li>Nhà vệ sinh</li>}
                {data?.HasCamera && <li>Camera</li>}
                {data?.HasWifi && <li>Wifi</li>}
                {data?.HasMotorBikeParking && <li>Chổ để xe máy</li>}
                {data?.HasCarParking && <li>Chổ để xe ô tô</li>}
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
                <li>Số lượng khách tối đa: {data?.MaximumCustomer} người</li>
                <li>Phụ thu: {convertPrice(data?.Surcharge)} VND/người</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        key: "desc",
        render: (item) => {
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
                      data?.PriceByHour?.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    {listTimeSelected?.find((item) => item.id === data?.id)
                      ?.OrderByTime === 0 &&
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
                    {listTimeSelected?.find((item) => item.id === data?.id)
                      ?.OrderByTime === 1 &&
                      data?.PriceByHour?.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    {listTimeSelected?.find((item) => item.id === data?.id)
                      ?.OrderByTime === 0 &&
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
    // if (data.id !== serviceSelected) {
    //   toastMessage("Vui lòng chọn cho đúng đêeeee!", "warn", 2);
    //   return;
    // } else {
    // }
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
        findSelectTime.OrderByDateTo !== "" &&
        findSelectTime.OrderByDateTo !== findSelectTime.OrderByDateFrom
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
                    <PromotionList />
                  </div>
                  {studioDetail && (
                    <div className={cx("")}>
                      <Table column={COLUMN} row={ROW(studioDetail.service)} />
                    </div>
                  )}

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
                        </span>
                      </div>
                      <div className="w-100 d-flex justify-content-between mt-20">
                        <Button
                          className="w-60 h-48px d-flex justify-content-center align-items-center btn_add"
                          disabled={
                            chooseServiceList?.length > 0 ? false : true
                          }
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
              {listStudioSimilar?.length > 1 && (
                <SlideCard
                  data={listStudioSimilar ?? listStudioSimilar}
                  category={{ name: "studio", id: 1 }}
                  title="Studio tương tự"
                />
              )}
              {studioNear?.length > 1 && (
                <SlideCard
                  data={studioNear ?? studioNear}
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
