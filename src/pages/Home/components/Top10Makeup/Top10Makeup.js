import React, { memo, useEffect } from "react";
import "./Top10Makeup.scss";
import SlideCard from "../../../StudioDetail/SlideCard";
import { useDispatch, useSelector } from "react-redux";
import { getTop10OrderMakeupAction } from "../../../../stores/actions/TopOrderCategoryAction";

const Top10Studio = () => {
  const { listOustandingMakeupPost } = useSelector(
    (state) => state.topOrderCategoryReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTop10OrderMakeupAction(4));
  }, [dispatch]);
  return (
    <div>
      <SlideCard
        category={{ name: "makeup", id: 4 }}
        data={listOustandingMakeupPost}
        title="Top 10 Most Makeups"
      />
    </div>
  );
};

export default memo(Top10Studio);
