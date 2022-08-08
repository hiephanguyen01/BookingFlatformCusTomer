import { Col, Row } from "antd";
import React from "react";
import "./imagePost.scss";
import imgPost from "../../../../assets/dao/Frame 163.jpg";

const ImagePost = () => {
  return (
    <Row style={{ height: "100%" }}>
      <Col span={12} style={{ paddingRight: "0.5rem", height: "100%" }}>
        <img
          src={imgPost}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Col>
      <Col span={12} style={{ paddingLeft: "0.5rem", height: "100%" }}>
        <Row style={{ height: "50%", paddingBottom: "0.25rem" }}>
          <Col span={12} style={{ paddingRight: "0.25rem", height: "100%" }}>
            <img
              src={imgPost}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Col>
          <Col span={12} style={{ paddingLeft: "0.25rem", height: "100%" }}>
            <img
              src={imgPost}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Col>
        </Row>
        <Row style={{ height: "50%", paddingTop: "0.25rem" }}>
          <Col span={12} style={{ paddingRight: "0.25rem", height: "100%" }}>
            <img
              src={imgPost}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Col>
          <Col
            span={12}
            style={{
              paddingLeft: "0.25rem",
              position: "relative",
              height: "100%",
            }}
          >
            <img
              src={imgPost}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                position: "absolute",
                width: "calc(100% - 0.25rem)",
                height: "100%",
                top: "0",
                left: "0.25rem",
                background:
                  "linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4))",
                color: "#ffffff",
                fontWeight: "700",
                fontSize: "28px",
                lineHeight: "38px",
              }}
            >
              +3
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ImagePost;
