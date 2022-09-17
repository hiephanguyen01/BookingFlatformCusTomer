import { Divider } from "antd";
import React from "react";
import "./OrderStatusItem.scss";
import demo from "../../../../../../assets/Chat/demo.png";
import { DividerCustom } from "../DividerCustom/DividerCustom";
import { Footer } from "./Footer/Footer";
const OrderStatusItem = ({ status }) => {
  return (
    <>
      <DividerCustom />
      <div className="OrderStatusItem">
        <div className="OrderStatusItem__header">
          <div className="OrderStatusItem__header__name">
            Studio Wisteria chuyên cung cấp dịch vụ chụp...
            <span>hehe</span>
          </div>
          <div className="OrderStatusItem__header__code">
            Mã booking <span>233355542</span>
          </div>
        </div>
        <Divider className="style-divider" />
        <div className="OrderStatusItem__body">
          <div className="OrderStatusItem__body__info">
            <img
              alt=""
              className="OrderStatusItem__body__info__pic"
              src={demo}
            />
            <div className="OrderStatusItem__body__info__content">
              <div className="OrderStatusItem__body__info__content__title">
                Premium Wisteria - Phòng chụp ảnh cưới
              </div>
              <div className="OrderStatusItem__body__info__content__date">
                Ngày <span>14/02/2021 </span>
              </div>
              <div className="OrderStatusItem__body__info__content__time">
                Giờ <span>8:00</span> AM - <span>8:30</span> PM
              </div>
            </div>
          </div>
          <div className="OrderStatusItem__body__price">
            <div className="OrderStatusItem__body__price__total">
              {status !== 1 ? (
                <>
                  Tiền cọc <span>250.000đ</span>
                </>
              ) : (
                <>
                  Tổng thanh toán <span>2.500.000đ</span>
                </>
              )}
            </div>
            <div className="OrderStatusItem__body__price__deposit">
              {status !== 1 ? (
                <>
                  Tổng thanh toán <span>2.500.000đ</span>
                </>
              ) : (
                <>
                  Tiền cọc <span>250.000đ</span>
                </>
              )}
            </div>
          </div>
        </div>
        <Divider className="style-divider" />
        <Footer status={status} />
      </div>
    </>
  );
};
export default OrderStatusItem;
