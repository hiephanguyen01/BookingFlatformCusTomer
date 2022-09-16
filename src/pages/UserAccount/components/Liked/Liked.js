import { Tabs } from "antd";
import React from "react";
import { DividerCustom } from "../OrderStatus/conponents/DividerCustom/DividerCustom";
import { LikeAll } from "./components/LikeAll";
import { LikeFilter } from "./components/LikeFilter";
import "./liked.scss";
const Liked = () => {
  const { TabPane } = Tabs;
  const onChange = (key) => {};

  return (
    <>
      <h4 className="Like__header">Danh sách đã thích</h4>
      <div className="Like__body">
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="Tất cả" key="1">
            <DividerCustom />
            <LikeAll />
          </TabPane>
          <TabPane tab="Studio" key="2">
            <DividerCustom />
            <LikeFilter />
          </TabPane>
          <TabPane tab="Nhiếp ảnh" key="3">
            <DividerCustom />
            <LikeFilter />
          </TabPane>
          <TabPane tab="Thiết bị" key="4">
            <DividerCustom />
            <LikeFilter />
          </TabPane>
          <TabPane tab="Trang phục" key="5">
            <DividerCustom />
            <LikeFilter />
          </TabPane>
          <TabPane tab="Make up" key="6">
            <DividerCustom />
            <LikeFilter />
          </TabPane>
          <TabPane tab="Người mẫu" key="7">
            <DividerCustom />
            <LikeFilter />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default Liked;
