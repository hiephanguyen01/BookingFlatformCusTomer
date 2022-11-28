import React, { useState } from "react";

import "./confirmOrderModel.scss";

import UploadImage from "../../../../../../components/UploadImage";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const Index = () => {
  const [file, setFile] = useState({});
  const onChangeFile = (e) => {
    const newFile = e.target.files[0];
    newFile.preview = URL.createObjectURL(newFile);
    if (newFile.preview !== null) {
      setFile({ ...newFile });
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
            Trong vòng 15 phút nếu bạn không thanh toán thì đơn đặt sẽ bị hủy
          </div>
        </div>

        <div className="border_bottom">
          <div className="d-flex justify-content-between mb-12">
            <div className="booking_code text-medium-re">
              Mã Booking: <span className="text-medium-se">244256211</span>
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
              68000888
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
              Ngân hàng TMCP Á Châu - PDG Nguyễn Thái Bình
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
              Công ty cổ phần Công nghệ và Đầu tư VNPLUS
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
              [Mã Booking của bạn]
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
          <div className="btn_update text-medium-se mb-30 ">
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
