import { Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_MODAL } from "../../stores/types/modalTypes";
import "./Modal.scss";

export const ModalCustom = () => {
  const { Component, visible, isListImage } = useSelector(
    (state) => state.modalReducer
  );
  const dispatch = useDispatch();

  return (
    <div>
      <Modal
        className={isListImage ? "modalCus" : ""}
        style={{ borderRadius: "6px" }}
        visible={visible}
        closable={false}
        footer={null}
        onCancel={() => dispatch({ type: HIDE_MODAL })}
        centered
      >
        {Component}
      </Modal>
    </div>
  );
};
