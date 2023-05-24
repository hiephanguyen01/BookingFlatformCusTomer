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

export const Card = ({ value, category }) => {
  const [newData, setNewData] = useState();
  const img = IMG(value?.Image[0] || value?.Image) || images.baby;
  const { currentUser } = useSelector((state) => state.authenticateReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    setNewData({ ...value });
  }, [value]);

  const navigate = useNavigate();
  // useEffect(() => {
  //   switch (category?.id) {
  //     case 1:
  //       setData(listLikedCategory1);
  //       break;
  //     case 2:
  //       setData(listLikedCategory2);
  //       break;
  //     case 3:
  //       setData(listLikedCategory3);
  //       break;
  //     case 4:
  //       setData(listLikedCategory4);
  //       break;
  //     case 5:
  //       setData(listLikedCategory5);
  //       break;
  //     case 6:
  //       setData(listLikedCategory6);
  //       break;
  //     default:
  //       break;
  //   }
  // }, [
  //   category?.id,
  //   listLikedCategory1,
  //   listLikedCategory2,
  //   listLikedCategory3,
  //   listLikedCategory4,
  //   listLikedCategory5,
  //   listLikedCategory6,
  // ]);

  const handleChangeLike = async (e) => {
    // e.stopPropagation();
    if (!currentUser) navigate("/auth/sign-in");
    // dispatch(getLikeStudioPostAction(value?.id, category.id));
    if (currentUser) {
      // dispatch(getLikeStudioPostAction(data?.id, data?.category));
      const res = await studioPostService.getLikeStudioPost({
        PostId: value?.id,
        CategoryId: value?.category || category?.id,
      });
      setNewData(res.data.data);
      dispatch(getAllStudioLikedAction());
    }
  };
  const handleNavigate = () => {
    navigate(`/home/${category?.name}/${value.id}`);
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
          {newData?.UsersLiked?.some(
            (item) => item.UserId === currentUser?.id
          ) ? (
            <HeartFilled style={{ color: "red", fontSize: "20px" }} />
          ) : (
            <HeartOutlined style={{ color: "red", fontSize: "20px" }} />
          )}
        </div>
      </PopUpSignIn>
      <div className={cx("content")}>
        <div className="mb-8">
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
