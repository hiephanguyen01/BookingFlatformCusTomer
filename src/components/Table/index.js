import React from "react";
import { Col, Dropdown, Row, Space } from "antd";

import "./table.scss";

const Index = ({ column, row = [], className, style }) => {
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
