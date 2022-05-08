import { API_URL } from "@/config/index";
import axios from "axios";

export const getNews = (channelName) => {
  return axios
    .get(`${API_URL}/news/latest-news?channel=${channelName}`)
    .then((res) => {
      if (res.data) {
        return {
          success: true,
          data: res.data.news,
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

export const getMarketPerformance = () => {
  return axios
    .get(`${API_URL}/news/market-condition`)
    .then((res) => {
      if (res.data) {
        return {
          success: true,
          data: res.data.performance,
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
