import { Tabs } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getAllStudioLikedAction,
  getAllStudioLikedAction1,
} from "../../../../stores/actions/studioPostAction";
import ListItem from "../../../Home/ListCard";
import { DividerCustom } from "../OrderStatus/conponents/DividerCustom/DividerCustom";
import "./liked.scss";
const Liked = () => {
  const dispatch = useDispatch();
  const { TabPane } = Tabs;
  const onChange = (key) => {
    console.log(key);
    dispatch(getAllStudioLikedAction1(+key));
    dispatch(getAllStudioLikedAction(+key));
  };
  useEffect(() => {
    dispatch(getAllStudioLikedAction1(+1));
  });
  return (
    <>
      <h4 className="Like__header">Danh sách đã thích</h4>
      <div className="Like__body">
        <Tabs defaultActiveKey={1} onChange={onChange}>
          <TabPane tab="Studio" key={1}>
            <DividerCustom />
            <ListItem category={{ id: 1, name: "studio" }} />
          </TabPane>
          <TabPane tab="Nhiếp ảnh" key={2}>
            <DividerCustom />
            <ListItem category={{ id: 2, name: "photographer" }} />
          </TabPane>
          <TabPane tab="Thiết bị" key={5}>
            <DividerCustom />
            <ListItem category={{ id: 5, name: "device" }} />
          </TabPane>
          <TabPane tab="Trang phục" key={3}>
            <DividerCustom />
            <ListItem category={{ id: 3, name: "clothes" }} />
          </TabPane>
          <TabPane tab="Make up" key={4}>
            <DividerCustom />
            <ListItem category={{ id: 4, name: "makeup" }} />
          </TabPane>
          <TabPane tab="Người mẫu" key={6}>
            <DividerCustom />
            <ListItem category={{ id: 6, name: "model" }} />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default Liked;
