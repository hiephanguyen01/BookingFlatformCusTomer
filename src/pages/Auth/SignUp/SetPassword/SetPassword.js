import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import back from "../../../../assets/imgAuth/back-arrow.png";
import { SignUpWithPhoneNumber } from "../../../../stores/actions/autheticateAction";
import "./SetPassword.scss";
export const SetPassword = ({
  backLink,
  nextLink,
  header,
  submit,
  onClickPop,
  onClickSignUp,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const phoneNum = useSelector(
    (state) => state.authenticateReducer.currentUser
  );
  const phoneVerify = useSelector(
    (state) => state.authenticateReducer.phoneVerify
  );
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
  const onSubmit = () => {
    onClickPop && onClickPop(0);
    onClickSignUp && onClickSignUp(0);
    dispatch(
      SignUpWithPhoneNumber({ ...phoneVerify, password: pass }, navigate)
    );
  };

  return (
    <div className="SetPassword">
      <div className="header">
        {onClickPop || onClickSignUp ? (
          <div></div>
        ) : (
          <Link to={backLink}>
            <button className="back-button-sign-up">
              <img alt="back" src={back} style={{ height: "16px" }} />
            </button>
          </Link>
        )}

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
      <Link to={checkNormal && checkUpper && checkInrange ? nextLink : ""}>
        <button
          className={
            checkNormal && checkUpper && checkInrange
              ? "continue-sign-up"
              : "stop-sign-up"
          }
          onClick={onSubmit}>
          {submit}
        </button>
      </Link>
    </div>
  );
};
