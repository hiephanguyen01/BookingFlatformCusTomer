import React, { memo, useEffect } from "react";
import "./Top10Device.scss";
import SlideCard from "../../../StudioDetail/SlideCard";
import { useDispatch, useSelector } from "react-redux";
import {
  getTop10OrderDeviceAction,
  getTop10OrderStudioPostAction,
} from "../../../../stores/actions/TopOrderCategoryAction";

const Top10Device = () => {
  const { listOustandingDevicePost } = useSelector(
    (state) => state.topOrderCategoryReducer
  );

  console.log("Top 10 device");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTop10OrderDeviceAction(5));
  }, [dispatch]);
  return (
    <div>
      <SlideCard
        data={listOustandingDevicePost}
        category={{ name: "device", id: 5 }}
        title="Top 10 Most Devices"
      />
    </div>
  );
};

export default memo(Top10Device);
