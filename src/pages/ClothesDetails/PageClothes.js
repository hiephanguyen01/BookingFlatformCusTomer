import React from "react";
import { Route, Routes } from "react-router-dom";
import DetailClothesShop from "./page/DetailClothesShop";
import OrderClothes from "./page/OrderClothes";
import ConfirmOrderClothes from "./page/OrderClothes/page/ConfirmOrderClothes";
import ClothesDetail from "./index";

const PageCostume = () => {
  return (
    <Routes>
      <Route path=":id" element={<ClothesDetail />} />
      <Route path=":id/shop" element={<DetailClothesShop />} />
      <Route path=":id/order" element={<OrderClothes />} />
      <Route path=":id/order/confirm" element={<ConfirmOrderClothes />} />
    </Routes>
  );
};

export default PageCostume;
