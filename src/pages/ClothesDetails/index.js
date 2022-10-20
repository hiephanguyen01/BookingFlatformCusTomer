import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  HeartFilled,
  HeartOutlined,
  LoadingOutlined,
  MoreOutlined,
  RightOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Col, Dropdown, Menu, Rate, Row, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import imgPost from "../../assets/dao/Frame 163.jpg";
import svgLocation from "../../assets/svg/location.svg";
import CommentRating from "../../components/CommentRating";
import ImagePost from "../../components/imagePost/ImagePost";
import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";
import ReadMoreDesc from "../../components/ReadMoreDesc";
import Report from "../../components/ReportModal";
import SelectTimeOption from "../../components/SelectTimeOption/SelectTimeOption";
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
import { REACT_APP_DB_BASE_URL_IMG } from "../../utils/REACT_APP_DB_BASE_URL_IMG";
import PopUpSignIn from "../Auth/PopUpSignIn/PopUpSignIn";
import { SlideCard } from "../StudioDetail/SlideCard";
import "./clothesDetails.scss";

import { SET_PROMOTION_CODE } from "../../stores/types/studioPostType";
import Voucher from "../../components/Voucher";
import { SET_PROMOTION_CODE_USER_SAVE } from "../../stores/types/promoCodeType";
import PromotionList from "../../components/PromotionList/PromotionList";

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

