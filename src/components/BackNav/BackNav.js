import React from "react";
import "./backNav.scss";
import { Row } from "antd";
import { ReactComponent as BackArrow } from "../../assets/svg/BackArrow.svg";
import { Link } from "react-router-dom";

const BackNav = ({ className = "", to = "", title = "", icon = <></> }) => {
  return (
    <div className={`nav-container ${className}`}>
      <Link to={to}>
        <Row align="middle" justify="space-between" className={`nav-back`}>
          <Row align="middle">
            <BackArrow className="arrow" />
            <div className="title">{title}</div>
          </Row>
          {icon}
        </Row>
      </Link>
    </div>
  );
};

export default BackNav;
