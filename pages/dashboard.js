import Layout from "@/components/Layout";
import React, { useContext } from "react";
import styles from "@/styles/Dashboard.module.css";
import { AuthContext } from "@/context/AuthContext";

function dashboard() {
  const { user } = useContext(AuthContext);
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
                Your portfolio type is {user.portfolio_type.replace("_", " ")}
              </h3>
              <h1>
                Your inital investment was <b>Rs. {user.invested_amount}</b>
              </h1>
            </div>
          )}
        </div>
      }
    />
  );
}

export default dashboard;
