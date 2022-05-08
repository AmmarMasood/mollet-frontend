import React from "react";
import styles from "@/styles/Button.module.css";

function Button({ style, onClick, text, ...other }) {
  return (
    <button
      className={styles.button}
      style={style}
      onClick={onClick}
      {...other}
    >
      {text}
    </button>
  );
}

export default Button;
