import React from "react";
import { Route, Routes } from "react-router-dom";
import DeviceShopDetail from "./page/DeviceShopDetail";
import OrderDevice from "./page/OrderDevice";
import ConfirmOrderDevice from "./page/OrderDevice/page/ConfirmOrderDevice";
import DeviceDetails from "./index";

const PageDevice = () => {
  return (
    <Routes>
      <Route path="" element={<DeviceDetails />} />
      <Route path="deviceShopDetail" element={<DeviceShopDetail />} />
      <Route path="orderDevice" element={<OrderDevice />} />
      <Route
        path="orderDevice/confirmOrderDevice"
        element={<ConfirmOrderDevice />}
      />
    </Routes>
  );
};

export default PageDevice;
