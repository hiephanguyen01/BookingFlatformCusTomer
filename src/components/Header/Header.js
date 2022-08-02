import React, { useEffect, useRef, useState } from "react";
import "./Header.scss";
import logo from "../../assets/img/Logo1.png";
import FeedIcon from "../../assets/img/FeedIcon.png";

import { Avatar, Button, Form, Input, Modal, Select } from "antd";
import {
  DownOutlined,
  SearchOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import SelectTimeOption from "../SelectTimeOption/SelectTimeOption";

const { Option } = Select;
const Header = () => {
  const categories = [
    {
      id: 1,
      name: "Studio",
    },
    {
      id: 2,
      name: "Nhiếp ảnh",
    },
    {
      id: 3,
      name: "Trang phục",
    },
    {
      id: 4,
      name: "Make up",
    },
    {
      id: 5,
      name: "Người mẫu",
    },
    {
      id: 6,
      name: "Thiết bị",
    },
  ];
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  const inputRef = useRef();
  const handleCancel = () => {
    setVisible(false);
  };
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  useEffect(() => {
    if (document.activeElement === inputRef.current) {
      setVisible(true);
    }
  });
  const onFinish = (values) => {
    console.log("Success:", values);
    navigate("/filter");
    setVisible(false);
  };

  return (
    <div className="Header">
      <Modal
        onCancel={handleCancel}
        className="search-modal"
        width={"700px"}
        visible={visible}
        footer={[]}>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <Form onFinish={onFinish}>
          <Form.Item name="keyString">
            <Input placeholder="Bạn đang tìm gì?" prefix={<SearchOutlined />} />
          </Form.Item>
          <p className="filter">LỌC THEO</p>
          <div className="option d-flex justify-content-between">
            <Form.Item
              name="location"
              style={{ width: "100%", marginRight: "20px" }}>
              <Select defaultValue="" onChange={handleChange}>
                <Option value="">Địa điểm</Option>
                <Option value="hcm">Hồ Chí Minh</Option>
                <Option value="dn">Đà Nẵng</Option>
                <Option value="hn">Hà Nội</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="category"
              style={{ width: "100%", marginRight: "20px" }}>
              <Select defaultValue="" onChange={handleChange}>
                <Option value="">Danh mục</Option>
                {categories.map((val) => (
                  <Option key={val.id} value={val.id}>
                    {val.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="price" style={{ width: "100%" }}>
              <Select defaultValue="" onChange={handleChange}>
                <Option value="">Giá</Option>
                <Option value="0">1.000.000</Option>
                <Option value="1">2.000.000</Option>
                <Option value="2">3.000.000</Option>
              </Select>
            </Form.Item>
          </div>
          <p className="time">Khung giờ bạn muốn đặt</p>

          <SelectTimeOption />
          <Form.Item style={{ textAlign: "center", width: "100%" }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: "50%" }}>
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="container">
        <div className="img">
          <img src={logo} alt="" />
        </div>
        <Input
          placeholder="Bạn đang tìm gì?"
          enterButton
          prefix={<SearchOutlined />}
          onClick={() => setVisible(true)}
        />
        <div className="tip">
          <img src={FeedIcon} alt="" />
          <p>Dạo</p>
        </div>
        <div className="tip">
          <ShoppingOutlined style={{ fontSize: "20px", color: "#828282" }} />
          <p>Giỏ hàng</p>
        </div>
        <div className="user">
          <Avatar src="https://joeschmoe.io/api/v1/random" />
          <div className="text ">
            <p>Tài khoản</p>
            <p>
              Khương Duy{" "}
              <DownOutlined style={{ fontSize: "10px", color: "#828282" }} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
