import React from "react";
import "./backNav.scss";
import { Row } from "antd";
import { ReactComponent as BackArrow } from "../../assets/svg/BackArrow.svg";
import { Link, useNavigate } from "react-router-dom";

const BackNav = ({
  className = "",
  to = "",
  title = "",
  icon = <></>,
  state = {},
}) => {
  const navigate = useNavigate();
  return (
    <div className={`nav-container ${className}`}>
      <Row align="middle" justify="space-between" className={`nav-back`}>
        <div onClick={() => navigate(to, { state: state })}>
          <Row align="middle">
            <BackArrow className="arrow" />
            <div className="title">{title}</div>
          </Row>
        </div>
        {icon}
      </Row>
    </div>
  );
};

export default BackNav;
