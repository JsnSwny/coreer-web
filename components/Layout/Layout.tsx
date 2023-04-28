import React from "react";
import Header from "../Header/Header/Header";
import Head from "next/head";
import Sidebar from "../Sidebar/Sidebar";
import styles from "./Layout.module.scss";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        {/* <Sidebar /> */}
        <div className={styles.content}>
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
