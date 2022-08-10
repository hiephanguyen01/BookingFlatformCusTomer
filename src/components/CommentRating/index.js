import React from "react";
import { Rate, Pagination } from "antd";
import {
  CheckCircleOutlined,
  PlayCircleOutlined,
  StarFilled,
} from "@ant-design/icons";

import "./commentRating.scss";

import images from "../../assets/images";
import imgCmt from "../../assets/images/deviceImg.png";

const Index = ({ data, activeId, setActiveId, className }) => {
  return (
    <div className={`rating ${className}`}>
      <h3>Đánh giá</h3>
      <div className="rate d-flex align-items-center">
        <Rate allowHalf value={5} style={{ fontSize: "10px" }}></Rate>
        <div className="pt-3 ps-5">5 ( 30 đánh giá)</div>
      </div>
      <div className="listRates">
        {/* <div className={cx("active")}>
          <span>5</span>
          <StarFilled style={{ color: "#F8D93A" }} />
          <span>(24)</span>
        </div> */}
        {data
          .sort((a, b) => b.id - a.id)
          .map((item) => {
            return (
              <div
                onClick={() => setActiveId(item.id)}
                key={item.id}
                className={`${activeId === item.id ? "active" : ""}`}
              >
                <span>{item.id}</span>
                <StarFilled style={{ color: "#F8D93A" }} />
                <span>(24)</span>
              </div>
            );
          })}
      </div>
      <div className="descriptionRate">
        <div className="info-user">
          <div className="d-flex">
            <div className="w-36px h-36px">
              <img src={images.banner2} className="img_avatar" />
            </div>
            <div className="info ms-10">
              <h3>Mai Anh</h3>
              <Rate allowHalf value={5}></Rate>
            </div>
          </div>
          <span>1 tuần trước</span>
        </div>
        <div className="description">
          Studio rất đẹp, phục vụ nhiệt tình. Giá cả cũng hợp lý. Mình và chồng
          đều hài lòng. Chỉ có điều vị trí hơi khó tìm một chút, vì studio nằm
          trong hẻm khá sâu nên hơi khó tìm. Còn lại mọi thứ đều ổn.
        </div>
        <ul className="listImages">
          <li className="item-video">
            <img src={imgCmt} />
            <PlayCircleOutlined className="play" />
          </li>
          <li className="item-image">
            <img src={imgCmt} />
          </li>
          <li className="item-image">
            <img src={imgCmt} />
          </li>
        </ul>
        <div
          className="mt-16 mb-25 text-medium-re"
          style={{ color: "#828282" }}
        >
          Phòng : Wisteria Premium{" "}
        </div>
        <div className="d-flex">
          <div className="w-28px h-28px me-15">
            <img src={images.banner2} className="img_avatar" />
          </div>
          <div className="py-6 px-15 d-flex justify-content-between w-100 cmt_reply_container">
            <div>
              <div className="name_reply text-medium-se">
                Wisteria Studio{" "}
                <CheckCircleOutlined
                  className="w-14px h-14px"
                  style={{ color: "#03AC84" }}
                />
              </div>
              <div className="cmt_reply text-medium-re">
                Cảm ơn bạn vì đã tin tưởng và ủng hộ Studio Wisteria
              </div>
            </div>
            <span>1 tuần trước</span>
          </div>
        </div>
      </div>

      <div className="pagination-ds">
        <Pagination className="pagination-ds" defaultCurrent={1} total={50} />
      </div>
    </div>
  );
};

export default Index;
