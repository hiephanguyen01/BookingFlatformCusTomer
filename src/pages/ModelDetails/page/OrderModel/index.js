import React from "react";
import { useDispatch } from "react-redux";

import "./orderModel.scss";

import Order from "../../../../components/Order";

const Index = () => {
  // const dispatch = useDispatch();
  // const handleOnClickModal = () => {
  //   dispatch({
  //     type: SHOW_MODAL,
  //     Component: <Voucher />,
  //   });
  // };
  return <Order linkTo="confirm" />;
};

export default Index;
