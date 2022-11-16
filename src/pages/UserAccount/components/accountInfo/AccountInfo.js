import { UserOutlined } from "@ant-design/icons";
import { Button, Col, Modal, Row, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import noBody from "../../../../assets/img/no-body.png";
import imgFB from "../../../../assets/img/userAccount/facebook (4) 1facebook.png";
import imgGG from "../../../../assets/img/userAccount/google 1google.png";
import imgZalo from "../../../../assets/img/userAccount/zalo-logo-B0A0B2B326-seeklogo 1zalo.png";
import EditText from "../../../../components/TextInput/EditText";
import TextInput from "../../../../components/TextInput/TextInput";
import toastMessage from "../../../../components/ToastMessage";
import { userService } from "../../../../services/UserService";
import {
  facebookLink,
  getCurrentUser,
  googleLink,
  logOut,
} from "../../../../stores/actions/autheticateAction";
import { convertImage } from "../../../../utils/convertImage";
import "./accountInfo.scss";
const AccountInfo = () => {
  const navigate = useNavigate();
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);
  const { providerId } = useSelector((state) => state.authenticateReducer);
  const [checkedLinkGoogle, setCheckedLinkGoogle] = useState(
    UserMe?.GoogleEmail ? true : false
  );
  const [checkedLinkFB, setCheckedLinkFB] = useState(
    UserMe?.FacebookEmail ? true : false
  );

  useEffect(() => {
    setCheckedLinkFB(UserMe?.FacebookEmail ? true : false);
    setCheckedLinkGoogle(UserMe?.GoogleEmail ? true : false);
  }, [UserMe]);

  const dispatch = useDispatch();
  const myImg = convertImage(UserMe?.Image);
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
    try {
      await userService.deleteMe();
      dispatch(logOut(navigate));
    } catch (error) {
      toastMessage(error.response.data.message, "error");
    }
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
      for (let key in infoUser) {
        if (key !== "Image") {
          formData.append(key, infoUser[key]);
        } else {
          formData.append("Image", file);
        }
      }
      await userService.saveInfo(formData);
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
                      src={
                        file.preview
                          ? file.preview
                          : UserMe.Image !== null
                          ? myImg
                          : noBody
                      }
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
              {UserMe?.IsActiveEmail ? (
                <p
                  style={{ color: "green", paddingLeft: "39.703px!important" }}
                >
                  Email đã được xác nhận
                </p>
              ) : UserMe?.Email?.trim() !== " " ? (
                <p style={{ color: "red", paddingLeft: "39.703px" }}>
                  Vui lòng kiểm trả email để xác thực email.
                </p>
              ) : (
                <></>
              )}
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
          }}
        >
          <Col lg={12} sm={24}>
            <EditText
              label="Mật khẩu hiện tại"
              isPass={true}
              autocomplete="new-password"
            />
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
            }}
          >
            <Col span={12}>
              <div className="d-flex container justify-content-center align-items-center mb-30">
                <img
                  src={imgZalo}
                  alt=""
                  style={{ height: "100%", marginRight: "1rem" }}
                />
                <div
                  className="d-flex justify-content-between"
                  style={{ flex: "1" }}
                >
                  <span className="AccountInfo__social__itm">
                    Liên Kết Zalo
                  </span>
                  <Switch
                    defaultChecked={false}
                    onChange={onChangeCheck}
                    style={{}}
                    disabled={true}
                  />
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
                  <span className="AccountInfo__social__itm">
                    Liên Kết facebook
                  </span>
                  <Switch
                    onChange={() => {
                      dispatch(
                        facebookLink(
                          setCheckedLinkFB,
                          checkedLinkFB,
                          UserMe?.Phone
                        )
                      );
                    }}
                    style={{}}
                    disabled={UserMe.FacebookToken && true}
                    checked={checkedLinkFB}
                  />
                </div>
              </div>{" "}
              <div id="sign-in-button"></div>
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
                  <span className="AccountInfo__social__itm">
                    Liên Kết google
                  </span>
                  <Switch
                    onChange={() => {
                      // setCheckedLinkGoogle(!checkedLinkGoogle);
                      dispatch(
                        googleLink(
                          setCheckedLinkGoogle,
                          checkedLinkGoogle,
                          UserMe?.Phone
                        )
                      );
                    }}
                    // defaultChecked={false}
                    disabled={UserMe.TokenEmail && true}
                    checked={checkedLinkGoogle}
                    style={{}}
                  />
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
              onClick={() => setVisible(true)}
            >
              <span>Xóa tài khoản</span>
            </Button>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <Button
            type="primary"
            className="AccountInfo__save"
            onClick={saveChange}
          >
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
        // height={400}
        closable={false}
        className="AccountInfo__delete__modal"
        footer={false}
      >
        <div className="AccountInfo__delete__modal__header">
          Bạn có chắc muốn xóa tài khoản này?
        </div>
        <div
          className="AccountInfo__delete__modal__content"
          style={{ color: "#000" }}
        >
          <div className="mb-20">
            Bằng cách bấm vào nút “Xóa tài khoản”, bạn tự nguyện chọn xóa bỏ tài
            khoản của mình hoàn toàn và không thể thay đổi được, và bạn đồng ý
            thừa nhận toàn bộ trách nhiệm về mọi hậu quả liên quan đến việc xóa
            bỏ tài khoản của mình.
          </div>
          <div> Bằng cách xóa bỏ tài khoản, Booking Studio sẽ:</div>
          <ul
            style={{
              listStylePosition: "inside",
              listStyleType: "disc",
              color: "#E22828",
              fontWeight: "600",
            }}
          >
            <li>Xóa bỏ tất cả thông tin trên hồ sơ của bạn</li>
            <li>Xóa bỏ tất cả thông tin về các đơn đặt phòng trước đây </li>
          </ul>
          <div className="mt-20">
            Xin lưu ý, nếu 120 ngày chưa trôi qua kể từ ngày đặt phòng hoặc ngày
            trả phòng cuối cùng của bạn, chúng tôi không thể xóa bỏ tài khoản
            của bạn ngay lập tức do mục đích kiểm tra. Chúng tôi sẽ ghi nhận đơn
            xin xóa bỏ tài khoản 120 ngày sau ngày đặt phòng hoặc trả phòng cuối
            cùng của bạn.
          </div>
        </div>
        <div className="AccountInfo__delete__modal__group__btn">
          <button
            className="AccountInfo__delete__modal__group__btn__cancel"
            onClick={handleCancel}
          >
            Hủy
          </button>
          <button
            className="AccountInfo__delete__modal__group__btn__delete"
            onClick={handleDelete}
          >
            Xóa
          </button>
        </div>
      </Modal>
    </>
  );
};

export default AccountInfo;
