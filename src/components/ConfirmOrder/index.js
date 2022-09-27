import React, { useEffect, useState } from "react";

import "./confirmOrder.scss";

import UploadImage from "../UploadImage";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { partnerService } from "../../services/PartnerService";
import toastMessage from "../ToastMessage";
import { orderService } from "../../services/OrderService";

const Index = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
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
    case "model":
      cate = 5;
      break;
    case "device":
      cate = 6;
      break;

    default:
      break;
  }
  const [file, setFile] = useState({});
  const [partner, setPartner] = useState({});

  useEffect(() => {
    const getPartner = async () => {
      try {
        const response = await partnerService.getPartnerDetail(
          location?.state?.TenantId
        );
        setPartner(response?.data);
      } catch (error) {
        toastMessage("Lấy thông tin partner thất bại!", "error");
      }
    };
    getPartner();
  }, []);

  const onChangeFile = (e) => {
    const newFile = e.target.files[0];
    newFile.preview = URL.createObjectURL(newFile);
    console.log(newFile);
    if (newFile.preview !== null) {
      setFile(newFile);
    }
  };

  const handleClickBtnUpdate = async () => {
    try {
      if (Object.keys(file).length > 0) {
        const formData = new FormData();
        const newImage = file;
        delete newImage.preview;
        formData.append("EvidenceImage", newImage);
        formData.append("Category", cate);

        const IdentifyCode = [...location.state.IdentifyCode];
        for (let i = 0; i < IdentifyCode.length; i++) {
          const response = await orderService.updateOrder(
            formData,
            IdentifyCode[i]
          );
        }
        navigate("orderSuccess");
      } else {
        toastMessage("Vui lòng chọn ảnh minh chứng!", "warn");
      }
    } catch (error) {
      toastMessage("Cập nhật minh chứng thất bại!", "error");
    }
  };
  return (
    <div
      className="py-12"
      style={{ margin: "auto", backgroundColor: "#f2f4f5" }}>
      <div className="confirm_order_container">
        <div className="border_bottom">
          <div className="confirm_title">
            VUI LÒNG THANH TOÁN TIỀN CỌC ĐỂ HOÀN THÀNH ĐẶT CHỖ
          </div>
          <div className="confirm_reminder text-medium-re">
            Trong vòng 30 phút nếu bạn không thanh toán thì đơn đặt sẽ bị hủy
          </div>
        </div>

        <div className="border_bottom">
          <div className="d-flex justify-content-between mb-12">
            <div className="booking_code text-medium-re">
              Mã Booking:
              <span className="text-medium-se">
                {location?.state?.IdentifyCode &&
                location?.state?.IdentifyCode?.join(", ").length > 30
                  ? `${location.state.IdentifyCode.join(", ").slice(0, 30)}...`
                  : location.state.IdentifyCode.join(", ")}
              </span>
            </div>
            <div className="text-medium-re" style={{ color: "#03AC84" }}>
              SAO CHÉP
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div className="text-medium-re" style={{ color: "#616161" }}>
              Số tiền cọc:
            </div>
            <div className="text-medium-se" style={{ color: "#E22828" }}>
              250.000đ
            </div>
          </div>
        </div>

        <div className="border_bottom">
          <div className="d-flex justify-content-between mb-18">
            <div
              className=" text-medium-re w-180px"
              style={{ color: "#616161" }}>
              Số tài khoản:
            </div>
            <div
              className="text-medium-re w-60"
              style={{
                color: "#222222",
                fontWeight: "400",
                textAlign: "start",
              }}>
              {partner.BankAccount}
            </div>
          </div>
          <div className="d-flex justify-content-between mb-18">
            <div
              className="text-medium-re w-180px"
              style={{ color: "#616161" }}>
              Ngân hàng:
            </div>
            <div
              className="text-medium-se w-60"
              style={{
                color: "#222222",
                fontWeight: "400",
                textAlign: "start",
              }}>
              {partner.BankBranchName}
            </div>
          </div>
          <div className="d-flex justify-content-between mb-18">
            <div
              className="text-medium-re w-180px"
              style={{ color: "#616161" }}>
              Tên thụ hưởng:
            </div>
            <div
              className="text-medium-se w-60"
              style={{
                color: "#222222",
                fontWeight: "400",
                textAlign: "start",
              }}>
              {partner.BankAccountOwnerName}
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <div
              className="text-medium-re w-180px"
              style={{ color: "#616161" }}>
              Nội dung chuyển khoản:
            </div>
            <div
              className="text-medium-se w-60"
              style={{
                color: "#222222",
                fontWeight: "400",
                textAlign: "start",
              }}>
              {location?.state?.IdentifyCode &&
              location?.state?.IdentifyCode?.join(", ").length > 30
                ? `${location.state.IdentifyCode.join(", ").slice(0, 30)}...`
                : location.state.IdentifyCode.join(", ")}
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
              onChangeFile={onChangeFile}
              multiple={true}
              image={file.preview}>
              <div className="btn_upload">Tải ảnh lên</div>
            </UploadImage>
          </div>
          <div
            className="btn_update text-medium-se mb-30 "
            onClick={handleClickBtnUpdate}>
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
