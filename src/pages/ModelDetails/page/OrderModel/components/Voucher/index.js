import { CloseOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { HIDE_MODAL } from "../../../../../../stores/types/modalTypes";

import "./voucher.scss";

const Index = ({ setChooseVoucher }) => {
  const [choose, setChoose] = useState([]);
  const dispatch = useDispatch();
  const handleChooseVoucher = (id) => {
    const newChoose = [...choose];
    const check = newChoose.findIndex((item) => item === id);
    if (check !== -1) {
      newChoose.splice(check, 1);
    } else {
      newChoose.unshift(id);
    }
    setChoose([...newChoose]);
  };
  /*  console.log(choose); */
  return (
    <div className="voucher_container">
      <div
        className="close_modal"
        onClick={() => {
          dispatch({ type: HIDE_MODAL });
        }}>
        <CloseOutlined />
      </div>
      <header className="header_modal">Mã khuyến mãi</header>
      {[1, 2, 3].map((item, index) => (
        <div className="voucher_wrap" key={index}>
          <div className="voucher_content">
            <div className="voucher_code">WISTERIA2205</div>
            <div className="voucher_desc">Giảm 200K cho đơn 2.500K </div>
            <div className="voucher_date">HSD: 20/09/2022 </div>
          </div>
          {choose.includes(item) ? (
            <div
              className="btn_applied"
              onClick={() => {
                handleChooseVoucher(item);
              }}>
              Đã áp dụng
            </div>
          ) : (
            <div
              className="btn_apply"
              onClick={() => {
                handleChooseVoucher(item);
              }}>
              Áp dụng
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Index;
