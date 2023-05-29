import {
  Rate,
  Row,
  Col,
  Tabs,
  Pagination,
  Grid,
  Popover,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import "./detailClothesShop.scss";

import ReadMoreDesc from "../../../../components/ReadMoreDesc";

import imgPost from "../../../../assets/dao/Frame 163.jpg";
import svgLocation from "../../../../assets/svg/location.svg";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  HomeOutlined,
  MoreOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Card } from "../../../../components/Card";
import BackNav from "../../../../components/BackNav/BackNav";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { shopService } from "../../../../services/ShopService";
import { CardLiked } from "../../../../components/Card/CardLiked";
import { useDispatch, useSelector } from "react-redux";
import { getDetailShopAction } from "../../../../stores/actions/ShopAction";

const TAGS = [
  { id: "1", value: "Phổ biến" },
  { id: "2", value: "Danh mục" },
  { id: "3", value: "Bán chạy" },
  { id: "4", value: "Mới nhất" },
];

const ASIDE_CATEGORY_ITEM = [
  { value: 0, name: "Váy cưới" },
  { value: 1, name: "Áo dài" },
  { value: 2, name: "Trang phục biểu diễn" },
  { value: 3, name: "Khác" },
];

const onShowSizeChange = (current, pageSize) => {};

const { useBreakpoint } = Grid;

const { Paragraph } = Typography;

