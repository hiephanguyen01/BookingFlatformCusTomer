import React from "react";
import { Route, Routes } from "react-router-dom";
import DetailCostumeShop from "../DetailCostumeShop";
import CostumeDetail from "./index";

const PageCostume = () => {
  return (
    <Routes>
      <Route path="/" element={<CostumeDetail />} />
      <Route path="/detailCostumeShop" element={<DetailCostumeShop />} />
    </Routes>
  );
};

export default PageCostume;
