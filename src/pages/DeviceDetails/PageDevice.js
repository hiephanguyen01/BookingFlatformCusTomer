import React from "react";
import { Route, Routes } from "react-router-dom";
import DeviceShopDetail from "./page/DeviceShopDetail";
import Order from "../../components/Order";
import ConfirmOrder from "../../components/ConfirmOrder";
import DeviceDetails from "./index";

const PageDevice = () => {
  return (
    <Routes>
      <Route path=":id" element={<DeviceDetails />} />
      <Route path=":id/order" element={<Order />} />
      <Route path=":id/order/confirm" element={<ConfirmOrder />} />
      <Route path=":id/shop" element={<DeviceShopDetail />} />
    </Routes>
  );
};

export default PageDevice;
