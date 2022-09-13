import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Card.module.scss";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import images from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);
export const Card = ({ id }) => {
  const linkTo = useSelector((state) => state.listByCategoryReducer.linkTo);
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const handleChangeLike = (e) => {
    e.stopPropagation();
    setLike(!like);
  };
  return (
    <div className={cx("card")} onClick={() => navigate(`${linkTo}/${id}`)}>
      <div className={cx("image")}>
        <img className={cx("thumbnail")} src={images.baby} />
      </div>

      <div onClick={handleChangeLike} className={cx("like")}>
        {like ? (
          <HeartFilled style={{ color: "red", fontSize: "20px" }} />
        ) : (
          <HeartOutlined style={{ color: "red", fontSize: "20px" }} />
        )}
      </div>
      <div className={cx("content")}>
        <h5>Studio Mizo Misaki với concept tối giản</h5>
        <div className={cx("address")}>
          <img className={cx("icon-location")} src={images.address} />
          <span>Quận 1, TPHCM</span>
        </div>
        <div className={cx("rate")}>
          <Rate allowHalf value={3} />
          <span style={{ color: "828282", fontSize: "12px" }}>60 đã đặt </span>
        </div>
      </div>
    </div>
  );
};
