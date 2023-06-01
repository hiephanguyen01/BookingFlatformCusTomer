import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { Col, Divider, Grid, Input, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { orderService } from "../../../../services/OrderService";
import OrderStatusItem from "./conponents/OrderStatusItem/OrderStatusItem";
import "./orderStatus.scss";
import BackNav from "../../../../components/BackNav/BackNav";
export const keyF = {
  1: { BookingStatus: 4, PaymentStatus: [1] }, //chờ thanh toán
  2: { BookingStatus: 4, PaymentStatus: [4, 3, 2] }, //sắp tới
  3: { BookingStatus: 1, PaymentStatus: [2, 3, 4] }, //hoàn tất
  4: { BookingStatus: 2, PaymentStatus: [1, 2, 3, 4] }, //đã huỷ
  5: { BookingStatus: 3, PaymentStatus: [2, 3, 4] }, //vắng mặt
};

const HEADER_TAB = [
  { key: 1, title: "Chờ thanh toán" },
  { key: 2, title: "Sắp tới" },
  { key: 3, title: "Đã hoàn tất" },
  { key: 4, title: "Đã hủy" },
  { key: 5, title: "Vắng mặt" },
];

const { useBreakpoint } = Grid;
const OrderStatus = () => {
  const screens = useBreakpoint();
  const [booking, setBooking] = useState([
    {
      Name: "Đơn đặt khuyến mãi",
      id: 1,
      BookingStatus: 1,
      category: 1,
      PaymentStatus: 1,
    },
  ]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize] = useState(5);
  const [pageBooking, setPageBooking] = useState([]);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    key: 1,
    BookingStatus: 4,
    PaymentStatus: [1],
  });
  const onChange = (key) => {
    setFilter([]);
    setParams({ ...params, ...keyF[key], key });
  };
  const handleChange = (current, pageSize) => {
    const last = current * pageSize;
    const first = last - pageSize;
    if (filter.length) {
      setPageBooking(filter.slice(first, last));
    } else {
      setPageBooking(booking.slice(first, last));
    }
  };
  const onChangeInput = (e) => {
    const input = e.target.value.toLowerCase();
    const newData = booking.filter(
      (val) =>
        val.IdentifyCode.toLowerCase().includes(input) ||
        val.Item?.Name.toLowerCase().includes(input)
    );
    setFilter(newData);
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        console.log("params", params);
        const { data } = await orderService.getOrderStatus(params);
        setBooking(data.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [params]);

  useEffect(() => {
    if (filter.length) {
      setPageBooking(filter.slice(0, pageSize));
    } else {
      setPageBooking(booking.slice(0, pageSize));
    }
  }, [booking, filter, pageSize]);

  return (
    <>
      {screens?.xs ? (
        <BackNav title="Lịch sử đơn đặt" to="/home/user" />
      ) : (
        <h4 className="OrderStatus__header">Lịch sử đơn đặt</h4>
      )}
      <div className="OrderStatus__body">
        {loading ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "white",
                width: "fit-content",
                borderRadius: "50%",
                padding: "10px",
                margin: "10px",
              }}
            >
              <LoadingOutlined style={{ fontSize: "40px" }} />
            </div>
          </div>
        ) : (
          // <Tabs
          //   className="tab_search"
          //   defaultActiveKey={params.key}
          //   onChange={onChange}
          //   tabBarExtraContent={{
          //     right: (
          //       <Input
          //         onChange={onChangeInput}
          //         prefix={<SearchOutlined />}
          //         className="input"
          //         placeholder="Tìm đơn đặt theo mã booking, tên studio, thợ make up, thiết bị, trang phục,..."
          //       />
          //     ),
          //   }}
          // >
          //   <Tabs.TabPane tab="Chờ thanh toán" key={1}>
          //     {booking &&
          //       pageBooking.map((item, idx) => (
          //         <OrderStatusItem
          //           id={item.id}
          //           BookingStatus={params.key || 1}
          //           key={idx}
          //           item={item}
          //           pageBooking={pageBooking}
          //           setPageBooking={setPageBooking}
          //         />
          //       ))}
          //   </Tabs.TabPane>
          //   <Tabs.TabPane tab="Sắp tới" key={2}>
          //     {booking &&
          //       pageBooking.map((item, idx) => (
          //         <OrderStatusItem
          //           id={item.id}
          //           BookingStatus={params.key}
          //           key={idx}
          //           item={item}
          //           pageBooking={pageBooking}
          //           setPageBooking={setPageBooking}
          //         />
          //       ))}
          //   </Tabs.TabPane>
          //   <Tabs.TabPane tab="Đã hoàn tất" key={3}>
          //     {booking &&
          //       pageBooking.map((item, idx) => (
          //         <OrderStatusItem
          //           id={item.id}
          //           BookingStatus={params.key}
          //           key={idx}
          //           item={item}
          //           pageBooking={pageBooking}
          //           setPageBooking={setPageBooking}
          //         />
          //       ))}
          //   </Tabs.TabPane>
          //   <Tabs.TabPane tab="Đã hủy" key={4}>
          //     {booking &&
          //       pageBooking.map((item, idx) => (
          //         <OrderStatusItem
          //           id={item.id}
          //           BookingStatus={params.key}
          //           key={idx}
          //           item={item}
          //           booking={booking}
          //           setBooking={setBooking}
          //         />
          //       ))}
          //   </Tabs.TabPane>
          //   <Tabs.TabPane tab="Vắng mặt" key={5}>
          //     {booking &&
          //       pageBooking.map((item, idx) => (
          //         <OrderStatusItem
          //           id={item.id}
          //           BookingStatus={params.key}
          //           key={idx}
          //           item={item}
          //           booking={booking}
          //           setBooking={setBooking}
          //         />
          //       ))}
          //   </Tabs.TabPane>
          // </Tabs>
          <Col className="w-100 ">
            <div className="header-tab">
              {HEADER_TAB.map((item) => (
                <div
                  className={`header-tab-item ${
                    item.key === params?.key && "active"
                  }`}
                  onClick={() => onChange(item.key)}
                >
                  {item.title}
                </div>
              ))}
            </div>
            <Divider
              style={{ height: "10px", backgroundColor: "#f5f5f5", margin: 0 }}
            />
            <Input
              onChange={onChangeInput}
              prefix={<SearchOutlined />}
              className="input"
              placeholder="Tìm đơn đặt theo mã booking, tên studio, thợ make up, thiết bị, trang phục,..."
            />
            <div>
              {booking &&
                pageBooking.map((item, idx) => (
                  <OrderStatusItem
                    id={item.id}
                    BookingStatus={params.key || 1}
                    key={idx}
                    item={item}
                    pageBooking={pageBooking}
                    setPageBooking={setPageBooking}
                  />
                ))}
            </div>
          </Col>
        )}
      </div>
      {booking && (
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            padding: "10px 10px",
          }}
        >
          <Pagination
            defaultCurrent={1}
            onChange={handleChange}
            pageSize={pageSize || 1}
            total={filter.length || booking.length}
          />
        </div>
      )}
    </>
  );
};

export default OrderStatus;
