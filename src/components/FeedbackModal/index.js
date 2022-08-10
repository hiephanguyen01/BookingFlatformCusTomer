import React from "react";
import { useDispatch } from "react-redux";
import { HIDE_MODAL, SHOW_MODAL } from "../../stores/types/modalTypes";

import "./feedback.scss";

const Index = ({ title, content }) => {
  const dispatch = useDispatch();
  return (
    <div className="feedback_container">
      <div className="feedback_title">{title}</div>
      <div className="feedback_content">{content}</div>
      <div className="d-flex justify-content-end mt-20">
        {/* <button
          onClick={() => dispatch({ type: HIDE_MODAL })}
          className="btn_close"
        >
          Huỷ
        </button> */}
        <button
          onClick={() => {
            dispatch({
              type: HIDE_MODAL,
            });
          }}
          className="btn_report ms-10"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default Index;
