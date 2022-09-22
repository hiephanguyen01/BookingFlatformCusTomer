import { Divider, Rate } from "antd";
import React from "react";
import { REACT_APP_DB_BASE_URL_IMG } from "../../../../../utils/REACT_APP_DB_BASE_URL_IMG";
import { convertTime } from "../../../../../utils/convert";
import "./RatingItm.scss";
import { CheckCircleOutlined } from "@ant-design/icons";
import { UserMe } from "../../../../../components/Chat/ChatBody/ChatContent/ChatContent";
export const RatingStudio = ({ info }) => {
  console.log(info);
  return (
    <div className="rating_wrapper">
      <div className="rating_wrapper__info-user">
        <div className="d-flex">
          <img
            src={`${REACT_APP_DB_BASE_URL_IMG}/${UserMe.Image}`}
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
              img.includes("https://drive.google.com/")
                ? img
                : REACT_APP_DB_BASE_URL_IMG + "/" + img
            }`}
            alt=""
            key={index}
            className="rating_wrapper__list-images__itm"
          />
        ))}
      </div>
      <div className="rating_wrapper__room  text-medium-re">
        Phòng : {info.StudioPostId}
        {/* cái này để v thôi chứ lấy tên phòng ms đúng nha */}
      </div>
      {info.ReplyComment && (
        <div className="d-flex">
          <img
            src={`${REACT_APP_DB_BASE_URL_IMG}/${info.StudioPost.Image1}`}
            className="rating_wrapper__info-user__avatar  me-15"
            alt=""
          />
          <div className="rating_wrapper__room__cmt_reply_container">
            <div>
              <div className="name_reply text-medium-se">
                <span>{info.StudioPost.Name}</span>
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