const Index = () => {
  const { studioDetail, filter, loading, listStudioSimilar, promotionCode } =
    useSelector((state) => state.studioPostReducer);
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
    // let timeOut;
    // timeOut = setTimeout(() => {
    //   dispatch({
    //     type: SHOW_MODAL,
    //     Component: <Voucher />,
    //   });
    // }, 2000);

    return () => {
      dispatch({ type: SET_PROMOTION_CODE_USER_SAVE, data: [] });
      dispatch({ type: SET_PROMOTION_CODE, data: [] });
      // clearTimeout(timeOut);
    };
  }, []);

  console.log(studioDetail);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleChooseService = (data) => {
    if (chooseService.filter((item) => item.id === data.id).length > 0) {
      setChooseService([]);
    } else {
      setChooseService([{ ...data }]);
    }
  };
  const handleChangeLike = (e) => {
    if (!currentUser) navigate("/auth/sign-in");
    dispatch(getLikeStudioPostAction(id, cate, currentUser?.id));
  };

  const menu = (
    <Menu
      items={[
        {
          label: (
            <div
              onClick={() =>
                dispatch({ type: SHOW_MODAL, Component: <Report /> })
              }
            >
              <ExclamationCircleOutlined className="me-10" />
              Báo cáo
            </div>
          ),
          key: "0",
        },
      ]}
    />
  );

  const COLUMN = [
    { title: "Loại sản phẩm", size: 5 },
    { title: "Size", size: 4 },
    { title: "Màu sắc", size: 4 },
    { title: "Số lượng", size: 3 },
    { title: "Đơn giá cho thuê", size: 4 },
    { title: "Chọn sản phẩm", size: 4 },
  ];

  const ROW = (dataSource = []) => {
    if (dataSource?.length > 0) {
      return dataSource?.map((data, index) => [
        {
          render: () => (
            <>
              <img
                src={`${
                  data?.Image?.length > 0 ? convertImage(data?.Image[0]) : ""
                }`}
                style={{ width: "100%", marginBottom: "20px" }}
                alt=""
                // onError={(e) => e.target.classList.add("d-none")}
              />
              <div className="text-medium-se">{data.Name}</div>
            </>
          ),
        },
        {
          render: () => (
            <>
              <Select
                defaultValue={SIZE[0]}
                style={{
                  width: "100%",
                }}
                onChange={handleChange}
              >
                {SIZE.map((item) => (
                  <Option value={item.id}>{item.label}</Option>
                ))}
              </Select>
            </>
          ),
        },
        {
          title: "Màu sắc",
          render: () => (
            <Select
              defaultValue={COLOR[0]}
              style={{
                width: "100%",
              }}
              onChange={handleChange}
            >
              {COLOR.map((item) => (
                <Option value={item.id}>{item.label}</Option>
              ))}
            </Select>
          ),
        },
        {
          title: "Số lượng",
          render: () => (
            <Select
              defaultValue={QUANTITY[0]}
              style={{
                width: "100%",
              }}
              onChange={handleChange}
            >
              {QUANTITY.map((item) => (
                <Option value={item.id}>{item.label}</Option>
              ))}
            </Select>
          ),
        },
        {
          title: "Đơn giá cho thuê",
          render: () => (
            <>
              {" "}
              <div
                style={{
                  fontWeight: "400",
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#828282",
                  textDecoration: "line-through",
                }}
              >
                {convertPrice(data.Sales)}
              </div>
              <h4
                style={{
                  marginBottom: "12px",
                  color: "#E22828",
                }}
              >
                {convertPrice(data.Price)}
              </h4>
              <span
                className="text-medium-se"
                style={{
                  background: "#E22828",
                  borderRadius: "4px",
                  padding: "3px 10px",
                  color: "#ffffff",
                }}
              >
                Giảm {`${Math.floor(100 - (data.Sales / data.Price) * 100)}`}%
              </span>
            </>
          ),
        },
        {
          title: "Chọn sản phẩm",
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
      {!loading ? (
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
                  <Dropdown overlay={menu} trigger={["click"]}>
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
                  </Dropdown>
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
              <div className="d-flex align-items-center mb-26">
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
                  <div className="desc_col_left">
                    <ReadMoreDesc title="Chi tiết sản phẩm">
                      {studioDetail?.data?.Description}
                    </ReadMoreDesc>
                  </div>
                </Col>
                {studioDetail?.shop !== null && (
                  <Col
                    lg={8}
                    sm={24}
                    style={{ paddingLeft: "0.25rem", height: "100%" }}
                    className="mb-12"
                  >
                    <div className="desc_col_right">
                      <div className="d-flex mb-25" style={{}}>
                        <img
                          src={`${
                            imgPost.includes("https://drive.google.com/")
                              ? imgPost
                              : REACT_APP_DB_BASE_URL_IMG + "/" + imgPost
                          }`}
                          className="avatar"
                        />
                        <div className="">
                          <div className="desc_col_right_title">
                            {studioDetail?.shop?.Name}
                            <CheckCircleOutlined className="icon_check_circle" />
                          </div>
                          <div className="text-medium-re">
                            <img
                              src={svgLocation}
                              style={{ marginRight: "6px" }}
                            />
                            {studioDetail?.shop?.Address}
                          </div>
                        </div>
                      </div>
                      <Button className="btn_see">
                        <Link to="shop">Xem shop</Link>
                        {/* <iframe
                    style={{ width: "100%", height: "100%", border: "0" }}
                    src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d251637.95196238213!2d105.6189045!3d9.779349!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1659429407556!5m2!1svi!2s"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe> */}
                      </Button>
                    </div>
                  </Col>
                )}
              </Row>
            </div>
            <Row className="mb-12">
              <Col lg={16} sm={24} style={{ paddingRight: "0.25rem" }}>
                <div
                  className="py-26 px-18"
                  style={{
                    backgroundColor: "#ffffff",
                  }}
                >
                  <PromotionList data={filter_promo} />
                </div>
              </Col>
            </Row>
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
                    <div className=" px-24">
                      <Link to="#" className="choose_size text-medium-se ">
                        Hướng dẫn chọn size{" "}
                        <RightOutlined style={{ color: "#1FCBA2" }} />
                      </Link>
                    </div>
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
                      <Button className="w-60 h-48px d-flex justify-content-center align-items-center btn_add">
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
            <CommentRating data={studioDetail} className="mb-43" />
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
