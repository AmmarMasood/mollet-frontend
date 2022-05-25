import { API_URL } from "@/config/index";
import axios from "axios";

export const createPortfolio = (token, yScore, portfolio_type) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return axios
    .post(`${API_URL}/portfolio`, { yScore, portfolio_type })
    .then((res) => {
      if (res.data) {
        return {
          success: true,
          data: res.data,
        };
      }
    })
    .catch((err) => {
      return {
        success: false,
        message: err.response.data.message,
      };
    });
};
