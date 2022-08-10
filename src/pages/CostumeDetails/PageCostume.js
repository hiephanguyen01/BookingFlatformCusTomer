import React from "react";
import { Route, Routes } from "react-router-dom";
import DetailCostumeShop from "./page/DetailCostumeShop";
import OrderCostume from "./page/OrderCostume";
import ConfirmOrderCostume from "./page/OrderCostume/page/ConfirmOrderCostume";
import CostumeDetail from "./index";

const PageCostume = () => {
  return (
    <Routes>
      <Route path="" element={<CostumeDetail />} />
      <Route path="detailCostumeShop" element={<DetailCostumeShop />} />
      <Route path="orderCostume" element={<OrderCostume />} />
      <Route
        path="orderCostume/confirmOrderCostume"
        element={<ConfirmOrderCostume />}
      />
    </Routes>
  );
};

export default PageCostume;
