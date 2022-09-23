import {
  CheckCircleOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  HeartOutlined,
  LoadingOutlined,
  MoreOutlined,
  RightOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Col, Dropdown, Menu, Rate, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import "./makeupDetails.scss";

import Table from "../../components/Table";
import CommentRating from "../../components/CommentRating";
import SlideAlbum from "./components/SlideAlbum";
import SlideCard from "../../components/SlideCard";
import Report from "../../components/ReportModal";
import ReadMoreDesc from "../../components/ReadMoreDesc";

import svgLocation from "../../assets/svg/location.svg";
import ImagePost from "../../components/imagePost/ImagePost";
import { SHOW_MODAL } from "../../stores/types/modalTypes";
import { studioDetailAction } from "../../stores/actions/studioPostAction";
import { convertPrice } from "../../utils/convert";
import { REACT_APP_DB_BASE_URL_IMG } from "../../utils/REACT_APP_DB_BASE_URL_IMG";
import {
  addOrder,
  chooseServiceAction,
} from "../../stores/actions/OrderAction";
import toastMessage from "../../components/ToastMessage";
import SelectTimeOption from "../../components/SelectTimeOption/SelectTimeOption";
import PopUpSignIn from "../Auth/PopUpSignIn/PopUpSignIn";
const COLUMN = [
  { title: "Dịch vụ", size: 5 },
  { title: "Mô tả", size: 8 },
  { title: "Giá cho thời gian bạn đã chọn ", size: 7 },
  { title: "Chọn dịch vụ", size: 4 },
];
const Index = () => {
  const { studioDetail, loading } = useSelector(
    (state) => state.studioPostReducer
  );
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const cate =
    location.pathname.split("/").filter((item) => item !== "")[1] === "makeup"
      ? 4
      : undefined;

  const [chooseService, setChooseService] = useState([]);
  const [toggleSeeMore, setToggleSeeMore] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(studioDetailAction(id, cate));
  }, []);

  const handleChooseService = (data) => {
    let newChooseService = [...chooseService];
    if (newChooseService.filter((item) => item.id === data.id).length > 0) {
      newChooseService = newChooseService.filter((item) => item.id !== data.id);
    } else {
      newChooseService.push(data);
    }
    setChooseService(newChooseService);
  };
  console.log(studioDetail);

  const menu_report = (
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

  const ROW = (dataSource = []) => {
    if (dataSource.length > 0) {
      return dataSource?.map((data, index) => [
        {
          render: () => (
            <>
              <img
                src={`${
                  data?.Image?.length > 0 &&
                  data?.Image[0]?.includes("https://drive.google.com/")
                    ? data?.Image[0]
                    : REACT_APP_DB_BASE_URL_IMG + "/" + data?.Image[0]
                }`}
                style={{ width: "100%", marginBottom: "20px" }}
                alt=""
              />
              <div className="text-medium-se">{`${data.Name}`}</div>
            </>
          ),
        },
        {
          render: () => <p>{data.Description}</p>,
        },
        {
          render: () => (
            <>
              <div className="d-flex align-items-center">
                <h4
                  className="me-10"
                  style={{
                    marginBottom: "0",
                    color: "#E22828",
                  }}
                >
                  {convertPrice(data.Sales)}đ
                </h4>
                <div
                  style={{
                    fontWeight: "400",
                    fontSize: "12px",
                    lineHeight: "16px",
                    color: "#828282",
                    textDecoration: "line-through",
                  }}
                >
                  {convertPrice(data.Price)}đ
                </div>
              </div>
              <div
                className="mb-8 mt-4"
                style={{
                  fontWeight: "400",
                  fontSize: "12px",
                  lineHeight: "16px",
                  color: "#828282",
                }}
              >
                Bao gồm 50.000đ thuế và phí{" "}
              </div>
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
    if (chooseService.length > 0) {
      dispatch(chooseServiceAction(chooseService));
      navigate("order");
    } else {
      toastMessage("Bạn cần chọn dịch vụ!", "warn");
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

  return (
    <>
      {!loading ? (
        <div
          className=""
          style={{
            margin: "auto",
            backgroundColor: "rgb(245, 245, 245)",
            padding: "2rem 0",
          }}
        >
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
                    <HeartOutlined className="icon_heart" />
                  </PopUpSignIn>
                  <Dropdown overlay={menu_report} trigger={["click"]}>
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
                  </Dropdown>
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
              <div className="d-flex align-items-center mb-20">
                <Rate
                  disabled
                  allowHalf
                  defaultValue={4.5}
                  className="rating"
                />
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
                    <div
                      className="mb-15"
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                      }}
                    >
                      4 Mã khuyến mãi
                    </div>
                    <div className="d-flex align-items-center">
                      <div
                        style={{
                          border: "1px solid #1FCBA2",
                          borderRadius: "4px",
                          padding: "7px 13px",
                          color: "#1FCBA2",
                          marginRight: "0.5rem",
                        }}
                      >
                        Giảm 50K
                      </div>
                      <div
                        style={{
                          border: "1px solid #1FCBA2",
                          borderRadius: "4px",
                          padding: "7px 13px",
                          color: "#1FCBA2",
                          marginRight: "0.5rem",
                        }}
                      >
                        Giảm 100K
                      </div>
                      <RightOutlined style={{ color: "#1FCBA2" }} />
                    </div>
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
                      referrerpolicy="no-referrer-when-downgrade"
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
                    <div className="ms-24 pt-20">
                      <SelectTimeOption />
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
                      <Button
                        className="w-60 h-48px d-flex justify-content-center align-items-center btn_add"
                        onClick={handleAddCart}
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
                {" "}
                <CommentRating data={[]} className="mb-43" />
              </Col>
            </Row>
            <SlideCard title="Trang phục tương tự" />
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
