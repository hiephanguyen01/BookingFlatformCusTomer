import {
  CommentOutlined,
  EditOutlined,
  EyeOutlined,
  FileTextOutlined,
  HeartOutlined,
  PhoneOutlined,
  ReadOutlined,
  ReconciliationOutlined,
  SafetyCertificateOutlined,
  SaveOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { Item } from "rc-menu";
import React from "react";
import ImgDefaultUser from "../../../../assets/img/userAccount/default-user-image.png";
import imgClause from "../../../../assets/img/userAccount/clause.png";
import { Link, useLocation } from "react-router-dom";

const ITEM_USER_ACCOUNT_ASIDE = [
  {
    icon: <UserOutlined style={{ height: "100%" }} />,
    title: "Thông tin tài khoản",
    linkTo: "/user/1/accountInfo",
  },
  {
    icon: <ReconciliationOutlined style={{ height: "100%" }} />,
    title: "Lịch sử đơn đặt",
    linkTo: "/user/1/orderStatus",
  },
  {
    icon: <HeartOutlined style={{ height: "100%" }} />,
    title: "Đã thích",
    linkTo: "/user/1/liked",
  },
  {
    icon: <CommentOutlined style={{ height: "100%" }} />,
    title: "Đánh giá của tôi",
    linkTo: "/user/1/rating",
  },
  {
    icon: <FileTextOutlined style={{ height: "100%" }} />,
    title: "Bài viết của tôi",
    linkTo: "/user/1/posts",
  },
  {
    icon: <SaveOutlined style={{ height: "100%" }} />,
    title: "Bài viết đã lưu",
    linkTo: "/user/1/post-saved",
  },
  {
    icon: <EyeOutlined style={{ height: "100%" }} />,
    title: "Đã xem gần đây",
    linkTo: "/user/1/recently-viewed",
  },
];
const ITEM_US_ASIDE = [
  {
    icon: <ReadOutlined style={{ height: "100%" }} />,
    title: "Điều khoản sử dụng",
    linkTo: "/user/1/clause",
  },
  {
    icon: <SafetyCertificateOutlined style={{ height: "100%" }} />,
    title: "Chính sách an toàn & bảo mật",
    linkTo: "/user/1/policy",
  },
  {
    icon: <PhoneOutlined style={{ height: "100%" }} />,
    title: "Hỗ trợ",
    linkTo: "/user/1/support",
  },
];

const Aside = ({ children }) => {
  const { pathname } = useLocation();
  const AsideItems = ({ item }) => {
    return (
      <Link
        to={item.linkTo}
        style={
          pathname === item.linkTo ? { color: "#E22828" } : { color: "#222222" }
        }
      >
        <div
          style={{
            padding: "0.5rem 0",
            cursor: "pointer",
          }}
        >
          {item.icon}
          <span
            style={
              pathname === item.linkTo
                ? {
                    fontSize: "16px",
                    marginLeft: "0.5rem",
                    fontWeight: "600",
                  }
                : { fontSize: "16px", marginLeft: "0.5rem", fontWeight: "400" }
            }
          >
            {item.title}
          </span>
        </div>
      </Link>
    );
  };
  return (
    <div className="container" style={{ margin: "auto" }}>
      <div
        className="d-flex"
        style={{
          paddingBottom: "1rem",
          borderBottom: "1px solid #CACACA",
        }}
      >
        <div
          className=""
          style={{
            height: "46px",
            marginRight: "1rem",
          }}
        >
          <img
            src={ImgDefaultUser}
            alt=""
            style={{ height: "100%", borderRadius: "50%" }}
          />
        </div>
        <div>
          <span>Thông tin tài khoản</span>
          <div className="d-flex justify-content-center align-items-center">
            <h5 style={{ marginBottom: "0" }}>Nguyễn Hoàng Minh</h5>
            <Button type="text">
              <EditOutlined style={{ color: "#03AC84" }} />
            </Button>
          </div>
        </div>
      </div>
      <div
        className=""
        style={{
          marginTop: "1rem",
          borderBottom: "1px solid #CACACA",
          paddingBottom: "1rem",
        }}
      >
        <h5 style={{ textTransform: "uppercase" }}>Tài khoản của chúng tôi</h5>
        {ITEM_USER_ACCOUNT_ASIDE.map((item, index) => (
          <AsideItems item={item} key={index} />
        ))}
      </div>
      <div style={{ marginTop: "1rem" }}>
        <h5 style={{ textTransform: "uppercase" }}>Về chúng tôi</h5>
        {ITEM_US_ASIDE.map((item, index) => (
          <AsideItems item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Aside;
