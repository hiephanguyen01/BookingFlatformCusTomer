import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import images from "../../assets/images";
import PopUpSignIn from "../../pages/Auth/PopUpSignIn/PopUpSignIn";
import { studioPostService } from "../../services/StudioPostService";
import { getAllStudioLikedAction } from "../../stores/actions/studioPostAction";
import { IMG } from "../../utils/REACT_APP_DB_BASE_URL_IMG";
import styles from "./Card.module.scss";

const cx = classNames.bind(styles);

export const CardLiked = ({ value, category }) => {
  const img = IMG(value?.Image[0] || value?.Image) || images.baby;
  const { currentUser } = useSelector((state) => state.authenticateReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChangeLike = async (e) => {
    if (!currentUser) navigate("/auth/sign-in");
    if (currentUser) {
      // dispatch(getLikeStudioPostAction(data?.id, data?.category));
      await studioPostService.getLikeStudioPost({
        PostId: value?.id,
        CategoryId: value?.category || category,
      });
      dispatch(getAllStudioLikedAction());
    }
  };
  const handleNavigate = () => {
    navigate(`/home/${category?.name}/${value?.id}`);
  };
  return (
    <div className={cx("card")} onClick={handleNavigate}>
      <div className={cx("image")}>
        <img className={cx("thumbnail")} alt="" src={img} />
      </div>

      <PopUpSignIn
        onClick={(e) => {
          e.stopPropagation();
          handleChangeLike();
        }}
      >
        <div className={cx("like")}>
          <HeartFilled style={{ color: "red", fontSize: "20px" }} />
        </div>
      </PopUpSignIn>
      <div className={cx("content")}>
        <div className="h-43px mb-8">
          <h5>{value?.Name}</h5>
        </div>
        <div className={cx("address")}>
          <img className={cx("icon-location")} alt="" src={images?.address} />
          <span>{value?.Address}</span>
        </div>
        <div className={cx("rate")}>
          <Rate disabled allowHalf value={value?.TotalRate || 5} />
          <span style={{ color: "828282", fontSize: "12px" }}>
            {value?.BookingCount} đã đặt
          </span>
        </div>
      </div>
    </div>
  );
};
