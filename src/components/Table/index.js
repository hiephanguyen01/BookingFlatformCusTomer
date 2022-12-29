import React, { useEffect, useState } from "react";
import { Col, Pagination, Row } from "antd";

import "./table.scss";
import { useSelector } from "react-redux";
import { ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { useRef } from "react";

const Index = ({ column, row = [], rowNumber = 5, className = "", style }) => {
  const { filterService } = useSelector((state) => state.studioPostReducer);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  useEffect(() => {}, [filterService]);

  const handleChangePageCurrent = (page) => {
    setLoading(true);
    setCurrentPage(page);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    ref.current.scrollIntoView();
  };

  return (
    <div className={`w-100 table ${className}`} style={{ ...style }} ref={ref}>
      <Row>
        <div
          className="px-24 py-22 mb-12 w-100"
          style={{
            backgroundColor: "#ffffff",
          }}
        >
          {/* <SelectTimeOptionService service={service} /> */}

          <div className="warning-choose-time">
            <ExclamationCircleOutlined className="me-5" />
            Chọn khung giờ bạn muốn đặt để xem giá cho từng loại dịch vụ
          </div>

          <Row className="table-header">
            {column.map((item, index) => (
              <Col key={index} span={item.size} className="table-header-col">
                {item.title}
              </Col>
            ))}
          </Row>
          {loading ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  background: "white",
                  width: "fit-content",
                  borderRadius: "50%",
                  padding: "10px",
                  margin: "10px",
                }}
              >
                <LoadingOutlined style={{ fontSize: "40px" }} />
              </div>
            </div>
          ) : (
            <>
              {row
                .slice((currentPage - 1) * rowNumber, currentPage * rowNumber)
                .map((item, index) => (
                  <Row className="table-row">
                    {item.map((data, index) => (
                      <>
                        {index === 0 && (
                          <Col
                            span={column[index].size}
                            className="table-col-first"
                          >
                            {data.render()}
                          </Col>
                        )}
                        {index > 0 && index < column.length - 1 && (
                          <Col span={column[index].size} className="table-col">
                            {data.render()}
                          </Col>
                        )}
                        {index === column.length - 1 && (
                          <Col
                            span={column[index].size}
                            className="table-col-last"
                          >
                            {data.render()}
                          </Col>
                        )}
                      </>
                    ))}
                  </Row>
                ))}
              <Row className="pagination mt-15">
                <Pagination
                  defaultCurrent={1}
                  current={currentPage}
                  total={Math.round((row.length / rowNumber) * 10)}
                  onChange={(page) => {
                    handleChangePageCurrent(page);
                  }}
                />
              </Row>
            </>
          )}
        </div>
      </Row>
    </div>
  );
};

export default Index;
