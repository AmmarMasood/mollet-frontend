import React, { useState, useRef } from "react";
import { Carousel, Progress } from "antd";
import Question from "./Question";
import styles from "@/styles/Questionaire.module.css";
import FinalOverview from "./FinalOverview";

function Questionaire({ data, token }) {
  const [answers, setAnswers] = useState([]);
  const [scores, setScores] = useState([]);
  const [track, setTrack] = useState(1);

  const carousel = useRef();

  const goForward = () => {
    if (data.length - 1) {
      carousel.current.next();
      setTrack(track + 1);
    }
  };

  const goBackward = () => {
    // console.log(data.length);
    // if (data.length === 12) {
    carousel.current.prev();
    setTrack(track - 1);
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
      <p
        style={{
          fontSize: "20px",
          color: "var( --primary-dark-blue)",
          fontWeight: "600",
        }}
      >
        Question: {track} / {data.length - 1}
      </p>
      <Progress
        percent={Math.round((scores.length / (data.length - 2)) * 100)}
        status="exception"
        strokeColor={{
          "0%": "#ed2945",
          "100%": "#ed2945",
        }}
        style={{ marginBottom: "50px" }}
        showInfo={false}
      />
      {/* <div className={styles.backgroundStyle}></div> */}
      {console.log("yas", scores, data)}
      <Carousel dotPosition={"bottom"} dots={false} ref={carousel}>
        {data.map((detail, i) => (
          <>
            {i <= 11 ? (
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
              <label onClick={goBackward} style={{ color: "black" }}>
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
