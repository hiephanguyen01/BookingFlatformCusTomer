import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Radio, Space, Input } from "antd";

import "./report.scss";

import { HIDE_MODAL, SHOW_MODAL } from "../../stores/types/modalTypes";
import FeedBack from "../FeedbackModal";

const report_list = [
  { id: 0, title: "Nội dung trùng lập, spam" },
  { id: 1, title: "Thông tin sai sự thật" },
  { id: 2, title: "Lộ thông tin cá nhân, vd: Số điện thoại,..." },
  { id: 3, title: "Ngôn từ gây thù ghét" },
  { id: 4, title: "Khác" },
];

const Index = (title, list) => {
  const [value, setValue] = useState(1);
  const dispatch = useDispatch();

  const [valueText, setValueText] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className="report_container">
      <h4 className="report_title">Lý do báo cáo </h4>
      <Radio.Group onChange={onChange} value={value}>
        <Space direction="vertical">
          {report_list.map((item, index) => (
            <Radio key={index} value={item.id} className="mb-25">
              {item.title}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
      {value === 4 ? (
        <Input.TextArea
          className="mt-10"
          value={valueText}
          onChange={(e) => setValueText(e.target.value)}
          placeholder="Nhập lý do"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      ) : null}
      <div className="d-flex justify-content-end mt-20">
        <button
          onClick={() => dispatch({ type: HIDE_MODAL })}
          className="btn_close"
        >
          Huỷ
        </button>
        <button
          onClick={() => {
            const content = report_list.find((item) => item.id === value).title;
            dispatch({
              type: SHOW_MODAL,
              Component: (
                <FeedBack title="Cảm ơn bạn đã báo cáo" content={content} />
              ),
            });
          }}
          className="btn_report ms-10"
        >
          Báo cáo
        </button>
      </div>
    </div>
  );
};

export default Index;
