import Link from "next/link";
import React, { useContext } from "react";
import Button from "../Button";
import styles from "@/styles/Home/CreatePortfolioToday.module.css";
import { AuthContext } from "@/context/AuthContext";

function CreatePortfolioToday() {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.container}>
      <h1>Create your portfolio today at no cost</h1>
      {!user ? (
        <Link href={"/register"}>
          <Button
            text={"Create My Portfolio"}
            style={{ backgroundColor: "var(--primary-black)" }}
          />
        </Link>
      ) : (
        <Link href={"/dashboard"}>
          <Button
            text={"Go To My Portfolio"}
            style={{ backgroundColor: "var(--primary-black)" }}
          />
        </Link>
      )}
    </div>
  );
}

export default CreatePortfolioToday;
