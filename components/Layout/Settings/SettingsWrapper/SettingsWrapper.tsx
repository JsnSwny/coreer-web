import Container from "@/components/Container/Container/Container";
import styles from "./SettingsWrapper.module.scss";
import SettingsSection from "../SettingsSection/SettingsSection";
import SettingsNav from "../SettingsNav/SettingsNav";
import React from "react";
import { Settings } from "http2";

interface SettingsWrapperProps {
	children: React.ReactNode;
}

const SettingsWrapper = ({ children }: SettingsWrapperProps) => {
	return (
		<Container>
			<h1>Settings</h1>
			<SettingsNav />
			<div className={styles.container}>{children}</div>
		</Container>
	);
};

export default SettingsWrapper;
