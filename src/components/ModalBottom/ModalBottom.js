import React, { useState } from "react";
import "./modalBottom.scss";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const ModalBottom = ({
  children,
  modalContent,
  extendProp = true,
  btnClose,
  close = false,
  height = "40%",
}) => {
  const [show, setShow] = useState(false);
  const [extend, setExtend] = useState(false);
  return (
    <div>
      <div onClick={() => setShow(!show)}>{children}</div>
      <div
        className={`modal-bottom ${show ? "show" : "hidden"}`}
        onClick={() => setShow(!show)}
      >
        <div
          className={`modal-content ${extend ? "extend" : ""}`}
          style={{ height: height }}
          onClick={(e) => e.stopPropagation()}
        >
          {close && (
            <span class="close" onClick={() => setShow(false)}>
              {btnClose}
            </span>
          )}
          {extendProp && (
            <div className="btn-extend" onClick={() => setExtend(!extend)}>
              {extend ? (
                <DownOutlined className="icon" />
              ) : (
                <UpOutlined className="icon" />
              )}
            </div>
          )}
          <div className="content">{modalContent}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalBottom;
