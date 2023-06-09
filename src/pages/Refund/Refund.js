import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { bankService } from "../../services/BankService";
import { orderService } from "../../services/OrderService";
import { openNotification } from "../../utils/Notification";
import "./Refund.scss";

const Refund = () => {
  const [loading, setLoading] = useState(false);
  const [bank, setBank] = useState([]);
  const [valuesform, setValue] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const IdentifyCode = searchParams.get("IdentifyCode");
  const category = searchParams.get("category");
  const token = searchParams.get("token");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    showModal();
    setValue(values);
  };

  const onConfirm = async () => {
    if (!IdentifyCode)
      return openNotification("error", "Vui lòng kiểm tra lại thông tin!");
    if (!category)
      return openNotification("error", "Vui lòng kiểm tra lại thông tin!!");
    if (!token)
      return openNotification("error", "Vui lòng kiểm tra lại thông tin!!");
    try {
      setLoading(true);
      await orderService.updateRefundOrderByid(
        valuesform,
        IdentifyCode,
        category,
        token
      );
      openNotification("success", "Thông tin hoàn tiền đã được cập nhật");
      setIsModalOpen(false);
    } catch (error) {
      openNotification(
        "error",
        error?.response?.data?.message || "Vui lòng thử lại sau"
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      try {
        const { data: bank } = await bankService.getBank();
        setBank(bank.data);
      } catch (error) {
        openNotification("error", "Tải danh sách ngân hàng thất bại");
      }
    })();
  }, []);

  return (
    <div className="Refund">
      <div className="container-r chile">
        <h4 className="title-r">
          Quý khách vui lòng cung cấp thông tin số tài khoản ngân hàng để nhận
          tiền hoàn
        </h4>
        <Form
          disabled={loading}
          onFinish={onFinish}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          layout="horizontal"
        >
          <Form.Item
            label="Ngân hàng"
            name="bank"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn ngân hàng",
              },
            ]}
          >
            <Select
              showSearch
              size="large"
              filterOption={(input, option) =>
                (option?.label.toLowerCase() ?? "").includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? "")
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? "").toLowerCase())
              }
              options={bank.map((val) => ({
                value: val.VNName,
                label: val.VNName,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Số tài khoản"
            name="bankAccount"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số tài khoản",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>
          <Form.Item
            label="Tên người thụ hưởng"
            name="accountUser"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên người thụ hưởng",
              },
            ]}
          >
            <Input size="large" />
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <Button
              style={{ padding: "0 65.5px", margin: "20px 0" }}
              htmlType="submit"
              size="large"
              type="primary"
            >
              Xác nhận
            </Button>
          </Form.Item>
        </Form>

        <div className="noti">
          <div className="text-t ">
            Việc hoàn tiền thường mất 10-15 ngày làm việc Mọi thắc mắc vui lòng
            liên hệ Hotline{" "}
            <span style={{ color: "#0085ff" }}> 028 6686 8869</span>
          </div>
        </div>
      </div>
      <Modal
        footer={[]}
        title="Xác nhận"
        visible={isModalOpen}
        onCancel={handleCancel}
      >
        <p style={{ fontWeight: "bold", padding: "24px 0 " }}>
          {" "}
          Chỉ được cập nhập thông tin hoàn tiền một lần duy nhất <br /> Vui lòng
          kiểm tra thật kĩ trước khi gửi
        </p>
        <p>
          Ngân hàng:{" "}
          <span style={{ fontWeight: "bold" }}>
            &nbsp;&nbsp;{valuesform.bank}
          </span>
        </p>
        <p>
          Số tài khoản:{" "}
          <span style={{ fontWeight: "bold" }}>
            &nbsp;&nbsp;{valuesform.bankAccount}
          </span>
        </p>
        <p>
          Tên người thụ hưởng:{" "}
          <span style={{ fontWeight: "bold" }}>
            &nbsp;&nbsp;{valuesform.accountUser}
          </span>
        </p>

        <Button
          onClick={onConfirm}
          disabled={loading}
          style={{ margin: "24px 0" }}
          block
          size="large"
          type="primary"
        >
          {loading ? <LoadingOutlined /> : "Gửi"}
        </Button>
      </Modal>
    </div>
  );
};

export default Refund;
