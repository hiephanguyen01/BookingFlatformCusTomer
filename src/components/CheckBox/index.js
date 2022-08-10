import { CheckOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React, { Children } from "react";
import "./checkbox.scss";

const Index = ({
  onChange,
  name,
  checked = false,
  children,
  value,
  onClick,
}) => {
  return (
    <div className="check-box_container d-flex align-items-center">
      <div className="check_box" onClick={onClick}>
        <input
          type="checkbox"
          name={name}
          onChange={onChange}
          value={value}
          checked={checked}
          className="me-16 check_input"
        />
        <CheckOutlined />
      </div>
      {children}
    </div>
  );
};

export default Index;
