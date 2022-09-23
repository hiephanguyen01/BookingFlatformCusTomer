import React from "react";
import { Route, Routes } from "react-router-dom";
import Order from "../../components/Order";
import ConfirmOrder from "../../components/ConfirmOrder";
import OrderSuccess from "../../components/OrderSuccess";
import MakeupDetails from "./index";

const PageMakeup = () => {
  return (
    <Routes>
      <Route path=":id" element={<MakeupDetails />} />
      <Route path=":id/order" element={<Order />} />
      <Route path=":id/order/confirm" element={<ConfirmOrder />} />
      <Route path=":id/order/confirm/orderSuccess" element={<OrderSuccess />} />
    </Routes>
  );
};

export default PageMakeup;
