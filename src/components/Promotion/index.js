import { CloseOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPromotionCodeUserSave,
  setChoosePromotionUser,
} from "../../stores/actions/promoCodeAction";
import { HIDE_MODAL } from "../../stores/types/modalTypes";

import "./voucher.scss";
import { convertPrice, convertTime } from "../../utils/convert";
import { calDate, calTime } from "../../utils/calculate";
import { Button } from "antd";
import { SET_CHOOSE_PROMOTION_USER } from "../../stores/types/promoCodeType";

const Index = () => {
  const { promoCodeUserSave, choosePromotionUser } = useSelector(
    (state) => state.promoCodeReducer
  );
  const { chooseService } = useSelector((state) => state.studioPostReducer);
  const { chooseServiceList } = useSelector((state) => state.OrderReducer);

  const [choose, setChoose] = useState({ ...choosePromotionUser });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPromotionCodeUserSave());
  }, [dispatch]);

  useEffect(() => {
    setChoose({ ...choosePromotionUser });
    // return () => {
    //   dispatch({ type: SET_CHOOSE_PROMOTION_USER, data: {} });
    // };
  }, [choosePromotionUser, dispatch]);

  const priceOrder = () => {
    let price = 0;
    switch (chooseService?.OrderByTime) {
      case 1:
        price = chooseServiceList?.reduce(
          (total, service) =>
            total +
            service.PriceByHour *
              calTime(
                chooseService?.OrderByTimeFrom,
                chooseService?.OrderByTimeTo
              ),
          0
        );
        return price;

      case 0:
        price = chooseServiceList?.reduce(
          (total, service) =>
            total +
            service.PriceByDate *
              calDate(
                chooseService?.OrderByDateFrom,
                chooseService?.OrderByDateTo
              ),
          0
        );
        return price;

      default:
        break;
    }
  };

  const handleChooseVoucher = (code) => {
    console.log("code", code);

    if (choose.id === code.id) {
      setChoose({});
      dispatch(setChoosePromotionUser({}));
    } else {
      setChoose({ ...code });
      dispatch(setChoosePromotionUser(code));
    }
  };

  const disabledApply = (minApply) => priceOrder() < minApply;

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
      {promoCodeUserSave.length > 0 &&
        promoCodeUserSave
          .filter((item) => item.DateTimeExpire >= new Date().toISOString())
          .map((item, index) => (
            <div className="promotion_wrap">
              <div className="promotion_content">
                <div className="promotion_code">{item.SaleCode}</div>
                <div className="promotion_desc">{`Giảm ${
                  item.TypeReduce === 1
                    ? `${convertPrice(item.ReduceValue / 1000)}K`
                    : `${item.ReduceValue}%`
                } cho mọi đơn đặt`}</div>
                <div className="promotion_value">
                  <span className="me-5">
                    Đơn tối thiểu: {convertPrice(item.MinApply)}đ
                  </span>

                  {item.TypeReduce === 2 && (
                    <>
                      -
                      <span className="ms-5">
                        Giảm tối đa: {convertPrice(item.MaxReduce)}đ
                      </span>
                    </>
                  )}
                </div>
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
                <Button
                  type="primary"
                  disabled={disabledApply(item.MinApply)}
                  className={`btn_apply ${
                    disabledApply(item.MinApply) && "visible"
                  }`}
                  onClick={() => {
                    handleChooseVoucher(item);
                  }}
                  size="large"
                >
                  Áp dụng
                </Button>
              )}
            </div>
          ))}
    </div>
  );
};

export default Index;
