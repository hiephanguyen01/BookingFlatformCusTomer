import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "./orderDevice.scss";

import Order from "../../../../components/Order";
import Voucher from "./components/Voucher";
import { SHOW_MODAL } from "../../../../stores/types/modalTypes";

const Index = () => {
  const [chooseVoucher, setChooseVoucher] = useState([]);
  console.log(chooseVoucher);
  const dispatch = useDispatch();
  const handleOnClickModal = () => {
    dispatch({
      type: SHOW_MODAL,
      Component: <Voucher setChooseVoucher={setChooseVoucher} />,
    });
  };
  return <Order onClickModal={handleOnClickModal} linkTo="confirm" />;
};

export default Index;
