import { CloseOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelSavePromotion,
  getPromotionCodeUserSave,
  savePromotion,
} from "../../stores/actions/promoCodeAction";
import { HIDE_MODAL } from "../../stores/types/modalTypes";

import "./voucher.scss";
import { convertTime } from "../../utils/convert";
import { getPromotionByTenantId } from "../../stores/actions/studioPostAction";

const Index = () => {
  const { promoCodeUserSave } = useSelector((state) => state.promoCodeReducer);

  const { studioDetail, promotionCode } = useSelector(
    (state) => state.studioPostReducer
  );
  const [savePromo, setSavePromo] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPromotionByTenantId(studioDetail?.data?.TenantId));
    dispatch(getPromotionCodeUserSave());
    // if (
    //   promotionCode
    //     .filter(
    //       (item) => item.SaleCode.DateTimeExpire > new Date().toISOString()
    //     )
    //     .reduce((arr, item) => {
    //       if (
    //         promoCodeUserSave.filter((itm) => itm.id === item.SaleCode.id)
    //           .length > 0
    //       ) {
    //         return [...arr];
    //       }
    //       return [...arr, item.SaleCode];
    //     }, []).length === 0
    // ) {
    //   dispatch({ type: HIDE_MODAL });
    // }
  }, [studioDetail]);

  const handleChooseVoucher = (code) => {
    const newSavePromo = [...savePromo];
    const findIndex = newSavePromo.findIndex((item) => item.id === code.id);
    if (findIndex !== -1) {
      newSavePromo.splice(findIndex, 1);
      setSavePromo([...newSavePromo]);
      dispatch(cancelSavePromotion(code.id));
    } else {
      setSavePromo([...newSavePromo, { ...code }]);
      dispatch(savePromotion(code.id));
    }
  };
  return (
    <div className="save_promotion_container">
      <div
        className="close_modal"
        onClick={() => {
          dispatch({ type: HIDE_MODAL });
        }}
      >
        <CloseOutlined />
      </div>
      <header className="header_modal">Mã khuyến mãi</header>
      {promotionCode &&
        promotionCode
          .filter(
            (item) => item.SaleCode.DateTimeExpire > new Date().toISOString()
          )
          .reduce((arr, item) => {
            if (
              promoCodeUserSave.filter((itm) => itm.id === item.SaleCode.id)
                .length > 0
            ) {
              return [...arr];
            }
            return [...arr, item.SaleCode];
          }, [])
          .map((item, index) => (
            <div className="save_promotion_wrap" key={index}>
              <div className="save_promotion_content">
                <div className="save_promotion_code">{item.SaleCode}</div>
                <div className="save_promotion_desc">{item.Title}</div>
                <div className="save_promotion_date">
                  HSD: {convertTime(item.DateTimeExpire).slice(0, 10)}
                </div>
              </div>
              {savePromo.filter((itm) => item.id === itm.id).length > 0 ? (
                <div
                  className="btn_applied"
                  onClick={() => {
                    handleChooseVoucher(item);
                  }}
                >
                  Đã lưu
                </div>
              ) : (
                <div
                  className="btn_apply"
                  onClick={() => {
                    handleChooseVoucher(item);
                  }}
                >
                  Lưu
                </div>
              )}
            </div>
          ))}
    </div>
  );
};

export default Index;
