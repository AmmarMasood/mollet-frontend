import React, { useState } from "react";
import styles from "@/styles/Question.module.css";

function Question({ detail, onClick, index, selectedAnswer }) {
  return (
    <div className={styles.container}>
      <h1>{detail.question}</h1>
      <div className={styles.options}>
        {detail.answers.map((a, i) => (
          <span
            key={i}
            style={{
              border:
                selectedAnswer === i
                  ? "5px solid var(--primary-color)"
                  : "3px solid gray",
            }}
            onClick={() => {
              onClick(index, i, detail.points[i]);
            }}
          >
            {a}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Question;
