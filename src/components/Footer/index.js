import React from "react";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";
import images from "../../assets/images";

const cx = classNames.bind(styles);
export const Footer = () => {
  return (
    <div className={cx("footer")}>
      <div className={cx("box-container")}>
        <div className={cx("box")}>
          <h5>TẢI ỨNG DỤNG BOOKING STUDIO</h5>
          <div className={cx("app")}>
            <a>
              <img src={images.googleStore} alt="gooleStore" />
            </a>
            <a>
              <img src={images.appStore} alt="app-store" />
            </a>
          </div>
          <div className={cx("bottom")}>
            <p>Theo dõi chúng tôi trên</p>
            <div className={cx("socials")}>
              <a className={cx("social")}>
                <img src={images.facebook} />
              </a>
              <a className={cx("social")}>
                <img src={images.instagram} />
              </a>
              <a className={cx("social")}>
                <img src={images.linkedin} />
              </a>
            </div>
          </div>
        </div>
        <div className={cx("box")}>
          <h5>VỀ CHÚNG TÔI</h5>
          <a>Giới thiệu Plus Stinv</a>
          <a>Chính sách bảo mật </a>
          <a>Điều khoản sử dụng</a>
        </div>
        <div className={cx("box")}>
          <h5>HỖ TRỢ KHÁCH HÀNG</h5>
          <a>Trung tâm trợ giúp</a>
          <a>Quy định chung </a>
        </div>
        <div className={cx("box")}>
          <a>V2505</a>
          <h4>Công ty Cổ phần Công nghệ và Đầu tư VNPLUS</h4>
          <img src={images.reg} />
        </div>
      </div>
      <p className={cx("credit")}>
        &#169; 2021 - Bản quyền thuộc công ty Cổ phần Công nghệ và Đầu tư VNPLUS
      </p>
    </div>
  );
};
