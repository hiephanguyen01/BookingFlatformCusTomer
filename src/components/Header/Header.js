import React, { useEffect, useRef, useState } from "react";
import "./Header.scss";
import logo from "../../assets/img/Logo1.png";
import noBody from "../../assets/img/no-body.png";
import FeedIcon from "../../assets/img/FeedIcon.png";
import {
  Avatar,
  Button,
  Form,
  Input,
  Modal,
  Select,
  Dropdown,
  Menu,
} from "antd";
import {
  DownOutlined,
  SearchOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { useDispatch ,useSelector} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SelectTimeOption from "../SelectTimeOption/SelectTimeOption";
<<<<<<< HEAD
import { confirmPassAction } from "../../stores/actions/PhoneNumberAction";
import {confirmPassSelector} from "../../stores/selectors/PhoneNumberSelector"
const { Option } = Select;
const Header = () => {
  const selector=useSelector(confirmPassSelector)
  const dispatch = useDispatch()
  const { user, logOut } = UserAuth();
=======
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../stores/actions/autheticateAction";
const { Option } = Select;
const Header = () => {
  const user = useSelector((state) => state.authenticateReducer.currentUser);
  const dispatch = useDispatch();
>>>>>>> 6cdae3901c1e1a8aa7895d78f81573bfdfa92149
  const [flag, setFlag] = useState(false);
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
  const menuSignIn = (
    <Menu
      style={{
        width: "250px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      items={[
        {
          className: "w-100",
          key: "1",
          label: (
            <Link to="/auth/sign-in">
              <Button
                type="primary"
                className="w-100 "
                style={{ borderRadius: "5px" }}>
                Đăng nhập
              </Button>
            </Link>
          ),
        },
        {
          key: "2",
          label: (
            <div style={{ fontSize: "14px" }}>
              Chưa có tài khoản ?{" "}
              <span style={{ color: "#e22828" }}>
                {" "}
                <Link to="/auth/sign-up">Đăng ký</Link>
              </span>
            </div>
          ),
        },
      ]}
    />
  );
  const menuSignOut = (
    <Menu
      style={{
        width: "250px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
      items={[
        {
          className: "w-100",
          key: "1",
          label: (
            <Button
              type="primary"
              className="w-100 "
              style={{ borderRadius: "5px" }}
<<<<<<< HEAD
              onClick={() => {
                handleSignOut();
                localStorage.removeItem('PassConfirm');
                dispatch(confirmPassAction(false));
              }}
            >
=======
              onClick={() => handleSignOut()}>
>>>>>>> 6cdae3901c1e1a8aa7895d78f81573bfdfa92149
              Đăng xuất
            </Button>
          ),
        },
      ]}
    />
  );
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
    navigate("/home/filter");
    setVisible(false);
  };
<<<<<<< HEAD
  const handleSignOut = async () => {
    try {
      await logOut();
      setFlag(true);
    } catch (error) {
      console.log(error);
    }
=======
  const handleSignOut = () => {
    dispatch(logOut(navigate));
>>>>>>> 6cdae3901c1e1a8aa7895d78f81573bfdfa92149
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
        {user && selector? (
          <Dropdown overlay={menuSignOut} placement="topRight" arrow>
            <div className="user">
              <Avatar src={user.photoURL ? user.photoURL : noBody} />
              <div className="text">
                <p>Tài khoản</p>
                <p>
                  {user.displayName ? user.displayName : user.phoneNumber}
                  <DownOutlined
                    style={{ fontSize: "10px", color: "#828282" }}
                  />
                </p>
              </div>
            </div>
          </Dropdown>
        ) : (
          <Dropdown overlay={menuSignIn} placement="topRight" arrow>
            <div className="user">
              <Avatar src={noBody} />
              <div className="text">
                <p>Đăng ký/Đăng nhập</p>
                <p>
                  Tài khoản
                  <DownOutlined
                    style={{ fontSize: "10px", color: "#828282" }}
                  />
                </p>
              </div>
            </div>
          </Dropdown>
        )}
      </div>
    </div>
  );
};

export default Header;
