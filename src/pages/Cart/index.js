import { RightOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Menu, Row, Space, Tabs } from "antd";
import React, { useState } from "react";
import CheckBox from "../../components/CheckBox";
import "./cart.scss";

import img from "../../assets/dao/Frame 163.jpg";

const TAGS = [
  { id: "1", value: "Studio" },
  { id: "2", value: "Nhiếp ảnh" },
  { id: "3", value: "Thiết bị" },
  { id: "4", value: "Trang phục" },
  { id: "5", value: "Make up" },
  { id: "6", value: "Người mẫu" },
];

const CART_ITEM_LIST = {
  1: [
    {
      id: 1,
      name: "Premium Wisteria - phong cách tối giản",
      image: img,
      date: "14/02/2021",
      timeStart: "8:00 AM",
      timeEnd: "8:30 PM",
      price: "1500000",
    },
    {
      id: 2,
      name: "Premium Wisteria - phong cách tối giản",
      image: img,
      date: "14/02/2021",
      timeStart: "8:00 AM",
      timeEnd: "8:30 PM",
      price: "1500000",
    },
    {
      id: 3,
      name: "Premium Wisteria - phong cách tối giản",
      image: img,
      date: "14/02/2021",
      timeStart: "8:00 AM",
      timeEnd: "8:30 PM",
      price: "1500000",
    },
  ],
  2: [
    {
      id: 1,
      name: "Premium Wisteria - phong cách tối giản",
      image: img,
      date: "14/02/2021",
      timeStart: "8:00 AM",
      timeEnd: "8:30 PM",
      price: "1500000",
    },
    {
      id: 2,
      name: "Premium Wisteria - phong cách tối giản",
      image: img,
      date: "14/02/2021",
      timeStart: "8:00 AM",
      timeEnd: "8:30 PM",
      price: "1500000",
    },
  ],
};

const Index = () => {
  const [checked, setChecked] = useState([]);
  const [list, setList] = useState([...CART_ITEM_LIST["1"]]);

  const menu = (
    <Menu
      onClick={() => {}}
      items={[
        {
          label: "1st menu item",
          key: "1",
        },
        {
          label: "2nd menu item ",
          key: "2",
        },
        {
          label: "3rd menu item",
          key: "3",
        },
      ]}
    />
  );

  const onChange = (key) => {
    setList([...CART_ITEM_LIST[key]]);
  };

  const handleOnChecked = (id) => {
    let newChecked = [...checked];
    const findId = newChecked.indexOf(id);
    if (findId !== -1) {
      newChecked.splice(findId, 1);
      if (newChecked.includes("allCheck")) {
        newChecked.splice("allCheck", 1);
      } else {
        if (id === "allCheck") {
          newChecked = [];
        }
      }
    } else {
      if (id === "allCheck") {
        newChecked = CART_ITEM_LIST.map((item) => item.id);
      }
      newChecked.unshift(id);
      if (newChecked.length === CART_ITEM_LIST.length) {
        newChecked.unshift("allCheck");
      }
    }

    setChecked([...newChecked]);
  };

  return (
    <div style={{ background: "#f5f5f5" }}>
      <div className="cart_container">
        <h3>Giỏ hàng</h3>
        <Row className="cart_row">
          <Col lg={16} sm={24} className="cart_col_left">
            <div className="cart_tab_pane">
              <Tabs defaultActiveKey="1" onChange={onChange}>
                {TAGS.map((tag, index) => (
                  <Tabs.TabPane tab={tag.value} key={tag.id}>
                    <div>
                      <CheckBox
                        key={index}
                        name="allCheck"
                        value="allCheck"
                        onClick={() => handleOnChecked("allCheck")}
                        checked={checked.includes("allCheck")}>
                        <div
                          style={{
                            fontWeight: "400",
                            fontSize: "14px",
                            lineHeight: "19px",
                            color: "#3F3F3F",
                          }}>
                          {tag.value}
                        </div>
                      </CheckBox>
                      {list.map((item, index) => (
                        <CheckBox
                          onClick={() => handleOnChecked(item.id)}
                          key={index}
                          name={item.id}
                          value={item.id}
                          checked={checked.includes(item.id)}>
                          <div className="checkbox_content d-flex align-items-center w-100 justify-content-between">
                            <div className="w-40 d-flex">
                              <div className="w-76px h-76px me-12">
                                <img
                                  src={item.image}
                                  className="w-76px h-100"
                                  style={{ objectFit: "cover" }}
                                  alt=""
                                />
                              </div>
                              <label className="checkbox_label">
                                {item.name}
                              </label>
                            </div>
                            <div className="d-flex align-items-center justify-content-between w-50">
                              <div className="checkbox_desc">
                                <div>
                                  Ngày
                                  <span>{item.date}</span>
                                </div>
                                <div>
                                  Giờ
                                  <span>{item.timeStart}</span>
                                  {"-"}
                                  <span>{item.timeEnd}</span>
                                </div>
                              </div>
                              <div className="checkbox_action">
                                <Button
                                  type="text"
                                  onClick={() => {
                                    const newList = list.filter(
                                      (val) => val.id !== item.id
                                    );
                                    setList([...newList]);
                                  }}>
                                  Xóa
                                </Button>
                                <div className="price">
                                  {" "}
                                  {formatValue(item.price)}đ
                                </div>
                              </div>
                            </div>
                          </div>
                        </CheckBox>
                      ))}
                    </div>
                  </Tabs.TabPane>
                ))}
              </Tabs>
            </div>
          </Col>
          <Col lg={8} sm={24} className="cart_col_right">
            <div
              style={{
                padding: "25px 25px ",
                // marginBottom: "0.5rem",
                backgroundColor: "#FFFFFF",
              }}>
              <div
                className="d-flex justify-content-between"
                style={{
                  borderBottom: "0.6px solid #E7E7E7",
                  padding: "0 0 14px",
                  margin: "0 0 16px",
                }}>
                <div>Chọn mã khuyến mãi</div>
                <Dropdown overlay={menu}>
                  <a onClick={(e) => e.preventDefault()} href="/#">
                    <Space>
                      2 Mã khuyến mãi
                      <RightOutlined />
                    </Space>
                  </a>
                </Dropdown>
              </div>
              <div style={{ padding: "16px 15px" }}>
                <div className="d-flex justify-content-between">
                  <div className="text-middle" style={{ color: "#222222" }}>
                    Đã chọn 2 sản phẩm
                  </div>
                  <div
                    className="text-description "
                    style={{
                      textDecoration: "line-through",
                      color: "#828282",
                      marginBottom: "12px",
                    }}>
                    {`${formatValue(
                      list.reduce((total, val) => total + Number(val.price), 0)
                    )}đ`}
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div
                    className="text-description"
                    style={{ color: "#616161" }}>
                    Bao gồm 50.000đ thuế và phí
                  </div>
                  <div
                    className=""
                    style={{
                      color: "#E22828",
                      fontSize: "20px",
                      lineHeight: "28px",
                      fontWeight: "700",
                    }}>
                    {`${formatValue(
                      list.reduce((total, val) => total + Number(val.price), 0)
                    )}đ`}
                  </div>
                </div>
              </div>
              <Button
                type="primary"
                style={{ borderRadius: "8px", height: "45px", width: "100%" }}>
                Đặt ngay
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;

export const formatValue = (num) => {
  let format;
  if (num) {
    format = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } else {
    return 0;
  }
  return format;
};
