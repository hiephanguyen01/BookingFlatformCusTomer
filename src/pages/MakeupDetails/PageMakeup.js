import React from "react";
import { Route, Routes } from "react-router-dom";
import OrderMakeup from "./page/OrderMakeup";
import ConfirmOrderMakeup from "./page/OrderMakeup/page/confirmOrderMakeup";
import MakeupDetails from "./index";

const PageMakeup = () => {
  return (
    <Routes>
      <Route path=":id" element={<MakeupDetails />} />
      <Route path=":id/order" element={<OrderMakeup />} />
      <Route path=":id/order/confirm" element={<ConfirmOrderMakeup />} />
    </Routes>
  );
};

export default PageMakeup;
