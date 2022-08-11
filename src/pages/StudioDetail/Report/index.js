import React, { useState } from "react";
import { Radio, Space } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch } from "react-redux";
import { HIDE_MODAL, SHOW_MODAL } from "../../../stores/types/modalTypes";
import { Reply } from "../Relay";

export const Report = () => {
  const [value, setValue] = useState(1);
  const dispatch = useDispatch();

  const [valueText, setValueText] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div style={{textAlign:"left"}}>
      <h4 style={{ fontSize: "20px", fontWeight: "700" }}>Lý do báo cáo </h4>
      <Radio.Group onChange={onChange} value={value}>
        <Space direction="vertical" style={{display:"flex", flexDirection:"column",alignItems:"flex-start"}}>
          <Radio value={1}>Nội dung trùng lặp, spam</Radio>
          <Radio value={2}>Thông tin sai sự thật</Radio>
          <Radio value={3}>Lộ thông tin cá nhân, vd: Số điện thoại,...</Radio>
          <Radio value={4}>Ngôn từ gây thù ghét</Radio>
          <Radio value={6}>Khác</Radio>
        </Space>
      </Radio.Group>
      {value === 6 ? (
        <TextArea
          style={{ marginTop: "10px" }}
          value={valueText}
          onChange={(e) => setValueText(e.target.value)}
          placeholder="Nhập lý do"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      ) : null}
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}>
        <button
          onClick={() => dispatch({ type: HIDE_MODAL })}
          style={{
            padding: "14px 36px",
            background: "#E7E7E7",
            borderRadius: "8px",
            border: 0,
            cursor: "pointer",
          }}>
          Huỷ
        </button>
        <button
          onClick={() => dispatch({ type: SHOW_MODAL, Component: <Reply /> })}
          style={{
            padding: "14px 36px",
            background: "#E22828",
            borderRadius: "8px",
            color: "#fff",
            border: 0,
            cursor: "pointer",
          }}>
          Báo cáo
        </button>
      </div>
    </div>
  );
};
