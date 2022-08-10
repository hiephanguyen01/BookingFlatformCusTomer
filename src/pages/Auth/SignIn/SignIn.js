import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { LoginWithPhoneNumber } from "../../../stores/actions/autheticateAction";
import { FacebookSignin } from "./FacebookSignIn/FacebookSignin";
import { GoogleSignIn } from "./GoogleSignIn/GoogleSignIn";
import "./SignIn.scss";
export const SignIn = ({ shouldRedirect, onClickPop }) => {
  const user = useSelector((state) => state.authenticateReducer.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/home/dao");
    }
  }, [user]);
  const onFinish = (values) => {
    dispatch(LoginWithPhoneNumber(values, navigate));
  };
  return (
    <div className="SignIn">
      <div style={{ marginBottom: "52px" }}>
      {onClickPop ? (
        <button className="sign-up-button" onClick={() => onClickPop(5)}>
          Đăng ký
        </button>
      ) : (
        <Link to="/auth/sign-up">
          <button className="sign-up-button">Đăng ký</button>
        </Link>
      )}
        <button className="sign-in-button">Đăng nhập</button>
      </div>
      <div className="face-google-login">
        <GoogleSignIn />
        <FacebookSignin />
      </div>
      <div className="divine-login">
        <div className="divinve-login-content">hoặc</div>
      </div>
      <Form onFinish={onFinish}>
        <Form.Item
          key={1}
          name="phoneNumber"
          rules={[{ required: true, message: "Không được bỏ trống" }]}>
          <Input
            size="large"
            className="input-phone"
            placeholder="Tên đăng nhập/Số điện thoại"
          />
        </Form.Item>
        <Form.Item
          key={2}
          name="password"
          rules={[{ required: true, message: "Không được bỏ trống" }]}>
          <Input.Password
            size="large"
            placeholder="Mật khẩu"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <div className="d-flex justify-content-end">
          <Link to="/auth/sign-in/forgot-password">
            <button className="forgot-password">Quên mật khẩu</button>
          </Link>
        </div>
        <Form.Item>
          <Button
            size="large"
            style={{ width: "100%" }}
            type="primary"
            htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>

      <div className="dont-have-account">
        <span className="dont-have-account-content">
          Bạn chưa có tài khoản?
        </span>
        <Link to="/auth/sign-up">
          <span className="dont-have-account-button">Đăng ký</span>
        </Link>
      </div>
    </div>
  );
};
