import React, { useState, useRef } from "react";
import { Carousel } from "antd";
import Question from "./Question";
import styles from "@/styles/Questionaire.module.css";
import FinalOverview from "./FinalOverview";

function Questionaire({ data, token }) {
  const [answers, setAnswers] = useState([]);
  const [scores, setScores] = useState([]);
  const carousel = useRef();

  const goForward = () => {
    if (data.length - 1) {
      carousel.current.next();
    }
  };

  const goBackward = () => {
    // console.log(data.length);
    // if (data.length === 12) {
    carousel.current.prev();
    // }
  };

  const onAnswerSelect = (questionIndex, answerIndex, nscore) => {
    let s = [...scores];
    let a = [...answers];
    s[questionIndex] = nscore;
    a[questionIndex] = answerIndex;
    setAnswers(a);
    setScores(s);
    goForward();
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundStyle}></div>
      <Carousel dotPosition={"bottom"} dots={false} ref={carousel}>
        {data.map((detail, i) => (
          <>
            {i <= 10 ? (
              <Question
                key={i}
                detail={detail}
                index={i}
                selectedAnswer={answers[i]}
                onClick={onAnswerSelect}
              />
            ) : (
              <FinalOverview
                finalScore={scores}
                goBackward={goBackward}
                token={token}
              />
            )}

            {i > 0 && (
              <label onClick={goBackward} style={{ color: "#fff" }}>
                Back
              </label>
            )}
          </>
        ))}
      </Carousel>
    </div>
  );
}

export default Questionaire;
