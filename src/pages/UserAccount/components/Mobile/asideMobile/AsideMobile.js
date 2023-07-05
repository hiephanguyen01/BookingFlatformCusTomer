import { RightOutlined } from "@ant-design/icons";
import { Col, Modal, Row } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as File } from "../../../../../assets/infoUser/file.svg";
import { ReactComponent as Comment } from "../../../../../assets/infoUser/comment.svg";
import { ReactComponent as DuplicateFile } from "../../../../../assets/infoUser/duplicateFile.svg";
import { ReactComponent as Save } from "../../../../../assets/infoUser/save.svg";
import { ReactComponent as Eye } from "../../../../../assets/infoUser/eye.svg";
import { ReactComponent as HFile } from "../../../../../assets/infoUser/h-file.svg";
import { ReactComponent as Protect } from "../../../../../assets/infoUser/protect.svg";
import { ReactComponent as Phone } from "../../../../../assets/infoUser/phone.svg";
import "./asideMobile.scss";
import { logOut } from "../../../../../stores/actions/autheticateAction";

const ITEM_USER_ACCOUNT_ASIDE = [
  {
    icon: <File style={{ height: "100%" }} className="icon" />,
    title: "Lịch sử đơn đặt",
    linkTo: "orderStatus?orderStatus=1",
  },
  {
    icon: <Comment style={{ height: "100%" }} className="icon" />,
    title: "Đánh giá của tôi",
    linkTo: "rating",
  },
  {
    icon: <DuplicateFile style={{ height: "100%" }} className="icon" />,
    title: "Bài viết của tôi",
    linkTo: "posts",
  },
  {
    icon: <Save style={{ height: "100%" }} className="icon" />,
    title: "Bài viết đã lưu",
    linkTo: "post-saved",
  },
  {
    icon: <Eye style={{ height: "100%" }} className="icon" />,
    title: "Đã xem gần đây",
    linkTo: "recently-viewed",
  },
];
const ITEM_US_ASIDE = [
  {
    icon: <HFile style={{ height: "100%" }} className="icon" />,
    title: "Điều khoản sử dụng",
    linkTo: "terms-use",
  },
  {
    icon: <Protect style={{ height: "100%" }} className="icon" />,
    title: "Chính sách an toàn & bảo mật",
    linkTo: "privacy-policy",
  },
  {
    icon: <Phone style={{ height: "100%" }} className="icon" />,
    title: "Hỗ trợ",
    linkTo: "support",
  },
];

const AsideMobile = ({ children }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);
  const dispatch = useDispatch();
  const AsideItems = ({ item }) => {
    return (
      <Link to={item.linkTo} className="item-account-info-link">
        <Row
          className={"item-account-info-row"}
          align="middle"
          justify="space-between">
          <Col align="middle" span={2} justify={"center"}>
            {item.icon}
          </Col>
          <Col span={18}>
            <span
            // style={
            //   pathname.includes(item.linkTo)
            //     ? {
            //         fontSize: "16px",
            //         marginLeft: "0.5rem",
            //         fontWeight: "600",
            //       }
            //     : { fontSize: "16px", marginLeft: "0.5rem", fontWeight: "400" }
            // }
            >
              {item.title}
            </span>
          </Col>
          <Col align="middle" span={2}>
            <RightOutlined style={{ fontSize: 12 }} />
          </Col>
        </Row>
      </Link>
    );
  };

  const handleSignOut = () => {
    dispatch(logOut(navigate));
  };

  return (
    <div className="aside-mobile">
      <div className="info-account">
        {ITEM_USER_ACCOUNT_ASIDE.map((item, index) => (
          <AsideItems item={item} key={index} />
        ))}
      </div>
      <div style={{ marginTop: "1.5rem" }}>
        <div className="title">Về chúng tôi</div>
        {ITEM_US_ASIDE.map((item, index) => (
          <AsideItems item={item} key={index} />
        ))}
      </div>
      <div className="btn-logout" onClick={() => setIsModalOpen(true)}>
        <span>Đăng xuất</span>
      </div>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        centered
        footer={<></>}
        className="modal-logout"
        closable={false}>
        <p>Bạn có chắc chắn muốn đăng xuất không?</p>
        <Row justify="end" className="mt-10">
          <div className="btn ">Hủy</div>
          <div className="btn logout" onClick={handleSignOut}>
            Đăng xuất
          </div>
        </Row>
      </Modal>
    </div>
  );
};

export default AsideMobile;
