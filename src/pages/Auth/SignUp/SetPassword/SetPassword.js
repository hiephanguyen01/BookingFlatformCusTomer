import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import "./SetPassword.scss";
import back from "../../../../assets/imgAuth/back-arrow.png";
import { Link } from "react-router-dom";
export const SetPassword = ({backLink,nextLink,header,submit}) => {
  const phoneNum = "0965026910";
  const [pass, setPass] = useState("");
  const [checkNormal, setCheckNormal] = useState(false);
  const [checkUpper, setCheckUpper] = useState(false);
  const [checkInrange, setCheckInrange] = useState(false);
  const handlePass = (value) => {
    setPass(value.trim());
   
    if (/[a-z]/.test(value)) {
      setCheckNormal(true);
    } else {
      setCheckNormal(false);
    }
    if (/[A-Z]/.test(value)) {
      setCheckUpper(true);
    } else {
      setCheckUpper(false);
    }
    if (value.length >= 8 && value.length <= 16) {
      setCheckInrange(true);
    } else {
      setCheckInrange(false);
    }
  };
  return (
    <div className="SetPassword">
      <div className="header">
        <Link to={backLink}>
          <button className="back-button-sign-up">
            <img alt="back" src={back} style={{ height: "16px" }} />
          </button>
        </Link>
        <span>{header}</span>
      </div>
      <div className="noti-sign-up">
        Số điện thoại {phoneNum.slice(0, 3)} {phoneNum.slice(3, 6)}{" "}
        {phoneNum.slice(6, 8)} {phoneNum.slice(-2)} sẽ mặc định là tên đăng nhập
        của bạn
      </div>
      <div className="username-init">{phoneNum}</div>
      <Input.Password
        placeholder="Nhập mật khẩu"
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
        className="input-password"
        onChange={(e) => handlePass(e.target.value)}
        status={checkNormal && checkUpper && checkInrange ? "warning" : "error"}
      />
      <div className={checkNormal ? "accepted" : "not-accepted"}>
        Ít nhất một kí tự viết thường
      </div>
      <div className={checkUpper ? "accepted" : "not-accepted"}>
        Ít nhất một kí tự viết hoa
      </div>
      <div className={checkInrange ? "accepted" : "not-accepted"}>
        Chứa 8-16 kí tự
      </div>
      <div className="term-sign-up">
        Bằng cách nhấn vào Đăng ký,bạn đã đồng ý với{" "}
        <span className="policy-sign-up">Điều khoản sử dụng</span> và{" "}
        <span className="policy-sign-up">Chính sách bảo mật</span> của chúng
        tôi.
      </div>
      <Link to={checkNormal && checkUpper && checkInrange?nextLink:''}>
      <button
        className={
          checkNormal && checkUpper && checkInrange
            ? "continue-sign-up"
            : "stop-sign-up"
        }
      >
        {submit}
      </button>
      </Link>
    </div>
  );
};
