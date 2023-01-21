import { CheckCircleOutlined } from "@ant-design/icons";
import { Divider, Rate } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { ImageDetect } from "../../../../../components/ImageDetect/ImageDetect";
import { convertTime } from "../../../../../utils/convert";
import { IMG } from "../../../../../utils/REACT_APP_DB_BASE_URL_IMG";
import "./RatingItm.scss";
export const RatingOther = ({ info }) => {
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);
  const Name = info.PhotographerPost
    ? info.PhotographerPost.Name
    : info.DevicePost
    ? info.DevicePost.Name
    : info.ModelPost
    ? info.ModelPost.Name
    : info.ClothesPost
    ? info.ClothesPost.Name
    : info.MakeupPost
    ? info.MakeupPost.Name
    : " ";
  const IMG_ME = info.PhotographerPost
    ? info.PhotographerPost.Image1
    : info.DevicePost
    ? info.DevicePost.Image1
    : info.ModelPost
    ? info.ModelPost.Image1
    : info.ClothesPost
    ? info.ClothesPost.Image1
    : info.MakeupPost
    ? info.MakeupPost.Image1
    : " ";
  const myImg = ImageDetect(UserMe);
  return (
    <div className="rating_wrapper">
      <div className="rating_wrapper__info-user">
        <div className="d-flex">
          <img
            src={myImg}
            className="rating_wrapper__info-user__avatar"
            alt=""
          />
          <div className="rating_wrapper__info-user__info ms-10">
            <span>{UserMe.Fullname}</span>
            <Rate disabled allowHalf value={info.Rate}></Rate>
          </div>
        </div>
        <span>{convertTime(info.CreationTime)}</span>
      </div>
      <div className="rating_wrapper__description">{info.Description}</div>
      <div className="rating_wrapper__list-images">
        {/* <li className="info-video">
          <img src="" alt="" />
          <PlayCircleOutlined className="play" />
        </li> */}
        {info.Image.map((img, index) => (
          <img
            src={`${
              img.includes("https://drive.google.com/") ? img : IMG(img)
            }`}
            alt=""
            key={index}
            className="rating_wrapper__list-images__itm"
          />
        ))}
      </div>
      <div className="rating_wrapper__room  text-medium-re">{Name}</div>
      {info.ReplyComment && (
        <div className="d-flex">
          <img
            src={IMG(IMG_ME)}
            className="rating_wrapper__info-user__avatar  me-15"
            alt=""
          />
          <div className="rating_wrapper__room__cmt_reply_container">
            <div>
              <div className="name_reply text-medium-se">
                <span>{Name}</span>
                <CheckCircleOutlined
                  className="w-14px h-14px"
                  style={{ color: "#03AC84" }}
                />
              </div>
              <div className="cmt_reply text-medium-re">
                {info.ReplyComment}
              </div>
            </div>
            <span>{convertTime(info.LastModificationTime)}</span>
          </div>
        </div>
      )}
      <Divider style={{ backgroundColor: "#E7E7E7" }} />
    </div>
  );
};
