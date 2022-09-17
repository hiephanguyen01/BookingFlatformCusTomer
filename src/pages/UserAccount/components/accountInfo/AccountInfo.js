import { Col, Row, Button, Modal, Switch } from "antd";
import React, { useRef, useState } from "react";

import "./accountInfo.scss";

import TextInput from "../../../../components/TextInput/TextInput";

import imgZalo from "../../../../assets/img/userAccount/zalo-logo-B0A0B2B326-seeklogo 1zalo.png";
import imgFB from "../../../../assets/img/userAccount/facebook (4) 1facebook.png";
import imgGG from "../../../../assets/img/userAccount/google 1google.png";
import { UserOutlined } from "@ant-design/icons";

const AccountInfo = () => {
  const [visible, setVisible] = useState(false);

  const [file, setFile] = useState({});

  const onChangeFile = (e) => {
    const newFile = e.target.files[0];
    newFile.preview = URL.createObjectURL(newFile);
    if (newFile.preview !== null) {
      setFile({ ...newFile });
    }
  };

  const onChangeCheck = (checked) => {
    /* console.log(`switch to ${checked}`); */
  };

  const imgRef = useRef(null);

  return (
    <>
      <h4 style={{ marginBottom: "8px", fontSize: "16px" }}>
        Thông tin tài khoản
      </h4>
      <div
        className=""
        style={{
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 0px 16px rgba(0, 0, 0, 0.04)",
          borderRadius: "8px",
          padding: "28px 37px",
        }}
      >
        <div
          style={{
            paddingBottom: "1rem",
            marginBottom: "1.75rem",
            borderBottom: "1px solid #CACACA",
          }}
        >
          <Row className="f-flex align-items-center">
            <Col lg={12} sm={24}>
              <TextInput label="Họ và tên" />
            </Col>
            <Col lg={12} sm={24}>
              <div className="d-flex align-items-center">
                <div
                  className="ms-40 d-flex justify-content-center align-items-center me-10"
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    background: "#E7E7E7",
                    overflow: "hidden",
                  }}
                >
                  {file ? (
                    <img
                      src={file.preview}
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <UserOutlined
                      style={{ fontSize: "24px", color: "#828282" }}
                    />
                  )}
                </div>
                <div
                  className="text-medium-re d-flex justify-content-center px-15 py-5"
                  style={{
                    cursor: "pointer",
                    border: "1px solid #E7E7E7",
                    borderRadius: "4px",
                    position: "relative",
                  }}
                >
                  Chọn ảnh
                  <input
                    type="file"
                    multiple={false}
                    value={""}
                    className="w-100 h-100"
                    style={{
                      opacity: "0",
                      top: "0",
                      left: "0",
                      // cursor: "pointer",
                      position: "absolute",
                    }}
                    onChange={(e) => onChangeFile(e)}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="f-flex align-items-center">
            <Col lg={12} sm={24}>
              <TextInput label="Email" />
            </Col>
            <Col lg={12} sm={24}>
              <TextInput label="Số điện thoai" />
            </Col>
          </Row>
        </div>
        <Row
          style={{
            borderBottom: "1px solid #CACACA",
            paddingBottom: "1rem",
          }}
        >
          <Col lg={12} sm={24}>
            <TextInput label="Mật khẩu hiện tại" isPass={true} />
            <TextInput label="Mật khẩu mới" isPass={true} />
          </Col>
          <Col lg={12} sm={24}>
            <TextInput label="Nhập lại mật khẩu mới" isPass={true} />
          </Col>
        </Row>
        <div style={{ padding: "1.5rem 0" }}>
          <div
            style={{
              fontWeight: "600",
              fontSize: "18px",
              lineHeight: " 25px",
              marginBottom: "22px",
            }}
          >
            Liên kết mạng xã hội
          </div>
          <Row
            style={{
              borderBottom: "1px solid #CACACA",
              paddingBottom: "2rem",
            }}
          >
            <Col span={12}>
              <div
                className="d-flex container justify-content-center align-items-center"
                style={{ marginBottom: "30px" }}
              >
                <img
                  src={imgZalo}
                  alt=""
                  style={{ height: "100%", marginRight: "1rem" }}
                />
                <div
                  className="d-flex justify-content-between"
                  style={{ flex: "1" }}
                >
                  <span
                    style={{
                      fontWeight: "400",
                      fontSize: " 18px",
                      lineHeight: "25px",
                    }}
                  >
                    Liên Kết Zalo
                  </span>
                  <Switch defaultChecked onChange={onChangeCheck} style={{}} />
                </div>
              </div>
              <div
                className="d-flex container justify-content-center align-items-center"
                style={{ marginBottom: "30px" }}
              >
                <img
                  src={imgFB}
                  alt=""
                  style={{ height: "100%", marginRight: "1rem" }}
                />
                <div
                  className="d-flex justify-content-between"
                  style={{ flex: "1" }}
                >
                  <span
                    style={{
                      fontWeight: "400",
                      fontSize: " 18px",
                      lineHeight: "25px",
                    }}
                  >
                    Liên Kết facebook
                  </span>
                  <Switch defaultChecked onChange={onChangeCheck} style={{}} />
                </div>
              </div>{" "}
              <div className="d-flex container justify-content-center align-items-center">
                <img
                  src={imgGG}
                  alt=""
                  style={{ height: "100%", marginRight: "1rem" }}
                />
                <div
                  className="d-flex justify-content-between"
                  style={{ flex: "1" }}
                >
                  <span
                    style={{
                      fontWeight: "400",
                      fontSize: " 18px",
                      lineHeight: "25px",
                    }}
                  >
                    Liên Kết google
                  </span>
                  <Switch defaultChecked onChange={onChangeCheck} style={{}} />
                </div>
              </div>
            </Col>
            <Col span={12}></Col>
          </Row>
        </div>
        <div style={{ paddingBottom: "1.5rem" }}>
          <div
            style={{
              fontWeight: "600",
              fontSize: "18px",
              lineHeight: " 25px",
              marginBottom: "11px",
            }}
          >
            Xóa tài khoản
          </div>
          <div
            style={{
              borderBottom: "1px solid #CACACA",
              paddingBottom: "2rem",
            }}
          >
            <div
              style={{
                fontWeight: " 400",
                fontSize: "16px",
                lineHeight: "22px",
                color: "#222222",
                marginBottom: "10px",
              }}
            >
              Điều này đồng nghĩa với việc tài khoản Mikooo của bạn sẽ bị xóa
              vĩnh viễn.
            </div>
            <Button
              type="primary"
              ghost
              style={{
                boxShadow: " 0px 0px 16px rgba(0, 0, 0, 0.04)",
                borderRadius: "8px",
                height: "45px",
              }}
            >
              <span
                style={{
                  fontWeight: "700",
                  fontSize: "14px",
                  lineHeight: "19px",
                  color: "#E22828",
                }}
              >
                Xóa tài khoản
              </span>
            </Button>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <Button
            type="primary"
            style={{ borderRadius: "8px", height: "45px", width: "270px" }}
          >
            Lưu thay đổi
          </Button>
        </div>
      </div>
      <Modal
        title="Modal 1000px width"
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        <img
          ref={imgRef}
          src=""
          alt=""
          className=""
          style={{ width: "100%" }}
        />
      </Modal>
    </>
  );
};

export default AccountInfo;
