import { CloseOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPromotionCodeUserSave,
  setChoosePromotionUser,
} from "../../stores/actions/promoCodeAction";
import { HIDE_MODAL } from "../../stores/types/modalTypes";

import "./voucher.scss";
import { convertTime } from "../../utils/convert";

const Index = () => {
  const { promoCodeUserSave } = useSelector((state) => state.promoCodeReducer);
  const [choose, setChoose] = useState({ ...promoCodeUserSave });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPromotionCodeUserSave());
  }, []);

  const handleChooseVoucher = (code) => {
    setChoose({ ...code });
    dispatch(setChoosePromotionUser(code));
  };
  return (
    <div className="promotion_container">
      <div
        className="close_modal"
        onClick={() => {
          dispatch({ type: HIDE_MODAL });
        }}
      >
        <CloseOutlined />
      </div>
      <header className="header_modal">Mã khuyến mãi</header>
      {promoCodeUserSave &&
        promoCodeUserSave
          .filter((item) => item.DateTimeExpire > new Date().toISOString())
          .map((item, index) => (
            <div className="promotion_wrap">
              <div className="promotion_content">
                <div className="promotion_code">{item.SaleCode}</div>
                <div className="promotion_desc">{item.Title}</div>
                <div className="promotion_date">
                  HSD: {convertTime(item.DateTimeExpire).slice(0, 10)}
                </div>
              </div>
              {choose.id === item.id ? (
                <div
                  className="btn_applied"
                  onClick={() => {
                    handleChooseVoucher(item);
                  }}
                >
                  Đã áp dụng
                </div>
              ) : (
                <div
                  className="btn_apply"
                  onClick={() => {
                    handleChooseVoucher(item);
                  }}
                >
                  Áp dụng
                </div>
              )}
            </div>
          ))}
    </div>
  );
};

export default Index;
