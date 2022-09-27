import { LoadingOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { orderService } from "../../../../services/OrderService";
import OrderStatusItem from "./conponents/OrderStatusItem/OrderStatusItem";
import "./orderStatus.scss";
const { TabPane } = Tabs;
const OrderStatus = () => {
  const [booking, setBooking] = useState();
  const [loading, setLoading] = useState(false);
  const EntryDate = { startDate: "", endDate: "" };
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    category: 1,
    BookingStatus: 1,
    EntryDate: JSON.stringify(EntryDate),
  });
  const onChange = (key) => {
    setParams({ ...params, BookingStatus: key });
  };
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await orderService.getAllOrderByUserId(params);
        setBooking(data.data);
        console.log(data.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, [params]);

  return (
    <>
      <h4 className="OrderStatus__header">Thông tin tài khoản</h4>
      <div className="OrderStatus__body">
        {loading ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}>
            <div
              style={{
                background: "white",
                width: "fit-content",
                borderRadius: "50%",
                padding: "10px",
                margin: "10px",
              }}>
              <LoadingOutlined style={{ fontSize: "40px" }} />
            </div>
          </div>
        ) : (
          <Tabs defaultActiveKey={params.BookingStatus} onChange={onChange}>
            <TabPane tab="Chờ thanh toán" key={1}>
              {booking &&
                booking.map((item) => <OrderStatusItem item={item} />)}
            </TabPane>
            <TabPane tab="Sắp tới" key={2}>
              {booking &&
                booking.map((item) => <OrderStatusItem item={item} />)}
            </TabPane>
            <TabPane tab="Đã hoàn tất" key={3}>
              {booking &&
                booking.map((item) => <OrderStatusItem item={item} />)}
            </TabPane>
            <TabPane tab="Đã hủy" key={4}>
              {booking &&
                booking.map((item) => <OrderStatusItem item={item} />)}
            </TabPane>
          </Tabs>
        )}
      </div>
    </>
  );
};

export default OrderStatus;
