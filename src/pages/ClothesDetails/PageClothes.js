import React from "react";
import { Route, Routes } from "react-router-dom";
import DetailClothesShop from "./page/DetailClothesShop";
import Order from "../../components/Order";
import ConfirmOrder from "../../components/ConfirmOrder";
import OrderSuccess from "../../components/OrderSuccess";
import ClothesDetail from "./index";

const PageCostume = () => {
  return (
    <Routes>
      <Route path=":id" element={<ClothesDetail />} />
      <Route path=":id/shop" element={<DetailClothesShop />} />
      <Route path=":id/order" element={<Order />} />
      <Route path=":id/order/confirm" element={<ConfirmOrder />} />
      <Route path=":id/order/confirm/orderSuccess" element={<OrderSuccess />} />
    </Routes>
  );
};

export default PageCostume;
