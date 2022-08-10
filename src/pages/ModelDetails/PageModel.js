import React from "react";
import { Route, Routes } from "react-router-dom";
import OrderModel from "./page/OrderModel";
import ConfirmOrderModel from "./page/OrderModel/page/confirmOrderModel";
import ModelDetails from "./index";

const PageModel = () => {
  return (
    <Routes>
      <Route path="" element={<ModelDetails />} />
      <Route path="orderModel" element={<OrderModel />} />
      <Route
        path="orderModel/confirmOrderModel"
        element={<ConfirmOrderModel />}
      />
    </Routes>
  );
};

export default PageModel;
