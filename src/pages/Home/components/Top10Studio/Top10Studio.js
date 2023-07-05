import React, { memo, useEffect } from "react";
import "./Top10Studio.scss";
import SlideCard from "../../../StudioDetail/SlideCard";
import { useDispatch, useSelector } from "react-redux";
import { getTop10OrderStudioPostAction } from "../../../../stores/actions/TopOrderCategoryAction";

const Top10Studio = () => {
  const { listOustandingStudioPost } = useSelector(
    (state) => state.topOrderCategoryReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTop10OrderStudioPostAction(1));
    return () => {};
  }, [dispatch]);
  return (
    <div>
      <SlideCard
        category={{ name: "studio", id: 1 }}
        data={listOustandingStudioPost}
        title="Top 10 Most Booked Studios"
      />
    </div>
  );
};

export default memo(Top10Studio);
