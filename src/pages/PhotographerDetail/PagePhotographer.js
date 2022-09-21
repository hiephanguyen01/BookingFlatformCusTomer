import React from "react";
import { Route, Routes } from "react-router-dom";
import PhotographerDetail from "./index";
import Order from "../../components/Order";
import ConfirmOrder from "../../components/ConfirmOrder";
import OrderSuccess from "../../components/OrderSuccess";

const PagePhotographer = () => {
  return (
    <Routes>
      <Route path=":id" element={<PhotographerDetail />} />
      <Route path=":id/order" element={<Order />} />
      <Route path=":id/order/confirm" element={<ConfirmOrder />} />
      <Route path=":id/order/confirm/orderSuccess" element={<OrderSuccess />} />
    </Routes>
  );
};

export default PagePhotographer;
