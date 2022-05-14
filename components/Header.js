import React, { useContext, useEffect, useState } from "react";
import styles from "@/styles/Header.module.css";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { CloseOutlined, MenuFoldOutlined } from "@ant-design/icons";
function Header() {
  const [onPhone, setOnPhone] = useState(false);
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const resize = () => {
    setOnPhone(window.innerWidth <= 600);
  };

  useEffect(() => {
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, []);
  return (
    <header className={styles.header}>
      <div>
        <h3 className={styles.logo}>MOLLET</h3>
      </div>

      {!onPhone ? (
        <div className={styles.desktopHeader}>
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
      ) : (
        <>
          <MenuFoldOutlined
            className={styles.mobileSideBarOpener}
            onClick={() => setOpenMobileNav(true)}
          />
          <div
            className={styles.mobileSideBar}
            style={{ right: openMobileNav ? "0" : "10000px" }}
          >
            <p>
              <CloseOutlined onClick={() => setOpenMobileNav(false)} />
            </p>
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
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
