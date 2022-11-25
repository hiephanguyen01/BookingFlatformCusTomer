import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import toastMessage from "../../../../../../components/ToastMessage";
import UploadImage from "../../../../../../components/UploadImage";
import "./UpdateConfirm.scss";

const UpdateConfirm = () => {
  const [order, setOrder] = useState(null);
  const [file, setFile] = useState([]);
  const [done, setDone] = useState(false);

  const onChangeFile = (e) => {
    const newFiles = [...file];
    const newFile = e.target.files[0];
    newFile.preview = URL.createObjectURL(newFile);
    newFiles.push(newFile);
    setFile([...newFiles]);
  };

  const handleProve = async () => {
    if (file.length) {
      setDone(true);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(order.IdentifyCode);
    toastMessage("Đã lưu mã booking vào bộ nhớ tạm!", "success");
  };

  return (
    <div
      className="py-12"
      style={{ margin: "auto", backgroundColor: "#f2f4f5" }}>
      <div className="confirm_order_container">
        <div className="border_bottom">
          <div className="confirm_title">MINH CHỨNG ĐÃ THANH TOÁN TIỀN CỌC</div>
          <div className="confirm_reminder text-medium-re">
            Vui lòng tải hình ảnh chứa thông tin chuyển khoản tiền đặt cọc
          </div>
        </div>

        <div className="border_bottom">
          <div className="d-flex justify-content-between mb-12">
            <div className="booking_code text-medium-re d-flex ">
              Mã Booking:{" "}
              <span className="text-medium-se">{order?.IdentifyCode}</span>
            </div>
            <div
              onClick={handleCopyToClipboard}
              className="text-medium-re"
              style={{ color: "#03AC84", cursor: "pointer" }}>
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
          {!done ? (
            <>
              <div className="text-medium-re mb-56">
                Vui lòng tải hình ảnh chứa thông tin chuyển khoản tiền đặt cọc.
              </div>
              <div className="w-60 wrapper_input">
                <UploadImage
                  onChangeFile={onChangeFile}
                  multiple={true}
                  image={file.length ? file[0].preview : undefined}>
                  <div className="btn_upload">Tải ảnh lên</div>
                </UploadImage>
              </div>
              <div
                className="btn_update text-medium-se mb-30 "
                onClick={() => handleProve()}>
                Cập nhật minh chứng
              </div>
            </>
          ) : (
            <div className="done">
              <CheckCircleOutlined className="me-10" /> Cập nhật minh chứng
              thành công
            </div>
          )}
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
export default UpdateConfirm;
