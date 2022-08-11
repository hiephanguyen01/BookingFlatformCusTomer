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

import "./makeupDetails.scss";

import Table from "../../components/Table";
import CommentRating from "../../components/CommentRating";
import SlideAlbum from "./components/SlideAlbum";
import SlideCard from "../../components/SlideCard";
import Report from "../../components/ReportModal";
import ReadMoreDesc from "../../components/ReadMoreDesc";

import svgLocation from "../../assets/svg/location.svg";
import imgPost from "../../assets/dao/Frame 163.jpg";
import ImagePost from "../../components/imagePost/ImagePost";
import modelImg from "../../assets/images/modelImg.png";
import { SHOW_MODAL } from "../../stores/types/modalTypes";

const values = [
  { id: 1, title: "Album hóa trang theo yêu cầu của khách" },
  { id: 2, title: "Album make up cô dâu" },
  { id: 3, title: "Album make up chụp hình kỉ yếu" },
  { id: 4, title: "Album hóa trang theo yêu cầu của khách" },
  { id: 5, title: "Album make up chụp hình kỉ yếu" },
];
const COLUMN = [
  { title: "Dịch vụ", size: 5 },
  { title: "Mô tả", size: 8 },
  { title: "Giá cho thời gian bạn đã chọn ", size: 7 },
  { title: "Chọn dịch vụ", size: 4 },
];
const data = [
  {
    id: 1,
    image: modelImg,
  },
  {
    id: 2,
    image: modelImg,
  },
  {
    id: 3,
    image: modelImg,
  },
  {
    id: 4,
    image: modelImg,
  },
  {
    id: 5,
    image: modelImg,
  },
  {
    id: 6,
    image: modelImg,
  },
  {
    id: 7,
    image: modelImg,
  },
];

const Index = () => {
  const [choose, setChoose] = useState(false);
  const [activeId, setActiveId] = useState(5);
  const [toggleSeeMore, setToggleSeeMore] = useState(false);
  const dispatch = useDispatch();
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

  const dataSource = [
    {
      id: "01",
      title: "Make up cô dâu - Nội thành SG ",
      description:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney ",
      price: 1200000,
      priceLine: 550000,
      charge: 50000,
      discount: "50%",
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
            <div className="text-medium-se">{`${data.title}`}</div>
          </>
        ),
      },
      {
        render: () => <p>{data.description}</p>,
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
                1.200.000đ
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
                550.000đ
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
              Giảm 50%
            </span>
          </>
        ),
      },
      {
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
              Thợ make up Rose Scarlett
              <CheckCircleOutlined className="icon_check_circle" />
            </div>
            <div className="d-flex align-items-center">
              <HeartOutlined className="icon_heart" />
              <Dropdown overlay={menu_report} trigger={["click"]}>
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
              <div className="desc_col_left mb-12">
                <ReadMoreDesc title="Mô tả">
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
                  <div className="desc_col_right_title">Xem trên bản đồ</div>
                  <div
                    className="text-medium-re"
                    style={{ marginBottom: "15px" }}
                  >
                    <img src={svgLocation} style={{ marginRight: "6px" }} />
                    Quận 1, TP. Hồ Chí Minh
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
                className=" py-22 mb-12"
                style={{
                  backgroundColor: "#ffffff",
                }}
              >
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
                    <Link to={"orderMakeup"}> Đặt ngay</Link>
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <Row>
          <Col lg={16} md={24}>
            <div className="album_container">
              <h3>Các album</h3>
              {toggleSeeMore ? (
                values
                  .sort((a, b) => a.id - b.id)
                  .map((item, index) => (
                    <SlideAlbum key={index} title={item.title} />
                  ))
              ) : (
                <>
                  {values
                    .sort((a, b) => a.id - b.id)
                    .slice(0, 3)
                    .map((item, index) => (
                      <SlideAlbum key={index} title={item.title} />
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
        <Row>
          <Col lg={16} md={24}>
            {" "}
            <CommentRating
              data={values}
              activeId={activeId}
              setActiveId={setActiveId}
              className="mb-43"
            />
          </Col>
        </Row>
        <SlideCard title="Trang phục tương tự" />
      </div>
    </div>
  );
};

export default Index;
