import { useEffect, useState } from "react";

import "./confirmOrder.scss";

import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { orderService } from "../../services/OrderService";
import { convertImage, convertImageUrl } from "../../utils/convertImage";
import toastMessage from "../ToastMessage";
import UploadImage from "../UploadImage";
import { numberWithDot } from "../../utils/convert";
import { useSelector } from "react-redux";
import BackNav from "../BackNav/BackNav";
import moment from "moment";
import { Grid } from "antd";

const { useBreakpoint } = Grid;

const Index = () => {
  const screens = useBreakpoint();
  const socket = useSelector((state) => state.userReducer.socket);
  const [checkoutDisable, setCheckoutDisable] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  let cate;
  const nameCategory = location.pathname
    .split("/")
    .filter((item) => item !== "")[1];
  switch (nameCategory) {
    case "studio":
      cate = 1;
      break;
    case "photographer":
      cate = 2;
      break;
    case "clothes":
      cate = 3;
      break;
    case "makeup":
      cate = 4;
      break;
    case "device":
      cate = 5;
      break;
    case "model":
      cate = 6;
      break;
    case "confirm-order":
      cate = location?.state?.Category;
      break;
    default:
      break;
  }
  const [file, setFile] = useState({});
  const [booking, setBooking] = useState({});

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(location?.state?.IdentifyCode);
    toastMessage("Đã lưu mã booking vào bộ nhớ tạm!", "success");
  };

  const onChangeFile = (e) => {
    const newFile = e.target.files[0];
    newFile.preview = URL.createObjectURL(newFile);
    if (newFile.preview !== null) {
      setFile(newFile);
    }
  };

  console.log(location?.state);

  const handleClickBtnUpdate = async () => {
    try {
      if (Object.keys(file).length > 0) {
        const formData = new FormData();
        const newImage = file;
        delete newImage.preview;
        formData.append("EvidenceImage", newImage);
        formData.append("Category", cate);

        const IdentifyCode = [...location?.state?.IdentifyCode];

        await orderService.updateCart(formData, IdentifyCode[0]);
        const res = await orderService.getOrderByIdentify(
          booking?.IdentifyCode,
          cate
        );

        socket?.emit("updateEvidence", res.data);
        setBooking(res.data);
        if (location?.state?.updatePay || false) {
          toastMessage("Cập nhật minh chứng thành công!", "success");
        } else {
          navigate("orderSuccess");
        }
      } else {
        toastMessage("Vui lòng chọn ảnh minh chứng!", "warn");
      }
    } catch (error) {
      toastMessage("Cập nhật minh chứng thất bại!", "error");
    }
  };

  useEffect(() => {
    const getBookingByIdentify = async () => {
      const res = await orderService.getOrderByIdentify(
        location?.state?.IdentifyCode.length > 0
          ? location?.state?.IdentifyCode[0]
          : location?.state?.IdentifyCode,
        location?.state?.Category || cate
      );
      setBooking(res.data);
    };
    getBookingByIdentify();
  }, [location, cate]);

  return (
    <div
      className={screens?.xs ? "" : "py-12"}
      style={{ margin: "auto", backgroundColor: "#f2f4f5" }}
    >
      {screens?.xs && (
        <BackNav
          title="Cập nhật minh chứng"
          to={`${
            location?.state?.path
              ? location?.state?.path
              : "/home/user/orderStatus"
          }`}
        />
      )}
      <div className="confirm_order_container">
        <div className="border_bottom">
          <div className="confirm_title">
            VUI LÒNG THANH TOÁN TIỀN CỌC ĐỂ HOÀN THÀNH ĐẶT CHỖ
          </div>
          <div className="confirm_reminder text-medium-re">
            Trong vòng 15 phút nếu bạn không thanh toán thì đơn đặt sẽ bị hủy
          </div>
        </div>

        <div className="border_bottom">
          <div className="d-flex justify-content-between mb-12">
            <div className="booking_code d-flex text-medium-re">
              <p style={{ color: "#616161" }}>Mã Booking:</p>
              <div className="banking-mess text-medium-se">
                {booking?.IdentifyCode}
              </div>
            </div>
            <div
              onClick={handleCopyToClipboard}
              className="text-medium-re text-clipboard"
              style={{ color: "#03AC84", cursor: "pointer" }}
            >
              SAO CHÉP
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="text-medium-re" style={{ color: "#616161" }}>
              Số tiền cọc:
            </div>
            <div className="text-medium-se" style={{ color: "#E22828" }}>
              {numberWithDot(booking?.DepositValue)}đ
            </div>
          </div>
        </div>

        <div className="border_bottom">
          <div className="d-flex justify-content-between mb-18">
            <div
              className=" text-medium-re w-180px"
              style={{ color: "#616161" }}
            >
              Số tài khoản:
            </div>
            <div
              className="text-medium-re w-60"
              style={{
                color: "#222222",
                fontWeight: "400",
                textAlign: "start",
              }}
            >
              68000888
            </div>
          </div>
          <div className="d-flex justify-content-between mb-18">
            <div
              className="text-medium-re w-180px"
              style={{ color: "#616161" }}
            >
              Ngân hàng:
            </div>
            <div
              className="text-medium-se w-60"
              style={{
                color: "#222222",
                fontWeight: "400",
                textAlign: "start",
              }}
            >
              Ngân hàng TMCP Á Châu - PDG Nguyễn Thái Bình
            </div>
          </div>
          <div className="d-flex justify-content-between mb-18">
            <div
              className="text-medium-re w-180px"
              style={{ color: "#616161" }}
            >
              Tên thụ hưởng:
            </div>
            <div
              className="text-medium-se w-60"
              style={{
                color: "#222222",
                fontWeight: "400",
                textAlign: "start",
              }}
            >
              Công ty cổ phần Công nghệ và Đầu tư VNPLUS
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div
              className="text-medium-re w-180px"
              style={{ color: "#616161" }}
            >
              Nội dung chuyển khoản:
            </div>
            <div
              className="text-medium-se w-60"
              style={{
                color: "#222222",
                fontWeight: "400",
                textAlign: "start",
              }}
            >
              {booking?.IdentifyCode}
            </div>
          </div>
        </div>

        <div className="border_bottom">
          <div className="text-medium-se mb-12">
            MINH CHỨNG ĐÃ THANH TOÁN TIỀN CỌC
          </div>
          <div className="text-medium-re mb-56">
            Vui lòng tải hình ảnh chứa thông tin chuyển khoản tiền đặt cọc.
          </div>
          <div className="w-60 wrapper_input">
            <UploadImage
              disable={moment(booking.CreationTime)
                .add(30, "minutes")
                .isBefore(moment())}
              onChangeFile={onChangeFile}
              multiple={true}
              image={file.preview || convertImageUrl(booking?.EvidenceImage)}
            >
              <div className="btn_upload">Tải ảnh lên</div>
            </UploadImage>
          </div>
          <div
            className={`btn_update text-medium-se mb-30 ${
              checkoutDisable && "disable-checkout"
            }`}
            onClick={handleClickBtnUpdate}
          >
            Cập nhật minh chứng
          </div>
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
      </div>
    </div>
  );
};

export default Index;
