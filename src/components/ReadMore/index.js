import React, { useState } from "react";
import styles from "./ReadMore.module.scss";
import classNames from "classnames/bind";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const cx = classNames.bind(styles);

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <div className={cx("text")}>
      <p> {isReadMore ? text?.slice(0, 530) : text}</p>
      {isReadMore && <div className={cx("bg")}></div>}
      <div onClick={toggleReadMore} className={cx("read-or-hide")}>
        {isReadMore ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              color: "#03AC84",
              width: "100%",
            }}
          >
            <div
              style={{
                textAlign: "center",
                backgroundColor: "transparent",
              }}
            >
              <span>Xem thêm</span>
              <DownOutlined style={{ fontSize: "10px" }} />
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              color: "#03AC84",
              width: "100%",
            }}
          >
            <div
              style={{
                textAlign: "center",
                backgroundColor: "transparent",
              }}
            >
              <span>Show less</span>
              <UpOutlined style={{ fontSize: "10px" }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Content = ({ data }) => {
  return (
    <div className={cx("container")}>
      {data?.length > 500 ? <ReadMore>{data}</ReadMore> : data}
    </div>
  );
};

export default Content;
