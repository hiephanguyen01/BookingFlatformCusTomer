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
import { memo } from "react";
import { version } from "../../utils/version";

const { useBreakpoint } = Grid;

const Footer = () => {
  const location = useLocation();
  const screens = useBreakpoint();
  return (
    <div className="container">
      {!location.pathname.includes("dao/posts") && (
        <div className="Footer">
          <div className="container">
            <Row gutter={[40, 20]}>
              <Col sm={12} md={6} lg={6} xs={24}>
                <p className="title">TẢI ỨNG DỤNG BOOKING STUDIO</p>
                <Row
                  className={`logo ${
                    screens?.sm && !screens?.lg && !screens?.md
                      ? "w-60"
                      : "w-100"
                  }`}
                  align="middle"
                  justify={`${screens?.xs && "center"}`}
                  gutter={screens?.xs ? [15, 0] : [12, 0]}
                >
                  <Col lg={9} md={12} sm={12} xs={7}>
                    {/* <img src={QRCode} /> */}
                    <QRCode
                      size={256}
                      style={{
                        height: "auto",
                        width: "100%",
                        paddingTop: "10px",
                      }}
                      value={window.location.origin + "/home/detect-app"}
                      // value={"https://katsukei.vn"}
                      // viewBox={`0 0 256 256`}
                    />
                  </Col>
                  <Col lg={10} md={12} sm={12} xs={8}>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.vnplus.bookingstudio"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={Android}
                        alt=""
                        className="badge-android w-100"
                      />
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
                        className="badge-ios w-100"
                        // style={{ width: "95px" }}
                        alt=""
                      />
                    </a>
                  </Col>
                </Row>
                <Col
                  align={screens?.xs ? "middle" : "start"}
                  style={screens.xs ? { margin: "30px 0" } : { padding: 0 }}
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
                sm={12}
                md={6}
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
                    <Link className="item " to="/home/privacy-policy">
                      Chính sách bảo mật
                    </Link>
                  </li>
                  <li className="mt-20">
                    <Link className="item" to="/home/terms-use">
                      Điều khoản sử dụng
                    </Link>
                  </li>
                </ul>
              </Col>
              <Col
                sm={12}
                md={6}
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
                sm={12}
                md={6}
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
            nghệ và Đầu tư VNPLUS {version}
          </p>
        </div>
      )}
    </div>
  );
};

export default memo(Footer);
