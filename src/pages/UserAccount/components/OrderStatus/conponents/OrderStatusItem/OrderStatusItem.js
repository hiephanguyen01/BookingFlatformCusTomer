import { Divider } from "antd";
import React, { useEffect, useState } from "react";
import "./OrderStatusItem.scss";
import demo from "../../../../../../assets/Chat/demo.png";
import { DividerCustom } from "../DividerCustom/DividerCustom";
import { Footer } from "./Footer/Footer";
import { REACT_APP_DB_BASE_URL_IMG } from "../../../../../../utils/REACT_APP_DB_BASE_URL_IMG";
import {
  dateStructure,
  numberWithDot,
  timeStructure,
} from "../../../../../../utils/convert";
import { studioPostService } from "../../../../../../services/StudioPostService";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const OrderStatusItem = ({ item }) => {
  const [post, setPost] = useState();
  const navigate = useNavigate();
  let {
    TenantId,
    BookingStatus,
    IdentifyCode,
    StudioRoom,
    CreationTime,
    OrderByTimeFrom,
    OrderByTimeTo,
    OrderByDateFrom,
    OrderByDateTo,
    DepositValue,
    BookingValue,
  } = item;
  const orderDate = new Date(CreationTime);
  OrderByTimeFrom = new Date(OrderByTimeFrom);
  OrderByTimeTo = new Date(OrderByTimeTo);
  OrderByDateFrom = new Date(OrderByDateFrom);
  OrderByDateTo = new Date(OrderByDateTo);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await studioPostService.getPostByTenantId({
          TenantId,
          category: 1,
        });
        setPost(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [TenantId]);

  const navigateToDetail = () => {
    navigate(`/home/studio/${post.id}`);
  };
  return (
    <>
      <DividerCustom />
      <div className="OrderStatusItem">
        <div className="OrderStatusItem__header">
          <div
            className="OrderStatusItem__header__name"
            onClick={navigateToDetail}>
            {post?.Name}
            <CheckCircleTwoTone
              style={{ padding: "10px" }}
              twoToneColor="#52c41a"
            />
          </div>
          <div className="OrderStatusItem__header__code">
            Mã booking: <span>{IdentifyCode}</span>
          </div>
        </div>
        <Divider className="style-divider" />
        <div className="OrderStatusItem__body">
          <div className="OrderStatusItem__body__info">
            <img
              alt=""
              className="OrderStatusItem__body__info__pic"
              src={
                StudioRoom.Image1
                  ? `${REACT_APP_DB_BASE_URL_IMG}/${StudioRoom.Image1}`
                  : demo
              }
            />
            <div className="OrderStatusItem__body__info__content">
              <div className="OrderStatusItem__body__info__content__title">
                {StudioRoom.Name}
              </div>
              <div className="OrderStatusItem__body__info__content__date">
                Ngày tạo: <span>{dateStructure(orderDate)}</span>
              </div>
              <div className="OrderStatusItem__body__info__content__time">
                Đặt từ{" "}
                <span>{timeStructure(OrderByTimeFrom || OrderByDateFrom)}</span>{" "}
                đến <span>{timeStructure(OrderByTimeTo || OrderByDateTo)}</span>{" "}
              </div>
            </div>
          </div>
          <div className="OrderStatusItem__body__price">
            <div className="OrderStatusItem__body__price__total">
              {BookingStatus !== 1 ? (
                <>
                  Tiền cọc <span>{numberWithDot(DepositValue) || "0"}đ</span>
                </>
              ) : (
                <>
                  Tổng thanh toán{" "}
                  <span>{numberWithDot(BookingValue) || "0"}đ</span>
                </>
              )}
            </div>
            <div className="OrderStatusItem__body__price__deposit">
              {BookingStatus !== 1 ? (
                <>
                  Tổng thanh toán{" "}
                  <span>{numberWithDot(BookingValue) || "0"}đ</span>
                </>
              ) : (
                <>
                  Tiền cọc <span>{numberWithDot(DepositValue) || "0"}đ</span>
                </>
              )}
            </div>
          </div>
        </div>
        <Divider className="style-divider" />
        <Footer status={BookingStatus} />
      </div>
    </>
  );
};
export default OrderStatusItem;
