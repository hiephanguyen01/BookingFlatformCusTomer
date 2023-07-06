import { RightOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Menu, Row, Space, Tabs, message } from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import CheckBox from "../../components/CheckBox";
import "./cart.scss";

import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import {
  calculatePriceUsePromo,
  calculateTotal,
  calculateTotalPrice,
  calculateTotalUsePromo,
} from "../../utils/calculate";
import { convertImage } from "../../utils/convertImage";
import {
  addServiceList,
  addServiceToList,
  getCartItemByCategory,
} from "../../stores/actions/CartAction";
import queryString from "query-string";
import { cartService } from "../../services/CartService";
import { convertPrice } from "../../utils/convert";
import { SHOW_MODAL } from "../../stores/types/modalTypes";
import Promotion from "../../components/Promotion";
import { orderService } from "../../services/OrderService";
import { SET_CHOOSE_SERVICE_LIST } from "../../stores/types/CartType";

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, chooseServiceList } = useSelector((state) => state.CartReducer);
  const { choosePromotionUser } = useSelector(
    (state) => state.promoCodeReducer
  );
  const location = useLocation();
  const query = useMemo(() => queryString.parse(location?.search), [location]);
  const [chooseServices, setChooseServices] = useState([]);

  useEffect(() => {
    if (query?.category) {
    } else {
      navigate("/home/cart?category=1");
    }
    return () => {
      setChooseServices([]);
    };
  }, [navigate, query]);

  useEffect(() => {
    if (query?.category) {
      dispatch(getCartItemByCategory(query?.category));
    }
  }, [query, dispatch]);

  useEffect(() => {
    dispatch({ type: SET_CHOOSE_SERVICE_LIST, payload: [] });
  }, []);
  // useEffect(() => {
  //   dispatch(addServiceList(chooseServices));
  // }, [chooseServices, dispatch]);

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
          {cart["studio"]?.map((orderItem, index) => (
            <Col span={24} className="wrapper" key={index}>
              <CheckBox
                key={index}
                name="allCheck"
                value="allCheck"
                onClick={() => handleOnCheckedAll(1, orderItem)}
                checked={
                  chooseServiceList?.filter(
                    (item) =>
                      item?.Category === 1 && item?.postId === orderItem?.Id
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
                  onClick={() =>
                    handleOnChecked(1, item, orderItem?.Id, orderItem?.Name)
                  }
                  key={index}
                  name={item?.id}
                  value={item?.id}
                  checked={chooseServiceList.some(
                    (service) =>
                      service?.id === item?.id &&
                      service?.postId === orderItem?.Id &&
                      service?.Category === 1
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
                            src={convertImage(item?.StudioRoom?.Image1)}
                            className="w-100 h-80px"
                            style={{ objectFit: "cover", cursor: "pointer" }}
                            alt=""
                            onClick={() =>
                              navigate(`/home/studio/${orderItem?.Id}`)
                            }
                          />
                        </Col>
                        <Col span={18}>
                          <label
                            className="checkbox_label"
                            onClick={() =>
                              navigate(`/home/studio/${orderItem?.Id}`)
                            }
                          >
                            {item?.StudioRoom?.Name}
                          </label>
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
                                  {moment(item?.OrderByTimeFrom)
                                    .utc()
                                    .format("DD/MM/YYYY")}
                                </span>
                              </div>
                              <div>
                                Giờ
                                <span className="date">
                                  {moment(item?.OrderByTimeFrom)
                                    .utc()
                                    .format("HH:mm")}
                                </span>
                                {" - "}
                                <span>
                                  {moment(item?.OrderByTimeTo)
                                    .utc()
                                    .format("HH:mm")}
                                </span>
                              </div>
                            </>
                          ) : (
                            <div>
                              Ngày
                              <span className="date">
                                {moment(item?.OrderByDateFrom)
                                  .utc()
                                  .format("DD/MM/YYYY")}
                              </span>
                              {" - "}
                              <span>
                                {moment(item?.OrderByDateTo)
                                  .utc()
                                  .format("DD/MM/YYYY")}
                              </span>
                            </div>
                          )}
                        </Col>
                        <Col span={12} className="checkbox_action">
                          <div onClick={() => handleBtnDelete(item?.id)}>
                            Xóa
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={24} className="">
                          <div className="price">
                            {convertPrice(item?.price)}đ
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
          {cart["photographer"]?.map((orderItem, index) => (
            <Col span={24} className="wrapper" key={index}>
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
                  onClick={() =>
                    handleOnChecked(2, item, orderItem?.Id, orderItem?.Name)
                  }
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
                            {convertPrice(item?.Price || item?.price)}đ
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
          {cart["clothes"]?.map((orderItem, index) => (
            <Col span={24} className="wrapper" key={index}>
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
                            {convertPrice(item?.Price)}đ
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
          {cart["makeup"]?.map((orderItem, index) => (
            <Col span={24} className="wrapper" key={index}>
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
                            {convertPrice(item?.Price)}đ
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
          {cart["device"]?.map((orderItem, index) => (
            <Col span={24} className="wrapper" key={index}>
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
                            {convertPrice(item?.Price)}đ
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
          {cart["model"]?.map((orderItem, index) => (
            <Col span={24} className="wrapper" key={index}>
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
                            {convertPrice(item?.Price)}đ
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

  const handleOnChecked = (category, service, postId, postName) => {
    dispatch(
      addServiceToList({
        ...service,
        postId: postId,
        postName: postName,
      })
    );
  };

  const handleOnCheckedAll = async (category, post) => {
    let newChooseService = [...chooseServiceList];
    let temp = [];
    const checkAll =
      newChooseService.filter(
        (item) => item?.Category === category && item?.postId === post?.Id
      ).length === post?.Services?.length;
    if (checkAll) {
      newChooseService = newChooseService.filter(
        (service) =>
          !(service?.Category === category && service?.postId === post?.Id)
      );
    } else {
      temp = post?.Services.reduce((arr, service) => {
        if (
          newChooseService.some(
            (sv) =>
              sv?.postId === post?.Id &&
              sv?.id === service?.id &&
              category === sv?.Category
          )
        ) {
          return arr;
        }
        return [
          ...arr,
          {
            ...service,
            postId: post?.Id,
            postName: post?.Name,
          },
        ];
      }, []);
    }

    const checkTime = await Promise.all(
      [...newChooseService, ...temp].map(async (item) => {
        const res = await orderService.checkOrderTimeExits({
          OrderByTime: item?.OrderByTime,
          OrderByTimeFrom: item?.OrderByTimeFrom,
          OrderByTimeTo: item?.OrderByTimeTo,
          OrderByDateFrom: item?.OrderByDateFrom,
          OrderByDateTo: item?.OrderByDateTo,
          ServiceId: item?.StudioRoom?.Id,
          Category: item?.Category,
        });
        return res?.data?.success;
      })
    );
    if (!checkTime.some((item) => item)) {
      dispatch(addServiceList([...newChooseService, ...temp]));
    } else {
      message.warning("Đã có người chọn trong khoảng thời gian này!");
    }
  };

  const handleBtnDelete = useCallback(
    async (id) => {
      try {
        await cartService.removeServiceFromCart(id);
        dispatch(getCartItemByCategory(query?.category));
      } catch (error) {}
    },
    [dispatch, query]
  );

  const onClickModal = () => {
    dispatch({
      type: SHOW_MODAL,
      Component: <Promotion />,
    });
  };

  const handleButtonOrder = () => {
    try {
      if (chooseServiceList.length > 0) {
        // dispatch(addServiceList(chooseServices));
        const arr = chooseServiceList.map((item) => ({
          id: item?.id,
          category: item?.Category,
        }));
        const createQuery = queryString.stringify({
          cartItems: JSON.stringify(arr),
        });
        navigate(`order?${createQuery}`);
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

                <Space onClick={() => onClickModal()}>
                  Mã khuyến mãi
                  <RightOutlined />
                </Space>
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
                      Đã chọn {chooseServiceList.length} sản phẩm
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
                      {`${convertPrice(calculateTotal(chooseServiceList))}đ`}
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
                      {`${convertPrice(
                        calculateTotalUsePromo(chooseServiceList)
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
