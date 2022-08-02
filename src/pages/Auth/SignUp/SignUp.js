import React from 'react'
import ggLogo from '../../../assets/imgAuth/google.png'
import fbLogo from '../../../assets/imgAuth/facebook.png'
import vietnam from '../../../assets/imgAuth/vietnam.png'
import './SignUp.scss'
import { Link } from "react-router-dom";
export const SignUp = () => {
    return (
        <>
          <div style={{ marginBottom: "52px" }}>
            <button className="sign-up-button">Đăng ký</button>
            <Link to='/auth/sign-in'>
            <button className="sign-in-button">Đăng nhập</button>
            </Link>
            
          </div>
          <div className="face-google-login">
            <button className="google-button">
              <img
                alt="google"
                src={ggLogo}
                className="gg-logo"
              ></img>
              Tiếp tục với Google
            </button>
            <button className="facebook-button">
              <img
                alt="google"
                src={fbLogo}
                className="fb-logo"
              ></img>
              Tiếp tục với Facebook
            </button>
          </div>
          <div className="divine-login">
            <div className="divinve-login-content">hoặc</div>
          </div>
          <div className="phone-sign-up">
            <div>Đăng ký tài khoản bằng số điện thoại</div>
            <div className="phone-zone-sign-up">
              <div className="d-flex align-items-center">
                <img alt="" src={vietnam}></img>
                <div className="code-vn-login">+84</div>
              </div>
              <input
                placeholder="Số điện thoại đăng ký tài khoản"
                className="input-phone"
              />
            </div>
          </div>
          <Link to ='/auth/sign-up/phone'>
          <button className="confirm-sign-up">Đăng ký</button>
          </Link>
          <div className="have-account">
            <span className="have-account-content">Bạn đã có tài khoản?</span>
            <Link to='/auth/sign-in'>
            <span className="have-account-button">Đăng nhập</span>
            </Link>
            
          </div>
        </>
      );
}
