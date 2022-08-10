import React from "react";
import { Col, Dropdown, Row, Space } from "antd";
import {
  CheckCircleOutlined,
  DownOutlined,
  HeartOutlined,
  MoreOutlined,
  RightOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import "./table.scss";

import svgLocation from "../../assets/svg/location.svg";
import imgPost from "../../assets/dao/Frame 163.jpg";
// import ImagePost from "../../components/imagePost/ImagePost";

// const COLUMN = [
//   { title: "Loại sản phẩm", size: 5 },
//   { title: "Size", size: 4 },
//   { title: "Màu sắc", size: 4 },
//   { title: "Số lượng", size: 3 },
//   { title: "Đơn giá cho thuê", size: 4 },
//   { title: "Chọn sản phẩm", size: 4 },
// ];

// const dataSource = [
//   {
//     title: "cho thue vay cuoi",
//     size: 10,
//     color: "red",
//     amount: 10,
//     hire: "10 gio",
//     choose: "true",
//   },
// ];

// const ROW = (dataSource) =>
//   dataSource.map((data, index) => [
//     {
//       render: () => (
//         <>
//           <img src={imgPost} style={{ width: "100%", marginBottom: "20px" }} />
//           <div className="text-medium-se">{data.title}</div>
//         </>
//       ),
//     },
//     { title: "Size", render: () => <>{data.size}</> },
//     { title: "Màu sắc", render: () => <>{data.color}</> },
//     { title: "Số lượng", render: () => <>{data.amount}</> },
//     { title: "Đơn giá cho thuê", render: () => <>{data.hire}</> },
//     { title: "Chọn sản phẩm", render: () => <>{data.choose}</> },
//   ]);
const Index = ({ column, row, className, style }) => {
  return (
    <div className={`w-100 table ${className}`} style={{ ...style }}>
      <Row>
        <div
          className="px-24 py-22 mb-12 w-100"
          style={{
            backgroundColor: "#ffffff",
          }}
        >
          <Row className="table-header">
            {column.map((item, index) => (
              <Col key={index} span={item.size} className="table-header-col">
                {item.title}
              </Col>
            ))}
          </Row>
          {row.map((item, index) => (
            <Row className="table-row">
              {item.map((data, index) => (
                <>
                  {index === 0 && (
                    <Col span={column[index].size} className="table-col-first">
                      {data.render()}
                    </Col>
                  )}
                  {index > 0 && index < column.length - 1 && (
                    <Col span={column[index].size} className="table-col">
                      {data.render()}
                    </Col>
                  )}
                  {index === column.length - 1 && (
                    <Col span={column[index].size} className="table-col-last">
                      {data.render()}
                    </Col>
                  )}
                </>
              ))}
            </Row>
          ))}
        </div>
      </Row>
    </div>
  );
};

export default Index;
