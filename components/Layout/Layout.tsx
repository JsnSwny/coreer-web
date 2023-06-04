import React from "react";
import Header from "../Header/Header/Header";
import Head from "next/head";
import styles from "./Layout.module.scss";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
  const { user } = useAuth();
  const router = useRouter();
  const [showHeader, setShowHeader] = useState(user && user.onboarded);

  useEffect(() => {
    setShowHeader(user && user.onboarded);
  }, [user, router]);

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
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
          ></script>
        </Head>
        {/* <Sidebar /> */}
        <ToastContainer />
        <div className={showHeader ? styles.content : styles.contentAlt}>
          {showHeader && <Header />}
          <main>{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
