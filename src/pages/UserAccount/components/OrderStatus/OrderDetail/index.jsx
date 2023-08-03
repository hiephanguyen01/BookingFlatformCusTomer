import {
  CheckCircleTwoTone,
  LeftOutlined,
  UploadOutlined,
  DownOutlined,
  TeamOutlined,
  UpOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Col, Divider, Grid, Input, Modal, Row } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { socket } from "../../../../../components/ConnectSocket/ConnectSocket";
import { chatService } from "../../../../../services/ChatService";
import { orderService } from "../../../../../services/OrderService";
import { studioPostService } from "../../../../../services/StudioPostService";
import {
  createConverAction,
  findConverAction,
} from "../../../../../stores/actions/ChatAction";
import { SHOW_CHAT, TOGGLE_STATE } from "../../../../../stores/types/messType";
import { convertPrice } from "../../../../../utils/convert";
import { openNotification } from "../../../../../utils/Notification";
import {
  IMG,
  tokenEmail,
} from "../../../../../utils/REACT_APP_DB_BASE_URL_IMG";
import { FooterRating } from "../conponents/OrderStatusItem/Footer/FooterRating";
import { RateModal } from "../conponents/OrderStatusItem/Footer/RateModal/RateModal";
import CancelIcon from "../Icon/CancelIcon";
import Dolar from "../Icon/Dolar";
import Dolar2 from "../Icon/Dolar2";
import NotiIcon from "../Icon/NotiIcon";
import OrderIcon from "../Icon/OrderIcon";
import { keyF } from "../OrderStatus";
import chair from "../../../../../assets/svg/chair.svg";
import conditional from "../../../../../assets/svg/conditional.svg";
import expand from "../../../../../assets/svg/expand.svg";
import "./OrderDetail.scss";
import BackNav from "../../../../../components/BackNav/BackNav";
import DropFileInput from "../../../../../components/UploadImage";
import { convertImageUrl } from "../../../../../utils/convertImage";

const { useBreakpoint } = Grid;

