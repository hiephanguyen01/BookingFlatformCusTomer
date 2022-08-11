import { Modal } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_MODAL } from "../../stores/types/modalTypes";

export const ModalCustom = () => {
  const { Component, visible } = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();

  return (
    <div>
      <Modal
        className="modalCus"
        style={{ borderRadius: "6px" }}
        visible={visible}
        closable={false}
        footer={null}
        onCancel={() => dispatch({ type: HIDE_MODAL })}
        maskClosable={true}
      >
        {Component}
      </Modal>
    </div>
  );
};
