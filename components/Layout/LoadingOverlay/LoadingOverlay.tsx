import React from "react";
import { FaSpinner } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import styles from "./LoadingOverlay.module.scss";

interface LoadingOverlayProps {
	text?: string;
}

const LoadingOverlay = ({ text }: LoadingOverlayProps) => {
	return (
		<div className={styles.loadingOverlay}>
			<div className={styles.loadingSpinner}>
				<ImSpinner2 className={styles.spinnerIcon} />
				{text && <p>{text}</p>}
			</div>
		</div>
	);
};

export default LoadingOverlay;
