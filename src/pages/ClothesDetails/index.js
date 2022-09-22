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
import { Button, Col, Dropdown, Menu, Rate, Row, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";

import "./clothesDetails.scss";

import Table from "../../components/Table";
import CommentRating from "../../components/CommentRating";
import SlideCard from "../../components/SlideCard";
import Report from "../../components/ReportModal";
import ReadMoreDesc from "../../components/ReadMoreDesc";

import svgLocation from "../../assets/svg/location.svg";
import imgPost from "../../assets/dao/Frame 163.jpg";
import ImagePost from "../../components/imagePost/ImagePost";
import { SHOW_MODAL } from "../../stores/types/modalTypes";
import { studioDetailAction } from "../../stores/actions/studioPostAction";
import { convertPrice } from "../../utils/convert";
import { REACT_APP_DB_BASE_URL_IMG } from "../../utils/REACT_APP_DB_BASE_URL_IMG";

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
  const { studioDetail, filter, loading } = useSelector(
    (state) => state.studioPostReducer
  );
  const { id } = useParams();
  const location = useLocation();
  const cate =
    location.pathname.split("/").filter((item) => item !== "")[1] === "clothes"
      ? 3
      : undefined;

  const [chooseService, setChooseService] = useState([]);
  const dispatch = useDispatch();

  const { Option } = Select;

  useEffect(() => {
    dispatch(studioDetailAction(id, cate));
  }, []);

  console.log(studioDetail);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleChooseService = (data) => {
    let newChooseService = [...chooseService];
    if (newChooseService.filter((item) => item.id === data.id).length > 0) {
      newChooseService = newChooseService.filter((item) => item.id !== data.id);
    } else {
      newChooseService.push(data);
    }
    setChooseService(newChooseService);
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
    if (dataSource.length > 0) {
      return dataSource?.map((data, index) => [
        {
          render: () => (
            <>
              <img
                src={``}
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
                  <HeartOutlined className="icon_heart" />
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
                <img src={svgLocation} style={{ marginRight: "0.5rem" }} />
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
                      <Button className="w-38 h-48px d-flex justify-content-center align-items-center btn_order">
                        <Link to={"order"}> Đặt ngay</Link>
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <CommentRating data={[]} className="mb-43" />
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
