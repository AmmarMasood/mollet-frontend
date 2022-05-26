import { Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import styles from "@/styles/News/ExploreSection.module.css";
import Button from "../Button";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import Link from "next/link";

function ExploreSection({ sentiment, loading, token }) {
  const [senti, setSenti] = useState({
    negative: 0,
    positive: 0,
    neutral: 0,
  });

  useEffect(() => {
    console.log(token);
    if (sentiment) {
      const temp = {
        negative: 0,
        positive: 0,
        neutral: 0,
      };
      const numbers = sentiment.split(" ");
      numbers.forEach((num) => {
        if (num === "1") {
          temp.neutral++;
        }
        if (num === "2") {
          temp.positive++;
        }
        if (num === "0") {
          temp.negative++;
        }
      });
      setSenti(temp);
    }
  }, [sentiment]);

  ChartJS.register(ArcElement, Tooltip, Legend);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  const data = {
    labels: ["Positive News", "Neutral News", "Negative News"],
    datasets: [
      {
        label: "# of Votes",
        data: [senti.positive, senti.neutral, senti.negative],
        backgroundColor: ["#50C878", "#848587", "#ed2945"],
        borderColor: ["#50C878", "#848587", "#ed2945"],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className={styles.container}>
      {token ? (
        loading ? (
          <>
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
          </>
        ) : (
          <div className={styles.sentimentContainer}>
            <h2 style={{ color: "var(--color-primary-blue)" }}>
              Market Sentiment.
            </h2>
            <div>
              <Doughnut data={data} options={options} />
            </div>
          </div>
        )
      ) : (
        <div className={styles.notLoggedIn}>
          <h1>
            Please create an account or login to get the market sentiment
            feature.
          </h1>
          <Link href="/register">
            <Button
              text="Join Mollet"
              style={{ backgroundColor: "var(--primary-color)" }}
            />
          </Link>
        </div>
      )}
    </div>
  );
}

export default ExploreSection;
