import React from "react";
import styles from "./SettingsSection.module.scss";

interface SettingsSectionProps {
	title: string;
	children: React.ReactNode;
}

const SettingsSection = ({ title, children }: SettingsSectionProps) => {
	return <div className={styles.container}>{children}</div>;
};

export default SettingsSection;
