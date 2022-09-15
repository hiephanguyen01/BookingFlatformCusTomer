import { Divider, Tabs } from "antd";
import React from "react";
import OrderStatusItem from "./conponents/OrderStatusItem/OrderStatusItem";
const OrderStatus = () => {
  const { TabPane } = Tabs;

  const onChange = (key) => {
    /* console.log(key); */
  };
  return (
    <>
      <h4 style={{ marginBottom: "8px", fontSize: "16px" }}>
        Thông tin tài khoản
      </h4>
      <div
        className=""
        style={{
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.04)",
          // borderRadius: "8px",
          padding: "28px 0",
          marginBottom: "12px",
        }}
      >
        <Tabs defaultActiveKey="1" onChange={onChange}  >
          <TabPane tab="Chờ thanh toán" key="1" style={{paddingTop:'0px !important'}}>
            <div className="h-10px" style={{backgroundColor:'#F5F5F5'}}></div>
           <OrderStatusItem />
           <div className="h-10px" style={{backgroundColor:'#F5F5F5'}}></div>
           <OrderStatusItem />
           <div className="h-10px" style={{backgroundColor:'#F5F5F5'}}></div>
           <OrderStatusItem />
           <div className="h-10px" style={{backgroundColor:'#F5F5F5'}}></div>
           <OrderStatusItem />

          </TabPane>
          <TabPane tab="Sắp tới" key="2">
          <OrderStatusItem />
          </TabPane>
          <TabPane tab="Đã hoàn tất" key="3">
          <OrderStatusItem />
          </TabPane>
          <TabPane tab="Đã hủy" key="4">
          <OrderStatusItem />
          </TabPane>
        </Tabs>
      </div>

      {/* <div
        className=""
        style={{
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.04)",
          // borderRadius: "8px",
          padding: "28px 37px",
        }}
      ></div> */}
    </>
  );
};

export default OrderStatus;
