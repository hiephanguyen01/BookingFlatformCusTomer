import { InfoCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { Input, Tooltip } from "antd";
import React from "react";
import "./textInput.scss";

const TextInput = ({
  label,
  name,
  placeholder,
  onChange,
  styleInput,
  styleLabel,
  styleContainer,
  isPass = false,
  error = false,
  value,
}) => {
  return (
    <div
      className="d-flex flex-column container-input container"
      style={{ marginBottom: "1rem", ...styleContainer }}
    >
      <span
        className=""
        style={{
          marginBottom: "4px",
          fontWeight: "400",
          fontSize: "16px",
          lineHeight: "22px",
          ...styleLabel,
        }}
      >
        {label}
      </span>
      {isPass ? (
        <Input.Password
          placeholder=""
          name={name}
          value={value}
          onChange={onChange}
          style={{
            width: "100%",
            height: "50px",
            padding: "13px",
            backgroundColor: "#F4F4F4",
            border: "1px solid #E7E7E7",
            borderRadius: "4px",
            fontSize: "16px",
            color: "#222222",
            ...styleInput,
          }}
        />
      ) : (
        <Input
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          suffix={
            <Tooltip title="Extra information">
              {error && <WarningOutlined style={{ color: "red" }} />}
            </Tooltip>
          }
          style={{
            width: "100%",
            height: "50px",
            padding: "13px",
            background: "#F4F4F4",
            border: "1px solid #E7E7E7",
            borderRadius: "4px",
            fontSize: "16px",
            color: "#222222",
            ...styleInput,
          }}
        />
      )}
    </div>
  );
};

export default TextInput;
