import React from "react";
import classNames from "classnames/bind";
import styles from "./ListCard.module.scss";
import { Card } from "../../../components/Card";
const cx = classNames.bind(styles);
export const ListItem = ({ title, data, navigate }) => {
  return (
    <div className={cx("ListItem")}>
      <div className={cx("title")}>
        <h3>{title}</h3>
        <a>Xem thêm</a>
      </div>
      <div className={cx("box-container")}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) => {
          return <Card key={idx} id={item} />;
        })}
      </div>
    </div>
  );
};
