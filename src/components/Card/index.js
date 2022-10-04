import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Card.module.scss";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import images from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllStudioLikedAction1,
  getLikeStudioPostAction,
} from "../../stores/actions/studioPostAction";

const cx = classNames.bind(styles);

export const Card = ({ value, category }) => {
  const img =
    `${process.env.REACT_APP_DB_BASE_URL_IMG}/${
      value?.Image[0] || value?.Image
    }` || images.baby;
  const linkTo = useSelector((state) => state.listByCategoryReducer.linkTo);
  const { currentUser } = useSelector((state) => state.authenticateReducer);
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    listLikedCategory1,
    listLikedCategory2,
    listLikedCategory3,
    listLikedCategory4,
    listLikedCategory5,
    listLikedCategory6,
  } = useSelector((state) => state.studioPostReducer);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

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
    dispatch(getLikeStudioPostAction(value?.id, category.id));
  };
  const handleNavigate = () => {
    navigate(`/home/${category.name}/${value.id}`);
  };
  return (
    <div className={cx("card")} onClick={handleNavigate}>
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
        <div className="h-43px mb-8">
          <h5>{value?.Name}</h5>
        </div>
        <div className={cx("address")}>
          <img className={cx("icon-location")} alt="" src={images?.address} />
          <span>{value?.Address}</span>
        </div>
        <div className={cx("rate")}>
          <Rate disabled allowHalf value={3} />
          <span style={{ color: "828282", fontSize: "12px" }}>
            {value?.BookingCount} đã đặt
          </span>
        </div>
      </div>
    </div>
  );
};
