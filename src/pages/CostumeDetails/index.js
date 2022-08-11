import {
  CheckCircleOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  HeartOutlined,
  MoreOutlined,
  RightOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Col, Collapse, Dropdown, Menu, Rate, Row, Space } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Pagination } from "swiper";

import "./costumeDetails.scss";

import Table from "../../components/Table";
import CommentRating from "../../components/CommentRating";
import SlideCard from "../../components/SlideCard";
import Report from "../../components/ReportModal";
import ReadMoreDesc from "../../components/ReadMoreDesc";

import svgLocation from "../../assets/svg/location.svg";
import imgPost from "../../assets/dao/Frame 163.jpg";
import ImagePost from "../../components/imagePost/ImagePost";
import images from "../../assets/images";
import { SHOW_MODAL } from "../../stores/types/modalTypes";

const values = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
const data = [
  {
    id: 1,
    image: imgPost,
  },
  {
    id: 2,
    image: imgPost,
  },
  {
    id: 3,
    image: imgPost,
  },
  {
    id: 4,
    image: imgPost,
  },
  {
    id: 5,
    image: imgPost,
  },
  {
    id: 6,
    image: imgPost,
  },
  {
    id: 7,
    image: imgPost,
  },
];

const Index = () => {
  const [choose, setChoose] = useState(false);
  const [activeId, setActiveId] = useState(5);
  const dispatch = useDispatch();
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

  const menu_size = (
    <Menu
      items={[
        {
          label: <div>S</div>,
          key: "0",
        },
        {
          label: <div>M</div>,
          key: "1",
        },
        {
          label: <div>L</div>,
          key: "3",
        },
      ]}
    />
  );

  const menu_color = (
    <Menu
      items={[
        {
          label: <div>Trắng</div>,
          key: "0",
        },
        {
          label: <div>Đen</div>,
          key: "1",
        },
        {
          label: <div>Đỏ</div>,
          key: "3",
        },
      ]}
    />
  );

  const menu_amount = (
    <Menu
      items={[
        {
          label: <div>1</div>,
          key: "0",
        },
        {
          label: <div>2</div>,
          key: "1",
        },
        {
          label: <div>3</div>,
          key: "3",
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

  const dataSource = [
    {
      title: "cho thue vay cuoi",
      size: 10,
      color: "red",
      amount: 10,
      hire: "10 gio",
      choose: "true",
    },
  ];

  const ROW = (dataSource) =>
    dataSource.map((data, index) => [
      {
        render: () => (
          <>
            <img
              src={imgPost}
              style={{ width: "100%", marginBottom: "20px" }}
            />
            <div className="text-medium-se">{data.title}</div>
          </>
        ),
      },
      {
        render: () => (
          <>
            <Dropdown overlay={menu_size} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space className="d-flex justify-content-between px-10 py-8 dropdown">
                  S
                  <DownOutlined className="ms-15" />
                </Space>
              </a>
            </Dropdown>
          </>
        ),
      },
      {
        title: "Màu sắc",
        render: () => (
          <Dropdown overlay={menu_color} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space className="d-flex justify-content-between px-10 py-8 dropdown">
                Trắng
                <DownOutlined className="ms-15" />
              </Space>
            </a>
          </Dropdown>
        ),
      },
      {
        title: "Số lượng",
        render: () => (
          <Dropdown overlay={menu_amount} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space className="d-flex justify-content-between px-10 py-8 dropdown">
                1
                <DownOutlined className="ms-15" />
              </Space>
            </a>
          </Dropdown>
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
              550.000đ
            </div>
            <h4
              style={{
                marginBottom: "12px",
                color: "#E22828",
              }}
            >
              1.200.000đ
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
              Giảm 50%
            </span>
          </>
        ),
      },
      {
        title: "Chọn sản phẩm",
        render: () => (
          <>
            {choose ? (
              <span
                onClick={() => setChoose(!choose)}
                style={{
                  backgroundColor: "#E22828",
                  padding: "15px 30px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "14px",
                  lineHeight: "19px",
                  textTransform: "uppercase",
                }}
              >
                Chọn
              </span>
            ) : (
              <span
                onClick={() => setChoose(!choose)}
                style={{
                  backgroundColor: "#E7E7E7",
                  padding: "15px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700",
                  fontSize: "14px",
                  lineHeight: "19px",
                  textTransform: "uppercase",
                }}
              >
                Bỏ chọn
              </span>
            )}
          </>
        ),
      },
    ]);

  return (
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
              Cho thuê váy cưới
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
            Quận 1, TPHCM
          </div>
          <div className="d-flex align-items-center mb-20">
            <Rate disabled allowHalf defaultValue={4.5} className="rating" />
            <span className="reserve">Đã đặt 60</span>
          </div>
          <div style={{ height: "" }}>
            <ImagePost data={data} />
          </div>
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
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur,
                  from a Lorem Ipsum passage, and going through the cites of the
                  word in classical literature, discovered the undoubtable
                  source. Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </ReadMoreDesc>
              </div>
            </Col>
            <Col
              lg={8}
              sm={24}
              style={{ paddingLeft: "0.25rem", height: "100%" }}
              className="mb-12"
            >
              <div className="desc_col_right">
                <div className="d-flex mb-30" style={{}}>
                  <img src={imgPost} className="avatar" />
                  <div className="">
                    <div className="desc_col_right_title">
                      Thuê trang phục FLUX{" "}
                      <CheckCircleOutlined className="icon_check_circle" />
                    </div>
                    <div
                      className="text-medium-re"
                      style={{ marginBottom: "15px" }}
                    >
                      <img src={svgLocation} style={{ marginRight: "6px" }} />
                      Quận 1, TP. Hồ Chí Minh
                    </div>
                  </div>
                </div>
                <Button className="btn_see">
                  <Link to="detailCostumeShop">Xem shop</Link>
                  {/* <iframe
                    style={{ width: "100%", height: "100%", border: "0" }}
                    src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d251637.95196238213!2d105.6189045!3d9.779349!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1659429407556!5m2!1svi!2s"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe> */}
                </Button>
              </div>
            </Col>
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
                className=" py-22 mb-12"
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
                <Table column={COLUMN} row={ROW(dataSource)} />
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
                    Đã chọn 2 sản phẩm
                  </div>
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
                    1.800.000đ
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
                    }}
                  >
                    1.500.000đ
                  </div>
                </div>
                <div className="w-100 d-flex justify-content-between">
                  <Button className="w-60 h-48px d-flex justify-content-center align-items-center btn_add">
                    <ShoppingCartOutlined />
                    Thêm vào giỏ hàng
                  </Button>
                  <Button className="w-38 h-48px d-flex justify-content-center align-items-center btn_order">
                    <Link to={"orderCostume"}> Đặt ngay</Link>
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <CommentRating
          data={values}
          activeId={activeId}
          setActiveId={setActiveId}
          className="mb-43"
        />
        <SlideCard title="Trang phục tương tự" />
      </div>
    </div>
  );
};

export default Index;
