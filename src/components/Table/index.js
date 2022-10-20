import React, { useEffect, useState } from "react";
import { Col, Pagination, Row } from "antd";

import "./table.scss";
import SelectTimeOptionService from "../SelectTimeOptionService/SelectTimeOptionService";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

const Index = ({ column, row = [], className = "", style, service }) => {
  const { loadingService, pagination } = useSelector(
    (state) => state.studioPostReducer
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [rows, setRows] = useState([...row]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setRows([...row.slice((currentPage - 1) * 5, currentPage * 5)]);
    setLoading(false);
  }, [currentPage]);
  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [loadingService]);
  console.log("service", service);
  return (
    <div className={`w-100 table ${className}`} style={{ ...style }}>
      <Row>
        <div
          className="px-24 py-22 mb-12 w-100"
          style={{
            backgroundColor: "#ffffff",
          }}
        >
          <SelectTimeOptionService service={service} />
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
              {rows.map((item, index) => (
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
                  total={Math.round((row.length / 5) * 10)}
                  onChange={(page) => {
                    setCurrentPage(page);
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
