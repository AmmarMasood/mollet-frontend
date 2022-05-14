import React, { useContext } from "react";
import styles from "@/styles/Home/MoreInfo.module.css";
import Button from "@/components/Button";
import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";

function MoreInfo() {
  const { user } = useContext(AuthContext);
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div>
          <h1>Simplified data for amplified returns</h1>
          <p>
            You win at investing when you make sense of complex data. ET Money
            presents you all the useful data in the most simplified manner that
            helps you separate the investing signals from the noise.
          </p>{" "}
        </div>
        <div>
          <Image
            src={"/images/simplyfy.svg"}
            width={"700px"}
            height={"500px"}
          />
        </div>
      </div>
      <div className={styles.innerContainer}>
        <div>
          {" "}
          <Image
            src={"/images/investor-personality.png"}
            width={"700px"}
            height={"500px"}
          />
        </div>
        <div>
          <h1>Bring advantage of your personality to investing</h1>
          <p>
            Success in your story happens when you know what you are doing and
            why. Bring an edge to your investing by taking decisions that match
            with your investor personality.
          </p>
          {!user ? (
            <Link href={"/register"}>
              <Button
                text={"Fill Our Assesment Form"}
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
          )}{" "}
        </div>
      </div>
    </div>
  );
}

export default MoreInfo;
