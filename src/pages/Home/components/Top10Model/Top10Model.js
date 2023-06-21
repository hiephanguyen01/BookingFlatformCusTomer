import React, { memo, useEffect } from "react";
import "./Top10Model.scss";
import SlideCard from "../../../StudioDetail/SlideCard";
import { useDispatch, useSelector } from "react-redux";
import { getTop10OrderModelAction } from "../../../../stores/actions/TopOrderCategoryAction";

const Top10Model = () => {
  const { listOustandingModelPost } = useSelector(
    (state) => state.topOrderCategoryReducer
  );

  console.log("Top 10 model");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTop10OrderModelAction(6));
  }, [dispatch]);
  return (
    <div>
      <SlideCard
        data={listOustandingModelPost}
        category={{ name: "model", id: 6 }}
        title="Top 10 Most Models"
      />
    </div>
  );
};

export default memo(Top10Model);
