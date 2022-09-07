import React from "react";
import { Route, Routes } from "react-router-dom";
import OrderModel from "./page/OrderModel";
import ConfirmOrderModel from "./page/OrderModel/page/confirmOrderModel";
import ModelDetails from "./index";

const PageModel = () => {
  return (
    <Routes>
      <Route path=":id" element={<ModelDetails />} />
      <Route path=":id/order" element={<OrderModel />} />
      <Route path=":id/order/confirm" element={<ConfirmOrderModel />} />
    </Routes>
  );
};

export default PageModel;
