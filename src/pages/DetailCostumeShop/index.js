import { Rate, Row } from "antd";
import React from "react";
import "./detailCostumeShop.scss";

import ReadMore from "../../components/ReadMore";

import imgPost from "../../assets/dao/Frame 163.jpg";
import svgLocation from "../../assets/svg/location.svg";

const Index = () => {
  return (
    <div
      className=""
      style={{
        maxWidth: "1440px",
        margin: "auto",
        backgroundColor: "rgb(245, 245, 245)",
        padding: "2rem 0",
      }}
    >
      <div className="shop_container">
        <Row className="pt-38 pb-49 px-28 banner_container">
          <img src={imgPost} style={{ height: "280px" }} className="me-32" />
          <div>
            <div className="shop_name">Cho thuê trang phục FLUX</div>
            <div className="location">
              <img src={svgLocation} style={{ marginRight: "0.5rem" }} />
              Quận 1, TPHCM
            </div>
            <div className="d-flex align-items-center mb-20">
              <Rate disabled allowHalf defaultValue={4.5} className="rating" />
              <span>5</span>
              <div className="reserve ms-20">Đã đặt 60</div>
            </div>
            <ReadMore />
          </div>
        </Row>
      </div>
    </div>
  );
};

export default Index;
