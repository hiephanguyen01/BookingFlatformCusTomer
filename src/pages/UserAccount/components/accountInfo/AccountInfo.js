import { UserOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Switch } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import imgFB from "../../../../assets/img/userAccount/facebook (4) 1facebook.png";
import imgGG from "../../../../assets/img/userAccount/google 1google.png";
import imgZalo from "../../../../assets/img/userAccount/zalo-logo-B0A0B2B326-seeklogo 1zalo.png";
import { ImageDetect } from "../../../../components/ImageDetect/ImageDetect";
import EditText from "../../../../components/TextInput/EditText";
import TextInput from "../../../../components/TextInput/TextInput";
import { userService } from "../../../../services/UserService";
import {
  getCurrentUser,
  logOut,
} from "../../../../stores/actions/autheticateAction";
import "./accountInfo.scss";
const AccountInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);
  const myImg = ImageDetect(UserMe);
  const [visible, setVisible] = useState(false);
  const [infoUser, setInfoUser] = useState(UserMe);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState({});
  const onChangeFile = (e) => {
    const newFile = e.target.files[0];
    newFile.preview = URL.createObjectURL(newFile);
    if (newFile.preview !== null) {
      setFile(newFile);
    }
  };
  const onChangeCheck = (checked) => {
    /* console.log(`switch to ${checked}`); */
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleDelete = async () => {
    await userService.deleteMe();
    dispatch(logOut(navigate));
    setVisible(false);
  };
  const handleChangeValue = (name, value) => {
    setInfoUser({ ...infoUser, [name]: value });
  };
  const saveChange = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      delete file.preview;
      console.log("file", file);
      for (let key in infoUser) {
        if (key !== "Image") {
          formData.append(key, infoUser[key]);
        } else {
          formData.append("Image", file);
        }
      }
      await userService.saveInfo(UserMe.id, formData);
      dispatch(getCurrentUser());
      setLoading(false);
    } catch (error) {
      console.log("fail");
      setLoading(false);
    }
  };
  return (
    <>
      <h4 style={{ marginBottom: "8px", fontSize: "16px" }}>
        Thông tin tài khoản
      </h4>
      <div className="AccountInfo">
        <div className="AccountInfo__first">
          <Row className="f-flex align-items-center">
            <Col lg={12} sm={24}>
              <EditText
                label="Họ và tên"
                name="Fullname"
                value={infoUser ? infoUser.Fullname : ""}
                onChange={(e) => {
                  let { value, name } = e.target;
                  handleChangeValue(name, value);
                }}
              />
            </Col>
            <Col lg={12} sm={24}>
              <div className="d-flex align-items-center">
                <div className="ms-40 d-flex justify-content-center align-items-center me-10 AccountInfo__first__img">
                  {file ? (
                    <img
                      src={file.preview ? file.preview : myImg}
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                      alt=""
                    />
                  ) : (
                    <UserOutlined
                      style={{ fontSize: "24px", color: "#828282" }}
                    />
                  )}
                </div>
                <div className="text-medium-re d-flex justify-content-center px-15 py-5 AccountInfo__first__choose-pic">
                  Chọn ảnh
                  <input
                    type="file"
                    multiple={false}
                    value={""}
                    className="AccountInfo__first__choose-pic__button"
                    accept="image/png, image/jpeg , image/jpg"
                    onChange={(e) => onChangeFile(e)}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row className="f-flex align-items-center">
            <Col lg={12} sm={24}>
              <EditText
                label="Email"
                value={infoUser ? infoUser.Email : ""}
                name="Email"
                onChange={(e) => {
                  let { value, name } = e.target;
                  handleChangeValue(name, value);
                }}
              />
            </Col>
            <Col lg={12} sm={24}>
              <EditText
                label="Số điện thoại"
                value={infoUser ? infoUser.Phone : ""}
                name="Phone"
                type={"number"}
                onChange={(e) => {
                  let { value, name } = e.target;
                  handleChangeValue(name, value);
                }}
              />
            </Col>
          </Row>
        </div>
        <Row
          style={{
            borderBottom: "1px solid #CACACA",
            paddingBottom: "1rem",
          }}>
          <Col lg={12} sm={24}>
            <EditText label="Mật khẩu hiện tại" isPass={true} />
            <TextInput label="Mật khẩu mới" isPass={true} />
          </Col>
          <Col lg={12} sm={24}>
            <TextInput label="Nhập lại mật khẩu mới" isPass={true} />
          </Col>
        </Row>
        <div style={{ padding: "1.5rem 0" }}>
          <div className="AccountInfo__social">Liên kết mạng xã hội</div>
          <Row
            style={{
              borderBottom: "1px solid #CACACA",
              paddingBottom: "2rem",
            }}>
            <Col span={12}>
              <div className="d-flex container justify-content-center align-items-center mb-30">
                <img
                  src={imgZalo}
                  alt=""
                  style={{ height: "100%", marginRight: "1rem" }}
                />
                <div
                  className="d-flex justify-content-between"
                  style={{ flex: "1" }}>
                  <span className="AccountInfo__social__itm">
                    Liên Kết Zalo
                  </span>
                  <Switch defaultChecked onChange={onChangeCheck} style={{}} />
                </div>
              </div>
              <div
                className="d-flex container justify-content-center align-items-center"
                style={{ marginBottom: "30px" }}>
                <img
                  src={imgFB}
                  alt=""
                  style={{ height: "100%", marginRight: "1rem" }}
                />
                <div
                  className="d-flex justify-content-between"
                  style={{ flex: "1" }}>
                  <span className="AccountInfo__social__itm">
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
                  style={{ flex: "1" }}>
                  <span className="AccountInfo__social__itm">
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
          <div className="AccountInfo__delete">Xóa tài khoản</div>
          <div className="AccountInfo__delete__container">
            <div className="AccountInfo__delete__container__content">
              Điều này đồng nghĩa với việc tài khoản Mikooo của bạn sẽ bị xóa
              vĩnh viễn.
            </div>
            <Button
              type="primary"
              ghost
              className="AccountInfo__delete__container__button"
              onClick={() => setVisible(true)}>
              <span>Xóa tài khoản</span>
            </Button>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <Button
            type="primary"
            className="AccountInfo__save"
            onClick={saveChange}>
            {loading && <ClipLoader color="#fff" size={20} />} Lưu thay đổi
          </Button>
        </div>
      </div>
      <Modal
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={550}
        height={400}
        closable={false}
        className="AccountInfo__delete__modal"
        footer={false}>
        <div className="AccountInfo__delete__modal__header">
          Bạn có chắc muốn xóa tài khoản này?
        </div>
        <div className="AccountInfo__delete__modal__content">
          Điều này đồng nghĩa với việc tài khoản Nguyen Hoang Minh bị xóa vĩnh
          viễn.
        </div>
        <div className="AccountInfo__delete__modal__group__btn">
          <button
            className="AccountInfo__delete__modal__group__btn__cancel"
            onClick={handleCancel}>
            Hủy
          </button>
          <button
            className="AccountInfo__delete__modal__group__btn__delete"
            onClick={handleDelete}>
            Xóa
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AccountInfo;
