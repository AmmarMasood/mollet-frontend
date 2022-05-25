import { API_URL, FLASK_API_URL } from "@/config/index";
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

export const getAllStocks = () => {
  return axios
    .get(`${API_URL}/stock`)
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

export const getStockPrices = async (stocks) => {
  const prices = stocks.map((stock) =>
    axios.get(`${API_URL}/news/stock-info?stockName=${stock.stock_name}`)
  );

  const res = await Promise.all(prices.map((p) => p.catch((e) => e)));
  const p = res.filter((result) => !(result instanceof Error));
  return p.map((l) => l.data);
};

export const getMarketSentimentFromBackend = (data) => {
  return axios
    .post(`${FLASK_API_URL}/predict`, { text: data })
    .then((res) => {
      if (res.data) {
        return {
          success: true,
          data: res.data,
        };
      }
    })
    .catch((err) => {
      console.log("flask server errror:", err);
      return {
        success: false,
        message: "Error while accessing server",
      };
    });
};
