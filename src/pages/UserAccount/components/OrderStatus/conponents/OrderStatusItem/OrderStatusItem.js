import { CheckCircleTwoTone } from "@ant-design/icons";
import { Divider } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import demo from "../../../../../../assets/Chat/demo.png";
import { studioPostService } from "../../../../../../services/StudioPostService";
import { numberWithDot } from "../../../../../../utils/convert";
import { IMG } from "../../../../../../utils/REACT_APP_DB_BASE_URL_IMG";
import { DividerCustom } from "../DividerCustom/DividerCustom";
import { Footer } from "./Footer/Footer";
import "./OrderStatusItem.scss";

const OrderStatusItem = ({
  item,
  pageBooking,
  setPageBooking,
  id,
  BookingStatus,
}) => {
  const [post, setPost] = useState();
  const navigate = useNavigate();
  let {
    TenantId,
    IdentifyCode,
    Item,
    CreationTime,
    OrderByTimeFrom,
    OrderByTimeTo,
    OrderByDateFrom,
    OrderByDateTo,
    BookingValue,
    category,
    EvidenceImage,
    DepositValue,
  } = item;
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
  }, [TenantId, category]);
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
              onClick={() =>
                navigate(`/home/user/orderStatus/${id}?categoryId=${category}`)
              }
              alt=""
              className="OrderStatusItem__body__info__pic"
              src={Item?.Image1 ? IMG(Item?.Image1) : demo}
            />
            <div className="OrderStatusItem__body__info__content">
              <div
                className="OrderStatusItem__body__info__content__title"
                onClick={() =>
                  navigate(
                    `/home/user/orderStatus/${id}?categoryId=${category}`
                  )
                }>
                {Item?.Name}
              </div>
              <div className="OrderStatusItem__body__info__content__date">
                Ngày đặt:{" "}
                <span>{moment(CreationTime).format("DD/MM/YYYY")}</span>
              </div>
              <div className="OrderStatusItem__body__info__content__time">
                Đặt từ{" "}
                <span>
                  {moment(OrderByTimeFrom || OrderByDateFrom)
                    .utc()
                    .format("HH:mm DD/MM/YYYY")}
                </span>{" "}
                đến{" "}
                <span>
                  {moment(OrderByTimeTo || OrderByDateTo)
                    .utc()
                    .format("HH:mm DD/MM/YYYY")}
                </span>
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
          Item={Item}
          post={post}
        />
      </div>
    </>
  );
};
export default OrderStatusItem;
