import { Skeleton } from "antd";
import React from "react";
import styles from "@/styles/News/ExploreSection.module.css";
import NewsCard from "./NewsCard";

function ExploreSection({ news, loading }) {
  return (
    <div className={styles.container}>
      {loading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <div className={styles.exploreContainer}>
          {news && news.map((n, i) => <NewsCard info={n} key={i} />)}
        </div>
      )}
    </div>
  );
}

export default ExploreSection;
