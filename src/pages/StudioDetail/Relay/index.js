import React from "react";
import classNames from "classnames/bind";
import { HIDE_MODAL } from "../../../stores/types/modalTypes";
import { useDispatch } from "react-redux";
// import styles from "./Report.module.scss"

// const cx = classNames.bind(styles)
export const Reply = () => {
  const dispatch = useDispatch();
  return (
    <>
    <div style={{ textAlign:"left"}}>
      
        <h4 style={{ fontSize: "20px", fontWeight: "700" }}>
          Cảm ơn bạn đã báo cáo{" "}
        </h4>
        <p
          style={{
            fontSize: "18px",
            color: "#616161",
            lineHeight: " 25px",
            fontWeight: "400",
          }}
        >
          Đăng thông tin sai sự thật là vi phạm Nguyên tắc cộng đồng của chúng
          tôi. Cảm ơn bạn đã giúp Booking Studio duy trì sự an toàn và uy tín.
        </p>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => dispatch({ type: HIDE_MODAL })}
            style={{
              padding: "14px 36px",
              background: "#E22828",
              borderRadius: "8px",
              color: "#fff",
              border: 0,
              cursor: "pointer",
            }}
          >
            Xong
          </button>
        </div>
    </div>
    </>
  );
};
