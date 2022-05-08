import cookie from "cookie";
import { notification } from "antd";

export const openNotificationWithIcon = (type, error) => {
  notification[type]({
    message: error,
  });
};

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : "");
}
