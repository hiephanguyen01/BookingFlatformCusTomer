import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SHOW_MODAL } from "../../stores/types/modalTypes";
import { numberSlice } from "../../utils/convert";
import Voucher from "../Voucher";

import "./promotionList.scss";

const PromotionList = () => {
  const { promotionCode } = useSelector((state) => state.studioPostReducer);
  const { promoCodeUserSave } = useSelector((state) => state.promoCodeReducer);
  const { currentUser } = useSelector((state) => state.authenticateReducer);

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
      <h3 className="mb-16 label">
        {`${currentUser?.id ? promotionCode.length : "0"}`} mã khuyến mãi
      </h3>
      <ul className="d-flex promotion-list">
        {currentUser?.id &&
          promotionCode.map((item, index) => (
            <li
              key={index}
              className="promotion-list-item active"
              //   onClick={handleViewDetailPromo}
              onClick={showPromotion}
              style={{ cursor: "pointer" }}
            >
              {item?.TypeReduce === 1
                ? `Giảm ${numberSlice(item?.ReduceValue)}K`
                : `Giảm ${item?.ReduceValue}%`}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PromotionList;
