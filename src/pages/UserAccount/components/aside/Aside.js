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
import React from "react";
import ImgDefaultUser from "../../../../assets/img/userAccount/default-user-image.png";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ImageDetect } from "../../../../components/ImageDetect/ImageDetect";

const ITEM_USER_ACCOUNT_ASIDE = [
  {
    icon: <UserOutlined style={{ height: "100%" }} />,
    title: "Thông tin tài khoản",
    linkTo: "accountInfo",
  },
  {
    icon: <ReconciliationOutlined style={{ height: "100%" }} />,
    title: "Lịch sử đơn đặt",
    linkTo: "orderStatus",
  },
  {
    icon: <HeartOutlined style={{ height: "100%" }} />,
    title: "Đã thích",
    linkTo: "liked",
  },
  {
    icon: <CommentOutlined style={{ height: "100%" }} />,
    title: "Đánh giá của tôi",
    linkTo: "rating",
  },
  {
    icon: <FileTextOutlined style={{ height: "100%" }} />,
    title: "Bài viết của tôi",
    linkTo: "posts",
  },
  {
    icon: <SaveOutlined style={{ height: "100%" }} />,
    title: "Bài viết đã lưu",
    linkTo: "post-saved",
  },
  {
    icon: <EyeOutlined style={{ height: "100%" }} />,
    title: "Đã xem gần đây",
    linkTo: "recently-viewed",
  },
];
const ITEM_US_ASIDE = [
  {
    icon: <ReadOutlined style={{ height: "100%" }} />,
    title: "Điều khoản sử dụng",
    linkTo: "clause",
  },
  {
    icon: <SafetyCertificateOutlined style={{ height: "100%" }} />,
    title: "Chính sách an toàn & bảo mật",
    linkTo: "policy",
  },
  {
    icon: <PhoneOutlined style={{ height: "100%" }} />,
    title: "Hỗ trợ",
    linkTo: "support",
  },
];

const Aside = ({ children }) => {
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);
  const { pathname } = useLocation();
  // console.log(pathname.split("/")[4]);
  const newPathname = pathname.split("/")[4];
  const AsideItems = ({ item }) => {
    return (
      <Link
        to={item.linkTo}
        style={
          newPathname === item.linkTo
            ? { color: "#E22828" }
            : { color: "#222222" }
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
              newPathname === item.linkTo
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
            src={UserMe ?ImageDetect(UserMe)  : ImgDefaultUser}
            alt=""
            width={60}
            height={60}
            style={{ borderRadius: "50%" }}
          />
        </div>
        <div>
          <span>Thông tin tài khoản</span>
          <div className="d-flex justify-content-center align-items-center">
            <h5 style={{ marginBottom: "0" }}>{UserMe.Fullname}</h5>
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
