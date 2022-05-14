import { Skeleton } from "antd";
import React from "react";
import styles from "@/styles/News/ExploreSection.module.css";

function ExploreSection({ sentiment, loading }) {
  return (
    <div className={styles.container}>
      {loading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <div className={styles.sentimentContainer}>
          <h1>Sentiment Goes Here</h1>
        </div>
      )}
    </div>
  );
}

export default ExploreSection;
