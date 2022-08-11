import { CloseOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import React from "react";
import { useDispatch } from "react-redux";
import { HIDE_MODAL } from "../../../stores/types/modalTypes";
import styles from "./Voucher.module.scss";

const cx = classNames.bind(styles);

export const Voucher = () => {
  const dispatch = useDispatch();
  return (
    <div style={{ position: "relative" }}>
      <h4 style={{ fontSize: "20px", fontWeight: "700", textAlign: "center" }}>
        Mã Khuyến Mãi
      </h4>
      <div
        onClick={() => dispatch({ type: HIDE_MODAL })}
        className={cx("close")}
      >
        <CloseOutlined style={{ fontSize: "22px" }} />
      </div>
      <div className={cx("list-voucher")}>
        <div className={cx("voucher")}>
          <p style={{ color: "#616161", fontSize: "14px", textAlign: "left" }}>
            WISTERIA2205
          </p>
          <div className={cx("content")}>
            <div className={cx("left")}>
              <h5>Giảm 200K cho đơn 2.500K </h5>
              <p>HSD: 20/09/2021</p>
            </div>
            <button>Lưu</button>
          </div>
        </div>
        <div className={cx("voucher")}>
          <p style={{ color: "#616161", fontSize: "14px", textAlign: "left" }}>
            WISTERIA2205
          </p>
          <div className={cx("content")}>
            <div className={cx("left")}>
              <h5>Giảm 200K cho đơn 2.500K </h5>
              <p>HSD: 20/09/2021</p>
            </div>
            <button className={cx("disable")}>Đã lưu</button>
          </div>
        </div>
        <div className={cx("voucher")}>
          <p style={{ color: "#616161", fontSize: "14px", textAlign: "left" }}>
            WISTERIA2205
          </p>
          <div className={cx("content")}>
            <div className={cx("left")}>
              <h5>Giảm 200K cho đơn 2.500K </h5>
              <p>HSD: 20/09/2021</p>
            </div>
            <button>Lưu</button>
          </div>
        </div>
        <div className={cx("voucher")}>
          <p style={{ color: "#616161", fontSize: "14px", textAlign: "left" }}>
            WISTERIA2205
          </p>
          <div className={cx("content")}>
            <div className={cx("left")}>
              <h5>Giảm 200K cho đơn 2.500K </h5>
              <p>HSD: 20/09/2021</p>
            </div>
            <button className={cx("disable")}>Đã lưu</button>
          </div>
        </div>
      </div>
    </div>
  );
};
