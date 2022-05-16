import React from "react";
import styles from "@/styles/News/NewsCard.module.css";
import Link from "next/link";
function NewsCard({ info }) {
  return (
    <a href={info.link} target="_blank" rel="noreferrer">
      <div className={styles.container}>
        <img src={info.image} />
        <div>
          <h3>{info.title}</h3>
          <p>{info.description}</p>
        </div>
      </div>
    </a>
  );
}

export default NewsCard;
