import React from "react";
import { Route, Routes } from "react-router-dom";
import OrderMakeup from "./page/OrderMakeup";
import ConfirmOrderMakeup from "./page/OrderMakeup/page/confirmOrderMakeup";
import MakeupDetails from "./index";

const PageMakeup = () => {
  return (
    <Routes>
      <Route path="" element={<MakeupDetails />} />
      <Route path="orderMakeup" element={<OrderMakeup />} />
      <Route
        path="orderMakeup/confirmOrderMakeup"
        element={<ConfirmOrderMakeup />}
      />
    </Routes>
  );
};

export default PageMakeup;
