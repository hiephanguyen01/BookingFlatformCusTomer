import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { deleteChooseServiceAction } from "../../stores/actions/CartAction";
import "./orderSuccess.scss";

moment().format();
const Index = () => {
  const UserMe = useSelector((state) => state.authenticateReducer.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { pathname } = useLocation();
  const enum_post = {
    studio: 1,
    photographer: 2,
    clothes: 3,
    makeup: 4,
    device: 5,
    model: 6,
  };

  useEffect(() => {
    dispatch(deleteChooseServiceAction());
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "40vh" }}
    >
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
    </div>
  );
};

export default Index;