const OrderDetail = () => {
  const screens = useBreakpoint();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [booking, setBooking] = useState();
  const [service, setService] = useState();
  const [saleValue, setSaleValue] = useState(0);
  const [status, setStatus] = useState();
  const [post, setPost] = useState();
  const [differ, setDiffer] = useState();
  const [lastPrice, setLastPrice] = useState();
  const [showModal, setShowModal] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [visible, setVisible] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [file, setFile] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);

  const onChangeFile = (e) => {
    const newFile = e.target.files[0];
    newFile.preview = URL.createObjectURL(newFile);
    if (newFile.preview !== null) {
      setFile(newFile);
    }
  };

  const CancleFreeDate = moment(
    booking?.OrderByTime ? booking?.OrderByTimeFrom : booking?.OrderByDateFrom
  )
    .subtract(
      booking?.OrderByTime
        ? booking?.FreeCancelByHour?.match(/\d+/g)[0]
        : booking?.FreeCancelByDate?.match(/\d+/g)[0],
      `${booking?.OrderByTime ? "hours" : "days"}`
    )
    .utc()
    .format("DD/MM/YYYY HH:mm A");

  const depositPercent = booking?.OrderByTime
    ? booking?.CancelPriceByHour
    : booking?.CancelPriceByDate;
  const checkOrderByDateFrom =
    (booking?.OrderByTime
      ? booking?.OrderByTimeFrom
      : booking?.OrderByDateFrom) > moment().format();

  const handleCancelOrder = async () => {
    try {
      if (cancelReason === "") {
        return openNotification("error", "Vui lòng nhập lý do hủy đơn!");
      }
      const formData = new FormData();
      formData.append("BookingStatus", 2);
      formData.append("Category", searchParams.get("categoryId"));
      formData.append("DeletionTime", new Date());
      formData.append("DeletedNote", cancelReason);

      await orderService.updateCart(formData, booking?.IdentifyCode);

      setShowModal(false);
      openNotification("success", "Hủy đơn thành công!");
    } catch (error) {
      openNotification("error", "Hủy đơn thất bại!");
    }
  };
  useEffect(() => {
    (async () => {
      const { data } = await orderService.getOrderById(
        id,
        searchParams.get("categoryId")
      );
      // if (data?.BookingUserId !== UserMe.id) {
      //   openNotification("error", "Đây không phải đơn đặt của bạn");
      //   return navigate("/home/user/orderStatus");
      // }
      setBooking(data);
      setService(
        data?.StudioRoom ||
          data?.PhotographerServicePackage ||
          data?.MakeupServicePackage
        // data
      );
      const p_inf = await studioPostService.getPostByTenantId({
        TenantId: data.TenantId,
        category: searchParams.get("categoryId"),
      });
      setPost(p_inf.data.data);
      if (data?.OrderByTime) {
        const time = moment(data?.OrderByTimeTo).diff(
          moment(data?.OrderByTimeFrom),
          "hours"
        );
        setDiffer(time + " giờ");
      } else {
        const time = moment(data?.OrderByDateTo).diff(
          moment(data?.OrderByDateFrom),
          "days"
        );
        setDiffer(time + 1 + " ngày");
      }
      if (data?.BookingValueBeforeDiscount && data?.DepositValue) {
        setLastPrice(data?.BookingValue - data?.DepositValue);
      }
      if (data?.BookingValueBeforeDiscount && data?.BookingValue) {
        setSaleValue(data?.BookingValueBeforeDiscount - data?.BookingValue);
      }
      setStatus(checkValue(data?.BookingStatus, data?.PaymentStatus));
    })();
  }, [id, searchParams, showModal]);
  const checkValue = (BookingStatus = 0, PaymentStatus = 0) => {
    for (const key in keyF) {
      if (
        keyF[key].BookingStatus === BookingStatus &&
        keyF[key].PaymentStatus.includes(PaymentStatus)
      ) {
        return key;
      }
    }
  };

  const title = {
    1: "CHỜ THANH TOÁN CỌC",
    2: "SẮP TỚI",
    3: "HOÀN TẤT",
    4: "ĐƠN ĐẶT ĐÃ HỦY",
    5: "BẠN ĐÃ LỠ HẸN",
  };
  const subtitle = {
    1: (
      <div className="status_content">
        Để xác nhận đơn đặt, vui lòng thanh toán tiền cọc và cập nhật minh chứng
        trong vòng <span>15 phút</span>.
      </div>
    ),
    2: (
      <div className="status_content">
        Đừng quên bạn có hẹn với {post?.Name} vào lúc 08:00 AM ngày 14/02/2022
        nhé!
      </div>
    ),
    3: (
      <div className="status_content">
        Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi. Rất mong sẽ đồng hành cùng
        bạn trong tương lai!
      </div>
    ),
    4: (
      <div className="status_content">
        Đơn đặt của quý khách được hủy miễn phí và hoàn tiền theo chính sách
        (việc hoàn tiền thường mất 10-15 ngày làm việc).
      </div>
    ),
    5: (
      <div className="status_content">
        Bạn đã vắng mặt vào ngày thực hiện đơn đặt. Rất mong sẽ đồng hành cùng
        bạn trong tương lai!
      </div>
    ),
  };
  const navigateToDetail = () => {
    switch (+searchParams.get("categoryId")) {
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
  const navigateToRefund = () => {
    const Category = searchParams.get("categoryId");
    const IdentifyCode = booking?.IdentifyCode;
    const url = `/home/refund?IdentifyCode=${IdentifyCode}&category=${Category}&token=${tokenEmail(
      Category,
      IdentifyCode
    )}`;
    return navigate(url);
  };
  const handleOpenChatPartner = async () => {
    try {
      const create = await chatService.createConversation(
        booking?.TenantId,
        UserMe.id
      );
      socket.emit("send_message", {
        id: Math.random(),
        ConversationId: create.data.id,
        createdAt: moment().toISOString(),
        Content: "Xin chào chúng tôi có thể giúp được gì cho bạn !",
        Chatting: {
          id: create.data.Partner.id,
          PartnerName: create.data.Partner.PartnerName,
          Phone: create.data.Partner.Phone ? create.data.Partner.Phone : "",
          Email: create.data.Partner.Email ? create.data.Partner.Email : "",
        },
        Type: "text",
      });
      dispatch(createConverAction(create.data.id));
    } catch (error) {
      dispatch(findConverAction(error.response.data.message.id));
      dispatch({ type: TOGGLE_STATE, payload: error.response.data.message.id });
    }
  };
  const button = {
    1: (
      <div className="cx" style={{ display: "flex", justifyContent: "center" }}>
        <Link
          to={`/home/confirm-order/${id}`}
          state={{
            IdentifyCode: [booking?.IdentifyCode],
            TenantId: booking?.TenantId,
            EvidenceImage: booking?.EvidenceImage,
            updatePay: true,
            Category: searchParams.get("categoryId"),
            path: `/home/user/orderStatus/${id}?categoryId=1`,
          }}
        >
          <Button
            type="primary"
            icon={<UploadOutlined />}
            size="large"
            onClick={() => navigate(`/home/confirm-order/${id}`)}
          >
            Cập nhật minh chứng
          </Button>
        </Link>
      </div>
    ),
    2: (
      <div style={{ margin: "0 auto", gap: "8px" }} align="center">
        {checkOrderByDateFrom && (
          <Button
            type="text"
            onClick={() => setShowModal(true)}
            style={{
              color: "#e60019",
              marginRight: "20px",
              borderRadius: "8px",
            }}
            size="large"
          >
            Huỷ đơn
          </Button>
        )}

        <Button
          style={{
            color: "#009874",
            borderColor: "#009874",
            borderRadius: "8px",
            padding: "0 55.5px",
          }}
          onClick={() => {
            dispatch({ type: SHOW_CHAT });
            handleOpenChatPartner();
          }}
          size="large"
        >
          Liên hệ
        </Button>
      </div>
    ),
    3: (
      <div
        style={{
          margin: "0 auto",
          alignItems: "center",
          width: "fit-content",
        }}
      >
        {/* <Button
          onClick={navigateToDetail}
          style={{
            color: "#009874",
            borderColor: "#009874",
            borderRadius: "8px",
            padding: "0 55.5px",
          }}
          size="large">
          Đặt lại
        </Button>
        <Button
          type="primary"
          size="large"
          style={{
            marginLeft: "20px",
            color: "#fff",
            borderColor: "#1fcba2",
            background: "#1fcba2",
            borderRadius: "6px",
            padding: "0 52px",
            backgroundColor: "#1fcba2",
          }}>
          Đánh giá
        </Button> */}
        <FooterRating id={+id} visible={visible} setVisible={setVisible} />

        <Modal
          centered
          open={visible}
          footer={false}
          width={600}
          closable={false}
          className="FooterStatus__complete__modal"
        >
          <RateModal
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            Category={searchParams.get("categoryId")}
            id={id}
            Item={service}
            post={post}
          />
        </Modal>
      </div>
    ),
    4: (
      <>
        {booking?.PaymentStatus === 2 ? (
          <div
            className="cx"
            style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
          >
            <Button
              type="primary"
              ghost
              size="large"
              onClick={navigateToDetail}
              style={{ color: "#1fcba2", background: "#fff" }}
            >
              Đặt lại
            </Button>
            <Button type="primary" size="large" onClick={navigateToRefund}>
              Nhận tiền hoàn
            </Button>
          </div>
        ) : (
          <div
            className="cx"
            style={{ display: "flex", justifyContent: "center", gap: "1rem" }}
          >
            <Button type="primary" size="large" onClick={navigateToDetail}>
              Đặt lại
            </Button>
          </div>
        )}
      </>
    ),
    5: (
      <div
        style={{
          margin: "0 auto",
          alignItems: "center",
          width: "fit-content",
        }}
      >
        <Button
          onClick={navigateToDetail}
          style={{
            color: "#fff",
            borderColor: "#009874",
            borderRadius: "8px",
            padding: "0 55.5px",
            background: "#009874",
            width: "300px",
          }}
          size="large"
        >
          Đặt lại
        </Button>
        {/* <Button
          type="primary"
          size="large"
          style={{
            marginLeft: "20px",
            color: "#fff",
            borderColor: "#1fcba2",
            background: "#1fcba2",
            borderRadius: "6px",
            padding: "0 25.5px",
            backgroundColor: "#1fcba2",
          }}
        >
          Nhận hoàn tiền
        </Button> */}
      </div>
    ),
  };
  const bill = {
    1: (
      <>
        <div className="df">
          <Dolar2 />
          <div className="sub_title">THÔNG TIN THANH TOÁN</div>
        </div>
        <Row>
          <Col md={12} xs={0}></Col>
          <Col md={12} xs={24}>
            <div className="df_bt">
              <div className="tl">1 phòng x {differ}</div>
              <div className="tr">
                {convertPrice(booking?.BookingValueBeforeDiscount)} VND
              </div>
            </div>
            <Divider />
            <div className="df_bt">
              <div className="tl">Khuyến mãi</div>
              <div className="tr">-{convertPrice(saleValue)} VND</div>
            </div>
            <Divider />
            <div className="df_bt">
              <div className="tl">Tổng tạm tính</div>
              <div className="tr">
                {booking?.BookingValueBeforeDiscount
                  ? `${convertPrice(booking?.BookingValue)} VND`
                  : "Không"}
              </div>
            </div>
            <Divider />
            <div className="df_bt">
              <div className="trt">Tiền cọc (Chưa thanh toán)</div>
              <div className="trt">
                {booking?.DepositValue &&
                  `${convertPrice(booking?.DepositValue)} VND`}
                {/* {convertPrice(deposite)} VND */}
              </div>
            </div>
          </Col>
        </Row>
      </>
    ),
    2: (
      <>
        <div className="df">
          <Dolar2 />
          <div className="sub_title">THÔNG TIN THANH TOÁN</div>
        </div>
        <Row>
          <Col md={12} xs={0}></Col>
          <Col md={12} xs={24}>
            <div className="df_bt">
              <div className="tl">1 phòng x {differ}</div>
              <div className="tr">
                {convertPrice(booking?.BookingValueBeforeDiscount)} VND
              </div>
            </div>
            <Divider />
            <div className="df_bt">
              <div className="tl">Khuyến mãi</div>
              <div className="tr">-{convertPrice(saleValue)} VND</div>
            </div>
            <Divider />
            <div className="df_bt">
              <div className="tl">Tổng tạm tính</div>
              <div className="tr">
                {booking?.BookingValueBeforeDiscount
                  ? `${convertPrice(booking?.BookingValue)} VND`
                  : "Không"}
              </div>
            </div>
            <Divider />
            <div className="df_bt">
              <div className="tl">Tiền cọc (Đã thanh toán)</div>
              <div className="tr">
                {booking?.DepositValue
                  ? `${convertPrice(booking?.DepositValue)} VND`
                  : "Không"}
              </div>
            </div>
            <Divider />
            <div className="df_bt">
              <div className="trt">Tiền còn lại (Chưa thanh toán)</div>
              <div className="trt">
                {booking?.BookingValue
                  ? `${convertPrice(lastPrice)} VND`
                  : `${convertPrice(booking?.BookingValue)} VND`}
              </div>
            </div>
          </Col>
        </Row>
      </>
    ),
    3: (
      <>
        <div className="df">
          <Dolar2 />
          <div className="sub_title">THÔNG TIN THANH TOÁN</div>
        </div>
        <Row>
          <Col md={12} xs={0}></Col>
          <Col md={12} xs={24}>
            <div className="df_bt">
              <div className="tl">1 phòng x {differ}</div>
              <div className="tr">
                {convertPrice(booking?.BookingValueBeforeDiscount)} VND
              </div>
            </div>
            <Divider />
            <div className="df_bt">
              <div className="tl">Khuyến mãi</div>
              <div className="tr">-{convertPrice(saleValue)} VND</div>
            </div>
            <Divider />
            <div className="df_bt">
              <div className="tl">Tổng tạm tính</div>
              <div className="tr">
                {booking?.BookingValueBeforeDiscount
                  ? `${convertPrice(booking?.BookingValue)} VND`
                  : "Không"}
              </div>
            </div>
            <Divider />
            <div className="df_bt">
              <div className="tl">Tiền cọc (Đã thanh toán)</div>
              <div className="tr">
                {booking?.DepositValue
                  ? `${convertPrice(booking?.DepositValue)} VND`
                  : "Không"}
              </div>
            </div>
            <Divider />
            <div className="df_bt">
              <div className="trt">Tổng thanh toán</div>
              <div className="trt">
                {booking?.BookingValue
                  ? `${convertPrice(booking?.BookingValue)} VND`
                  : `${convertPrice(booking?.BookingValue)} VND`}
              </div>
            </div>
          </Col>
        </Row>
      </>
    ),
    4: (
      <>
        <div className="df">
          <Dolar2 />
          <div className="sub_title">HỦY ĐƠN VÀ HOÀN TIỀN</div>
        </div>
        <Row>
          <Col md={12} xs={0}></Col>
          <Col md={12} xs={24}>
            <div className="df_bt">
              <div className="tl">Trạng thái</div>
              <div className="tr">Đã huỷ</div>
            </div>
            <Divider />
            <div className="df_bt">
              <div className="tl">Chính sách</div>
              <div className="tr">
                Hủy mất{" "}
                {booking?.OrderByTime
                  ? booking?.CancelPriceByHour
                  : booking?.CancelPriceByDate}
                % cọc
              </div>
            </div>
            <Divider />
            <div className="df_bt">
              <div className="tl">Tiền cọc</div>
              <div className="tr">
                {`${convertPrice(booking?.DepositValue)} VND`}
              </div>
            </div>
            <Divider />
            <div className="df_bt">
              <div className="tl">Phí hủy đơn</div>
              <div className="tr">
                {`${convertPrice(booking?.CancelPrice)} VND`}
              </div>
            </div>
            <Divider />
            <div className="df_bt">
              <div className="trt">Tiền hoàn trả</div>
              <div className="trt">
                {`${convertPrice(
                  booking?.DepositValue - booking?.CancelPrice
                )} VND`}
              </div>
            </div>
          </Col>
        </Row>
      </>
    ),
    5: (
      <>
        <div className="df">
          <Dolar2 />
          <div className="sub_title">THÔNG TIN THANH TOÁN</div>
        </div>
        <Row>
          <Col md={12}></Col>
          <Col md={12}>
            <div className="df_bt">
              <div className="tl">1 phòng x {differ}</div>
              <div className="tr">
                {convertPrice(booking?.BookingValueBeforeDiscount)} VND
              </div>
            </div>
            <Divider />
            <div className="df_bt">
              <div className="tl">Khuyến mãi</div>
              <div className="tr">-{convertPrice(saleValue)} VND</div>
            </div>
            <Divider />
            <div className="df_bt">
              <div className="tl">Tổng tạm tính</div>
              <div className="tr">
                {booking?.BookingValueBeforeDiscount
                  ? `${convertPrice(booking?.BookingValue)} VND`
                  : "Không"}
              </div>
            </div>
            <Divider />
            <div className="df_bt">
              <div className="tl">Tiền cọc (Đã thanh toán)</div>
              <div className="tr">
                -
                {booking?.DepositValue
                  ? `${convertPrice(booking?.DepositValue)} VND`
                  : "Không"}
              </div>
            </div>
            <Divider />
            <div className="df_bt">
              <div className="trt">Tổng thanh toán</div>
              <div className="trt">
                {booking?.BookingValue
                  ? `${convertPrice(lastPrice)} VND`
                  : `${convertPrice(booking?.BookingValue)} VND`}
              </div>
            </div>
          </Col>
        </Row>
      </>
    ),
  };

  return (
    <div className="OrderDetail">
      {screens?.xs ? (
        <BackNav title="CHI TIẾT ĐƠN ĐẶT" to="/home/user/orderStatus" />
      ) : (
        <>
          <div className="title">LỊCH SỬ ĐƠN ĐẶT</div>
          <section className="chile df">
            <LeftOutlined
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/home/user/orderStatus")}
            />
            <div className="sub_title">CHI TIẾT ĐƠN ĐẶT</div>
          </section>
        </>
      )}

      {booking?.DeletedNote === "Quá hạn thanh toán" ? (
        <></>
      ) : (
        <section className="chile df2">
          <Dolar />
          <div className="status_name">{title[status]}</div>
          {subtitle[status]}
          {button[status]}
        </section>
      )}

      {booking?.DeletedNote === "Quá hạn thanh toán" && (
        <section
          className="chile df2"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Dolar />
          <div className="status_name">ĐÃ QUÁ HẠN THANH TOÁN</div>
          <p
            style={{
              textAlign: "center",
              maxWidth: "500px",
              marginBottom: "1rem",
            }}
          >
            Đã quá thời hạn thanh toán, nếu quý khách đã thanh toán vui lòng tải
            hình ảnh chứa thông tin chuyển khoản tiền đặt cọc.{" "}
          </p>
          <div className="w-60 wrapper_input">
            <DropFileInput
              // disable={moment(booking?.CreationTime)
              //   .add(30, "minutes")
              //   .isBefore(moment())}
              onChangeFile={onChangeFile}
              multiple={true}
              image={file.preview || convertImageUrl(booking?.EvidenceImage)}
            >
              <div className="btn_upload">Tải ảnh lên</div>
            </DropFileInput>
          </div>
          <div
            style={{
              maxWidth: "500px",
              display: "inline-flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Button
              // type="primary"

              size="large"
              // onClick={navigateToDetail}
              style={{ color: "#ffff", background: "#009874" }}
            >
              Cập nhật minh chứng
            </Button>
            <div className="d-flex">
              <ExclamationCircleOutlined
                className="w-15px me-8 mt-5"
                style={{ color: "#616161" }}
              />
              <div className="description">
                Đơn đặt sẽ được xác nhận chậm nhất sau 30 phút sau khi chuyển
                khoản thành công, trong khung giờ 08h-20h. Sau khung giờ trên sẽ
                được xác nhận vào 8h ngày kế tiếp.
              </div>
            </div>
          </div>
          {/* {button[status]} */}
        </section>
      )}

      <section className="chile">
        <div className="df">
          <OrderIcon />
          <div className="sub_title">THÔNG TIN ĐƠN ĐẶT</div>
        </div>
        <Row gutter={[62, 62]} style={{ position: "relative" }}>
          <Col md={12} xs={24}>
            <div className="df_bt">
              <div className="tl">Mã booking</div>
              <div className="tr2">{booking?.IdentifyCode}</div>
            </div>
            <div className="df_bt">
              <div className="tl">Bắt đầu</div>
              <div className="tr">
                {moment(booking?.OrderByDateFrom || booking?.OrderByTimeFrom)
                  .utc()
                  .format(
                    booking?.OrderByDateFrom
                      ? "DD/MM/YYYY"
                      : "DD/MM/YYYY hh:mm A"
                  )}
              </div>
            </div>
            <div className="df_bt">
              <div className="tl">Kết thúc</div>
              <div className="tr">
                {moment(booking?.OrderByDateTo || booking?.OrderByTimeTo)
                  .utc()
                  .format(
                    booking?.OrderByDateTo ? "DD/MM/YYYY" : "DD/MM/YYYY hh:mm A"
                  )}
              </div>
            </div>
          </Col>
          <Col md={12} xs={24}>
            <div className="df_bt">
              <div className="tl">Người đặt</div>
              <div className="tr">{booking?.BookingUserName}</div>
            </div>
            <div className="df_bt">
              <div className="tl">Số điện thoại</div>
              <div className="tr">{booking?.BookingPhone}</div>
            </div>
            <div className="df_bt">
              <div className="tl">Email</div>
              <div className="tr">{booking?.BookingEmail}</div>
            </div>
            <div className="df_bt">
              <div className="tl">Lời nhắn</div>
              <div className="tr">{booking?.OrderNote}</div>
            </div>
          </Col>
          <div className="divider"></div>
        </Row>
      </section>
      <section className="chile">
        <div className="df_bt_1">
          <div className="df">
            <div className="">{post?.Name}</div>
            <CheckCircleTwoTone twoToneColor="#52c41a" />
          </div>
          <div className="df  ">
            <div className="tl">Mã booking</div>
            <div className="tr2">{booking?.IdentifyCode}</div>
          </div>
        </div>
        <Divider />
        <div className="cardx">
          <img alt="" className="present_img" src={IMG(service?.Image1)} />
          <div className="cardx__text">
            <div className="cardx__text__title">{service?.Name}</div>
            <div className="cardx__text__sub">
              <div className="cardx__text__p">1 phòng x {differ}</div>
              <div className="cardx__text__p">
                {convertPrice(booking?.BookingValueBeforeDiscount)} VND
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#009874",
            cursor: "pointer",
            gap: ".5rem",
          }}
          onClick={() => setShowDetail(!showDetail)}
        >
          <p> {showDetail ? "Ẩn chi tiết" : "Xem chi tiết"} </p>
          {showDetail ? <UpOutlined /> : <DownOutlined />}
        </div>
        {showDetail && (
          <div>
            <div
              className="mt-10"
              style={{
                color: "#222222",
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              <div>
                <img
                  alt=""
                  src={expand}
                  className="me-10 mb-2"
                  style={{ fontSize: "15px" }}
                />
                Kích thước
              </div>
              <ul className={"detail-description"}>
                <Row gutter={12}>
                  <Col span={12}>
                    <li>Diện tích {booking?.Area}m2</li>
                  </Col>
                  <Col span={12}>
                    <li>Chiều rộng {booking?.Width}m</li>
                  </Col>
                  <Col span={12}>
                    <li>Chiều dài {booking?.Length}m</li>
                  </Col>
                  <Col span={12}>
                    <li>Chiều cao trần {booking?.Height}m</li>
                  </Col>
                </Row>
              </ul>
            </div>
            <Divider />

            <div
              className="mt-10"
              style={{
                color: "#222222",
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              <div>
                <img
                  alt=""
                  src={chair}
                  className="me-10 mb-2"
                  style={{ fontSize: "15px" }}
                />
                Thiết bị có sẵn
              </div>
              <ul className={"detail-description"}>
                <Row gutter={12}>
                  {booking?.HasBackground && (
                    <Col span={12}>
                      <li>{booking?.BackgroundDescription}</li>
                    </Col>
                  )}
                  {booking?.HasLamp && (
                    <Col span={12}>
                      <li>{booking?.LampDescription}</li>
                    </Col>
                  )}
                  {booking?.HasTable && (
                    <Col span={12}>
                      <li>Bàn</li>
                    </Col>
                  )}
                  {booking?.HasChair && (
                    <Col span={12}>
                      <li>Ghế</li>
                    </Col>
                  )}
                  {booking?.HasSofa && (
                    <Col span={12}>
                      <li>Sofa</li>
                    </Col>
                  )}
                  {booking?.HasFlower && (
                    <Col span={12}>
                      <li>Hoa</li>
                    </Col>
                  )}
                  {booking?.HasOtherDevice && (
                    <Col span={12}>
                      <li>{booking?.OtherDeviceDescription}</li>
                    </Col>
                  )}
                </Row>
              </ul>
            </div>
            <Divider />
            <div
              className="mt-10"
              style={{
                color: "#222222",
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              <div>
                <img
                  alt=""
                  src={conditional}
                  className="me-10 mb-2"
                  style={{ fontSize: "15px" }}
                />
                Tiện ích đi kèm
              </div>
              <ul className={"detail-description"}>
                <Row gutter={12}>
                  {booking?.HasAirConditioner && (
                    <Col span={12}>
                      <li>Máy lạnh</li>
                    </Col>
                  )}
                  {booking?.HasFan && (
                    <Col span={12}>
                      <li>Quạt</li>
                    </Col>
                  )}
                  {booking?.HasDressingRoom && (
                    <Col span={12}>
                      <li>Phòng thay đồ riêng</li>
                    </Col>
                  )}
                  {booking?.HasWC && (
                    <Col span={12}>
                      <li>Nhà vệ sinh</li>
                    </Col>
                  )}
                  {booking?.HasCamera && (
                    <Col span={12}>
                      <li>Camera</li>
                    </Col>
                  )}
                  {booking?.HasWifi && (
                    <Col span={12}>
                      <li>Wifi</li>
                    </Col>
                  )}
                  {booking?.HasMotorBikeParking && (
                    <Col span={12}>
                      <li>Chổ để xe máy</li>
                    </Col>
                  )}
                  {booking?.HasCarParking && (
                    <Col span={12}>
                      <li>Chổ để xe ô tô</li>
                    </Col>
                  )}
                  {booking?.HasSupporter && (
                    <Col span={12}>
                      <li>Người hỗ trợ</li>
                    </Col>
                  )}
                </Row>
              </ul>
            </div>
            <Divider />
            <div
              className="mt-10"
              style={{
                color: "#222222",
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              <div>
                <TeamOutlined
                  className="me-10 mb-2"
                  style={{ fontSize: "15px" }}
                />
                Số lượng khách
              </div>
              <ul className={"detail-description"}>
                <li>Số lượng khách tối đa: {booking?.MaximumCustomer} người</li>
                <li>Phụ thu: {convertPrice(booking?.Surcharge)} VND/người</li>
              </ul>
            </div>
          </div>
        )}
      </section>
      {booking?.DeletedNote === "Quá hạn thanh toán" ? (
        <></>
      ) : (
        <section className="chile">
          {/* <div className="df">
      <Dolar2 />
      <div className="sub_title">THÔNG TIN THANH TOÁN</div>
    </div> */}
          {bill[status]}
        </section>
      )}
      {+status !== 4 && (
        <div className="df">
          {!screens?.xs && <NotiIcon />}

          <div className="noti_text">
            Bao gồm{" "}
            <b>
              {booking?.BookingValueBeforeDiscount
                ? `${convertPrice(
                    Math.round(((booking?.BookingValue / 1.1) * 10) / 100)
                  )} VND`
                : "Không"}{" "}
            </b>
            thuế và phí. Quý khách sẽ thanh toán{" "}
            <b>
              {booking?.BookingValue
                ? `${convertPrice(lastPrice)} VND`
                : `${convertPrice(booking?.BookingValue)} VND`}{" "}
            </b>
            vào ngày{" "}
            <b>
              {moment(booking?.OrderByDateFrom || booking?.OrderByTimeFrom)
                .utc()
                .format("DD/MM/YYYY")}
            </b>
          </div>
        </div>
      )}
      <section className="chile">
        <div className="df">
          <CancelIcon />
          <div className="sub_title">CHÍNH SÁCH HỦY</div>
        </div>
        <div className="df">
          <div className="boxxx">
            <div className="fi b_green"></div>
            <div className="text">
              <div className="text_title t_green">Hủy miễn phí</div>
              <div className="text_title_2">Cho đến {CancleFreeDate}</div>
            </div>
          </div>
          <div className="boxxx">
            <div className="fi b_red"></div>
            <div className="text">
              <div className="text_title t_red">
                Hủy mất {depositPercent}% cọc
              </div>
              <div className="text_title_2">Từ {CancleFreeDate}</div>
            </div>
          </div>
        </div>
      </section>
      {+status !== 4 && (
        <div className="flexx">
          {!screens?.xs && <NotiIcon />}
          <div className="noti_text">
            Quý khách có thể hủy đơn đặt cho đến {CancleFreeDate} mà không mất
            phí gì và được hoàn tiền cọc 100% (nếu có thanh toán trước đó). Quý
            khách sẽ không được hoàn tiền nếu vắng mặt vào ngày thực hiện đơn
            đặt.
          </div>
        </div>
      )}
      <Modal
        className="confirm"
        title={"Huỷ đơn có thể bị mất phí"}
        open={showModal}
        okText="Đồng ý"
        cancelText="Thoát"
        onCancel={() => setShowModal(false)}
        onOk={() => handleCancelOrder()}
      >
        <>
          <div>
            Quý khách có thể huỷ đơn đặt cho đến{" "}
            <p style={{ color: "#009874", display: "inline-block" }}>
              {CancleFreeDate}
            </p>{" "}
            mà không mất phí gì và được hoàn tiền cọc 100% (nếu có thanh toán
            trước đó).Quý khách sẽ không được hoàn tiền nếu vắng mặt vào ngày
            thưc hiện đơn đặt.
          </div>
          <Divider style={{ margin: "14px 0" }} />
          <h5 className="">Bạn có chắc muốn hủy đơn hàng này không?</h5>
          <div className="mt-3">Vui lòng nhập lý do hủy đơn:</div>
          <Input.TextArea
            className="mt-3"
            rows={4}
            style={{ resize: "none" }}
            onChange={(e) => setCancelReason(e.target.value)}
          ></Input.TextArea>
          <Divider />
          <section className="chile">
            <div className="df">
              <CancelIcon />
              <div className="sub_title">CHÍNH SÁCH HỦY</div>
            </div>
            <div className="df" style={{ justifyContent: "space-between" }}>
              <div className="boxxx">
                <div className="fi b_green"></div>
                <div className="text">
                  <div className="text_title t_green">Hủy miễn phí</div>
                  <div className="text_title_2">Cho đến {CancleFreeDate}</div>
                </div>
              </div>
              <div className="boxxx">
                <div className="fi b_red"></div>
                <div className="text">
                  <div className="text_title t_red">
                    Hủy mất {depositPercent}% cọc
                  </div>
                  <div className="text_title_2">Từ {CancleFreeDate}</div>
                </div>
              </div>
            </div>
          </section>
        </>
      </Modal>
    </div>
  );
};

export default OrderDetail;
