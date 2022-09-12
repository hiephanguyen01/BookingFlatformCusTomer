import React from "react";
import { Route, Routes } from "react-router-dom";
import DeviceShopDetail from "./page/DeviceShopDetail";
import OrderDevice from "./page/OrderDevice";
import ConfirmOrderDevice from "./page/OrderDevice/page/ConfirmOrderDevice";
import DeviceDetails from "./index";

const PageDevice = () => {
  return (
    <Routes>
      <Route path=":id" element={<DeviceDetails />} />
      <Route path=":id/shop" element={<DeviceShopDetail />} />
      <Route path=":id/order" element={<OrderDevice />} />
      <Route path=":id/order/confirm" element={<ConfirmOrderDevice />} />
    </Routes>
  );
};

export default PageDevice;
