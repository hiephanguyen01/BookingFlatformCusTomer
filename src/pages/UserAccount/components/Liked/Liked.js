import { Tabs } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudioLikedAction } from "../../../../stores/actions/studioPostAction";
import ListItemLikeCard from "../../../Home/ListCard/ListItemLikeCard";
import { DividerCustom } from "../OrderStatus/conponents/DividerCustom/DividerCustom";
import "./liked.scss";
const Liked = () => {
  const dispatch = useDispatch();
  const { TabPane } = Tabs;
  // const onChange = (key) => {
  //   dispatch(getAllStudioLikedAction1(+key));
  //   dispatch(getAllStudioLikedAction(+key));
  // };
  useEffect(() => {
    dispatch(getAllStudioLikedAction(1));
    // dispatch(getAllStudioLikedAction1(1));
  }, [dispatch]);
  const { listLikedUser } = useSelector((state) => state.studioPostReducer);
  return (
    <>
      <h4 className="Like__header">Danh sách đã thích</h4>
      <div className="Like__body">
        <Tabs defaultValue={1}>
          <TabPane tab="Studio" key={1}>
            <DividerCustom />
            <ListItemLikeCard data={listLikedUser?.studio} category={1} />
          </TabPane>
          <TabPane tab="Nhiếp ảnh" key={2}>
            <DividerCustom />
            <ListItemLikeCard
              data={listLikedUser?.photographers}
              category={2}
            />
          </TabPane>
          <TabPane tab="Thiết bị" key={5}>
            <DividerCustom />
            <ListItemLikeCard data={listLikedUser?.devices} category={5} />
          </TabPane>
          <TabPane tab="Trang phục" key={3}>
            <DividerCustom />
            <ListItemLikeCard data={listLikedUser?.clothes} category={3} />
          </TabPane>
          <TabPane tab="Make up" key={4}>
            <DividerCustom />
            <ListItemLikeCard data={listLikedUser?.makeups} category={4} />
          </TabPane>
          <TabPane tab="Người mẫu" key={6}>
            <DividerCustom />
            <ListItemLikeCard data={listLikedUser?.models} category={6} />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default Liked;
