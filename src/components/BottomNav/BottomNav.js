import React from "react";
import "./bottomNav.scss";
import { Avatar, Col, Row, Space } from "antd";
import { ReactComponent as HomeIcon } from "../../assets/bottomNav/home.svg";
import { ReactComponent as DaoIcon } from "../../assets/bottomNav/dao.svg";
import { ReactComponent as FavoriteIcon } from "../../assets/bottomNav/favorite.svg";
import { ReactComponent as MeIcon } from "../../assets/bottomNav/me.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BottomNav = () => {
  const user = useSelector((state) => state.authenticateReducer.currentUser);

  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="bottomNavContainer">
      <Row
        gutter={[10, 0]}
        align="middle"
        className="h-100"
        justify="space-around"
      >
        <Col
          span={6}
          className={`item ${location.pathname === "/home" && "active"}`}
          onClick={() => navigate("/home")}
        >
          <HomeIcon className="icon" />
          <p>Trang chủ</p>
        </Col>
        <Col
          span={6}
          className={`item ${location.pathname === "/home/dao" && "active"}`}
          onClick={() => {
            window.scrollTo(0, 0);

            navigate("/home/dao");
          }}
        >
          <DaoIcon className="icon" />
          <p>Dạo</p>
        </Col>
        <Col
          span={6}
          className={`item ${
            location.pathname === "/home/user/liked" && "active"
          }`}
          onClick={() => navigate("/home/user/liked")}
        >
          <FavoriteIcon className="item" />
          <p>Đã thích</p>
        </Col>
        <Col
          span={6}
          className={`item ${
            location.pathname === "/home/user/accountInfo" && "active"
          }`}
          onClick={() => {
            if (user?.id) {
              navigate("/home/user/accountInfo");
            }
            navigate("/auth/sign-in");
          }}
        >
          {user?.id ? (
            <>
              <Avatar src={user.Image} alt="" size={"small"} />
              <p>{user?.Fullname}</p>
            </>
          ) : (
            <>
              <MeIcon />
              <p>Đăng nhập</p>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default BottomNav;
