import React from "react";
import { useEffect, useState } from "react";
import { Rate, Pagination, Divider } from "antd";
import { userService } from "../../../../services/UserService";
import { UserMe } from "../../../../components/Chat/ChatBody/ChatContent/ChatContent";
import "./rating.scss";
const STAR_LIST = [
  { id: 0, label: "Tất cả" },
  { id: 5, label: "5" },
  { id: 4, label: "4" },
  { id: 3, label: "3" },
  { id: 2, label: "2" },
  { id: 1, label: "1" },
];
const Rating = () => {
  const [myRatings, setMyRatings] = useState([]);
  useEffect(() => {
    (async () => {
      //truyen id cua thang user vo
      const { data } = await userService.getListRatings(3);
      setMyRatings(data);
    })();
  }, []);
  const totalStart =
    (
      myRatings?.reduce((starTotal, star) => starTotal + star.Rate, 0) /
      myRatings.length
    ).toFixed(2) | 0;
  return (
    <>
      <h4 className="Rating__header">Đánh giá của tôi</h4>
      <div className="Rating__body">
        <h3>Đánh giá</h3>
        <div className="d-flex align-items-center ">
          <Rate
            allowHalf
            value={Number(totalStart)}
            style={{ fontSize: "10px" }}
            disabled
          ></Rate>
          <div className="pt-3  Rating__body__star">
            {totalStart} <span>({myRatings.length} đánh giá)</span>
          </div>
        </div>
        <Divider />
      </div>
    </>
  );
};

export default Rating;
