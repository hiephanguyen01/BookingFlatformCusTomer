import React, { memo, useEffect } from "react";
import "./Top10Photographer.scss";
import SlideCard from "../../../StudioDetail/SlideCard";
import { useDispatch, useSelector } from "react-redux";
import { getTop10OrderPhotographerAction } from "../../../../stores/actions/TopOrderCategoryAction";

const Top10Photographer = () => {
  const { listOustandingPhotographerPost } = useSelector(
    (state) => state.topOrderCategoryReducer
  );

  console.log("Top 10 photographer");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTop10OrderPhotographerAction(2));
  }, [dispatch]);
  return (
    <div>
      <SlideCard
        category={{ name: "makeup", id: 4 }}
        data={listOustandingPhotographerPost}
        title="Top 10 Most Photographers"
      />
    </div>
  );
};

export default memo(Top10Photographer);
