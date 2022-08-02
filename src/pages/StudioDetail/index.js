import React from "react";
import classNames from "classnames/bind";
import styles from "./Detail.module.scss";
import { HeartOutlined, MoreOutlined } from "@ant-design/icons";
import images from "../../assets/images";
import { Rate } from "antd";

const cx = classNames.bind(styles);

export const StudioDetail = () => {
  return (
    <div className={cx("studioDetail")}>
      <div className={cx("box1")}>
        <div className={cx("top")}>
          <div className={cx("title")}>
            <h3>Studio Wisteria chuyên cung cấp dịch vụ chụp hình cưới </h3>
          </div>
          <div className={cx("icons")}>
            <HeartOutlined className={cx("item")} />
            <MoreOutlined className={cx("item")} />
          </div>
        </div>
        <div className={cx("address")}>
          <img src={images.address} />
          <span>Quận 1, TPHCM</span>
        </div>
        <div className={cx("rate")}>
          <Rate allowHalf value={5}></Rate>
          <span>5</span>
          <span style={{ fontSize: "15px" }}>60 đã đặt </span>
        </div>
        <div className={cx("container")}>
          <div className={cx("item")}>
            <img src={images.detail1} />
          </div>
          <div className={cx("item")}>
            <img src={images.detail1} />
          </div>
          <div className={cx("item")}>
            <img src={images.detail1} />
          </div>
          <div className={cx("item")}>
            <img src={images.detail1} />
          </div>
          <div className={cx("item")}>
            <img src={images.detail1} />
          </div>
        </div>
      </div>
    </div>
  );
};
