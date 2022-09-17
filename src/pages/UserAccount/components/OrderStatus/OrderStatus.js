import { Tabs } from "antd";
import React from "react";
import OrderStatusItem from "./conponents/OrderStatusItem/OrderStatusItem";
import "./orderStatus.scss";
const OrderStatus = () => {
  const { TabPane } = Tabs;
  const onChange = (key) => {};
  return (
    <>
      <h4 className="OrderStatus__header">Thông tin tài khoản</h4>
      <div className="OrderStatus__body">
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="Chờ thanh toán" key="1">
            <OrderStatusItem status={1} />
            <OrderStatusItem status={1} />
            <OrderStatusItem status={1} />
            <OrderStatusItem status={1} />
          </TabPane>
          <TabPane tab="Sắp tới" key="2">
            <OrderStatusItem status={2} />
            <OrderStatusItem status={2} />
            <OrderStatusItem status={2} />
            <OrderStatusItem status={2} />
          </TabPane>
          <TabPane tab="Đã hoàn tất" key="3">
            <OrderStatusItem status={3} />
            <OrderStatusItem status={3} />
            <OrderStatusItem status={3} />
            <OrderStatusItem status={3} />
          </TabPane>
          <TabPane tab="Đã hủy" key="4">
            <OrderStatusItem status={4} />
            <OrderStatusItem status={4} />
            <OrderStatusItem status={4} />
            <OrderStatusItem status={4} />
            <OrderStatusItem status={4} />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default OrderStatus;
