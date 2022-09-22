import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteChooseServiceAction } from "../../stores/actions/OrderAction";
import "./orderSuccess.scss";

const Index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(deleteChooseServiceAction());
  }, []);
  return (
    <div className="success-container">
      <div className="success-checkmark">
        <div className="check-icon">
          <span className="icon-line line-tip"></span>
          <span className="icon-line line-long"></span>
          <div className="icon-circle"></div>
          <div className="icon-fix"></div>
        </div>
      </div>
      <div className="text">Đặt thành công</div>
      <div className="btn-home" onClick={() => navigate("/home")}>
        Quay về trang chủ
      </div>
    </div>
  );
};

export default Index;
