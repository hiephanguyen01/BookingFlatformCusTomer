import React from "react";
import { Route, Routes } from "react-router-dom";
import Cart from "./index";
import Order from "../../components/Order";
import ConfirmOrder from "../../components/ConfirmOrder";
import OrderSuccess from "../../components/OrderSuccess";

const CartPage = () => {
  return (
    <Routes>
      <Route path="" element={<Cart />} />
      <Route path="order" element={<Order />} />
      <Route path="order/confirm" element={<ConfirmOrder />} />
      {/* <Route path="order/confirm/orderSuccess" element={<OrderSuccess />} /> */}
    </Routes>
  );
};

export default CartPage;
