import { Modal } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_MODAL } from "../../stores/types/modalTypes";
import "./Modal.scss";

export const ModalCustom = () => {
  const { Component, visible, isListImage, width } = useSelector(
    (state) => state.modalReducer
  );
  console.log(isListImage);
  const dispatch = useDispatch();

  return (
    <div>
      <Modal
        className={isListImage ? "modalCus" : ""}
        style={{ borderRadius: "6px" }}
        visible={visible}
        closable={false}
        footer={null}
        // width
        onCancel={() => dispatch({ type: HIDE_MODAL })}
      >
        {Component}
      </Modal>
    </div>
  );
};
