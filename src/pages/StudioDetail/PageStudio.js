import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import SuspenseWrap from "../../components/SuspenseWrap/SuspenseWrap";
const Order = lazy(() => import("../../components/Order"));
const ConfirmOrder = lazy(() => import("../../components/ConfirmOrder"));
const OrderSuccess = lazy(() => import("../../components/OrderSuccess"));
const StudioDetail = lazy(() => import("./index"));

const PageStudio = () => {
  return (
    <Routes>
      <Route
        path=":id"
        element={
          <SuspenseWrap>
            <StudioDetail />
          </SuspenseWrap>
        }
      />
      <Route
        path=":id/order"
        element={
          <SuspenseWrap>
            <Order />
          </SuspenseWrap>
        }
      />
      <Route
        path=":id/order/confirm"
        element={
          <SuspenseWrap>
            <ConfirmOrder />
          </SuspenseWrap>
        }
      />
      <Route
        path=":id/order/confirm/orderSuccess"
        element={
          <SuspenseWrap>
            <OrderSuccess />
          </SuspenseWrap>
        }
      />
    </Routes>
  );
};

export default PageStudio;
