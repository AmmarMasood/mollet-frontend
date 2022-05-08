import { Skeleton } from "antd";
import React from "react";
import styles from "@/styles/News/ExploreSection.module.css";

function ExploreSection({ performance, loading }) {
  return (
    <div className={styles.container}>
      {loading ? (
        <>
          <Skeleton active />
          {console.log(performance)}
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <div className={styles.sentimentContainer}>
          {/* {" "} */}
          {/* {console.log(performance)} pop
           */}
          <div className={styles.performanceCard}>
            {performance &&
              performance.map((p, i) => (
                <div key={i}>
                  <span>{p.name}</span>
                  <span>{p.changePercentage}</span> <span>{p.value}</span>
                  <span>{p.change}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ExploreSection;
