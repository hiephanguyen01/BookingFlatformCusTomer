import { message } from "antd";

const toastMessage = (mess, type = "info", className = "", style = {}) => {
  message[type]({
    content: mess,
    className: className,
    style: style,
  });
};

export default toastMessage;
