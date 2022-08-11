import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./home.module.scss";
import images from "../../assets/images";
import { ListItem } from "./ListCard";
import { StudioDetail } from "../StudioDetail";

const cx = classNames.bind(styles);

export const Home = () => {
  return (
    <>
      
    
      <div className={cx("home")}>
        <div className={cx("filter")}>
          <div className={cx("box")}>
            <Link to="#">
              <img src={images.studio1} alt="a" />
              <span>Studio</span>
            </Link>
          </div>
          <div className={cx("box")}>
            <img src={images.cameraman} alt="a" />
            <span>Nhiếp ảnh</span>
          </div>
          <div className={cx("box")}>
            <Link to="/home/deviceDetails">
              <img src={images.camera} alt="a" />
              <span>Thiết bị</span>
            </Link>
          </div>
          <div className={cx("box")}>
            <Link to="/home/costumeDetails">
              <img src={images.clothes} alt="a" />
              <span>Trang phục</span>
            </Link>
          </div>
          <div className={cx("box")}>
            <Link to="/home/makeupDetails">
              <img src={images.makeup} alt="a" />
              <span>Make up</span>
            </Link>
          </div>
          <div className={cx("box")}>
            <Link to="/home/modelDetails">
              <img src={images.model} alt="a" />
              <span>Người mẫu</span>
            </Link>
          </div>
        </div>
        <div className={cx("banner")}>
          <div className={cx("box-container")}>
            <div className={cx("box")}>
              <img src={images.banner1} alt="sa" />
              <div className={cx("content")}>
                <h3
                  style={{
                    fontSize: "26px",
                    color: "#616161",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  ART STUDIO{" "}
                </h3>
                <img src={images.special} />
                <h5
                  style={{
                    fontSize: "30px",
                    color: "#E22828",
                    fontWeight: "600",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  -1.000.000 vnd{" "}
                </h5>
                <p
                  style={{
                    fontSize: "22px",
                    color: "#616161",
                    marginTop: "28px",
                  }}
                >
                  Khi đăng ký trước 1 tháng{" "}
                </p>
              </div>
            </div>
            <div className={cx("box2", { box: "box" })}>
              <img src={images.banner2} alt="sasa" />
              <div className={cx("content")}>
                <h4>CITI’ S BEST </h4>
                <h4 style={{ color: "#E22828" }}>PROFESSIONAL </h4>
                <h4>PHOTOGRAPHY</h4>
                <h4>STUDIO</h4>
              </div>
            </div>
          </div>
        </div>

        <ListItem title="Được đặt nhiều nhất" />
        <ListItem title="Đã xem gần đây" />
      </div>
    </>
  );
};
