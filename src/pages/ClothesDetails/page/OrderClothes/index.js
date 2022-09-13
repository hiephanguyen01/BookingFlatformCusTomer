import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "./orderClothes.scss";

import Order from "../../../../components/Order";
import Promotion from "../../../../components/Promotion";
import Voucher from "./components/Voucher";
import { SHOW_MODAL } from "../../../../stores/types/modalTypes";

const Index = () => {
  return <Order linkTo="confirm" />;
};

export default Index;
