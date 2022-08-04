import {
  CheckCircleOutlined,
  HeartOutlined,
  MoreOutlined,
  RightOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  Dropdown,
  Menu,
  Rate,
  Row,
  Space,
  Table,
} from "antd";
import React, { useState } from "react";
import svgLocation from "../../assets/svg/location.svg";
import imgPost from "../../assets/dao/Frame 163.jpg";
import ImagePost from "./components/imagePost/ImagePost";
import "./detailPost.scss";
const Index = () => {
  const [choose, setChoose] = useState(false);
  const menu = (
    <Menu
      items={[
        {
          label: <a href="https://www.antgroup.com">1st menu item</a>,
          key: "0",
        },
        {
          label: <a href="https://www.aliyun.com">2nd menu item</a>,
          key: "1",
        },
        {
          type: "divider",
        },
        {
          label: "3rd menu item",
          key: "3",
        },
      ]}
    />
  );
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Cash Assets",
      className: "column-money",
      dataIndex: "money",
      align: "right",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];
  const data = [
    {
      key: "1",
      name: "John Brown",
      money: "￥300,000.00",
      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",
      money: "￥1,256,000.00",
      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",
      money: "￥120,000.00",
      address: "Sidney No. 1 Lake Park",
    },
  ];
  return (
    <div
      className=""
      style={{
        maxWidth: "1440px",
        margin: "auto",
        backgroundColor: "rgb(245, 245, 245)",
        padding: "2rem 0",
      }}
    >
      <div
        style={{
          maxWidth: "1300px",
          margin: "auto",
        }}
      >
        <div
          style={{
            padding: "30px",
            backgroundColor: "#ffffff",
            width: "100%",
            marginBottom: "0.75rem",
          }}
        >
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ marginBottom: "11px" }}
          >
            <div
              style={{
                fontWeight: "800",
                fontSize: "30px",
                lineHeight: "41px",
                color: "#222222",
              }}
            >
              Studio Wisteria chuyên cung cấp dịch vụ chụp hình cưới{" "}
              <CheckCircleOutlined
                style={{
                  height: "100%",
                  color: "green",
                  marginLeft: "0.25rem",
                }}
              />
            </div>
            <div className="d-flex align-items-center">
              <HeartOutlined
                style={{
                  height: "100%",
                  fontSize: "25px",
                  color: "#E22828",
                  marginRight: "2rem",
                }}
              />
              <Dropdown overlay={menu} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <MoreOutlined
                      style={{
                        fontSize: "26px",
                        height: "100%",
                        marginTop: "5px",
                      }}
                    />
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>
          <div
            style={{
              marginBottom: "15px",
              fontWeight: "400",
              fontSize: "18px",
              lineHeight: "25px",
              color: "#828282",
            }}
          >
            <img src={svgLocation} style={{ marginRight: "0.5rem" }} />
            Quận 1, TPHCM
          </div>
          <div
            className="d-flex align-items-center"
            style={{ marginBottom: "20px" }}
          >
            <Rate
              disabled
              allowHalf
              defaultValue={4.5}
              style={{
                fontSize: "15px",
                paddingRight: "10px",
                borderRight: "0.6px solid #B2B2B2",
              }}
            />
            <span
              style={{
                marginTop: "3px",
                fontWeight: "400",
                fontSize: "16px",
                marginLeft: "10px",
                lineHeight: "22px",
              }}
            >
              Đã đặt 60
            </span>
          </div>
          <div style={{ height: "426px" }}>
            <ImagePost />
          </div>
        </div>
        <div
          style={{
            width: "100%",
            marginBottom: "12px",
          }}
        >
          <Row>
            <Col span={16} style={{ paddingRight: "0.25rem" }}>
              <div
                style={{
                  padding: "24px 26px",
                  backgroundColor: "#ffffff",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    marginBottom: "6px",
                    fontWeight: " 700",
                    fontSize: "20px",
                    lineHeight: "27px",
                    color: "#3F3F3F",
                  }}
                >
                  Mô tả
                </div>
                <div
                  className="see-more"
                  onClick={(e) => e.target.classList.toggle("active")}
                >
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
                </div>
              </div>
              <div
                style={{
                  padding: "24px 26px",
                  padding: "30px",
                  backgroundColor: "#ffffff",
                }}
              >
                <div
                  style={{
                    marginBottom: "15px",
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
            <Col span={8} style={{ paddingLeft: "0.25rem", height: "100%" }}>
              <div
                style={{
                  padding: "24px 26px",
                  backgroundColor: "#ffffff",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    marginBottom: "6px",
                    fontSize: "20px",
                    fontWeight: "700",
                  }}
                >
                  Xem trên bản đồ
                </div>
                <div
                  className="text-medium-re"
                  style={{ marginBottom: "15px" }}
                >
                  <img src={svgLocation} />
                  36, Lý Tự Trọng, Quận 1, TP. Hồ Chí Minh
                </div>
                <div style={{ width: "100%", height: "235px" }}>
                  <iframe
                    style={{ width: "100%", height: "100%", border: "0" }}
                    src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d251637.95196238213!2d105.6189045!3d9.779349!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1659429407556!5m2!1svi!2s"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div
          style={{
            width: "100%",
            marginBottom: "12px",
          }}
        >
          <Row>
            <Col span={16} style={{ paddingRight: "0.25rem" }}>
              <div
                style={{
                  padding: "24px 29px",
                  backgroundColor: "#ffffff",
                  marginBottom: "12px",
                }}
              >
                <Row className="table-header">
                  <Col span={6} className="table-header-col">
                    Loại phòng
                  </Col>
                  <Col span={7} className="table-header-col">
                    Mô tả
                  </Col>
                  <Col span={7} className="table-header-col">
                    Giá cho thời gian đã chọn
                  </Col>
                  <Col span={4} className="table-header-col">
                    Chọn phòng
                  </Col>
                </Row>
                <Row className="table-row">
                  <Col span={6} className="table-col-first">
                    <img
                      src={imgPost}
                      style={{ width: "100%", marginBottom: "20px" }}
                    />
                    <div
                      className="d-flex justify-content-between"
                      style={{ marginBottom: "10px" }}
                    >
                      <span className="text-medium-re">Phòng</span>
                      <span className="text-medium-se">Deluxe</span>
                    </div>
                    <div
                      className="d-flex justify-content-between"
                      style={{ marginBottom: "10px" }}
                    >
                      <span className="text-medium-re">Diện tích</span>
                      <span className="text-medium-se">100m2</span>
                    </div>
                    <div
                      className="d-flex justify-content-between"
                      style={{ marginBottom: "10px" }}
                    >
                      <span className="text-medium-re">Phong cách</span>
                      <span className="text-medium-se">Châu Âu</span>
                    </div>
                  </Col>
                  <Col span={7} className="table-col">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latin professor at Hamp den-Sydney{" "}
                  </Col>
                  <Col span={7} className="table-col">
                    <div className="d-flex align-items-center">
                      <h4 style={{ marginBottom: "0", marginRight: "0.5rem" }}>
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
                      style={{
                        fontWeight: "400",
                        fontSize: "12px",
                        lineHeight: "16px",
                        color: "#828282",
                        margin: "4px 0 11px",
                      }}
                    >
                      Bao gồm 50.000đ thuế và phí{" "}
                    </div>
                    <span
                      style={{
                        background: "#E22828",
                        borderRadius: "4px",
                        padding: "3px 21px",
                        color: "#ffffff",
                      }}
                    >
                      Giảm 50%
                    </span>
                  </Col>
                  <Col span={4} className="table-col-last">
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
                  </Col>
                </Row>
                <Row className="table-row">
                  <Col span={6} className="table-col-first">
                    <img
                      src={imgPost}
                      style={{ width: "100%", marginBottom: "20px" }}
                    />
                    <div
                      className="d-flex justify-content-between"
                      style={{ marginBottom: "10px" }}
                    >
                      <span className="text-medium-re">Phòng</span>
                      <span className="text-medium-se">Deluxe</span>
                    </div>
                    <div
                      className="d-flex justify-content-between"
                      style={{ marginBottom: "10px" }}
                    >
                      <span className="text-medium-re">Diện tích</span>
                      <span className="text-medium-se">100m2</span>
                    </div>
                    <div
                      className="d-flex justify-content-between"
                      style={{ marginBottom: "10px" }}
                    >
                      <span className="text-medium-re">Phong cách</span>
                      <span className="text-medium-se">Châu Âu</span>
                    </div>
                  </Col>
                  <Col span={7} className="table-col">
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latin professor at Hamp den-Sydney{" "}
                  </Col>
                  <Col span={7} className="table-col">
                    <div className="d-flex align-items-center">
                      <h4 style={{ marginBottom: "0", marginRight: "0.5rem" }}>
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
                      style={{
                        fontWeight: "400",
                        fontSize: "12px",
                        lineHeight: "16px",
                        color: "#828282",
                        margin: "4px 0 11px",
                      }}
                    >
                      Bao gồm 50.000đ thuế và phí{" "}
                    </div>
                    <span
                      style={{
                        background: "#E22828",
                        borderRadius: "4px",
                        padding: "3px 21px",
                        color: "#ffffff",
                      }}
                    >
                      Giảm 50%
                    </span>
                  </Col>
                  <Col span={4} className="table-col-last">
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
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={8} style={{ paddingLeft: "0.25rem" }}>
              <div
                style={{
                  padding: "24px 26px",
                  backgroundColor: "#ffffff",
                  // height: "100%",
                }}
              ></div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Index;
