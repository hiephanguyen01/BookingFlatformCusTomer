import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'
import "./ForgotPassword.scss";
import back from "../../../../assets/imgAuth/back-arrow.png";
import vietnam from "../../../../assets/imgAuth/vietnam.png";
import { CheckOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
export const ForgotPassword = () => {
    const navigate = useNavigate()
  const [phoneCheck, setPhoneCheck] = useState("");
  const handleSendSMS  =() => {
    if(phoneCheck.length >= 9 && phoneCheck.length <= 12){
        navigate('/auth/sign-in/forgot-password/phone')
    }

  }
  return (
    <div className="ForgotPass">
      <div className="header">
        <Link to='/auth/sign-in'>
        <button className="back-button-forgot-pass">
          <img alt="back" src={back} style={{ height: "16px" }} />
        </button>
        </Link>
        <span>Xác minh số điện thoại</span>
      </div>
      <div className="noti-forgot-pass">
        Vui lòng nhập số điện thoại đăng ký tài khoản. Mã xác minh sẽ được gửi
        đến số điện thoại của quý khách hàng.
      </div>
      <div
        className={
          phoneCheck.length >= 9 && phoneCheck.length <= 12
            ? "phone-zone-forgotpass"
            : "invalid-phone"
        }
      >
        <div className="d-flex align-items-center">
          <img alt="" src={vietnam}></img>
          <div className="code-vn-login">+84</div>
        </div>
        <input
          placeholder="Số điện thoại đăng ký tài khoản"
          className="input-phone-forgot-pass"
          onChange={(e) => setPhoneCheck(e.target.value)}
          type="number"
        />
        <div className="white-background">
        {phoneCheck.length >= 9 && phoneCheck.length <= 12 ? (
            <CheckOutlined className="accepted" />
          ) : (
            <div className='fake'></div>
          )}
        </div>
        <div
          className={
            phoneCheck.length >= 9 && phoneCheck.length <= 12
              ? "d-none"
              : "phone-check"
          }
        >
          Xin vui lòng nhập một số điện thoại hợp lệ.
        </div>
      </div>

      {phoneCheck.length >= 9 && phoneCheck.length <= 12 ?(<Link to='/auth/sign-in/forgot-password/phone'><button
        className={
          phoneCheck.length >= 9 && phoneCheck.length <= 12
            ? "continue-pass"
            : "stop-pass"
        }
        onClick={()=>handleSendSMS()}
      >
      
        Gửi qua SMS
      </button></Link>):(<button
        className={
          phoneCheck.length >= 9 && phoneCheck.length <= 12
            ? "continue-pass"
            : "stop-pass"
        }
        onClick={()=>handleSendSMS()}
      >
      
        Gửi qua SMS
      </button>)}
    </div>
  );
};
