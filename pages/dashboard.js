import Layout from "@/components/Layout";
import React, { useContext, useState, useEffect } from "react";
import styles from "@/styles/Dashboard.module.css";
import { AuthContext } from "@/context/AuthContext";
import Button from "@/components/Button";
import { parseCookies, showConfirm } from "@/helpers/index";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

function Dashboard({ token }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user, completeProfile, logout } = useContext(AuthContext);

  const onConfirmNewPortfolio = async () => {
    if (token) {
      setLoading(true);
      const res = await completeProfile(token, {
        risk_score: null,
        invested_amount: null,
        portfolio_type: null,
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
    if (user) {
      console.log(user);
      if (!user.first_name) {
        router.push("/get-started");
      } else if (!user.portfolio_type) {
        router.push("/investor-questionaire");
      }
    }
  }, []);
  return (
    <Layout
      childern={
        <div className={styles.container}>
          {user && (
            <div className={styles.userInfoContainer}>
              <h2>
                Welcome {user.first_name} {user.last_name},
              </h2>
              <h3>
                Your portfolio type is{" "}
                {user.portfolio_type && user.portfolio_type.replace("_", " ")}
              </h3>
              <h1>
                Your inital investment was <b>Rs. {user.invested_amount}</b>
              </h1>
              <ToastContainer />
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
                }}
              />
            </div>
          )}
        </div>
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
