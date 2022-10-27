import React, { useEffect, useState } from "react";
import CommentRating from "../../../../components/CommentRating";
import { userService } from "../../../../services/UserService";
import { RatingOther } from "./components/RatingOther";
import { RatingStudio } from "./components/RatingStudio";
import "./rating.scss";
const STAR_LIST = [
  { id: 5, label: "5" },
  { id: 4, label: "4" },
  { id: 3, label: "3" },
  { id: 2, label: "2" },
  { id: 1, label: "1" },
];
const Rating = () => {
  const [myRatings, setMyRatings] = useState([]);
  const [chooseRating, setChooseRating] = useState(5);
  useEffect(() => {
    (async () => {
      //truyen id cua thang user vo
      const { data } = await userService.getListRatings();
      console.log(data);
      setMyRatings(data);
    })();
  }, []);
  const totalStart =
    (
      myRatings?.reduce((starTotal, star) => starTotal + star.Rate, 0) /
      myRatings.length
    ).toFixed(2) | 0;
  const handleStar = () => {
    let rating = [...myRatings];
    const filterRate = rating.filter((itm) => itm.Rate === chooseRating);
    return filterRate.map((itm, index) => {
      if (itm.StudioPostId !== undefined) {
        return <RatingStudio key={index} info={itm} />;
      } else {
        return <RatingOther key={index} info={itm} />;
      }
    });
  };

  return (
    <>
      {/* <h4 className="Rating__header">Đánh giá của tôi</h4>
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
        <div className="Rating__body__list-rate">
          {STAR_LIST.map((star) => {
            return (
              <div
                onClick={() => setChooseRating(star.id)}
                key={star.id}
                className={`Rating__body__list-rate__rate_item ${
                  chooseRating === star.id
                    ? "Rating__body__list-rate__rate_item__active"
                    : ""
                }`}
              >
                <span>{star.label}</span>
                <StarFilled style={{ color: "#F8D93A" }} />
                <span>
                  {star.id === 0
                    ? `(${myRatings.length})`
                    : `(${
                        myRatings?.filter((d) => d.Rate === star.id).length
                      })`}
                </span>
              </div>
            );
          })}
        </div>
        <Divider />
        {handleStar()}
      </div>
    </> */}
      <CommentRating data={{ rating: myRatings }} className="mb-43 mt-12" />
    </>
  );
};

export default Rating;
