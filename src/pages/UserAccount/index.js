import { Col, Row } from "antd";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AccountInfo from "./components/accountInfo/AccountInfo";
import Aside from "./components/aside/Aside";
import Liked from "./components/Liked/Liked";
import OrderStatus from "./components/OrderStatus/OrderStatus";
import Posts from "./components/Posts/Posts";
import PostSaved from "./components/PostsSaved/PostSaved";
import Rating from "./components/Rating/Rating";
import RecentlyViewed from "./components/RecentlyViewed/RecentlyViewed";
import TermsUser from "../TermsUse/TermsUse";
import PrivacyPolicy from "../PrivacyPolicy/PrivacyPolicy";

const Index = () => {
  return (
    <div
      className=""
      style={{
        margin: "auto",
        backgroundColor: "rgb(245, 245, 245)",
        padding: "2rem 0",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "auto" }}>
        <Row>
          <Col span={6}>
            <Aside />
          </Col>
          <Col span={18} style={{ padding: "0 1rem" }}>
            <Routes>
              <Route path="" element={<Navigate to="accountInfo" />} />
              <Route path="accountInfo" element={<AccountInfo />} />
              <Route path="orderStatus" element={<OrderStatus />} />
              <Route path="liked" element={<Liked />} />
              <Route path="rating" element={<Rating />} />
              <Route path="posts" element={<Posts />} />
              <Route path="post-saved" element={<PostSaved />} />
              <Route path="recently-viewed" element={<RecentlyViewed />} />
              <Route path="terms-use" element={<TermsUser />} />
              <Route path="privacy-policy" element={<PrivacyPolicy />} />
              <Route
                path="support"
                element={<Navigate to="/home/helpCenter" />}
              />
            </Routes>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Index;
