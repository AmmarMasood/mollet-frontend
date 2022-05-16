import React from "react";
import { Skeleton } from "antd";
import styles from "@/styles/News/ExploreSection.module.css";
import Marquee, { Motion, randomIntFromInterval } from "react-marquee-slider";

function MarketPerformance({ performance, loading }) {
  return (
    <div style={{ backgroundColor: "var(--primary-dark-blue)" }}>
      {loading ? (
        <Skeleton />
      ) : (
        <Marquee velocity={10}>
          {performance &&
            performance.map((p, i) => (
              //   <Motion
              //     key={`child-${i}`}
              //     initDeg={randomIntFromInterval(0, 360)}
              //     direction={"clockwise"}
              //     velocity={10}
              //     radius={50}
              //   >
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gridTemplateRows: "1fr 1fr",
                  gridGap: "5px",
                  padding: "10px",
                  margin: "0 20px",
                }}
              >
                <span style={{ color: "#fff" }}>{p.name}</span>
                <span
                  style={{
                    color: parseInt(p.change) > 0 ? "green" : "red",
                  }}
                >
                  {p.value}
                </span>
                <span
                  style={{ color: parseInt(p.change) > 0 ? "green" : "red" }}
                >
                  {p.change}
                </span>
                <span
                  style={{ color: parseInt(p.change) > 0 ? "green" : "red" }}
                >
                  ({p.changePercentage})
                </span>
              </div>
              //   </Motion>
            ))}
        </Marquee>
      )}
    </div>
  );
}

export default MarketPerformance;
