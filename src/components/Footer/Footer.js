import { Col, Row} from "antd";
import Andriod from "../../assets/footer/android.png";
import { ReactComponent as Ios } from "../../assets/footer/ios.svg";
import { ReactComponent as Facebook } from "../../assets/footer/facebook.svg";
import { ReactComponent as Insta } from "../../assets/footer/instagram.svg";
import { ReactComponent as LinkedIn } from "../../assets/footer/linkedin.svg";
import { ReactComponent as BCTVN } from "../../assets/footer/bctvn.svg";
import { ReactComponent as Enter } from "../../assets/footer/enterprise.svg";

import "./Footer.scss";
import { CopyrightOutlined } from "@ant-design/icons";
const Footer = () => {
  return (
    <div className="Footer">
      <div className="container">
        <Row>
          <Col span={6}>
            <p className="title">TẢI ỨNG DỤNG BOOKING STUDIO</p>
            <div className="logo">
              <img src={Andriod} alt="" />
              <Ios />
            </div>
            <p className="item">Theo dõi chúng tôi trên</p>
            <div className="icons">
              <Facebook />
              <Insta />
              <LinkedIn />
            </div>
          </Col>
          <Col span={6}>
            <p className="title">VỀ CHÚNG TÔI</p>
            <ul className="pt-30">
              <li className="item mt-20">Giới thiệu Plus Stinv</li>
              <li className="item mt-20">Chính sách bảo mật </li>
              <li className="item mt-20">Điều khoản sử dụng</li>
            </ul>
          </Col>
          <Col span={6}>
            <p className="title">HỖ TRỢ KHÁCH HÀNG</p>
            <ul className="pt-30">
              <li className="item mt-20">Trung tâm trợ giúp</li>
              <li className="item mt-20">Quy định chung</li>
            </ul>
          </Col>
          <Col span={6}>
            <Enter />
            <p className="title exten">
              Công ty Cổ phần Công nghệ và Đầu tư VNPLUS
            </p>
            <BCTVN />
          </Col>
        </Row>
      </div>
      <p className="copywrite">
        <CopyrightOutlined /> 2021 - Bản quyền thuộc công ty Cổ phần Công nghệ
        và Đầu tư VNPLUS
      </p>
    </div>
  );
};

export default Footer;
