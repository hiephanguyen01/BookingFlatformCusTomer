import { Modal } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export const ModalCustom = () => {
  const { Component, visible } = useSelector((state) => state.modalReducer);

  return (
    <div>
      <Modal visible={visible} closable={false} footer={null}>
        {Component}
      </Modal>
    </div>
  );
};
