import React from "react";
import { Route, Routes } from "react-router-dom";
import ModelDetails from "./index";
import Order from "../../components/Order";
import ConfirmOrder from "../../components/ConfirmOrder";
import OrderSuccess from "../../components/OrderSuccess";

const PageModel = () => {
  return (
    <Routes>
      <Route path=":id" element={<ModelDetails />} />
      <Route path=":id/order" element={<Order />} />
      <Route path=":id/order/confirm" element={<ConfirmOrder />} />
      <Route path=":id/order/confirm/orderSuccess" element={<OrderSuccess />} />
    </Routes>
  );
};

export default PageModel;
