import { Col, Row, Upload, Button, Modal, Switch } from "antd";
import ImgCrop from "antd-img-crop";
import React, { useRef, useState } from "react";
import TextInput from "../../../../components/TextInput/TextInput";
import "./accountInfo.scss";
import imgZalo from "../../../../assets/img/userAccount/zalo-logo-B0A0B2B326-seeklogo 1zalo.png";
import imgFB from "../../../../assets/img/userAccount/facebook (4) 1facebook.png";
import imgGG from "../../../../assets/img/userAccount/google 1google.png";

const AccountInfo = () => {
  const [visible, setVisible] = useState(false);

  const [fileList, setFileList] = useState([]);

  const imgRef = useRef(null);

  const onChangeFile = ({ fileList: newFileList }) => {
    // console.log(newFileList);
    setFileList(newFileList);
  };

  const onChangeCheck = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const onPreview = async (file) => {
    setVisible(true);
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    imgRef.current.src = src;

    // const imgWindow = window.open(src);
    // imgWindow?.document.write(image.outerHTML);
  };
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
        <Row
          style={{
            paddingBottom: "1rem",
            marginBottom: "1.75rem",
            borderBottom: "1px solid #CACACA",
          }}
        >
          <Col lg={12} sm={24}>
            <TextInput label="Họ và tên" />
            <TextInput label="Email" />
          </Col>
          <Col lg={12} sm={24}>
            <ImgCrop rotate shape="round" style={{ borderRadius: "50%" }}>
              <Upload
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onChange={onChangeFile}
                onPreview={onPreview}
              >
                {fileList.length < 1 && "+ Upload"}
              </Upload>
            </ImgCrop>
            <TextInput label="Số điện thoai" />
          </Col>
        </Row>
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
