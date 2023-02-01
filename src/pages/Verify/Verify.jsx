import { CheckCircleTwoTone, CloseCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { authenticateService } from "../../services/AuthenticateService";
import { SET_USER } from "../../stores/types/authType";

const Verify = () => {
  const { token } = useParams();
  const [message, setMessage] = useState(null);
  const [errorVer, setErrorVer] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const res = await authenticateService.verifyEmail(token);
        localStorage.setItem("token", res.data.token);
        dispatch({ type: SET_USER, payload: res.data.data });
        setMessage("Xác nhận email thành công!");
      } catch (error) {
        setErrorVer(true);
        setMessage("Xác nhận email thất bại, vui lòng kiểm tra lại!");
      }
    })();
  }, [dispatch, token]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      {errorVer ? (
        <CloseCircleOutlined
          style={{ fontSize: "100px", color: "red", paddingTop: "150px" }}
        />
      ) : (
        <CheckCircleTwoTone
          twoToneColor="#52c41a"
          style={{ fontSize: "100px", paddingTop: "150px" }}
        />
      )}
      <h2 style={{ width: "fit-content", paddingTop: "50px" }}>{message}</h2>
      <Button
        style={{ marginTop: "50px" }}
        size="large"
        onClick={() => navigate("/home")}>
        Trở về trang chủ
      </Button>
    </div>
  );
};

export default Verify;
