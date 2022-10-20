import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SHOW_MODAL } from "../../stores/types/modalTypes";
import { numberSlice } from "../../utils/convert";
import Voucher from "../Voucher";

import "./promotionList.scss";

const PromotionList = ({ data }) => {
  const { promoCodeUserSave } = useSelector((state) => state.promoCodeReducer);

  const dispatch = useDispatch();

  //   const handleViewDetailPromo = () => {
  //     // dispatch({
  //     //   type: SHOW_MODAL,
  //     //   Component: <Promotion />,
  //     // });
  //   };
  const showPromotion = () => {
    dispatch({ type: SHOW_MODAL, Component: <Voucher /> });
  };
  return (
    <div className="promotion-list-container">
      <h3 className="mb-16 label">{`${data.length}`} mã khuyến mãi</h3>
      <ul className="d-flex promotion-list">
        {data
          ?.filter(
            (item) => item.SaleCode.DateTimeExpire > new Date().toISOString()
          )
          ?.reduce((arr, item) => {
            if (
              promoCodeUserSave.filter((itm) => itm.id === item.SaleCode.id)
                .length > 0
            ) {
              return [...arr];
            }
            return [...arr, item];
          }, [])
          .map((item, index) => (
            <li
              key={index}
              className="promotion-list-item active"
              //   onClick={handleViewDetailPromo}
              onClick={showPromotion}
            >
              {item?.SaleCode?.TypeReduce === 1
                ? `Giảm ${numberSlice(item?.SaleCode?.ReduceValue)}K`
                : `Giảm ${item?.SaleCode?.ReduceValue}%`}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PromotionList;
