import React from "react";
import Link from "next/link";
import styles from "@/styles/Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; Mollet Inc 2022</p>
      {/* <Link href="/about">
        <a>About Mollet</a>
      </Link> */}
    </footer>
  );
}

export default Footer;
