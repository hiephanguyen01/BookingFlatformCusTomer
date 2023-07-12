import { CloseOutlined } from "@ant-design/icons";
import React, { useCallback, useEffect, useState } from "react";
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
import { updateServiceListAction } from "../../stores/actions/CartAction";

const Index = () => {
  const { promoCodeUserSave } = useSelector((state) => state.promoCodeReducer);
  const { chooseServiceList } = useSelector((state) => state.CartReducer);

  // const [choose, setChoose] = useState({ ...choosePromotionUser });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPromotionCodeUserSave());
  }, [dispatch]);

  // useEffect(() => {
  //   setChoose({ ...choosePromotionUser });
  //   // return () => {
  //   //   dispatch({ type: SET_CHOOSE_PROMOTION_USER, data: {} });
  //   // };
  // }, [choosePromotionUser, dispatch]);

  const handleChooseVoucher = useCallback(
    (code, id) => {
      // dispatch(setChoosePromotionUser(code));
      dispatch(updateServiceListAction(code, id));
    },
    [dispatch]
  );

  const disabledApply = (price, minApply) => price < minApply;

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
      <div className="w-100" style={{ maxHeight: "500px" }}>
        <header className="header_modal">Mã khuyến mãi</header>
        {chooseServiceList.map((service) => {
          const filter = promoCodeUserSave.filter((code) =>
            code?.PartnerApply?.length > 0
              ? code?.PartnerApply?.includes(
                  service?.StudioPost?.RegisterPartner?.id
                )
              : true
          );
          if (filter.length) {
            return (
              <div
                className="w-100 mb-15"
                style={{ borderBottom: "5px solid #ccc" }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    textAlign: "left",
                    width: "100%",
                    fontWeight: "600",
                    borderBottom: "2px solid #ccc",
                  }}
                  className="mb-12"
                >
                  {service?.StudioRoom?.Name}
                </div>
                {filter.map((item, index) => (
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
                    {chooseServiceList.find(
                      (s) =>
                        s?.promotion?.id === item?.id && s.id === service?.id
                    ) ? (
                      <div
                        className="btn_applied"
                        onClick={() => {
                          handleChooseVoucher(item, service?.id);
                        }}
                      >
                        Đã áp dụng
                      </div>
                    ) : (
                      <Button
                        type="primary"
                        disabled={disabledApply(service?.price, item.MinApply)}
                        className={`btn_apply ${
                          disabledApply(service?.price, item.MinApply) &&
                          "visible"
                        }`}
                        onClick={() => {
                          handleChooseVoucher(item, service?.id);
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
          }
          return null;
        })}
      </div>
      {/* {promoCodeUserSave.length > 0 &&
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
                  }}>
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
                  size="large">
                  Áp dụng
                </Button>
              )}
            </div>
          ))} */}
    </div>
  );
};

export default Index;
