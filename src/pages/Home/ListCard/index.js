import { Col, Pagination, Row } from "antd";
import classNames from "classnames/bind";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../../components/Card";
import styles from "./ListCard.module.scss";
const cx = classNames.bind(styles);
const pageSize = 8;
const ListItem = ({ category }) => {
  const [state, setState] = useState({
    values: [],
    totalPage: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0,
  });
  const dispatch = useDispatch();
  const { listLikedUser } = useSelector((state) => state.studioPostReducer);
  const { values, current, minIndex, maxIndex } = state;

  useEffect(() => {
    setState({
      values: listLikedUser,
      totalPage: listLikedUser.length / pageSize,
      minIndex: 0,
      maxIndex: pageSize,
    });
  }, [listLikedUser]);
  const handleChange = (page) => {
    console.log(page);
    setState({
      ...state,
      current: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize,
    });
  };
  return (
    <div className={cx("ListItem")}>
      {/* <div className={cx("title")}>
        <h3>{title}</h3>
        <a>Xem thêm</a>
      </div> */}
      {/* <div className={cx("box-container")}> */}
      <Row gutter={[16, 16]}>
        {listLikedUser?.map((item, idx) => {
          return (
            idx >= minIndex &&
            idx < maxIndex && (
              <Col span={6}>
                <Card key={idx} value={item} category={category} />
              </Col>
            )
          );
        })}
      </Row>
      {/* </div> */}
      <Pagination
        pageSize={pageSize}
        current={current}
        total={values.length}
        onChange={handleChange}
        style={{
          paddingTop: "10px",
          background: "#f5f5f5",
          textAlign: "right",
        }}
      />
    </div>
  );
};
export default memo(ListItem);
