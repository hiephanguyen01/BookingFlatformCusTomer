import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Card.module.scss";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import { useNavigate } from "react-router-dom";
import images from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { getLikeStudioPostAction } from "../../stores/actions/studioPostAction";

const cx = classNames.bind(styles);

export const Card = ({ value, category }) => {
  const img =
    `${process.env.REACT_APP_DB_BASE_URL_IMG}/${
      value?.Image[0] || value?.Image
    }` || images.baby;
  const linkTo = useSelector((state) => state.listByCategoryReducer.linkTo);
  const { currentUser } = useSelector((state) => state.authenticateReducer);
  const {
    listLikedCategory1,
    listLikedCategory2,
    listLikedCategory3,
    listLikedCategory4,
    listLikedCategory5,
    listLikedCategory6,
  } = useSelector((state) => state.studioPostReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const [data, setData] = useState([]);
  let dataCard = [];
  useEffect(() => {
    switch (category?.id) {
      case 1:
        setData(listLikedCategory1);
        break;
      case 2:
        setData(listLikedCategory2);
        break;
      case 3:
        setData(listLikedCategory3);
        break;
      case 4:
        setData(listLikedCategory4);
        break;
      case 5:
        setData(listLikedCategory5);
        break;
      case 6:
        setData(listLikedCategory6);
        break;
      default:
        break;
    }
  }, [
    category?.id,
    listLikedCategory1,
    listLikedCategory2,
    listLikedCategory3,
    listLikedCategory4,
    listLikedCategory5,
    listLikedCategory6,
  ]);
  const handleChangeLike = (e) => {
    e.stopPropagation();
    if (!currentUser) navigate("/auth/sign-in");
    dispatch(getLikeStudioPostAction(value.id, category.id, setLike, like));
  };
  return (
    <div
      className={cx("card")}
      onClick={() => navigate(`${category.name}/${value.id}`)}
    >
      <div className={cx("image")}>
        <img className={cx("thumbnail")} alt="" src={img} />
      </div>

      <div onClick={handleChangeLike} className={cx("like")}>
        {data?.findIndex((item) => item.id === value.id) > -1 ? (
          <HeartFilled style={{ color: "red", fontSize: "20px" }} />
        ) : (
          <HeartOutlined style={{ color: "red", fontSize: "20px" }} />
        )}
      </div>
      <div className={cx("content")}>
        <h5>{value?.Name || "Studio Mizo Misaki với concept tối giản"}</h5>
        <div className={cx("address")}>
          <img className={cx("icon-location")} alt="" src={images?.address} />
          <span>{value?.Address || "Quận 1, TPHCM"}</span>
        </div>
        <div className={cx("rate")}>
          <Rate disabled allowHalf value={3} />
          <span style={{ color: "828282", fontSize: "12px" }}>
            {value?.BookingCount || "60"} đã đặt
          </span>
        </div>
      </div>
    </div>
  );
};
