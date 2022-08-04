import React from "react";
import "./SignIn.scss";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import { Link } from "react-router-dom";
import { GoogleSignIn } from "./GoogleSignIn/GoogleSignIn";
import { FacebookSignin } from "./FacebookSignIn/FacebookSignin";
export const SignIn = ({ header, shouldRedirect }) => {
  return (
    <div className="SignIn">
      {header === undefined ? (
        <div style={{ marginBottom: "52px" }}>
          <Link to="/auth/sign-up">
            <button className="sign-up-button">Đăng ký</button>
          </Link>
          <button className="sign-in-button">Đăng nhập</button>
        </div>
      ) : (
        <>
          {header && (
            <div style={{ marginBottom: "52px" }}>
              <Link to="/auth/sign-up">
                <button className="sign-up-button">Đăng ký</button>
              </Link>
              <button className="sign-in-button">Đăng nhập</button>
            </div>
          )}
        </>
      )}
      <div className="face-google-login">
        <GoogleSignIn redirect={shouldRedirect ? false : true} />
        <FacebookSignin redirect={shouldRedirect ? false : true} />
      </div>
      <div className="divine-login">
        <div className="divinve-login-content">hoặc</div>
      </div>
      <div className="phone-zone-sign-in">
        <input
          placeholder="Tên đăng nhập/Số điện thoại"
          className="input-phone"
        />
      </div>

      <Input.Password
        placeholder="Mật khẩu"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        className="input-password"
        status="warning"
      />
      <div className="d-flex justify-content-end">
        <Link to="/auth/sign-in/forgot-password">
          <button className="forgot-password">Quên mật khẩu</button>
        </Link>
      </div>

      <button className="confirm-sign-in">Đăng nhập</button>
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
