import {
  DownOutlined,
  SearchOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
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
import { ImageDetect } from "../ImageDetect/ImageDetect";
import SearchButton from "../layouts/SearchButton";
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
                style={{ borderRadius: "5px" }}
              >
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
              onClick={() => navigate("/home/user/")}
            >
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
              onClick={() => handleSignOut()}
            >
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
      category: values.category,
      provinceIds: values?.province ? [values.province] : [],
      keyString: values.keyString,
      priceOption: values.price,
    };
    dispatch(getFilterStudioPost(5, 1, newFilter, user));
    setVisible(false);
    navigate("/home/filter");
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
      >
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <Form onFinish={onFinish}>
          <Form.Item name="keyString">
            <Input placeholder="Bạn đang tìm gì?" prefix={<SearchOutlined />} />
          </Form.Item>
          <p className="filter">LỌC THEO</p>
          <div className="option d-flex justify-content-between">
            <Form.Item
              name="province"
              style={{ width: "100%", marginRight: "20px" }}
            >
              <Select
                defaultValue=""
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
              >
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
              style={{ width: "100%", marginRight: "20px" }}
            >
              <Select defaultValue="">
                <Option value="">Danh mục</Option>
                {categories.map((val) => (
                  <Option key={val.id} value={val.id}>
                    {val.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="price" style={{ width: "100%" }}>
              <Select defaultValue="">
                <Option value="">Giá</Option>
                <Option value={2}>Giá cao nhất</Option>
                <Option value={1}>Giá thấp nhất </Option>
                <Option value={3}>Giảm giá nhiều nhất </Option>
              </Select>
            </Form.Item>
          </div>
          {/* <p className="time">Khung giờ bạn muốn đặt</p>

          <SelectTime /> */}
          <Form.Item style={{ textAlign: "center", width: "100%" }}>
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              style={{ width: "50%" }}
            >
              Tìm kiếm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div className="container">
        <Link to="/home" className="link">
          <div className="img">
            <img src={Logo} alt="" />
          </div>
        </Link>

        <Input
          className="container__input "
          placeholder="Bạn đang tìm gì?"
          prefix={<SearchIcon />}
          suffix={<SearchButton />}
          onClick={() => setVisible(true)}
        />
        <div className="container__right">
          <div className="tip" onClick={() => navigate("/home/dao")}>
            <img src={DaoIcon} alt="" />
            <p>Dạo</p>
          </div>
          <Link to={"cart"} className="tip">
            <ShoppingOutlined style={{ fontSize: "20px", color: "#828282" }} />
            <p style={{ color: "#828282" }}>Giỏ hàng</p>
          </Link>
          {user ? (
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
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