const Index = () => {
  const screens = useBreakpoint();
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clothesShop } = useSelector((state) => state.shopReducer);
  const [chooseAsideCategory, setChooseAsideCategory] = useState(0);
  const [open, setOpen] = useState(false);
  const [shop, setShop] = useState([]);

  useEffect(() => {
    dispatch(getDetailShopAction(params?.shopId, 3));
    return () => {};
  }, [params, dispatch]);

  return (
    <div
      className="margin"
      style={{
        margin: "auto",
        backgroundColor: "rgb(245, 245, 245)",
        padding: "2rem 0",
      }}
    >
      <div className="container">
        <div className="clothes_shop_container">
          {screens?.xs ? (
            <>
              <div className="header-mobile">
                <div className="nav">
                  <BackNav
                    className="background_transparent"
                    title="Shop"
                    to={location?.state?.pathname}
                    state={{ pathname: location?.state?.pathnameFilter }}
                    icon={
                      <Popover
                        className="popover-header"
                        style={{ backgroundColor: "#000" }}
                        placement="bottomRight"
                        content={
                          <Row
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "10px",
                              padding: "10px",
                            }}
                          >
                            <Col span={24}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  navigate("/home");
                                }}
                              >
                                <HomeOutlined style={{ fontSize: "20px" }} />
                                <span
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Trở về trang chủ
                                </span>
                              </div>
                            </Col>{" "}
                            <Col span={24}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                  cursor: "pointer",
                                }}
                                onClick={() => {
                                  // handleReport();
                                  setOpen(false);
                                }}
                              >
                                <ExclamationCircleOutlined
                                  style={{ fontSize: "20px" }}
                                />
                                <span
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Báo cáo
                                </span>
                              </div>
                            </Col>{" "}
                            <Col span={24}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                  cursor: "pointer",
                                }}
                                onClick={() => setOpen(false)}
                              >
                                <ShareAltOutlined
                                  style={{ fontSize: "20px" }}
                                />
                                <span
                                  style={{
                                    fontSize: "18px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  Chia sẻ
                                </span>
                              </div>
                            </Col>
                          </Row>
                        }
                        trigger="click"
                        visible={open}
                        onVisibleChange={(value) => setOpen(value)}
                      >
                        <MoreOutlined className={"item"} />
                      </Popover>
                    }
                  />
                </div>
                <img src={imgPost} className="banner" alt="" />
                <div
                  className="px-18 py-15"
                  style={{ backgroundColor: "#fff" }}
                >
                  <Row align="middle" className="mb-8">
                    <div className="shop-name">{clothesShop?.Name}</div>
                    <CheckCircleOutlined className={"check_circle ms-10"} />
                  </Row>
                  <Row align="middle">
                    <img
                      src={svgLocation}
                      style={{ marginRight: "0.5rem" }}
                      alt=""
                    />
                    <span>{clothesShop?.Address}</span>
                  </Row>
                </div>
              </div>
              <div className="description">
                <div className="des">Mô tả</div>
                <Paragraph
                  style={{ fontSize: "16px", marginBottom: 0 }}
                  ellipsis={{
                    rows: 4,
                    expandable: true,
                    suffix: "",
                    symbol: "Xem thêm",
                    onEllipsis: (ellipsis) => {},
                  }}
                >
                  {clothesShop?.Description}
                </Paragraph>
              </div>
            </>
          ) : (
            <div className="w-100 pt-38 pb-49 px-28  banner_container">
              <Row className="" gutter={[20, 0]}>
                <Col lg={8} md={8} sm={24}>
                  <img
                    src={imgPost}
                    style={{ height: "280px", width: "100%" }}
                    className="me-32"
                    alt=""
                  />
                </Col>
                <Col lg={16} md={16} sm={24}>
                  <div className="shop_name d-flex align-item-center">
                    {clothesShop?.Name}
                    <CheckCircleOutlined className="check_circle pt-10 ms-10" />
                  </div>
                  <div className="location">
                    <img
                      src={svgLocation}
                      style={{ marginRight: "0.5rem" }}
                      alt=""
                    />
                    {clothesShop?.Address}
                  </div>
                  <div className="d-flex align-items-center mb-10">
                    <Rate
                      disabled
                      allowHalf
                      defaultValue={5}
                      className="rating-clothes"
                    />
                    <div
                      className="d-flex align-items-center mt-3 ms-4"
                      style={{ fontSize: 18 }}
                    >
                      <span>5</span>
                      <div className="reserve ms-20">Đã đặt 60</div>
                    </div>
                  </div>
                  <ReadMoreDesc>{clothesShop?.Description}</ReadMoreDesc>
                </Col>
              </Row>
            </div>
          )}
          <Row>
            <div className="w-100 mt-28 tab_panel">
              <Tabs defaultActiveKey="1" onChange={{}}>
                {TAGS.map((tag, index) => (
                  <Tabs.TabPane tab={tag.value} key={tag.id}>
                    {Number(tag.id) === 1 && (
                      <Row style={{}}>
                        <div className="wrap_card w-100 mb-40" style={{}}>
                          {clothesShop?.ClothesPosts?.map((item, index) => (
                            <Card
                              value={item}
                              category={{ name: "clothes", id: 3 }}
                            />
                          ))}
                        </div>
                        <div className="d-flex justify-content-center w-100">
                          <Pagination
                            showSizeChanger={false}
                            onShowSizeChange={onShowSizeChange}
                            defaultCurrent={1}
                            total={200}
                          />
                        </div>
                      </Row>
                    )}
                    {Number(tag.id) === 2 && (
                      <Row className="tab_category">
                        <Col
                          lg={4}
                          md={4}
                          sm={4}
                          xs={24}
                          className="pe-20 header_aside_category_container"
                        >
                          <div className="header_aside_category mt-20">
                            {tag.value}
                          </div>
                          <ul className="aside_category_list">
                            {clothesShop?.ClothesGroups.map((item, index) => (
                              <li
                                key={index}
                                className={`aside_category_item ${
                                  item?.id === chooseAsideCategory
                                    ? "active"
                                    : ""
                                }`}
                                onClick={() => {
                                  setChooseAsideCategory(item?.id);
                                }}
                              >
                                {item?.Name}
                              </li>
                            ))}
                          </ul>
                        </Col>
                        <Col lg={20} md={20} sm={20} xs={24}>
                          <div className="wrap_card w-100 mb-40" style={{}}>
                            {clothesShop?.ClothesGroups.find(
                              (item) => item.id === chooseAsideCategory
                            )?.GroupMaps.map((item, index) => (
                              <div className="item">
                                <Card
                                  value={item?.ClothesPost}
                                  category={{ name: "clothes", id: 3 }}
                                />
                              </div>
                            ))}
                          </div>
                          <div className="d-flex justify-content-center">
                            <Pagination
                              showSizeChanger={false}
                              onShowSizeChange={onShowSizeChange}
                              defaultCurrent={1}
                              total={200}
                            />
                          </div>
                        </Col>
                      </Row>
                    )}

                    {Number(tag.id) === 3 && <>{tag.value}</>}
                    {Number(tag.id) === 4 && <>{tag.value}</>}
                  </Tabs.TabPane>
                ))}
              </Tabs>
            </div>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Index;
