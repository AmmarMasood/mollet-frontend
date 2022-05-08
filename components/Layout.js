import React from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import styles from "@/styles/Layout.module.css";

function Layout({ title, keywords, description, childern }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>
      <Header />
      <div className={styles.container}>{childern}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "Mollet | Your Personal Investment Advisier",
  keywords: "Portfolio Management Money Rich Cool AI",
  description: "Personal Portfolio Manager",
};

export default Layout;
