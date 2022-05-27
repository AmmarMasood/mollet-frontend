import Layout from "@/components/Layout";
import React, { useContext, useState, useEffect } from "react";
import styles from "@/styles/Dashboard.module.css";
import { AuthContext } from "@/context/AuthContext";
import Button from "@/components/Button";
import { parseCookies, showConfirm } from "@/helpers/index";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { getAllStocks, getStockPrices } from "@/apis/News/news";
import { Table } from "antd";
import Loader from "@/components/Loader";
import LiveStocksPrices from "@/components/Dashboard/LiveStocksPrices";

function Dashboard({ token }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user, completeProfile, logout, stocks } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  const a = [
    0.9034, 0.661407, 0.755037, 0.484518, 0.939852, 1.386889, 1.470444,
  ];
  const info = {
    risk_score: user ? user.risk_score : 0,
    monthly_return:
      user && user.portfolio
        ? user.portfolio.yScore * 3.16 + 1.25 * (1 - user.portfolio.yScore)
        : 0,
    beta:
      user && user.portfolio
        ? stocks
            .map((s, i) => s.weight * user.portfolio.yScore * a[i])
            .reduce((partialSum, a) => partialSum + a, 0)
        : 0,
    sd: user && user.portfolio ? user.portfolio.yScore * 7.67 : 0,
    sukuk: user && user.portfolio ? 1 - user.portfolio.yScore : 0,
  };
  const columns = [
    {
      title: "Company Name",
      dataIndex: "company_name",
    },
    {
      title: "Stock Weight",
      dataIndex: "weight",
      render: (d) => <p>{user.portfolio ? d * user.portfolio.yScore : d} %</p>,
    },
  ];

  const onConfirmNewPortfolio = async () => {
    if (token) {
      setLoading(true);
      const res = await completeProfile(token, {
        risk_score: null,
        invested_amount: null,
        portfolio_id: null,
      });
      if (!res.success) {
        toast.error(res.message);
      }
      setLoading(false);
    } else {
      toast("token error");
    }
  };

  useEffect(() => {
    if (token) {
      console.log(user);
      if (!user.first_name) {
        router.push("/get-started");
      } else if (!user.portfolio_id) {
        router.push("/investor-questionaire");
      }
    } else {
      router.push("/register");
    }
  }, []);

  return (
    <Layout
      childern={
        loading ? (
          <div style={{ height: "100vh" }}>
            <Loader
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        ) : (
          <div className={styles.container}>
            {user && (
              <div className={styles.userInfoContainer}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexFlow: "wrap",
                  }}
                >
                  <div>
                    <h2 style={{ textTransform: "uppercase" }}>
                      Welcome{" "}
                      <span style={{ color: "#ed2945" }}>
                        {user.first_name} {user.last_name}
                      </span>
                      ,
                    </h2>
                    <h3
                      style={{ textTransform: "uppercase", fontSize: "20px" }}
                    >
                      Your portfolio type is{" "}
                      <span
                        style={{
                          fontWeight: "600",
                          fontSize: "22px",
                          color: "#ed2945",
                        }}
                      >
                        {user.portfolio &&
                          user.portfolio.portfolio_type.replace("_", " ")}
                        .
                      </span>
                    </h3>
                  </div>
                  <div
                    style={{
                      marginBottom: "20px",
                      backgroundColor: "var(--primary-dark-blue)",
                      padding: "20px",
                      color: "#fff",
                      borderRadius: "20px",
                    }}
                  >
                    <h2 style={{ display: "flex", color: "inherit" }}>
                      Your inital investment was{" "}
                      <p
                        style={{
                          margin: "0",
                          paddingLeft: "10px",
                          textDecoration: "underline",
                          fontWeight: "600",
                          textDecorationColor: "#ed2945",
                        }}
                      >
                        Rs. {user.invested_amount}
                      </p>
                    </h2>
                    <h2 style={{ display: "flex", color: "inherit" }}>
                      Projected Monthly Return{" "}
                      <p
                        style={{
                          margin: "0",
                          paddingLeft: "10px",
                          textDecoration: "underline",
                          fontWeight: "600",
                          textDecorationColor: "#ed2945",
                        }}
                      >
                        {" "}
                        {info.monthly_return} %
                      </p>
                    </h2>
                    <h2 style={{ display: "flex", color: "inherit" }}>
                      Projected Yearly Return{" "}
                      <p
                        style={{
                          margin: "0",
                          paddingLeft: "10px",
                          textDecoration: "underline",
                          fontWeight: "600",
                          textDecorationColor: "#ed2945",
                        }}
                      >
                        {" "}
                        {info.monthly_return * 12} %{" "}
                      </p>
                    </h2>
                    <h2 style={{ display: "flex", color: "inherit" }}>
                      Beta{" "}
                      <p
                        style={{
                          margin: "0",
                          paddingLeft: "10px",
                          textDecoration: "underline",
                          fontWeight: "600",
                          textDecorationColor: "#ed2945",
                        }}
                      >
                        {Math.round(info.beta) / 100}{" "}
                      </p>
                    </h2>
                    <h2 style={{ display: "flex", color: "inherit" }}>
                      Standard Deviation{" "}
                      <p
                        style={{
                          margin: "0",
                          paddingLeft: "10px",
                          textDecoration: "underline",
                          fontWeight: "600",
                          textDecorationColor: "#ed2945",
                        }}
                      >
                        {info.sd} %{" "}
                      </p>
                    </h2>
                  </div>
                </div>
                <h3>Your portfolio consist of following stocks.</h3>
                <Table
                  columns={columns}
                  dataSource={[
                    ...stocks,
                    { company_name: "SUKUK (RISK FREE)", weight: info.sukuk },
                  ]}
                  bordered
                  size="small"
                  pagination={false}
                />
                <ToastContainer />
                {/* <LiveStocksPrices stocks={stocks} /> */}
                <Button
                  text="Create A New Portfolio"
                  onClick={() =>
                    showConfirm({
                      title: "Are you sure you want to create a new portfolio?",
                      description:
                        "Creating a new portfolio will remove old portfolio from your profile.",
                      onConfirm: onConfirmNewPortfolio,
                    })
                  }
                  style={{
                    backgroundColor: "var(--primary-dark-blue)",
                    padding: "10px",
                    marginTop: "100px",
                    fontSize: "16px",
                    float: "right",
                  }}
                />
              </div>
            )}
          </div>
        )
      }
    />
  );
}

export default Dashboard;

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  return {
    props: {
      token,
    },
  };
}
