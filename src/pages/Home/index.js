import React from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import classNames from "classnames/bind";
import styles from "./home.module.scss";
import images from "../../assets/images";
import { Card } from "../../components/Card";
import { ListItem } from "./ListCard";
import { BackTop } from "antd";
import { ArrowUpOutlined, VerticalAlignTopOutlined } from "@ant-design/icons";

const cx = classNames.bind(styles);

export const Home = () => {
  const style = {
    height: 40,
    width: 40,
    lineHeight: "40px",
    borderRadius: "50%",
    backgroundColor: "#E22828",
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  };
  return (
    <>
      <Header />
      <div className={cx("home")}>
        <div className={cx("filter")}>
          <div className={cx("box")}>
            <img src={images.instagram}   alt="a" />
            <span>Studio</span>
          </div>
          <div className={cx("box")}>
            <img src={images.instagram} alt="a" />
            <span>Nhiếp ảnh</span>
          </div>
          <div className={cx("box")}>
            <img src={images.instagram} alt="a" />
            <span>Thiết bị</span>
          </div>
          <div className={cx("box")}>
            <img src={images.instagram} alt="a" />
            <span>Trang phục</span>
          </div>
          <div className={cx("box")}>
            <img src={images.instagram} alt="a" />
            <span>Make up</span>
          </div>
          <div className={cx("box")}>
            <img src={images.instagram} alt="a" />
            <span>Người mẫu</span>
          </div>
        </div>
        <div className={cx("banner")}>
          <div className={cx("box-container")}>
            <div className={cx("box")}>
              <img src={images.banner1} />
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
                <p style={{ fontSize: "22px", color: "#616161", marginTop:"28px" }}>
                  Khi đăng ký trước 1 tháng{" "}
                </p>
              </div>
            </div>
            <div className={cx("box2", { box: "box" })}>
              <img src={images.banner2} />
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
      <BackTop>
        <ArrowUpOutlined style={style} />
      </BackTop>
      <Footer />
    </>
  );
};
