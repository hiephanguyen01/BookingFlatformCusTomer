import React, { memo, useEffect } from "react";
import "./Top10Clothes.scss";
import SlideCard from "../../../StudioDetail/SlideCard";
import { useDispatch, useSelector } from "react-redux";
import { getTop10OrderClothesAction } from "../../../../stores/actions/TopOrderCategoryAction";

const Top10Clothes = () => {
  const { listOustandingClothesPost } = useSelector(
    (state) => state.topOrderCategoryReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTop10OrderClothesAction(3));
  }, [dispatch]);
  return (
    <div>
      <SlideCard
        data={listOustandingClothesPost}
        category={{ name: "clothes", id: 3 }}
        title="Top 10 Most Clothes"
      />
    </div>
  );
};

export default memo(Top10Clothes);
