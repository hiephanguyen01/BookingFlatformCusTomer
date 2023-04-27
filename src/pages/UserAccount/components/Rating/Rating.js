import React, { useEffect, useState } from "react";
import CommentRating from "../../../../components/CommentRating";
import { userService } from "../../../../services/UserService";
// import { RatingOther } from "./components/RatingOther";
// import { RatingStudio } from "./components/RatingStudio";
import "./rating.scss";
const Rating = () => {
  const [myRatings, setMyRatings] = useState([]);
  // const [chooseRating, setChooseRating] = useState(5);
  useEffect(() => {
    (async () => {
      //truyen id cua thang user vo
      const { data } = await userService.getListRatings();
      setMyRatings(data);
    })();
  }, []);

  return (
    <>
      <CommentRating
        data={{ rating: myRatings }}
        isPerional={true}
        className="mb-43 mt-12"
      />
    </>
  );
};

export default Rating;
