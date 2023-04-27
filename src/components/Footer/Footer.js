import { Col, Grid, Row } from "antd";
import { ReactComponent as Facebook } from "../../assets/footer/facebook.svg";
import Android from "../../assets/footer/google-play-badge.png";
import { ReactComponent as Insta } from "../../assets/footer/instagram.svg";
import Ios from "../../assets/footer/ios.svg";
// import QRCode from "../../assets/footer/QRCode.svg";
import { ReactComponent as LinkedIn } from "../../assets/footer/linkedin.svg";
import { ReactComponent as Logo } from "../../assets/header/Logo.svg";

import { CopyrightOutlined } from "@ant-design/icons";
import QRCode from "qrcode.react";
import { Link, useLocation } from "react-router-dom";
import "./Footer.scss";

const { useBreakpoint } = Grid;

const Footer = () => {
  const location = useLocation();
  const screens = useBreakpoint();
  return (
    <>
      {!location.pathname.includes("dao/posts") && (
        <div className="Footer">
          <div className="container">
            <Row gutter={[40, 20]}>
              <Col sm={24} md={12} lg={6}>
                <p className="title">TẢI ỨNG DỤNG BOOKING STUDIO</p>
                <Row className="logo" align="middle" gutter={[5, 0]}>
                  <Col span={12}>
                    {/* <img src={QRCode} /> */}
                    <QRCode
                      size={256}
                      style={{
                        height: "auto",
                        maxWidth: "100%",
                        width: "100%",
                        paddingTop: "10px",
                      }}
                      value={window.location.origin + "/home/detect-app"}
                      // value={"https://katsukei.vn"}
                      // viewBox={`0 0 256 256`}
                    />
                  </Col>
                  <Col span={12}>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.vnplus.bookingstudio"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src={Android} alt="" className="" />
                    </a>
                    <a
                      href="https://apps.apple.com/vn/app/booking-studio/id1563362722"
                      target="_blank"
                      className=""
                      rel="noreferrer"
                    >
                      <img
                        src={Ios}
                        target="_blank"
                        className=""
                        // style={{ width: "95px" }}
                        alt=""
                      />
                    </a>
                  </Col>
                </Row>
                <Col
                  align={`${screens.xs ? "middle" : "start"}`}
                  style={screens.xs ? { margin: "30px 0" } : {}}
                >
                  <span className="item">Theo dõi chúng tôi trên</span>
                  <div className="icons">
                    <Facebook />
                    <Insta />
                    <LinkedIn />
                  </div>
                </Col>
              </Col>
              <Col
                sm={24}
                md={12}
                lg={6}
                xs={24}
                align={`${screens.xs ? "middle" : "start"}`}
              >
                <span className="title">VỀ CHÚNG TÔI</span>
                <ul className="pt-10">
                  <a
                    href="https://vnplus.vn"
                    alt=""
                    target="_blank"
                    rel="noreferrer"
                  >
                    <li
                      className="item mt-20 "
                      style={screens.xs ? { textAlign: "center" } : {}}
                    >
                      Giới thiệu VNPLUS
                    </li>
                  </a>
                  <li className="mt-20">
                    <Link className="item " to="/home/user/privacy-policy">
                      Chính sách bảo mật
                    </Link>
                  </li>
                  <li className="mt-20">
                    <Link className="item" to="/home/user/terms-use">
                      Điều khoản sử dụng
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col
                sm={24}
                md={12}
                lg={6}
                xs={24}
                align={`${screens.xs ? "middle" : "start"}`}
              >
                <span className="title">HỖ TRỢ KHÁCH HÀNG</span>
                <ul className="pt-10">
                  <Link to={"helpCenter"}>
                    <li
                      className="item mt-20"
                      style={screens.xs ? { textAlign: "center" } : {}}
                    >
                      Trung tâm trợ giúp
                    </li>
                  </Link>
                  <li
                    className="item mt-20"
                    style={screens.xs ? { textAlign: "center" } : {}}
                  >
                    Quy định chung
                  </li>
                </ul>
              </Col>
              <Col
                sm={24}
                md={12}
                lg={6}
                xs={24}
                align={`${screens.xs ? "middle" : "start"}`}
              >
                <Logo style={{ height: "45px", width: "150px" }} />

                {/* <Enter /> */}
                <p
                  className="title exten"
                  style={screens.xs ? { textAlign: "center" } : {}}
                >
                  Công ty Cổ phần Công nghệ và Đầu tư VNPLUS
                </p>
                {/* <BCTVN /> */}
              </Col>
            </Row>
          </div>
          <p className="copywrite">
            <CopyrightOutlined /> 2021 - Bản quyền thuộc công ty Cổ phần Công
            nghệ và Đầu tư VNPLUS V-28323
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;
