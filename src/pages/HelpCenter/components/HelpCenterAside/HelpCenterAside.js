import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Link,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";

import "./helpCenterAside.scss";

const ITEM_USER_ACCOUNT_ASIDE = [
  {
    icon: <></>,
    title: "I. Về hủy đơn đặt",
    linkTo: "cancelOrder",
  },
  {
    icon: <></>,
    title: "II. Về thanh toán",
    linkTo: "pay",
  },
  {
    icon: <></>,
    title: "III. Về chi tiết đơn đặt",
    linkTo: "orderDetail",
  },
  {
    icon: <></>,
    title: "IV. Về giá trị đơn đặt",
    linkTo: "orderValue",
  },
  {
    icon: <></>,
    title: "V. Về bảo mật và nhận thức",
    linkTo: "cognitiveSecurity",
  },
];

const HelpCenterAside = ({ children, ref }) => {
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);
  const { pathname } = useLocation();
  // console.log(pathname.split("/")[4]);
  const AsideItems = ({ item, ref, index }) => {
    return (
      <Link
        activeClass="active"
        to={`${index + 1}-item`}
        spy={true}
        smooth={false}
        offset={-20}
        duration={100}
        // to={item.linkTo}
        // onClick={() => ref?.current?.scrollIntoView({ behavior: "smooth" })}
        // style={
        //   pathname.includes(item.linkTo)
        //     ? { color: "#E22828" }
        //     : { color: "#222222" }
        // }
      >
        <div
          style={{
            padding: "0.5rem 0",
            cursor: "pointer",
          }}>
          {item.icon}
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
        </div>
      </Link>
    );
  };
  return (
    <div className="help-center-aside">
      {ITEM_USER_ACCOUNT_ASIDE.map((item, index) => (
        <AsideItems item={item} key={index} ref={ref} index={index} />
      ))}
    </div>
  );
};

export default HelpCenterAside;
