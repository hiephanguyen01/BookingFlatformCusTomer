import { Col, Row } from "antd";
import React from "react";
import { Route, Routes } from "react-router-dom";
import AccountInfo from "./components/accountInfo/AccountInfo";
import Aside from "./components/aside/Aside";
import Clause from "./components/Clause/Clause";
import Liked from "./components/Liked/Liked";
import OrderStatus from "./components/OrderStatus/OrderStatus";
import Policy from "./components/Policy/Policy";
import Posts from "./components/Posts/Posts";
import PostSaved from "./components/PostsSaved/PostSaved";
import Rating from "./components/Rating/Rating";
import RecentlyViewed from "./components/RecentlyViewed/RecentlyViewed";
import Support from "./components/support/Support";

const Index = () => {
  return (
    <div
      className=""
      style={{
        maxWidth: "1440px",
        margin: "auto",
        backgroundColor: "rgb(245, 245, 245)",
        padding: "2rem 0",
      }}
    >
      <Row>
        <Col span={6}>
          <Aside />
        </Col>
        <Col span={18} style={{ padding: "0 1rem" }}>
          <Routes>
            {/* <Route path="" element={<AccountInfo />} /> */}
            <Route path="accountInfo" element={<AccountInfo />} />
            <Route path="orderStatus" element={<OrderStatus />} />
            <Route path="liked" element={<Liked />} />
            <Route path="rating" element={<Rating />} />
            <Route path="posts" element={<Posts />} />
            <Route path="post-saved" element={<PostSaved />} />
            <Route path="recently-viewed" element={<RecentlyViewed />} />
            <Route path="clause" element={<Clause />} />
            <Route path="policy" element={<Policy />} />
            <Route path="support" element={<Support />} />
          </Routes>
        </Col>
      </Row>
    </div>
  );
};

export default Index;
