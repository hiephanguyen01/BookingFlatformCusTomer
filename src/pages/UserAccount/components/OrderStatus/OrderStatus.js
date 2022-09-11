import { Tabs } from "antd";
import React from "react";

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
          padding: "28px 37px",
          marginBottom: "12px",
        }}
      >
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1~~
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>

      <div
        className=""
        style={{
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.04)",
          // borderRadius: "8px",
          padding: "28px 37px",
        }}
      ></div>
    </>
  );
};

export default OrderStatus;
