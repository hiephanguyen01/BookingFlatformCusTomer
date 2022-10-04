import { CheckCircleTwoTone } from "@ant-design/icons";
import { Divider } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import demo from "../../../../../../assets/Chat/demo.png";
import { studioPostService } from "../../../../../../services/StudioPostService";
import {
  dateStructure,
  numberWithDot,
  timeStructure,
} from "../../../../../../utils/convert";
import { REACT_APP_DB_BASE_URL_IMG } from "../../../../../../utils/REACT_APP_DB_BASE_URL_IMG";
import { DividerCustom } from "../DividerCustom/DividerCustom";
import { Footer } from "./Footer/Footer";
import "./OrderStatusItem.scss";

const OrderStatusItem = ({ item, pageBooking, setPageBooking, id}) => {

  const [post, setPost] = useState();
  const navigate = useNavigate();
  let {
    TenantId,
    BookingStatus,
    IdentifyCode,
    Item,
    CreationTime,
    OrderByTimeFrom,
    OrderByTimeTo,
    OrderByDateFrom,
    OrderByDateTo,
    DepositValue,
    BookingValue,
    category,
    EvidenceImage,
  } = item;
  const orderDate = new Date(CreationTime);
  if (OrderByTimeFrom && OrderByTimeTo) {
    OrderByTimeFrom = new Date(OrderByTimeFrom);
    OrderByTimeTo = new Date(OrderByTimeTo);
  } else {
    OrderByDateFrom = new Date(OrderByDateFrom);
    OrderByDateTo = new Date(OrderByDateTo);
  }
  useEffect(() => {
    (async () => {
      try {
        const { data } = await studioPostService.getPostByTenantId({
          TenantId,
          category,
        });
        setPost(data.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [TenantId]);
  const navigateToDetail = () => {
    switch (category) {
      case 1:
        navigate(`/home/studio/${post.id}`);
        break;
      case 2:
        navigate(`/home/photographer/${post.id}`);
        break;
      case 3:
        navigate(`/home/clothes/${post.id}`);
        break;
      case 4:
        navigate(`/home/makeup/${post.id}`);
        break;
      case 5:
        navigate(`/home/device/${post.id}`);
        break;
      case 6:
        navigate(`/home/model/${post.id}`);
        break;

      default:
        break;
    }
  };
  return (
    <>
      <DividerCustom />
      <div className="OrderStatusItem">
        <div className="OrderStatusItem__header">
          <div
            className="OrderStatusItem__header__name"
            onClick={navigateToDetail}
          >
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
                Item?.Image1
                  ? `${REACT_APP_DB_BASE_URL_IMG}/${Item?.Image1}`
                  : demo
              }
            />
            <div className="OrderStatusItem__body__info__content">
              <div className="OrderStatusItem__body__info__content__title">
                {Item?.Name}
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
        <Footer
          id={id} 
          status={BookingStatus}
          IdentifyCode={IdentifyCode}
          TenantId={TenantId}
          EvidenceImage={EvidenceImage}
          Category={category}
          pageBooking={pageBooking}
          setPageBooking={setPageBooking}
        />
      </div>
    </>
  );
};
export default OrderStatusItem;
