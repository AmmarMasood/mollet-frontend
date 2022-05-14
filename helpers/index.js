import cookie from "cookie";
import { notification, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

export const openNotificationWithIcon = (type, error) => {
  notification[type]({
    message: error,
  });
};

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : "");
}

export function showConfirm({ title, description, onConfirm, onCancel }) {
  Modal.confirm({
    title,
    icon: <ExclamationCircleOutlined />,
    content: description,
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk() {
      onConfirm();
    },
    onCancel() {
      console.log("Cancel");
    },
  });
}
