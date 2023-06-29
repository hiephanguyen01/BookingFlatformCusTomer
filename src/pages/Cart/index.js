import { RightOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Menu, Row, Space, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import CheckBox from "../../components/CheckBox";
import "./cart.scss";

import img from "../../assets/dao/Frame 163.jpg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import {
  calculatePrice,
  calculatePriceUsePromo,
  calculateTotalPrice,
} from "../../utils/calculate";
import { convertImage } from "../../utils/convertImage";
import { addServiceToList } from "../../stores/actions/OrderAction";

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order, chooseServiceList } = useSelector(
    (state) => state.OrderReducer
  );
  const { choosePromotionUser, promoCodeUserSave } = useSelector(
    (state) => state.promoCodeReducer
  );
  const [chooseServices, setChooseServices] = useState([]);

  useEffect(() => {
    return () => {
      setChooseServices([]);
    };
  }, []);

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

  const items = [
    {
      key: "1",
      label: "Studio",
      children: (
        <Row gutter={[0, 6]}>
          {order["studio"]?.map((orderItem, index) => (
            <Col span={24} className="wrapper">
              <CheckBox
                key={index}
                name="allCheck"
                value="allCheck"
                onClick={() =>
                  handleOnCheckedAll(1, orderItem, orderItem?.Services)
                }
                checked={
                  chooseServices.filter(
                    (item) =>
                      item?.category === 1 && item?.postId === orderItem?.id
                  ).length === orderItem?.Services?.length
                }
              >
                <div
                  style={{
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "19px",
                    color: "#3F3F3F",
                  }}
                >
                  {orderItem?.Name}
                </div>
              </CheckBox>
              {orderItem?.Services?.map((item, index) => (
                <CheckBox
                  onClick={() => handleOnChecked(1, orderItem, item)}
                  key={index}
                  name={item?.id}
                  value={item?.id}
                  checked={chooseServices.some(
                    (service) =>
                      service?.id === item?.id &&
                      service?.postId === orderItem?.id &&
                      service?.category === 1
                  )}
                >
                  <Row
                    className="checkbox_content w-100"
                    align={"middle"}
                    justify={"space-between"}
                    gutter={[15, 10]}
                  >
                    <Col lg={12} md={24} sm={24} xs={24} className="h-100">
                      <Row className="w-100 h-100" gutter={(0, 10)}>
                        <Col span={6} className="">
                          <img
                            src={item?.Image[0]}
                            className="w-100 h-80px"
                            style={{ objectFit: "cover" }}
                            alt=""
                          />
                        </Col>
                        <Col span={18}>
                          <label className="checkbox_label">{item?.Name}</label>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24} className="h-100">
                      <Row
                        className="w-100 mb-20"
                        gutter={[0, 10]}
                        align={"top"}
                        justify={"space-between"}
                      >
                        <Col span={12} className="checkbox_desc">
                          {item.OrderByTime ? (
                            <>
                              <div>
                                Ngày
                                <span className="date">
                                  {moment(item?.OrderByTimeFrom).format(
                                    "DD/MM/YYYY"
                                  )}
                                </span>
                              </div>
                              <div>
                                Giờ
                                <span className="date">
                                  {moment(item?.OrderByTimeFrom).format(
                                    "HH:mm"
                                  )}
                                </span>
                                {" - "}
                                <span>
                                  {moment(item?.OrderByTimeTo).format("HH:mm")}
                                </span>
                              </div>
                            </>
                          ) : (
                            <div>
                              Ngày
                              <span className="date">
                                {moment(item?.OrderByDateFrom).format(
                                  "DD/MM/YYYY"
                                )}
                              </span>
                              {" - "}
                              <span>
                                {moment(item?.OrderByDateTo).format(
                                  "DD/MM/YYYY"
                                )}
                              </span>
                            </div>
                          )}
                        </Col>
                        <Col span={12} className="checkbox_action">
                          <div onClick={() => {}}>Xóa</div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} className="">
                          <div className="price">
                            {formatValue(calculatePrice(item))}đ
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CheckBox>
              ))}
            </Col>
          ))}
        </Row>
      ),
    },
    {
      key: "2",
      label: "Nhiếp ảnh",
      children: (
        <Row gutter={[0, 6]}>
          {order["photographer"]?.map((orderItem, index) => (
            <Col span={24} className="wrapper">
              <CheckBox
                key={index}
                name="allCheck"
                value="allCheck"
                onClick={() =>
                  handleOnCheckedAll(2, orderItem?.id, orderItem?.Services)
                }
                checked={
                  chooseServices.filter(
                    (item) =>
                      item?.category === 2 && item?.postId === orderItem?.id
                  ).length === orderItem?.Services?.length
                }
              >
                <div
                  style={{
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "19px",
                    color: "#3F3F3F",
                  }}
                >
                  {orderItem?.Name}
                </div>
              </CheckBox>
              {orderItem?.Services?.map((item, index) => (
                <CheckBox
                  onClick={() => handleOnChecked(2, orderItem, item)}
                  key={index}
                  name={item?.id}
                  value={item?.id}
                  checked={chooseServices.some(
                    (service) =>
                      service?.id === item?.id &&
                      service?.postId === orderItem?.id &&
                      service?.category === 2
                  )}
                >
                  <Row
                    className="checkbox_content w-100"
                    align={"middle"}
                    justify={"space-between"}
                    gutter={[15, 10]}
                  >
                    <Col lg={12} md={24} sm={24} xs={24} className="h-100">
                      <Row className="w-100 h-100" gutter={(0, 10)}>
                        <Col span={6} className="">
                          <img
                            src={item?.image}
                            className="w-100 h-80px"
                            style={{ objectFit: "cover" }}
                            alt=""
                          />
                        </Col>
                        <Col span={18}>
                          <label className="checkbox_label">{item?.Name}</label>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24} className="h-100">
                      <Row
                        className="w-100 mb-20"
                        gutter={[0, 10]}
                        align={"top"}
                        justify={"space-between"}
                      >
                        <Col span={12} className="checkbox_desc">
                          {item.OrderByTime ? (
                            <>
                              <div>
                                Ngày
                                <span className="date">
                                  {moment(item?.OrderByTimeFrom).format(
                                    "DD/MM/YYYY"
                                  )}
                                </span>
                              </div>
                              <div>
                                Giờ
                                <span className="date">
                                  {moment(item?.OrderByTimeFrom).format(
                                    "HH:mm"
                                  )}
                                </span>
                                {" - "}
                                <span>
                                  {moment(item?.OrderByTimeTo).format("HH:mm")}
                                </span>
                              </div>
                            </>
                          ) : (
                            <div>
                              Ngày
                              <span className="date">
                                {moment(item?.OrderByDateFrom).format(
                                  "DD/MM/YYYY"
                                )}
                              </span>
                              {" - "}
                              <span>
                                {moment(item?.OrderByDateTo).format(
                                  "DD/MM/YYYY"
                                )}
                              </span>
                            </div>
                          )}
                        </Col>
                        <Col span={12} className="checkbox_action">
                          <div onClick={() => {}}>Xóa</div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} className="">
                          <div className="price">
                            {" "}
                            {formatValue(item?.Price)}đ
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CheckBox>
              ))}
            </Col>
          ))}
        </Row>
      ),
    },
    {
      key: "3",
      label: "Trang phục",
      children: (
        <Row gutter={[0, 6]}>
          {order["clothes"]?.map((orderItem, index) => (
            <Col span={24} className="wrapper">
              <CheckBox
                key={index}
                name="allCheck"
                value="allCheck"
                onClick={() =>
                  handleOnCheckedAll(3, orderItem?.id, orderItem?.Services)
                }
                checked={
                  chooseServices.filter(
                    (item) =>
                      item?.category === 3 && item?.postId === orderItem?.id
                  ).length === orderItem?.Services?.length
                }
              >
                <div
                  style={{
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "19px",
                    color: "#3F3F3F",
                  }}
                >
                  {orderItem?.Name}
                </div>
              </CheckBox>
              {orderItem?.Services?.map((item, index) => (
                <CheckBox
                  onClick={() => handleOnChecked(3, orderItem, item)}
                  key={index}
                  name={item?.id}
                  value={item?.id}
                  checked={chooseServices.some(
                    (service) =>
                      service?.id === item?.id &&
                      service?.postId === orderItem?.id &&
                      service?.category === 3
                  )}
                >
                  <Row
                    className="checkbox_content w-100"
                    align={"middle"}
                    justify={"space-between"}
                    gutter={[15, 10]}
                  >
                    <Col lg={12} md={24} sm={24} xs={24} className="h-100">
                      <Row className="w-100 h-100" gutter={(0, 10)}>
                        <Col span={6} className="">
                          <img
                            src={item?.image}
                            className="w-100 h-80px"
                            style={{ objectFit: "cover" }}
                            alt=""
                          />
                        </Col>
                        <Col span={18}>
                          <label className="checkbox_label">{item?.Name}</label>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24} className="h-100">
                      <Row
                        className="w-100 mb-20"
                        gutter={[0, 10]}
                        align={"top"}
                        justify={"space-between"}
                      >
                        <Col span={12} className="checkbox_desc">
                          {item.OrderByTime ? (
                            <>
                              <div>
                                Ngày
                                <span className="date">
                                  {moment(item?.OrderByTimeFrom).format(
                                    "DD/MM/YYYY"
                                  )}
                                </span>
                              </div>
                              <div>
                                Giờ
                                <span className="date">
                                  {moment(item?.OrderByTimeFrom).format(
                                    "HH:mm"
                                  )}
                                </span>
                                {" - "}
                                <span>
                                  {moment(item?.OrderByTimeTo).format("HH:mm")}
                                </span>
                              </div>
                            </>
                          ) : (
                            <div>
                              Ngày
                              <span className="date">
                                {moment(item?.OrderByDateFrom).format(
                                  "DD/MM/YYYY"
                                )}
                              </span>
                              {" - "}
                              <span>
                                {moment(item?.OrderByDateTo).format(
                                  "DD/MM/YYYY"
                                )}
                              </span>
                            </div>
                          )}
                        </Col>
                        <Col span={12} className="checkbox_action">
                          <div onClick={() => {}}>Xóa</div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} className="">
                          <div className="price">
                            {" "}
                            {formatValue(item?.Price)}đ
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CheckBox>
              ))}
            </Col>
          ))}
        </Row>
      ),
    },
    {
      key: "4",
      label: "Make up",
      children: (
        <Row gutter={[0, 6]}>
          {order["makeup"]?.map((orderItem, index) => (
            <Col span={24} className="wrapper">
              <CheckBox
                key={index}
                name="allCheck"
                value="allCheck"
                onClick={() =>
                  handleOnCheckedAll(4, orderItem?.id, orderItem?.Services)
                }
                checked={
                  chooseServices.filter(
                    (item) =>
                      item?.category === 4 && item?.postId === orderItem?.id
                  ).length === orderItem?.Services?.length
                }
              >
                <div
                  style={{
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "19px",
                    color: "#3F3F3F",
                  }}
                >
                  {orderItem?.Name}
                </div>
              </CheckBox>
              {orderItem?.Services?.map((item, index) => (
                <CheckBox
                  onClick={() => handleOnChecked(4, orderItem?.id, item)}
                  key={index}
                  name={item?.id}
                  value={item?.id}
                  checked={chooseServices.some(
                    (service) =>
                      service?.id === item?.id &&
                      service?.postId === orderItem?.id &&
                      service?.category === 4
                  )}
                >
                  <Row
                    className="checkbox_content w-100"
                    align={"middle"}
                    justify={"space-between"}
                    gutter={[15, 10]}
                  >
                    <Col lg={12} md={24} sm={24} xs={24} className="h-100">
                      <Row className="w-100 h-100" gutter={(0, 10)}>
                        <Col span={6} className="">
                          <img
                            src={item?.image}
                            className="w-100 h-80px"
                            style={{ objectFit: "cover" }}
                            alt=""
                          />
                        </Col>
                        <Col span={18}>
                          <label className="checkbox_label">{item?.Name}</label>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24} className="h-100">
                      <Row
                        className="w-100 mb-20"
                        gutter={[0, 10]}
                        align={"top"}
                        justify={"space-between"}
                      >
                        <Col span={12} className="checkbox_desc">
                          {item.OrderByTime ? (
                            <>
                              <div>
                                Ngày
                                <span className="date">
                                  {moment(item?.OrderByTimeFrom).format(
                                    "DD/MM/YYYY"
                                  )}
                                </span>
                              </div>
                              <div>
                                Giờ
                                <span className="date">
                                  {moment(item?.OrderByTimeFrom).format(
                                    "HH:mm"
                                  )}
                                </span>
                                {" - "}
                                <span>
                                  {moment(item?.OrderByTimeTo).format("HH:mm")}
                                </span>
                              </div>
                            </>
                          ) : (
                            <div>
                              Ngày
                              <span className="date">
                                {moment(item?.OrderByDateFrom).format(
                                  "DD/MM/YYYY"
                                )}
                              </span>
                              {" - "}
                              <span>
                                {moment(item?.OrderByDateTo).format(
                                  "DD/MM/YYYY"
                                )}
                              </span>
                            </div>
                          )}
                        </Col>
                        <Col span={12} className="checkbox_action">
                          <div onClick={() => {}}>Xóa</div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} className="">
                          <div className="price">
                            {" "}
                            {formatValue(item?.Price)}đ
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CheckBox>
              ))}
            </Col>
          ))}
        </Row>
      ),
    },
    {
      key: "5",
      label: "Thiết bị",
      children: (
        <Row gutter={[0, 6]}>
          {order["device"]?.map((orderItem, index) => (
            <Col span={24} className="wrapper">
              <CheckBox
                key={index}
                name="allCheck"
                value="allCheck"
                onClick={() =>
                  handleOnCheckedAll(5, orderItem?.id, orderItem?.Services)
                }
                checked={
                  chooseServices.filter(
                    (item) =>
                      item?.category === 5 && item?.postId === orderItem?.id
                  ).length === orderItem?.Services?.length
                }
              >
                <div
                  style={{
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "19px",
                    color: "#3F3F3F",
                  }}
                >
                  {orderItem?.Name}
                </div>
              </CheckBox>
              {orderItem?.Services?.map((item, index) => (
                <CheckBox
                  onClick={() => handleOnChecked(5, orderItem?.id, item)}
                  key={index}
                  name={item?.id}
                  value={item?.id}
                  checked={chooseServices.some(
                    (service) =>
                      service?.id === item?.id &&
                      service?.postId === orderItem?.id &&
                      service?.category === 5
                  )}
                >
                  <Row
                    className="checkbox_content w-100"
                    align={"middle"}
                    justify={"space-between"}
                    gutter={[15, 10]}
                  >
                    <Col lg={12} md={24} sm={24} xs={24} className="h-100">
                      <Row className="w-100 h-100" gutter={(0, 10)}>
                        <Col span={6} className="">
                          <img
                            src={item?.image}
                            className="w-100 h-80px"
                            style={{ objectFit: "cover" }}
                            alt=""
                          />
                        </Col>
                        <Col span={18}>
                          <label className="checkbox_label">{item?.Name}</label>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24} className="h-100">
                      <Row
                        className="w-100 mb-20"
                        gutter={[0, 10]}
                        align={"top"}
                        justify={"space-between"}
                      >
                        <Col span={12} className="checkbox_desc">
                          {item.OrderByTime ? (
                            <>
                              <div>
                                Ngày
                                <span className="date">
                                  {moment(item?.OrderByTimeFrom).format(
                                    "DD/MM/YYYY"
                                  )}
                                </span>
                              </div>
                              <div>
                                Giờ
                                <span className="date">
                                  {moment(item?.OrderByTimeFrom).format(
                                    "HH:mm"
                                  )}
                                </span>
                                {" - "}
                                <span>
                                  {moment(item?.OrderByTimeTo).format("HH:mm")}
                                </span>
                              </div>
                            </>
                          ) : (
                            <div>
                              Ngày
                              <span className="date">
                                {moment(item?.OrderByDateFrom).format(
                                  "DD/MM/YYYY"
                                )}
                              </span>
                              {" - "}
                              <span>
                                {moment(item?.OrderByDateTo).format(
                                  "DD/MM/YYYY"
                                )}
                              </span>
                            </div>
                          )}
                        </Col>
                        <Col span={12} className="checkbox_action">
                          <div onClick={() => {}}>Xóa</div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} className="">
                          <div className="price">
                            {" "}
                            {formatValue(item?.Price)}đ
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CheckBox>
              ))}
            </Col>
          ))}
        </Row>
      ),
    },
    {
      key: "6",
      label: "Người mẫu",
      children: (
        <Row gutter={[0, 6]}>
          {order["model"]?.map((orderItem, index) => (
            <Col span={24} className="wrapper">
              <CheckBox
                key={index}
                name="allCheck"
                value="allCheck"
                onClick={() =>
                  handleOnCheckedAll(6, orderItem?.id, orderItem?.Services)
                }
                checked={
                  chooseServices.filter(
                    (item) =>
                      item?.category === 6 && item?.postId === orderItem?.id
                  ).length === orderItem?.Services?.length
                }
              >
                <div
                  style={{
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "19px",
                    color: "#3F3F3F",
                  }}
                >
                  {orderItem?.Name}
                </div>
              </CheckBox>
              {orderItem?.Services?.map((item, index) => (
                <CheckBox
                  onClick={() => handleOnChecked(6, orderItem, item)}
                  key={index}
                  name={item?.id}
                  value={item?.id}
                  checked={chooseServices.some(
                    (service) =>
                      service?.id === item?.id &&
                      service?.postId === orderItem?.id &&
                      service?.category === 6
                  )}
                >
                  <Row
                    className="checkbox_content w-100"
                    align={"middle"}
                    justify={"space-between"}
                    gutter={[15, 10]}
                  >
                    <Col lg={12} md={24} sm={24} xs={24} className="h-100">
                      <Row className="w-100 h-100" gutter={(0, 10)}>
                        <Col span={6} className="">
                          <img
                            src={convertImage(item?.Image)}
                            className="w-100 h-80px"
                            style={{ objectFit: "cover" }}
                            alt=""
                          />
                        </Col>
                        <Col span={18}>
                          <label className="checkbox_label">{item?.Name}</label>
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={12} md={24} sm={24} xs={24} className="h-100">
                      <Row
                        className="w-100 mb-20"
                        gutter={[0, 10]}
                        align={"top"}
                        justify={"space-between"}
                      >
                        <Col span={12} className="checkbox_desc">
                          {item.OrderByTime ? (
                            <>
                              <div>
                                Ngày
                                <span className="date">
                                  {moment(item?.OrderByTimeFrom).format(
                                    "DD/MM/YYYY"
                                  )}
                                </span>
                              </div>
                              <div>
                                Giờ
                                <span className="date">
                                  {moment(item?.OrderByTimeFrom).format(
                                    "HH:mm"
                                  )}
                                </span>
                                {" - "}
                                <span>
                                  {moment(item?.OrderByTimeTo).format("HH:mm")}
                                </span>
                              </div>
                            </>
                          ) : (
                            <div>
                              Ngày
                              <span className="date">
                                {moment(item?.OrderByDateFrom).format(
                                  "DD/MM/YYYY"
                                )}
                              </span>
                              {" - "}
                              <span>
                                {moment(item?.OrderByDateTo).format(
                                  "DD/MM/YYYY"
                                )}
                              </span>
                            </div>
                          )}
                        </Col>
                        <Col span={12} className="checkbox_action">
                          <div onClick={() => {}}>Xóa</div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} className="">
                          <div className="price">
                            {" "}
                            {formatValue(item?.Price)}đ
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </CheckBox>
              ))}
            </Col>
          ))}
        </Row>
      ),
    },
  ];

  const onChange = (key) => {
    // setList([...CART_ITEM_LIST[key]]);
  };

  const handleOnChecked = (category, post, service, postName) => {
    let newChooseService = [...chooseServices];
    const findServiceIndex = newChooseService.findIndex(
      (item) =>
        item?.postId === post?.id &&
        service?.id === item?.id &&
        category === item?.category
    );
    if (findServiceIndex >= 0) {
      newChooseService.splice(findServiceIndex, 1);
    } else {
      newChooseService.push({
        ...service,
        category,
        postId: post?.id,
        postName: post?.Name,
      });
    }
    setChooseServices([...newChooseService]);
  };

  const handleOnCheckedAll = (category, post, services) => {
    let newChooseService = [...chooseServices];
    let temp = [];
    const checkAll =
      newChooseService.filter(
        (item) => item?.category === category && item?.postId === post?.id
      ).length === services?.length;
    if (checkAll) {
      newChooseService = newChooseService.filter(
        (service) =>
          !(service?.category === category && service?.postId === post?.id)
      );
    } else {
      temp = services.reduce((arr, service) => {
        if (
          newChooseService.some(
            (sv) =>
              sv?.postId === post?.id &&
              sv?.id === service?.id &&
              category === sv?.category
          )
        ) {
          return arr;
        }
        return [
          ...arr,
          {
            ...service,
            category,
            postId: post?.id,
            postName: post?.Name,
          },
        ];
      }, []);
    }

    setChooseServices([...newChooseService, ...temp]);
  };
  const handleButtonOrder = () => {
    try {
      if (chooseServices.length > 0) {
        dispatch(addServiceToList(chooseServices));
        navigate("order");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ background: "#f5f5f5" }}>
      <div className="cart_container">
        <h3>Giỏ hàng</h3>
        <Row className="cart_row" gutter={[12, 15]}>
          <Col lg={16} md={16} sm={24} xs={24} className="cart_col_left">
            <div className="cart_tab_pane">
              <Tabs defaultActiveKey="1" onChange={onChange} items={items} />
            </div>
          </Col>
          <Col lg={8} md={8} sm={24} xs={0} className="cart_col_right">
            <div
              className="card"
              style={{
                padding: "25px 25px ",
                // marginBottom: "0.5rem",
                backgroundColor: "#FFFFFF",
              }}
            >
              <div
                className="d-flex justify-content-between"
                style={{
                  borderBottom: "0.6px solid #E7E7E7",
                  padding: "0 0 14px",
                  margin: "0 0 16px",
                }}
              >
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
                <Row
                  align={"middle"}
                  justify={"space-between"}
                  className="mb-8"
                  gutter={[0, 10]}
                >
                  <Col lg={14} md={24}>
                    <div className="text-middle" style={{ color: "#222222" }}>
                      Đã chọn {chooseServices.length} sản phẩm
                    </div>
                  </Col>
                  <Col lg={10} style={{ textAlign: "end" }}>
                    <div
                      className="text-description "
                      style={{
                        textDecoration: "line-through",
                        color: "#828282",
                      }}
                    >
                      {`${formatValue(calculateTotalPrice(chooseServices))}đ`}
                    </div>
                  </Col>
                </Row>
                <Row
                  align={"middle"}
                  justify={"space-between"}
                  gutter={[0, 10]}
                >
                  <Col lg={14}>
                    <div
                      className="text-description"
                      style={{ color: "#616161" }}
                    >
                      Bao gồm 50.000đ thuế và phí
                    </div>
                  </Col>
                  <Col lg={10} style={{ textAlign: "end" }}>
                    <div
                      className=""
                      style={{
                        color: "#E22828",
                        fontSize: "20px",
                        lineHeight: "28px",
                        fontWeight: "700",
                      }}
                    >
                      {`${formatValue(
                        calculatePriceUsePromo(
                          chooseServices,
                          choosePromotionUser
                        )
                      )}đ`}
                    </div>
                  </Col>
                </Row>
              </div>
              <Button
                type="primary"
                style={{ borderRadius: "8px", height: "45px", width: "100%" }}
                onClick={handleButtonOrder}
              >
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
