import { CloseOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPromoCodeByStudioPostAction } from "../../stores/actions/promoCodeAction";
import { HIDE_MODAL } from "../../stores/types/modalTypes";

import "./voucher.scss";
import { convertTime } from "../../utils/convert";

const Index = () => {
  const [choose, setChoose] = useState([]);
  const { promoCodeByStudio, studioPostId } = useSelector(
    (state) => state.promoCodeReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPromoCodeByStudioPostAction(studioPostId));
  }, []);

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
  return (
    <div className="voucher_container">
      <div
        className="close_modal"
        onClick={() => {
          dispatch({ type: HIDE_MODAL });
        }}
      >
        <CloseOutlined />
      </div>
      <header className="header_modal">Mã khuyến mãi</header>
      {promoCodeByStudio &&
        promoCodeByStudio
          .filter((item) => item.Expired > new Date().toISOString())
          .map((item, index) => (
            <div className="voucher_wrap">
              <div className="voucher_content">
                <div className="voucher_code">{item.Name}</div>
                <div className="voucher_desc">{item.Description}</div>
                <div className="voucher_date">
                  HSD: {convertTime(item.Expired).slice(0, 10)}
                </div>
              </div>
              {choose.includes(item) ? (
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
