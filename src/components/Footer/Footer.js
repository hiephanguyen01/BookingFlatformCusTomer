import { Col, Row } from "antd";
import { ReactComponent as BCTVN } from "../../assets/footer/bctvn.svg";
import { ReactComponent as Enter } from "../../assets/footer/enterprise.svg";
import { ReactComponent as Facebook } from "../../assets/footer/facebook.svg";
import Android from "../../assets/footer/google-play-badge.png";
import { ReactComponent as Insta } from "../../assets/footer/instagram.svg";
import Ios from "../../assets/footer/ios.svg";
import { ReactComponent as LinkedIn } from "../../assets/footer/linkedin.svg";
import Logo from "../../assets/header/Logo.svg";

import { CopyrightOutlined } from "@ant-design/icons";
import "./Footer.scss";
import { Link, useLocation } from "react-router-dom";
const Footer = () => {
  const location = useLocation();

  return (
    <>
      {!location.pathname.includes("dao/posts") && (
        <div className="Footer">
          <div className="container">
            <Row gutter={[20, 20]}>
              <Col sm={24} md={12} lg={6}>
                <p className="title">TẢI ỨNG DỤNG BOOKING STUDIO</p>
                <div className="logo">
                  <a
                    href="https://play.google.com/store/apps/details?id=com.vnplus.bookingstudio"
                    target="_blank"
                  >
                    <img src={Android} alt="" className="h-100" />
                  </a>
                  <a
                    href="https://apps.apple.com/vn/app/booking-studio/id1563362722"
                    target="_blank"
                    className="ms-10"
                  >
                    <img src={Ios} target="_blank" className="h-33px" alt="" />
                  </a>
                </div>
                <p className="item">Theo dõi chúng tôi trên</p>
                <div className="icons">
                  <Facebook />
                  <Insta />
                  <LinkedIn />
                </div>
              </Col>
              <Col sm={24} md={12} lg={6}>
                <p className="title">VỀ CHÚNG TÔI</p>
                <ul className="pt-10">
                  <a href="https://vnplus.vn" alt="" target="_blank">
                    <li className="item mt-20"> Giới thiệu VNPLUS</li>
                  </a>
                  <a href="home/privacy-policy">
                    <li className="item mt-20">Chính sách bảo mật </li>
                  </a>
                  <a href="home/terms-use">
                    <li className="item mt-20">Điều khoản sử dụng</li>
                  </a>
                </ul>
              </Col>
              <Col sm={24} md={12} lg={6}>
                <p className="title">HỖ TRỢ KHÁCH HÀNG</p>
                <ul className="pt-10">
                  <a href={"home/helpCenter"}>
                    <li className="item mt-20">Trung tâm trợ giúp</li>
                  </a>
                  <li className="item mt-20">Quy định chung</li>
                </ul>
              </Col>
              <Col sm={24} md={12} lg={6}>
                <img src={Logo} />
                {/* <Enter /> */}
                <p className="title exten">
                  Công ty Cổ phần Công nghệ và Đầu tư VNPLUS
                </p>
                {/* <BCTVN /> */}
              </Col>
            </Row>
          </div>
          <p className="copywrite">
            <CopyrightOutlined /> 2021 - Bản quyền thuộc công ty Cổ phần Công
            nghệ và Đầu tư VNPLUS
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
