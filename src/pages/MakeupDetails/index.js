import {
  CheckCircleOutlined,
  DownOutlined,
  HeartFilled,
  HeartOutlined,
  LoadingOutlined,
  MoreOutlined,
  ShoppingCartOutlined,
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
// import SelectTimeOption from "../../components/SelectTimeOption/SelectTimeOption";
import Table from "../../components/Table";
import toastMessage from "../../components/ToastMessage";
import { chooseServiceAction } from "../../stores/actions/OrderAction";
import {
  getLikeStudioPostAction,
  getStudioSimilarAction,
  studioDetailAction,
} from "../../stores/actions/studioPostAction";
import { SHOW_MODAL } from "../../stores/types/modalTypes";
import { calDate, calTime } from "../../utils/calculate";
import { convertPrice } from "../../utils/convert";
import { convertImage } from "../../utils/convertImage";
import PopUpSignIn from "../Auth/PopUpSignIn/PopUpSignIn";
import { SlideCard } from "../StudioDetail/SlideCard";
import SlideAlbum from "./components/SlideAlbum";
import "./makeupDetails.scss";
import {
  SET_PROMOTION_CODE,
  SET_STUDIO_DETAIL,
} from "../../stores/types/studioPostType";
// import { SET_PROMOTION_CODE_USER_SAVE } from "../../stores/types/promoCodeType";
import PromotionList from "../../components/PromotionList/PromotionList";
import { Report } from "../StudioDetail/Report";
import SelectTimeOptionService from "../../components/SelectTimeOptionService/SelectTimeOptionService";

const COLUMN = [
  { title: "Dịch vụ", size: 7 },
  { title: "Chọn thời gian", size: 10 },
  { title: "Chọn dịch vụ", size: 7 },
];
const Index = () => {
  const { studioDetail, listStudioSimilar, promotionCode, filterService } =
    useSelector((state) => state.studioPostReducer);
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

  const [chooseService, setChooseService] = useState([]);
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
    };
  }, [dispatch]);

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

  const handleChooseService = (data) => {
    if (
      (filterService.OrderByTime === 0 &&
        filterService.OrderByDateFrom !== "" &&
        filterService.OrderByDateTo !== "") ||
      (filterService.OrderByTime === 1 &&
        filterService.OrderByTimeFrom !== "" &&
        filterService.OrderByTimeTo !== "")
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
    if (chooseService.length > 0) {
      dispatch(chooseServiceAction(chooseService));
      navigate("order");
    } else {
      if (filterService.OrderByTime === -1) {
        toastMessage("Bạn cần chọn thời gian!", "warn");
      } else if (chooseService.length <= 0) {
        toastMessage("Bạn cần chọn dịch vụ!", "warn");
      }
    }
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
            <div className="wrapper_description">
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
                      title="map"
                      style={{ width: "100%", height: "220px", border: "0" }}
                      src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d251637.95196238213!2d105.6189045!3d9.779349!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1659429407556!5m2!1svi!2s"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
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
                          {filterService.OrderByTime === 1 &&
                            `${convertPrice(
                              chooseService?.reduce(
                                (total, item) =>
                                  total +
                                  item.PriceByHour *
                                    calTime(
                                      filterService.OrderByTimeFrom,
                                      filterService.OrderByTimeTo
                                    ),
                                0
                              )
                            )}`}
                          {filterService.OrderByTime === 0 &&
                            `${convertPrice(
                              chooseService?.reduce(
                                (total, item) =>
                                  total +
                                  item.PriceByDate *
                                    calDate(
                                      filterService.OrderByDateFrom,
                                      filterService.OrderByDateTo
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
                            /* Primary/Red 700 */
                            color: "#E22828",
                          }}
                        >
                          {filterService.OrderByTime === 1 &&
                            `${convertPrice(
                              chooseService?.reduce(
                                (total, item) =>
                                  total +
                                  item.PriceByHour *
                                    calTime(
                                      filterService.OrderByTimeFrom,
                                      filterService.OrderByTimeTo
                                    ),
                                0
                              )
                            )}`}
                          {filterService.OrderByTime === 0 &&
                            `${convertPrice(
                              chooseService?.reduce(
                                (total, item) =>
                                  total +
                                  item.PriceByDate *
                                    calDate(
                                      filterService.OrderByDateFrom,
                                      filterService.OrderByDateTo
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
            </div>
            {studioDetail?.album?.length > 0 && (
              <Row>
                <Col lg={16} md={24}>
                  <div className="album_container">
                    <h3>Các album</h3>
                    {toggleSeeMore ? (
                      studioDetail?.album
                        .sort((a, b) => a.id - b.id)
                        .map((item, index) => (
                          <SlideAlbum key={index} title={item.title} />
                        ))
                    ) : (
                      <>
                        {studioDetail?.album
                          .sort((a, b) => a.id - b.id)
                          .slice(0, 3)
                          .map((item, index) => (
                            <SlideAlbum key={index} title={item.title} />
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
            <Row>
              <Col lg={16} md={24}>
                <CommentRating data={studioDetail} className="mb-43" />
              </Col>
            </Row>
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
