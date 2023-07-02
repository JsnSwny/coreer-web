import { useAuth } from "@/contexts/AuthContext";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Header from "../Header/Header/Header";
import styles from "./Layout.module.scss";

import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";
import MessagesSidebar from "../Messages/MessagesSidebar/MessagesSidebar";

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
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Arimo:wght@400;700&family=Raleway:wght@300;400;700;900&display=swap"
            rel="stylesheet"
          />

          <link
            rel="shortcut icon"
            href="https://coreer-static.s3.eu-west-2.amazonaws.com/media/favicon/favicon.svg"
          />
          <script
            async
            src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
          ></script>

          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-WR67K5QVL0" />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-WR67K5QVL0');
        `}
        </Script>
        {/* <Sidebar /> */}
        <ToastContainer />
        <div className={styles.container}>
          {!router.pathname.includes("/onboarding") && (
            <>
              <MessagesSidebar conversations={[]} />
              <Header />
            </>
          )}
          <main className={styles.main}>{children}</main>
        </div>
      </div>
    </>
  );
};

export default Layout;
