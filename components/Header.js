import React, { useContext } from "react";
import styles from "@/styles/Header.module.css";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";

function Header() {
  const { user, logout } = useContext(AuthContext);
  return (
    <header className={styles.header}>
      <div>
        <h3 className={styles.logo}>MOLLET</h3>
      </div>
      <div>
        <Link href="/">
          <span className={styles.navLink}>Home</span>
        </Link>
        <Link href="/explore-news">
          <span className={styles.navLink}> Explore News</span>
        </Link>
        {user ? (
          <>
            <Link href="/dashboard">
              <span className={styles.navLink}>My Portfolio</span>
            </Link>
            {/* <Link href="#" onClick={logout}> */}
            <span className={styles.signupButton} onClick={logout}>
              Log Out
            </span>
            {/* </Link> */}
          </>
        ) : (
          <>
            <Link href="/login">
              <span className={styles.navLink}>Login</span>
            </Link>
            <Link href="/register">
              <span className={styles.signupButton}>Get Started</span>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
