import { useAuth } from "@/contexts/AuthContext";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Header from "../Header/Header/Header";
import styles from "./Layout.module.scss";

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
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="anonymous"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Newsreader:wght@300;400;500;600;700;800&family=Raleway:ital,wght@0,300;0,400;0,500;0,700;1,400;1,700&display=swap"
						rel="stylesheet"
					/>
					<link
						rel="shortcut icon"
						href="https://coreer-static.s3.eu-west-2.amazonaws.com/media/favicon/favicon.png"
					/>
					<script
						async
						src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
					></script>
				</Head>
				{/* <Sidebar /> */}
				<ToastContainer />
				<div className={styles.content}>
					<Header />
					<main>{children}</main>
				</div>
			</div>
		</>
	);
};

export default Layout;
