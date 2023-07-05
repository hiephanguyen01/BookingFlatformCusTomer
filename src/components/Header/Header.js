import {
  CloseOutlined,
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
  Grid,
  Badge,
  Slider,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import DaoIcon from "../../assets/header/DaoIcon.svg";
import { ReactComponent as LogoCpn } from "../../assets/header/Logo.svg";
import Chat from "../../assets/header/chat.svg";
import { ReactComponent as SearchIcon } from "../../assets/header/SearchIcon.svg";
import noBody from "../../assets/img/no-body.png";
import { studioPostService } from "../../services/StudioPostService";
import { logOut } from "../../stores/actions/autheticateAction";
import {
  getFilterStudioPost,
  getFilterStudioPostMobile,
} from "../../stores/actions/studioPostAction";
import { convertImage } from "../../utils/convertImage";
import SearchButton from "../layouts/SearchButton";
import toastMessage from "../ToastMessage";
import Hotkey from "./Components/Hotkey";
import "./Header.scss";
import ModalBottom from "../ModalBottom/ModalBottom";
import { convertPrice } from "../../utils/convert";
import { ReactComponent as CheckSVG } from "../../assets/svg/check.svg";
import ChatModal from "../ChatModal/ChatModal";

const { Option } = Select;

const { useBreakpoint } = Grid;

const PRICE_FILTER = [
  { value: 1, label: "Giá thấp nhất" },
  { value: 2, label: "Giá cao nhất" },
  { value: 3, label: "Giảm giá nhiều nhất" },
];

const Header = () => {
  const inputSearchRef = useRef(null);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [priceRange, setPriceRange] = useState([]);
  const [chooseProvince, setChooseProvince] = useState([]);
  const [chooseDistrict, setChooseDistrict] = useState([]);
  const [selectProvince, setSelectProvince] = useState(null);
  const [chooseCategory, setChooseCategory] = useState([]);
  const [openModalChat, setOpenModalChat] = useState(false);
  const [choosePrice, setChoosePrice] = useState({});
  const [keyString, setKeyString] = useState("");
  const user = useSelector((state) => state.authenticateReducer.currentUser);
  const img = convertImage(user?.Image);
  const filter = useSelector((state) => state.studioPostReducer.filter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const [filterProvinces, setFilterProvinces] = useState([]);
  const [searchProvince, setSearchProvince] = useState("");
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
  }, []);
  useEffect(() => {
    (async () => {
      const res = await studioPostService.getAllProvince();
      setProvinces(res.data);
      setFilterProvinces(res.data);
    })();
  }, []);

  useEffect(() => {
    if (screens.xs) {
      if (selectProvince) {
        (async () => {
          const res = await studioPostService.getDistrictByProvince(
            selectProvince
          );
          setDistricts(res.data);
        })();
      }
    }
  }, [selectProvince, screens]);

  const onFinish = (values) => {
    let newFilter = {
      ...filter,
      category: values.category || "",
      location: values?.province ? values.province : "",
      keyString: keyString,
      priceOption: values.price || 1,
      ratingOption: 3,
    };

    if (screens.xs) {
      newFilter = {
        category: chooseCategory.map((item) => item.id),
        provinces: chooseProvince.map((item) => item.Name),
        keyString: values.keyString,
        priceOption: choosePrice.value,
        priceRange: priceRange,
        districts: chooseDistrict.map((item) => item.Name),
      };
      dispatch(
        getFilterStudioPostMobile(5, 1, newFilter, user, navigate, setVisible)
      );
    } else {
      dispatch(
        getFilterStudioPost(5, 1, newFilter, user, navigate, setVisible)
      );
    }
  };
  const handleSignOut = () => {
    dispatch(logOut(navigate));
  };

  const handleChooseProvince = (province) => {
    let newChooseProvince = [...chooseProvince];
    const checkProvince = newChooseProvince.findIndex(
      (item) => item?.Code === province?.Code
    );
    if (checkProvince !== -1) {
      newChooseProvince.splice(checkProvince, 1);
      const newChooseDistricts = [...chooseDistrict].filter(
        (item) => item.ProvinceCode === province.Code
      );
      setChooseDistrict(newChooseDistricts);
    } else {
      newChooseProvince.push(province);
      setSelectProvince(province.Code);
    }
    setChooseProvince(newChooseProvince);
  };

  const handleChooseDistrict = (district) => {
    let newChooseDistricts = [...chooseDistrict];
    const checkDistrict = newChooseDistricts.findIndex(
      (item) => item?.Code === district?.Code
    );
    if (checkDistrict !== -1) {
      newChooseDistricts.splice(checkDistrict, 1);
    } else {
      newChooseDistricts.push(district);
    }
    setChooseDistrict(newChooseDistricts);
  };

  const handleChooseCategory = (category) => {
    let newChooseCategory = [...chooseCategory];
    const checkCategory = newChooseCategory.findIndex(
      (item) => item?.id === category?.id
    );
    if (checkCategory !== -1) {
      newChooseCategory.splice(checkCategory, 1);
    } else {
      newChooseCategory.push(category);
    }
    setChooseCategory(newChooseCategory);
  };

  useEffect(() => {
    if (visible === true) {
      inputSearchRef?.current?.blur();
      inputSearchRef?.current?.focus();
    }
  }, [visible]);

  return (
    <div className="container">
      <div className="Header">
        {screens.xs ? (
          <>
            {visible && (
              <Modal
                onCancel={handleCancel}
                className="search-modal mobile"
                width={"100%"}
                visible={visible}
                footer={[]}
                closable={false}
              >
                <div className="search-container pt-30">
                  <Form onFinish={onFinish}>
                    <Row
                      className="w-100"
                      justify="space-between"
                      align="middle"
                    >
                      <Col span={2}>
                        <CloseOutlined
                          className="mb-30"
                          onClick={() => setVisible(false)}
                        />
                      </Col>
                      <Col span={22}>
                        <Form.Item name="keyString">
                          <Input
                            placeholder="Bạn đang tìm gì?"
                            prefix={<SearchOutlined />}
                            className="input-search "
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <p className="filter">LỌC THEO</p>
                    <div className="option d-flex justify-content-between">
                      <ModalBottom
                        height={"40%"}
                        modalContent={
                          <div className="modal-province">
                            <h3 className="px-10 mb-20">Địa điểm</h3>
                            {!selectProvince && (
                              <div className="px-10 mb-26">
                                <Input
                                  placeholder="Bạn đang tìm gì?"
                                  prefix={<SearchOutlined />}
                                  value={searchProvince || ""}
                                  className="input-search-province "
                                  onChange={(e) => {
                                    const filterProvince = provinces.filter(
                                      (p) =>
                                        p.Name.toUpperCase().includes(
                                          e.target.value.toUpperCase()
                                        )
                                    );
                                    setSearchProvince(e.target.value);
                                    setFilterProvinces(filterProvince);
                                  }}
                                />
                              </div>
                            )}
                            <Row
                              gutter={[20, 20]}
                              style={{ textAlign: "center", margin: "0 auto" }}
                            >
                              {selectProvince ? (
                                <>
                                  {districts.map((val, index) => (
                                    <Col span={12} key={index}>
                                      <div
                                        key={val.id}
                                        className={`btn-province-item ${
                                          chooseDistrict?.find(
                                            (value) => value.Code === val.Code
                                          )
                                            ? "active"
                                            : ""
                                        } `}
                                        onClick={() => {
                                          handleChooseDistrict(val);
                                        }}
                                      >
                                        {val.Name}
                                      </div>
                                    </Col>
                                  ))}
                                </>
                              ) : (
                                <>
                                  {filterProvinces.map((val, index) => (
                                    <Col span={12} key={index}>
                                      <div
                                        key={val.id}
                                        className={`btn-province-item ${
                                          chooseProvince?.find(
                                            (value) => value.Code === val.Code
                                          )
                                            ? "active"
                                            : ""
                                        } `}
                                        onClick={() => {
                                          handleChooseProvince(val);
                                        }}
                                      >
                                        {val.Name}
                                      </div>
                                    </Col>
                                  ))}
                                </>
                              )}
                            </Row>
                          </div>
                        }
                        close={true}
                        btnClose={
                          <CheckSVG
                            onClick={(e) => {
                              if (selectProvince) {
                                e.stopPropagation();
                                setSelectProvince(null);
                                setDistricts([]);
                              }
                            }}
                          />
                        }
                      >
                        <Button className="btn-item-filter">
                          Địa điểm <DownOutlined className="icon" />
                        </Button>
                      </ModalBottom>
                      <ModalBottom
                        height={"35%"}
                        modalContent={
                          <div className="modal-category">
                            <h3 className="px-10 mb-20">Danh mục</h3>
                            <Row
                              gutter={[20, 20]}
                              style={{ textAlign: "center", margin: "0 auto" }}
                            >
                              {categories.slice(1, 7).map((val, index) => (
                                <Col span={12} key={index}>
                                  <div
                                    key={val.id}
                                    className={`btn-category-item ${
                                      chooseCategory?.find(
                                        (value) => value.id === val.id
                                      )
                                        ? "active"
                                        : ""
                                    } `}
                                    onClick={() => handleChooseCategory(val)}
                                  >
                                    {val.name}
                                  </div>
                                </Col>
                              ))}
                            </Row>
                          </div>
                        }
                        extendProp={false}
                        close={true}
                        btnClose={<CheckSVG />}
                      >
                        <Button className="btn-item-filter">
                          Danh mục <DownOutlined className="icon" />
                        </Button>
                      </ModalBottom>
                      <ModalBottom
                        modalContent={
                          <div className="modal-price">
                            <h3 className="px-10 mb-20">Giá</h3>
                            <Row
                              gutter={[20, 20]}
                              style={{ textAlign: "center", margin: "0 auto" }}
                            >
                              {PRICE_FILTER.map((val, index) => (
                                <Col span={12} key={index}>
                                  <div
                                    key={val.value}
                                    className={`btn-price-item ${
                                      choosePrice?.value === val.value
                                        ? "active"
                                        : ""
                                    }`}
                                    onClick={() => setChoosePrice(val)}
                                  >
                                    {val.label}
                                  </div>
                                </Col>
                              ))}
                            </Row>
                            <div className="px-10 my-20">
                              <div style={{ fontSize: 18 }}>
                                {convertPrice(priceRange[0])} đ -{" "}
                                {convertPrice(priceRange[1])} đ
                              </div>
                              <Row>
                                <Slider
                                  className="w-100"
                                  range
                                  defaultValue={priceRange}
                                  step={100000}
                                  min={0}
                                  max={5000000}
                                  onChange={(value) => setPriceRange(value)}
                                />
                              </Row>
                            </div>
                          </div>
                        }
                        extendProp={false}
                        close={true}
                        btnClose={<CheckSVG />}
                      >
                        <Button className="btn-item-filter">
                          Giá <DownOutlined className="icon" />
                        </Button>
                      </ModalBottom>
                    </div>
                    <Form.Item
                      style={{
                        textAlign: "center",
                        width: "100%",
                        marginTop: "10px",
                        marginBottom: "35px",
                      }}
                    >
                      <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        style={{ width: "50%" }}
                        className="btn-search"
                      >
                        Tìm kiếm
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </Modal>
            )}
          </>
        ) : (
          <Modal
            onCancel={handleCancel}
            className="search-modal"
            width={"700px"}
            visible={visible}
            footer={[]}
            closable={false}
          >
            <div className="search-container">
              <div className="header-search">
                <div className="logo">
                  {/* <img src={Logo} alt="" /> */}
                  <LogoCpn style={{ height: "45px", width: "200px" }} />
                </div>
              </div>
              <Form onFinish={onFinish}>
                <Form.Item name="keyString">
                  <Input
                    ref={inputSearchRef}
                    placeholder="Bạn đang tìm gì?"
                    prefix={<SearchOutlined />}
                    className="input-search"
                  />
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
                        option.children
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      className="select-item"
                    >
                      <Option value="">Địa điểm</Option>
                      {Boolean(provinces) &&
                        provinces.map((val) => (
                          <Option key={val.id} value={val.Name}>
                            {val.Name}
                          </Option>
                        ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="category"
                    style={{ width: "100%", marginRight: "20px" }}
                  >
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
                <Form.Item
                  style={{
                    textAlign: "center",
                    width: "100%",
                    marginTop: "10px",
                    marginBottom: "35px",
                  }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    style={{ width: "50%" }}
                    className="btn-search"
                  >
                    Tìm kiếm
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Modal>
        )}
        <div className="container-header">
          <Row
            justify="space-between"
            align={"top"}
            gutter={
              screens?.xs || screens?.md || screens?.sm ? [0, 15] : [0, 0]
            }
          >
            <Col
              lg={4}
              md={24}
              sm={24}
              xs={24}
              style={{
                display: "flex",
                justifyContent: `${
                  screens?.xs || !(screens?.md && screens?.sm && screens?.lg)
                    ? "center"
                    : "flex-start"
                }`,
                alignItems: "center",
              }}
            >
              <Link to="/home" className="link">
                <div className="img">
                  {/* <img src={Logo} alt="" /> */}
                  <LogoCpn style={{ height: "50px", width: "160px" }} />
                </div>
              </Link>
            </Col>
            <Col
              lg={12}
              md={15}
              sm={24}
              xs={24}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Row style={{ width: "100%" }} justify="space-between">
                <Col lg={24} md={24} sm={24} xs={16}>
                  {screens?.xs ? (
                    <Input
                      className="container__input"
                      placeholder="Bạn đang tìm gì?"
                      prefix={<SearchIcon />}
                      suffix={<SearchButton />}
                      onChange={(e) => setKeyString(e.target.value)}
                      onClick={() => setVisible(true)}
                      readOnly
                    />
                  ) : (
                    <Dropdown
                      overlay={
                        <div className="dropdown-search">
                          <div className="search-container">
                            <Form onFinish={onFinish}>
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
                                      option.children
                                        .toLowerCase()
                                        .includes(input.toLowerCase())
                                    }
                                    className="select-item"
                                  >
                                    <Option value="">Địa điểm</Option>
                                    {Boolean(provinces) &&
                                      provinces.map((val) => (
                                        <Option key={val.id} value={val.Name}>
                                          {val.Name}
                                        </Option>
                                      ))}
                                  </Select>
                                </Form.Item>
                                <Form.Item
                                  name="category"
                                  style={{ width: "100%", marginRight: "20px" }}
                                >
                                  <Select
                                    defaultValue="-1"
                                    className="select-item"
                                  >
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
                                <Form.Item
                                  name="price"
                                  style={{ width: "100%" }}
                                >
                                  <Select
                                    defaultValue=""
                                    className="select-item"
                                  >
                                    <Option value="">Giá</Option>
                                    <Option value={2}>Giá cao nhất</Option>
                                    <Option value={1}>Giá thấp nhất </Option>
                                    <Option value={3}>
                                      Giảm giá nhiều nhất{" "}
                                    </Option>
                                  </Select>
                                </Form.Item>
                              </div>
                              <Form.Item
                                style={{
                                  textAlign: "center",
                                  width: "100%",
                                  marginTop: "10px",
                                  // marginBottom: "35px",
                                }}
                              >
                                <Button
                                  type="primary"
                                  htmlType="submit"
                                  size="large"
                                  style={{ width: "50%" }}
                                  className="btn-search"
                                >
                                  Tìm kiếm
                                </Button>
                              </Form.Item>
                            </Form>
                          </div>
                        </div>
                      }
                      // placement="topRight"
                      trigger={["click"]}
                    >
                      <Input
                        className="container__input"
                        placeholder="Bạn đang tìm gì?"
                        prefix={<SearchIcon />}
                        suffix={<SearchButton />}
                        onChange={(e) => setKeyString(e.target.value)}
                        // onClick={() => showDrawer()}
                        // readOnly
                      />
                    </Dropdown>
                  )}
                  {!screens.xs && <Hotkey />}
                </Col>
                <Col lg={0} md={0} sm={0} xs={7}>
                  <Row align="middle" justify="space-around" className="h-100">
                    <Col
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <Badge
                        count={0}
                        size="default"
                        onClick={() => setOpenModalChat(true)}
                      >
                        <img src={Chat} className="h-20px" alt="" />
                      </Badge>
                      <p>Chat</p>
                    </Col>
                    <Col
                      onClick={() => navigate("/home/cart")}
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <Badge count={0} size="default">
                        <ShoppingOutlined
                          style={{ fontSize: "19px", color: "#828282" }}
                        />
                      </Badge>
                      <p>Giỏ hàng</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col lg={6} md={8} sm={24} xs={0}>
              <Row
                align="top"
                justify="space-around"
                wrap={false}
                // className="container__right"
              >
                <div className="tip" onClick={() => navigate("/home/dao")}>
                  <img src={DaoIcon} alt="" />
                  <p>Dạo</p>
                </div>
                <Link to={"/home/cart"} className="tip">
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
                          <p className="account-text">
                            {user?.Fullname ? user.Fullname : user.Email}
                            <DownOutlined
                              style={{
                                fontSize: "10px",
                                color: "#828282",
                                marginLeft: "5px",
                              }}
                            />
                          </p>
                        </div>
                      </div>
                    </Dropdown>
                    <div
                      // type="secondary"
                      className="btn-become-partner w-80 ms-30 mt-5"
                      onClick={() =>
                        window.open("https://partner.bookingstudio.vn", "blank")
                      }
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
                          <p>Đăng ký/Đăng nhập</p>
                          <p className="account-text">
                            Tài khoản
                            <DownOutlined
                              style={{
                                fontSize: "10px",
                                color: "#828282",
                                marginLeft: "5px",
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
                )}
              </Row>
            </Col>
          </Row>
        </div>
        {screens?.xs && openModalChat && (
          <ChatModal handleCancel={() => setOpenModalChat(false)} />
        )}
      </div>
    </div>
  );
};

export default Header;
