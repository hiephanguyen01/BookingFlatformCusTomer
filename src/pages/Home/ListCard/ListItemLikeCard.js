import { Col, Pagination, Row } from "antd";
import classNames from "classnames/bind";
import React, { memo, useEffect, useState } from "react";
import { CardLiked } from "../../../components/Card/CardLiked";
// import { getAllStudioLikedAction1 } from "../../../stores/actions/studioPostAction";
import styles from "./ListCard.module.scss";
const cx = classNames.bind(styles);
const pageSize = 8;
const ListItemLikeCard = ({ data, category }) => {
  const [state, setState] = useState({
    values: [],
    totalPage: 0,
    current: 1,
    minIndex: 0,
    maxIndex: 0,
  });
  // const dispatch = useDispatch();
  const { values, current, minIndex, maxIndex } = state;

  useEffect(() => {
    setState({
      values: data,
      totalPage: data?.length / pageSize,
      minIndex: 0,
      maxIndex: pageSize,
    });
  }, [data]);

  const handleChange = (page) => {
    setState({
      ...state,
      current: page,
      minIndex: (page - 1) * pageSize,
      maxIndex: page * pageSize,
    });
  };
  return (
    <div className={cx("ListItem")}>
      <Row gutter={{ lg: [16, 16], md: [16, 16], sm: [16, 16], xs: [0, 0] }}>
        {values?.map((item, idx) => {
          return (
            idx >= minIndex &&
            idx < maxIndex && (
              <>
                <Col lg={6} md={6} sm={12} xs={24} key={idx}>
                  <CardLiked value={item} category={category} />
                </Col>
                <div
                  style={{ height: "10px", backgroundColor: "#f6f6f6" }}
                  className={cx("divider")}
                ></div>
              </>
            )
          );
        })}
      </Row>
      {/* </div> */}
      <Pagination
        pageSize={pageSize}
        current={current || 1}
        total={values?.length}
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
export default memo(ListItemLikeCard);
