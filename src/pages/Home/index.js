import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./home.module.scss";
import images from "../../assets/images";
import { ListItem } from "./ListCard";
import MetaDecorator from "../../components/MetaDecorator/MetaDecorator";
import logoImg from "../../../src/assets/img/Logo1.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getListByCategory,
  setCategory,
  setLinkTo,
} from "../../stores/actions/ListByCategoryAction";

const cx = classNames.bind(styles);

const LABELS = [
  {
    id: "studio",
    label: "Studio",
    img: images.studio1,
    linkTo: "studio",
  },
  {
    id: "nhiepanh",
    label: "Nhiếp ảnh",
    img: images.cameraman,
    linkTo: "photographer",
  },
  {
    id: "thietbi",
    label: "Thiết bị",
    img: images.camera,
    linkTo: "device",
  },
  {
    id: "trangphuc",
    label: "Trang phục",
    img: images.clothes,
    linkTo: "clothes",
  },
  {
    id: "makeup",
    label: "Make up",
    img: images.makeup,
    linkTo: "makeup",
  },
  {
    id: "nguoimau",
    label: "Người mẫu",
    img: images.model,
    linkTo: "model",
  },
];

export const Home = () => {
  const category = useSelector((state) => state.listByCategoryReducer.category);
  const linkTo = useSelector((state) => state.listByCategoryReducer.linkTo);
  const dispatch = useDispatch();
  const [active, setActive] = useState("studio");

  useEffect(() => {
    // dispatch(getListByCategory(LABELS[0].label));
    dispatch(setCategory(LABELS[0].label));
    dispatch(setLinkTo(LABELS[0].linkTo));
  }, []);
  return (
    <>
      {/* <GoogleDrivePicker />
      <OneDrivePicker /> */}
      <MetaDecorator
        title="Trang chủ Booking Studio"
        description="Chuyên cung cấp các loại dịch vụ"
        imgUrl={logoImg}
        type="article"
        imgAlt="Booking Studio"
      />
      <div className={cx("home")}>
        <div className={cx("filter")}>
          {LABELS.map((item) => (
            <div
              key={item.id}
              className={cx("box", `${active === item.id && "active"}`)}
              onClick={() => {
                setActive(item.id);
                dispatch(setCategory(item.id));
                dispatch(setLinkTo(item.linkTo));
              }}
            >
              <img src={item.img} alt="a" />
              <span>{item.label}</span>
            </div>
          ))}
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
              <img src={images.banner2} alt="" />
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
