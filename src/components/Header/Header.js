import {
  DownOutlined,
  SearchOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  Row,
  Select,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DaoIcon from "../../assets/header/DaoIcon.svg";
import Logo from "../../assets/header/Logo.svg";
import { ReactComponent as SearchIcon } from "../../assets/header/SearchIcon.svg";
import noBody from "../../assets/img/no-body.png";
import { studioPostService } from "../../services/StudioPostService";
import { logOut } from "../../stores/actions/autheticateAction";
import { getFilterStudioPost } from "../../stores/actions/studioPostAction";
import { convertImage } from "../../utils/convertImage";
import SearchButton from "../layouts/SearchButton";
import toastMessage from "../ToastMessage";
import Hotkey from "./Components/Hotkey";
import "./Header.scss";
const { Option } = Select;
const Header = () => {
  const [provinces, setProvinces] = useState([]);
  const user = useSelector((state) => state.authenticateReducer.currentUser);
  const img = convertImage(user?.Image);
  const filter = useSelector((state) => state.studioPostReducer.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = [
    {
      id: "",
      name: "Tất cả",
    },
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
          key: "2",
          label: (
            <Button
              type="secondary"
              className="w-100 "
              style={{ borderRadius: "5px" }}
              onClick={() => navigate("/home/user/")}>
              Thông tin tài khoản
            </Button>
          ),
        },
        {
          className: "w-100",
          key: "1",
          label: (
            <Button
              type="primary"
              className="w-100 "
              style={{ borderRadius: "5px" }}
              onClick={() => handleSignOut()}>
              Đăng xuất
            </Button>
          ),
        },
      ]}
    />
  );
  const [visible, setVisible] = useState(false);
  const inputRef = useRef();
  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (document.activeElement === inputRef.current) {
      setVisible(true);
    }
  });
  useEffect(() => {
    (async () => {
      const res = await studioPostService.getAllProvince();
      setProvinces(res.data);
    })();
  }, []);

  const onFinish = (values) => {
    const newFilter = {
      ...filter,
      category: values.category || "",
      provinceIds: values?.province ? values.province : "",
      keyString: values.keyString,
      priceOption: values.price || 1,
      ratingOption: 3,
    };

    dispatch(getFilterStudioPost(5, 1, newFilter, user, navigate, setVisible));

    // const tempFilter = {
    //   category: values.category,
    //   provinceIds: values?.province ? [values.province] : [],
    //   keyString: values.keyString,
    //   priceOption: values.price,
    // };
    // navigate(`/home/filter?${queryString.stringify(tempFilter)}`);
  };
  const handleSignOut = () => {
    dispatch(logOut(navigate));
  };
  return (
    <div className="Header">
      <Modal
        onCancel={handleCancel}
        className="search-modal"
        width={"700px"}
        visible={visible}
        footer={[]}
        closable={false}>
        <div className="search-container">
          <div className="header-search">
            <div className="logo">
              <img src={Logo} alt="" />
            </div>
          </div>
          <Form onFinish={onFinish}>
            <Form.Item name="keyString">
              <Input
                placeholder="Bạn đang tìm gì?"
                prefix={<SearchOutlined />}
                className="input-search"
              />
            </Form.Item>
            <p className="filter">LỌC THEO</p>
            <div className="option d-flex justify-content-between">
              <Form.Item
                name="province"
                style={{ width: "100%", marginRight: "20px" }}>
                <Select
                  defaultValue=""
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  className="select-item">
                  <Option value="">Địa điểm</Option>
                  {Boolean(provinces) &&
                    provinces.map((val) => (
                      <Option key={val.id} value={val.id}>
                        {val.Name}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="category"
                style={{ width: "100%", marginRight: "20px" }}>
                <Select defaultValue="-1" className="select-item">
                  <Option value="-1" disabled={true}>
                    Danh mục
                  </Option>
                  {categories.map((val) => (
                    <Option key={val.id} value={val.id}>
                      {val.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="price" style={{ width: "100%" }}>
                <Select defaultValue="" className="select-item">
                  <Option value="">Giá</Option>
                  <Option value={2}>Giá cao nhất</Option>
                  <Option value={1}>Giá thấp nhất </Option>
                  <Option value={3}>Giảm giá nhiều nhất </Option>
                </Select>
              </Form.Item>
            </div>
            {/* <p className="time">Khung giờ bạn muốn đặt</p>

          <SelectTime /> */}
            <Form.Item
              style={{
                textAlign: "center",
                width: "100%",
                marginTop: "10px",
                marginBottom: "35px",
              }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ width: "50%" }}
                className="btn-search">
                Tìm kiếm
              </Button>
            </Form.Item>
          </Form>
          {/* {user ? (
            <div className="wrapper-user">
              <Dropdown overlay={menuSignOut} placement="topRight" arrow>
                <div className="user">
                  <Avatar src={user.Image ? img : noBody} />
                  <div className="text ms-8">
                    <p>Tài khoản</p>
                    <p>
                      {user?.Fullname ? user.Fullname : user.Email}
                      <DownOutlined
                        style={{
                          fontSize: "10px",
                          color: "#828282",
                          marginLeft: "3px",
                        }}
                      />
                    </p>
                  </div>
                </div>
              </Dropdown>
            </div>
          ) : (
            <div className="wrapper-user">
              <Dropdown overlay={menuSignIn} placement="topRight" arrow>
                <div className="user">
                  <Avatar src={noBody} />
                  <div className="text">
                    {!user && <p>Đăng ký/Đăng nhập</p>}
                    <p>
                      {user ? user.Fullname : "Tài khoản"}
                      <DownOutlined
                        style={{ fontSize: "10px", color: "#828282" }}
                      />
                    </p>
                  </div>
                </div>
              </Dropdown>
            </div>
          )} */}
        </div>
      </Modal>
      <div className="container" style={{ padding: "0 50px" }}>
        <Row>
          <Col
            lg={4}
            md={24}
            sm={24}
            xs={24}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}>
            <Link to="/home" className="link">
              <div className="img">
                <img src={Logo} alt="" />
              </div>
            </Link>
          </Col>
          <Col
            lg={12}
            md={12}
            sm={24}
            xs={24}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <div style={{ width: "100%" }}>
              <div style={{ width: "100%", marginBottom: "10px" }}>
                <Input
                  className="container__input"
                  placeholder="Bạn đang tìm gì?"
                  prefix={<SearchIcon />}
                  suffix={<SearchButton />}
                  onClick={() => setVisible(true)}
                />
              </div>
              <Hotkey />
            </div>
          </Col>
          <Col lg={8} md={12} sm={24} xs={24}>
            <div className="container__right">
              <div className="tip" onClick={() => navigate("/home/dao")}>
                <img src={DaoIcon} alt="" />
                <p>Dạo</p>
              </div>
              <Link
                to={"#"}
                className="tip"
                onClick={() =>
                  toastMessage(
                    "Chức năng này đang phát triển!",
                    "info",
                    1,
                    "",
                    {}
                  )
                }>
                <ShoppingOutlined
                  style={{ fontSize: "20px", color: "#828282" }}
                />
                <p style={{ color: "#828282" }}>Giỏ hàng</p>
              </Link>
              {user?.id ? (
                <div className="wrapper-user">
                  <Dropdown overlay={menuSignOut} placement="topRight" arrow>
                    <div className="user">
                      <Avatar src={user.Image ? img : noBody} />
                      <div className="text">
                        <p>Tài khoản</p>
                        <p>
                          {user?.Fullname ? user.Fullname : user.Email}
                          <DownOutlined
                            style={{
                              fontSize: "10px",
                              color: "#828282",
                              marginLeft: "3px",
                            }}
                          />
                        </p>
                      </div>
                    </div>
                  </Dropdown>
                  <div
                    // type="secondary"
                    className="btn-become-partner w-80 ms-30 mt-5 d-select"
                    // onClick={() => navigate("/home/user/")}
                  >
                    Trở thành đối tác
                  </div>
                </div>
              ) : (
                <div className="wrapper-user">
                  <Dropdown overlay={menuSignIn} placement="topRight" arrow>
                    <div className="user">
                      <Avatar src={noBody} />
                      <div className="text">
                        {!user?.id && <p>Đăng ký/Đăng nhập</p>}
                        <p>
                          {user?.id ? user?.Fullname : "Tài khoản"}
                          <DownOutlined
                            style={{ fontSize: "10px", color: "#828282" }}
                          />
                        </p>
                      </div>
                    </div>
                  </Dropdown>
                  <div
                    // type="secondary"
                    className="btn-become-partner w-80 ms-30 mt-5 d-select"
                    // onClick={() => navigate("/home/user/")}
                  >
                    Trở thành đối tác
                  </div>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Header;
