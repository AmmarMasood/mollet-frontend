import { createContext, useState, useEffect } from "react";
import Router, { useRouter } from "next/router";
import { API_URL, FRONTEND_API_URL } from "@/config/index";
import axios from "axios";
import { getAllStocks, getStockPrices } from "@/apis/News/news";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [stocks, setStocks] = useState([]);

  //   check if user is logged in
  useEffect(() => {
    checkUserLoggedIn();
    getAllStockFromBackend();

    setInterval(() => {
      getStockLivePrices();
    }, 30000);
  }, []);

  const getAllStockFromBackend = async () => {
    // if (user && user.portfolio_id) {
    const res = await getAllStocks();
    if (res.success) {
      setStocks(res.data);
    }
    // }
  };

  const getStockLivePrices = async () => {
    if (user && user.portfolio_id && stocks.length > 0) {
      const tempstocks = [...stocks];
      const res = await getStockPrices(stocks);
      if (res) {
        for (var i = 0; i < tempstocks.length; i++) {
          for (var j = 0; j < res.length; j++) {
            if (tempstocks[i].stock_name === res[j].stockName) {
              tempstocks[i] = { ...tempstocks[i], ...res[j] };
            }
          }
        }
        setStocks(tempstocks);
      }
    }
  };
  // register user
  const register = async ({ email, password }) => {
    return axios
      .post(`${FRONTEND_API_URL}/api/register`, {
        email,
        password,
      })
      .then((res) => {
        console.log("register", res);
        if (res.data) {
          setUser(res.data.user);
          Router.push("/get-started");
        }
        return {
          success: true,
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: err.response.data.message,
        };
      });
  };
  // login user
  const login = ({ email, password }) => {
    return axios
      .post(`${FRONTEND_API_URL}/api/login`, { email, password })
      .then((res) => {
        if (res.data) {
          const { user } = res.data;
          if (!user.first_name.length) {
            router.push("/get-started");
          } else if (!user.portfolio_id) {
            router.push("/investor-questionaire");
          } else {
            router.push("/dashboard");
          }

          console.log(res.data);
          setUser(res.data.user);
        }
        return {
          success: true,
        };
      })
      .catch((err) => {
        return {
          success: false,
          message: err.response.data.message,
        };
      });
  };
  //logout user
  const logout = async () => {
    // console.log("logout");
    const res = await fetch(`${FRONTEND_API_URL}/api/logout`, {
      method: "POST",
    });

    if (res.ok) {
      setUser(null);
      router.push("/");
    }
  };

  const completeProfile = async (token, values) => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return axios
      .patch(`${API_URL}/users`, { ...values })
      .then((res) => {
        if (res.data) {
          setUser(res.data.user);
          console.log(res.data.user);
          if (res.data.user.portfolio) {
            router.push("/dashboard");
          } else {
            router.push("/investor-questionaire");
          }
          return {
            success: true,
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
  // check if user is logged in
  const checkUserLoggedIn = async () => {
    console.log("loggin");
    const res = await fetch(`${FRONTEND_API_URL}/api/user`);

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, error, completeProfile, register, login, logout, stocks }}
    >
      {children}
    </AuthContext.Provider>
  );
};
