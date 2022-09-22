import { message } from "antd";
import React from "react";

const toastMessage = (mess, type = "info") => {
  message[type](mess);
};

export default toastMessage;
